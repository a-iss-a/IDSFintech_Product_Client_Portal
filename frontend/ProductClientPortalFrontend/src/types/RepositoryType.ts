export interface Repository {
    id: number;
    productId: number;
    name: string;
    gitHubURL: string;
    mainBranch: string;
    description: string | null;
}

export interface RepositoryFormData {
    name: string;
    gitHubURL: string;
    mainBranch: string;
    description: string;
}