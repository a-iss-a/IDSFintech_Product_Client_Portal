import { useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import type { AuthUser, UserRole } from "../types/AuthUserType";
import { AuthUserContext } from "./AuthUserContext";
import { login as loginUser } from "../services/AuthService";

interface JwtPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}
const AuthContext =({ children }: {children: ReactNode})=>{
    const [user, setUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    const decoded = jwtDecode<JwtPayload>(token);

    const userrole: UserRole =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Admin"
            ? "Admin"
            : "User";

    return {
        id: Number(
            decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        ),
        email:
            decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        role: userrole
       };
});

    const  login = async (email: string, password: string) =>{
       const data = await loginUser({ email, password });
       const decoded = jwtDecode<JwtPayload>(data.token);
       const userrole: UserRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Admin" ? "Admin" : "User";
       const authuser: AuthUser = {
        id: Number(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]),
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        role: userrole
       }

       setUser(authuser);
       return authuser;

    }

    const logout = () =>{
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthUserContext.Provider value={{user,login,logout}}>
          { children }
        </AuthUserContext.Provider>
    )
}

export default AuthContext;