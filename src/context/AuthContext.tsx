import { createContext, useState } from "react";
import { CHILDREN } from "../types";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthContextProvider = ({ children } : CHILDREN): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(
    Cookies.get("token") ? true : false
  );
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
