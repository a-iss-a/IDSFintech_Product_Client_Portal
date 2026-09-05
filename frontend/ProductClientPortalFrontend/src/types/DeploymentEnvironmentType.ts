import type { Deployment } from "./DeploymentType";

export interface DeploymentEnvironment {
    id: number;
    deploymentId: number;
    name: string;
    type: string;
    purpose: string | null;
    serverName: string | null;
    operatingSystem: string | null;
    applicationUrl: string | null;
    databaseInformation: string | null;
    monitoringLink: string | null;
    accessInstructions: string | null;
    notes: string | null;
}

export interface DeploymentEnvironmentFormData {
    deploymentId: number;
    name: string;
    type: string;
    purpose: string;
    serverName: string;
    operatingSystem: string;
    applicationUrl: string;
    databaseInformation: string;
    monitoringLink: string;
    accessInstructions: string;
    notes: string;
    deployment: Deployment;
}