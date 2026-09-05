import api from "./api";
import type {
    Repository,
    RepositoryFormData,
} from "../types/RepositoryType";
import type { Product } from "../types/ProductType";

export const getRepositories = async (): Promise<Repository[]> => {
    const response = await api.get("/CodeRepo");

    return response.data.repositories;
};

export const getRepositoriesByProduct = async (
    productId: number
): Promise<Repository | null> => {
    const response = await api.get(`/CodeRepo/product/${productId}`);

    return response.data.repositories;
};

export const getRepository = async (
    id: number
): Promise<Repository | null> => {
    const response = await api.get(`/CodeRepo/${id}`);

    return response.data.repository;
};

export const addRepository = async (
    productId: number,
    repository: RepositoryFormData,
    product: Product
) => {
    const response = await api.post("/CodeRepo/Add", {
        productId,
        ...repository,
        product,
    });

    return response.data;
};

export const updateRepository = async (
    id: number,
    productId: number,
    repository: RepositoryFormData,
    product: Product
) => {
    const response = await api.put(`/CodeRepo/${id}`, {
        id,
        productId,
        ...repository,
        product,
    });

    return response.data;
};

export const deleteRepository = async (id: number) => {
    await api.delete(`/CodeRepo/${id}`);
};