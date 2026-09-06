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

export const addDepartment = async (
    department: Department
): Promise<void> => {
    await api.post("/Department/Add", department);
};

export const updateDepartment = async (
    id: number,
    department: Department
): Promise<void> => {
    await api.put(`/Department/${id}`, department);
};

export const deleteDepartment = async (
    id: number
): Promise<void> => {
    await api.delete(`/Department/${id}`);
};