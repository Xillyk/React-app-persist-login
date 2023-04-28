import { useNavigate, Link } from "react-router-dom";
import useLogout from "@/hook/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/linkpage");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are login!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge page</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <br />
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
