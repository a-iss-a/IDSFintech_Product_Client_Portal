export interface Document {
    id: number;
    productId: number;
    name: string;
    documentType: string | null;
    description: string | null;
    urlOrFileReference: string | null;
    lastUpdatedDate: string | null;
}

export interface DocumentFormData {
    name: string;
    documentType: string;
    description: string;
    urlOrFileReference: string;
    lastUpdatedDate: string;
}