import api from "./api";
import type {
    DeploymentEnvironment,
    DeploymentEnvironmentFormData,
} from "../types/DeploymentEnvironmentType";

export const getDeploymentEnvironments =
    async (): Promise<DeploymentEnvironment[]> => {
        const response = await api.get(
            "/DeploymentEnvironment"
        );

        return response.data.environment;
    };

export const getDeploymentEnvironment = async (
    id: number
): Promise<DeploymentEnvironment | null> => {
    const response = await api.get(
        `/DeploymentEnvironment/${id}`
    );

    return response.data.environment;
};

export const addDeploymentEnvironment = async (
    environment: DeploymentEnvironmentFormData
) => {
    const response = await api.post(
        "/DeploymentEnvironment/Add",
        environment
    );

    return response.data;
};

export const updateDeploymentEnvironment = async (
    id: number,
    environment: DeploymentEnvironmentFormData
) => {
    const response = await api.put(
        `/DeploymentEnvironment/${id}`,
        {
            id,
            ...environment,
        }
    );

    return response.data;
};

export const deleteDeploymentEnvironment = async (
    id: number
) => {
    await api.delete(`/DeploymentEnvironment/${id}`);
};