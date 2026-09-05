import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {

    children: ReactNode;
    role?: "User" | "Admin";
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
    const { user } = useAuth();

    if(!user)
        return <Navigate to="/" replace />;
    else {
        if( role && user.role !== role){
            const path = user.role === "Admin" ? "/admin/dashboard" : "/dashboard";
            return <Navigate to={path} replace />;
        } 
    }

    return <>{children}</>
};

export default ProtectedRoute;