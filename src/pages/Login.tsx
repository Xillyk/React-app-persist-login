import { useRef, useState, useEffect } from "react";
import useAuth from "@/hook/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "@/api/axios";
import jwt_decode from "jwt-decode";
import useInput from "@/hook/useInput";
import useToggle from "@/hook/useToggle";

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

  const [user, resetUser, userAttributeObj] = useInput("user", ""); //useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

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
        roles,
        accessToken,
      });

      // setUser("");
      resetUser();
      setPwd("");

      // send user back where they came from
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

  // const togglePersist = () => {
  //   setPersist((prev: boolean) => !prev);
  // };

  // useEffect(() => {
  //   localStorage.setItem("persist", persist);
  // }, [persist]);

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
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          {...(userAttributeObj as object)}
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
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={toggleCheck}
            checked={check}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
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
