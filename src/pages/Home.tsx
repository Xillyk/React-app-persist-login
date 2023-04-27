import AuthContext from "@/context/AuthProvider";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const Logout = async () => {
    // if used in more than one component, it should be in context
    // axios to /logout endpoint
    setAuth({});
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
        <button onClick={Logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
