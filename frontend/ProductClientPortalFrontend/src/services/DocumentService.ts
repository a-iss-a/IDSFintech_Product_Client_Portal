import api from "./api";
import type {
    Document,
    DocumentFormData,
} from "../types/DocumentType";

export const getDocuments = async (): Promise<Document[]> => {
    const response = await api.get("/Document");

    return response.data.documents;
};

export const getDocumentByProduct = async (
    productId: number
): Promise<Document | null> => {
    const response = await api.get(`/Document/product/${productId}`);

    return response.data.document;
};

export const getDocument = async (
    id: number
): Promise<Document | null> => {
    const response = await api.get(`/Document/${id}`);

    return response.data.document;
};

export const addDocument = async (
    productId: number,
    document: DocumentFormData,
    file: File | null
) => {
    const formData = new FormData();
    formData.append("productId", String(productId));
    formData.append("name", document.name);
    formData.append("documentType", document.documentType);
    formData.append("description", document.description);
    formData.append("lastUpdatedDate", document.lastUpdatedDate);

    if (file) {
        formData.append("file", file);
    }

    const response = await api.post("/Document/Upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
};

export const updateDocument = async (
    id: number,
    productId: number,
    document: DocumentFormData,
    file: File | null
) => {
    const formData = new FormData();
    formData.append("productId", String(productId));
    formData.append("name", document.name);
    formData.append("documentType", document.documentType);
    formData.append("description", document.description);
    formData.append("lastUpdatedDate", document.lastUpdatedDate);

    if (file) {
        formData.append("file", file);
    }

    const response = await api.put(`/Document/Upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
};

export const deleteDocument = async (id: number) => {
    await api.delete(`/Document/${id}`);
};