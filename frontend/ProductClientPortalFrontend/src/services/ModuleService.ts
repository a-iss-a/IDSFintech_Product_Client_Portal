import api from "./api";
import type {
    Module,
    ModuleFormData,
} from "../types/ModuleType";
import type { Product } from "../types/ProductType";

export const getModules = async (): Promise<Module[]> => {
    const response = await api.get("/Module");

    return response.data.modules;
};

export const getModulesByProduct = async (
    productId: number
): Promise<Module | null> => {
    const response = await api.get(`/Module/product/${productId}`);

    return response.data.modules;
};

export const getModule = async (
    id: number
): Promise<Module | null> => {
    const response = await api.get(`/Module/${id}`);

    return response.data.module;
};

export const addModule = async (
    productId: number,
    module: ModuleFormData,
    product: Product
) => {
    const response = await api.post("/Module/Add", {
        productId,
        ...module,
        product,
    });

    return response.data;
};

export const updateModule = async (
    id: number,
    productId: number,
    module: ModuleFormData,
    product: Product
) => {
    const response = await api.put(`/Module/${id}`, {
        id,
        productId,
        ...module,
        product,
    });

    return response.data;
};

export const deleteModule = async (
    id: number
) => {
    await api.delete(`/Module/${id}`);
};