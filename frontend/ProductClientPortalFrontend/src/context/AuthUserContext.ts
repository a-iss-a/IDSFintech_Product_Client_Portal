import { createContext } from "react";
import type { AuthUser } from "../types/AuthUserType";

export interface AuthContextType {
    user: AuthUser | null,
    login: (email: string, password: string) => Promise<AuthUser>
    logout: () => void
}

export const AuthUserContext = createContext<AuthContextType | null>(null);