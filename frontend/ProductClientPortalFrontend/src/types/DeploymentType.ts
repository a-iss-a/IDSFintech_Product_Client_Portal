import type { Client } from "./ClientType";
import type { Product } from "./ProductType";

export interface Deployment {
    id: number;
    clientId: number;
    productId: number;
    productVersion: string;
    goLiveDate: string | null;
    deploymentStatus: string;
    supportTier: string;
    clientSpecificNotes: string | null;
}

export interface DeploymentFormData {
    clientId: number;
    productId: number;
    productVersion: string;
    goLiveDate: string | null;
    deploymentStatus: string;
    supportTier: string;
    clientSpecificNotes: string;
    client: Client;
    product: Product;
}