export interface Module {
    id: number;
    productId: number;
    name: string;
    description: string | null;
    status: string;
}

export interface ModuleFormData {
    name: string;
    description: string;
    status: string;
}