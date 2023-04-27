import { useRef, useState, useEffect } from "react";
import useAuth from "@/hook/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import jwt_decode from "jwt-decode";

const LOGIN_URL = "/auth";
interface AccessTokenPayload {
  userInfo: {
    userName: string;
    roles: number[];
  };
  iat: number;
  exp: number;
}

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errRef = useRef<any>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      const accessToken = response?.data?.accessToken;
      const decoded: AccessTokenPayload = jwt_decode(
        response?.data?.accessToken
      );
      const roles = decoded.userInfo.roles;
      setAuth({
        user,
        pwd,
        roles,
        accessToken,
      });

      setUser("");
      setPwd("");

      navigate(from, { replace: true });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an account?
        <br />
        <span>
          <a href="#">Sign Up</a>
        </span>
      </p>
    </section>
  );
};

export default Login;
