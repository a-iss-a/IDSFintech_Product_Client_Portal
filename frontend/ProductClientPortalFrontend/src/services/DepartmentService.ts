import api from "./api";
import type { Department } from "../types/DepartmentType";

export const getDepartments = async (): Promise<Department[]> => {
    const response = await api.get("/Department");
    return response.data.departments;
};

export const getDepartment = async (
    id: number
): Promise<Department | null> => {
    const response = await api.get(`/Department/${id}`);
    return response.data.department;
};

