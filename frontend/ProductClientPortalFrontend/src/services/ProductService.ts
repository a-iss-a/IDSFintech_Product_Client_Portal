import api from "./api";

import type { Product } from "../types/ProductType";
import type { ProductFormData } from "../types/ProductType";

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get("/Product");

    return response.data.products;
};

export const addProduct = async (product: ProductFormData) => {
    const now = new Date().toISOString();

    const response = await api.post("/Product/Add", {
        ...product,
        createdAt: now,
        updatedAt: now,
    });

    return response.data;
};

export const updateProduct = async (
    id: number,
    product: ProductFormData
) => {
    const now = new Date().toISOString();

    const response = await api.put(`/Product/${id}`, {
        id,
        ...product,
        createdAt: now,
        updatedAt: now,
    });

    return response.data;
};

export const deleteProduct = async (id: number) => {
    await api.delete(`/Product/${id}`);
};