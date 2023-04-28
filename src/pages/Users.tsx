import { useState, useEffect } from "react";
import useAxiosPrivate from "@/hook/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState<any>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users/", {
          signal: controller.signal,
        });
        console.log("aa", response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user: any, index: number) => (
            <li key={index}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No user to display</p>
      )}
    </article>
  );
};

export default Users;
