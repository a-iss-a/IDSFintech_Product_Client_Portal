import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DocumentForm.css";
import {
    addDocument,
    getDocument,
    updateDocument,
} from "../services/DocumentService";
import { getProducts } from "../services/ProductService";
import type { DocumentFormData } from "../types/DocumentType";

const DocumentForm = () => {
    const { productId, id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<DocumentFormData>({
        name: "",
        documentType: "",
        description: "",
        urlOrFileReference: "",
        lastUpdatedDate: new Date().toISOString().slice(0, 10),
    });

    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const loadDocument = async () => {
            try {
                const document = await getDocument(Number(id));

                if (!document || document.id !== Number(id)) {
                    setError("Document not found.");
                    return;
                }

                setFormData({
                    name: document.name,
                    documentType: document.documentType || "",
                    description: document.description || "",
                    urlOrFileReference:
                        document.urlOrFileReference || "",
                    lastUpdatedDate: document.lastUpdatedDate
                        ? document.lastUpdatedDate.slice(0, 10)
                        : new Date().toISOString().slice(0, 10),
                });
            } catch (error) {
                console.error("Failed to load document:", error);
                setError("Failed to load document.");
            } finally {
                setLoading(false);
            }
        };

        loadDocument();
    }, [id, isEditMode]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            setSelectedFile(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    const existingFileName = formData.urlOrFileReference
        ? formData.urlOrFileReference.split("/").pop()
        : "";

    const uploadLabel = selectedFile
        ? "Replace Document"
        : existingFileName
        ? "Replace Document"
        : "Choose File";

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setError("");

        try {
            const products = await getProducts();

            const product = products.find(
                (product) => product.id === Number(productId)
            );

            if (!product) {
                setError("Product not found.");
                return;
            }

            if (isEditMode) {
                await updateDocument(
                    Number(id),
                    Number(productId),
                    formData,
                    selectedFile
                );
            } else {
                await addDocument(
                    Number(productId),
                    formData,
                    selectedFile
                );
            }

            navigate(`/products/${productId}`);
        } catch (error) {
            console.error("Failed to save document:", error);
            setError("Failed to save document.");
        }
    };

    if (loading) {
        return (
            <div className="document-form-page">
                <p>Loading document...</p>
            </div>
        );
    }

    return (
        <div className="document-form-page">
            <div className="document-form-header">
                <div>
                    <h1>
                        {isEditMode
                            ? "Edit Document"
                            : "Add New Document"}
                    </h1>

                    <p>
                        {isEditMode
                            ? "Update document information"
                            : "Add a new document to this product"}
                    </p>
                </div>
            </div>

            {error && (
                <div className="document-form-error">
                    {error}
                </div>
            )}

            <form
                className="document-form"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label htmlFor="name">
                        Document Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="documentType">
                        Document Type
                    </label>

                    <input
                        id="documentType"
                        name="documentType"
                        type="text"
                        value={formData.documentType}
                        onChange={handleChange}
                    />
                </div>
<div className="form-group form-group-full">
                    <label htmlFor="documentFile">
                        Upload Document
                    </label>

                    <div className="document-upload">
                        <input
                            id="documentFile"
                            name="documentFile"
                            type="file"
                            className="document-upload-input"
                            onChange={handleFileChange}
                        />

                        <label
                            htmlFor="documentFile"
                            className="document-upload-button"
                        >
                            <span className="document-upload-icon">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                            </span>
                            <span>{uploadLabel}</span>
                        </label>

                        {(selectedFile || existingFileName) && (
                            <div className="document-upload-info">
                                <span className="document-upload-file-icon">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </span>

                                <span className="document-upload-name">
                                    {selectedFile
                                        ? selectedFile.name
                                        : existingFileName}
                                </span>

                                {selectedFile && (
                                    <button
                                        type="button"
                                        className="document-upload-remove"
                                        onClick={handleRemoveFile}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        )}

                        <span className="document-upload-hint">
                            PDF, DOC, or other files up to 10 MB
                        </span>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="lastUpdatedDate">
                        Last Updated Date
                    </label>

                    <input
                        id="lastUpdatedDate"
                        name="lastUpdatedDate"
                        type="date"
                        value={formData.lastUpdatedDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group form-group-full">
                    <label htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                    />
                </div>

                <div className="document-form-actions">
                    <button
                        type="button"
                        className="document-form-cancel"
                        onClick={() =>
                            navigate(`/products/${productId}`)
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="document-form-submit"
                    >
                        {isEditMode
                            ? "Save Changes"
                            : "Add Document"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DocumentForm;