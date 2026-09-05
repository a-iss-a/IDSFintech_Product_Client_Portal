export type UserRole = "User" | "Admin";

export interface AuthUser {
    id: number,
    email: string,
    role: UserRole
}

