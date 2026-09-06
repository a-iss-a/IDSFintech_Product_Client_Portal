import api from "./api";
import type { User } from "../types/UserType";

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get("/User");

    return response.data.users;
};

export const getUser = async (id: number): Promise<User> => {
    const response = await api.get(`/User/${id}`);

    return response.data.user;
};

export const addUser = async (user: User) => {
    const response = await api.post("/User/Add", user);

    return response.data;
};

export const updateUser = async (id: number, user: User) => {
    const response = await api.put(`/User/${id}`, user);

    return response.data;
};

export const deleteUser = async (id: number) => {
    await api.delete(`/User/${id}`);
};