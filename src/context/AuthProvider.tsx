import { createContext, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<any>({});

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({});

  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist") as string) || false
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
