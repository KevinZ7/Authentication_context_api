import { createContext, useState } from "react";
import { AuthContextType } from "../shared/interfaces/auth";

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: MyComponentProps) => {
  const [auth, setAuth] = useState({
    access: "",
    refresh: "",
    loggedIn: false,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

interface MyComponentProps {
  children: React.ReactNode;
}

export default AuthContext;
