import { createContext, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<any>({});

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
