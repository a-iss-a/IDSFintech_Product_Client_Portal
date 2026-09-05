export interface Product {
    id: number;
    name: string;
    description: string | null;
    businessPurpose: string | null;
    lifecycleStatus: string;
    currentVersion: string;
    supportedMarkets: string | null;
    criticality: string | null;
    technologies: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ProductFormData {
    name: string;
    description: string;
    businessPurpose: string;
    lifecycleStatus: string;
    currentVersion: string;
    supportedMarkets: string;
    criticality: string;
    technologies: string;
    notes: string;
}