import { useContext } from "react";
import { AuthUserContext } from "../context/AuthUserContext";

export const useAuth = () =>{
    const authcontext = useContext(AuthUserContext);


     if (!authcontext) {
        throw new Error("useAuth must be used within AuthContext");
    }

    
    return authcontext;
}