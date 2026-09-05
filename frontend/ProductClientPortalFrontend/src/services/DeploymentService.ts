import api from "./api";
import type {
    Deployment,
    DeploymentFormData,
} from "../types/DeploymentType";

export const getDeployments = async (): Promise<Deployment[]> => {
    const response = await api.get("/Deployment");
    return response.data.deployments;
};

export const getDeployment = async (
    id: number
): Promise<Deployment | null> => {
    const response = await api.get(`/Deployment/${id}`);
    return response.data.deployment;
};

export const addDeployment = async (
    deployment: DeploymentFormData
) => {
    const response = await api.post(
        "/Deployment/Add",
        deployment
    );

    return response.data;
};

export const updateDeployment = async (
    id: number,
    deployment: DeploymentFormData
) => {
    const response = await api.put(
        `/Deployment/${id}`,
        {
            id,
            ...deployment,
        }
    );

    return response.data;
};

export const deleteDeployment = async (id: number) => {
    await api.delete(`/Deployment/${id}`);
};