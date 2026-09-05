import api from "./api";
import type { Client, ClientFormData } from "../types/ClientType";

export const getClients = async (): Promise<Client[]> => {
    const response = await api.get("/Client");
    return response.data.clients;
};


export const addClient = async (client: ClientFormData) => {
    const response = await api.post("/Client/Add", client);

    return response.data;
};

export const updateClient = async (
    id: number,
    client: ClientFormData
) => {
    const response = await api.put(`/Client/${id}`, {
        id,
        ...client,
    });

    return response.data;
};

export const deleteClient = async (id: number) => {
    await api.delete(`/Client/${id}`);
};