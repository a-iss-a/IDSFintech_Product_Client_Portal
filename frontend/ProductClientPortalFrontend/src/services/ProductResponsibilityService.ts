import api from "./api";
import type {
    ProductResponsibility,
    ProductResponsibilityFormData,
} from "../types/ProductResponsibilityType";

export const getProductResponsibilities = async (): Promise<ProductResponsibility[]> => {
    const response = await api.get("/ProductResponsibility");
    return response.data.responsibilities;
};

export const getProductResponsibility = async (
    id: number
): Promise<ProductResponsibility | null> => {
    const response = await api.get(`/ProductResponsibility/${id}`);
    return response.data.responsibility;
};

export const addProductResponsibility = async (
    responsibility: ProductResponsibilityFormData
) => {
    const response = await api.post(
        "/ProductResponsibility/Add",
        responsibility
    );

    return response.data;
};

export const updateProductResponsibility = async (
    id: number,
    responsibility: ProductResponsibilityFormData
) => {
    const response = await api.put(
        `/ProductResponsibility/${id}`,
        {
            id,
            ...responsibility,
        }
    );

    return response.data;
};

export const deleteProductResponsibility = async (id: number) => {
    await api.delete(`/ProductResponsibility/${id}`);
};
