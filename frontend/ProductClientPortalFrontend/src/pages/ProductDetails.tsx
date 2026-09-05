import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { getProducts } from "../services/ProductService";
import type { Product } from "../types/ProductType";
import {
    getModules,
    deleteModule,
} from "../services/ModuleService";
import type { Module } from "../types/ModuleType";
import {
    getRepositories,
    deleteRepository,
} from "../services/RepositoryService";
import type { Repository } from "../types/RepositoryType";
import {
    getDocuments,
    deleteDocument,
} from "../services/DocumentService";
import type { Document } from "../types/DocumentType";

import { getTeamMembers } from "../services/TeamMemberService";
import type { TeamMember } from "../types/TeamMemberType";

import {
    getProductResponsibilities,
} from "../services/ProductResponsibilityService";
import type { ProductResponsibility } from "../types/ProductResponsibilityType";

const BACKEND_ORIGIN = "http://localhost:5120";

const resolveDocumentUrl = (reference: string): string =>
    reference.startsWith("/") ? `${BACKEND_ORIGIN}${reference}` : reference;

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [modules, setModules] = useState<Module[]>([]);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [repository, setRepository] = useState<Repository | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);

    const [deleteModuleId, setDeleteModuleId] = useState<number | null>(null);
    const [deleteRepositoryId, setDeleteRepositoryId] = useState<number | null>(null);
    const [deleteDocumentId, setDeleteDocumentId] = useState<number | null>(null);

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [responsibilities, setResponsibilities] = useState<
    ProductResponsibility[]
        >([]);
    const [currentResponsibilityIndex, setCurrentResponsibilityIndex] =
    useState(0);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const products = await getProducts();

                const foundProduct = products.find(
                    (product) => product.id === Number(id)
                );

                setProduct(foundProduct || null);

                const allModules = await getModules();

                const productModules = allModules.filter(
                    (module) => module.productId === Number(id)
                );

                setModules(productModules);
                setCurrentModuleIndex(0);

                const allRepositories = await getRepositories();

                const foundRepository = allRepositories.find(
                    (repository) => repository.productId === Number(id)
                );

                setRepository(foundRepository || null);

                const allDocuments = await getDocuments();

                const productDocuments = allDocuments.filter(
                    (document) => document.productId === Number(id)
                );

                setDocuments(productDocuments);
                setCurrentDocumentIndex(0);

                const allTeamMembers = await getTeamMembers();

const allResponsibilities =
    await getProductResponsibilities();

const productResponsibilities = allResponsibilities.filter(
    (responsibility) =>
        responsibility.productId === Number(id)
);

setTeamMembers(allTeamMembers);
setResponsibilities(productResponsibilities);
setCurrentResponsibilityIndex(0);
            } catch (error) {
                console.error("Failed to load product:", error);
            }
        };

        loadProduct();
    }, [id]);

    const currentModule = modules[currentModuleIndex];
    const currentDocument = documents[currentDocumentIndex];

    const currentResponsibility =
    responsibilities[currentResponsibilityIndex];

const getTeamMemberName = (teamMemberId: number) => {
    const teamMember = teamMembers.find(
        (member) => member.id === teamMemberId
    );

    return teamMember?.name ?? "Unknown Team Member";
};

    const handlePreviousModule = () => {
        if (currentModuleIndex > 0) {
            setCurrentModuleIndex((currentIndex) => currentIndex - 1);
        }
    };

    const handleNextModule = () => {
        if (currentModuleIndex < modules.length - 1) {
            setCurrentModuleIndex((currentIndex) => currentIndex + 1);
        }
    };

    const handlePreviousDocument = () => {
        if (currentDocumentIndex > 0) {
            setCurrentDocumentIndex((currentIndex) => currentIndex - 1);
        }
    };

    const handleNextDocument = () => {
        if (currentDocumentIndex < documents.length - 1) {
            setCurrentDocumentIndex((currentIndex) => currentIndex + 1);
        }
    };

    const handleDeleteModule = async () => {
        if (deleteModuleId === null) {
            return;
        }

        try {
            await deleteModule(deleteModuleId);

            const updatedModules = modules.filter(
                (module) => module.id !== deleteModuleId
            );

            setModules(updatedModules);
            setDeleteModuleId(null);

            if (currentModuleIndex >= updatedModules.length) {
                setCurrentModuleIndex(
                    Math.max(0, updatedModules.length - 1)
                );
            }
        } catch (error) {
            console.error("Failed to delete module:", error);
        }
    };

    const handleDeleteRepository = async () => {
        if (deleteRepositoryId === null) {
            return;
        }

        try {
            await deleteRepository(deleteRepositoryId);

            setRepository(null);
            setDeleteRepositoryId(null);
        } catch (error) {
            console.error("Failed to delete repository:", error);
        }
    };

    const handleDeleteDocument = async () => {
        if (deleteDocumentId === null) {
            return;
        }

        try {
            await deleteDocument(deleteDocumentId);

            const updatedDocuments = documents.filter(
                (document) => document.id !== deleteDocumentId
            );

            setDocuments(updatedDocuments);
            setDeleteDocumentId(null);

            if (currentDocumentIndex >= updatedDocuments.length) {
                setCurrentDocumentIndex(
                    Math.max(0, updatedDocuments.length - 1)
                );
            }
        } catch (error) {
            console.error("Failed to delete document:", error);
        }
    };

    if (!product) {
        return (
            <div className="product-details-page">
                <p>Product not found.</p>

                <button onClick={() => navigate("/products")}>
                    Back to Products
                </button>
            </div>
        );
    }

    const handlePreviousResponsibility = () => {
    if (currentResponsibilityIndex > 0) {
        setCurrentResponsibilityIndex(
            (currentIndex) => currentIndex - 1
        );
    }
};

const handleNextResponsibility = () => {
    if (
        currentResponsibilityIndex <
        responsibilities.length - 1
    ) {
        setCurrentResponsibilityIndex(
            (currentIndex) => currentIndex + 1
        );
    }
};
return (
        <div className="product-details-page">
            <div className="product-details-header">
                <div>
                    <h1>{product.name}</h1>
                    <p>Product Details</p>
                </div>

                <button onClick={() => navigate("/products")}>
                    Back to Products
                </button>
            </div>

            <div className="product-details-card">
                <div className="product-details-title">
                    <h2>Basic Information</h2>

                    <span className="product-details-status">
                        {product.lifecycleStatus}
                    </span>
                </div>

                <div className="product-details-grid">
                    <div>
                        <label>Version</label>
                        <p>{product.currentVersion}</p>
                    </div>

                    <div>
                        <label>Criticality</label>
                        <p>{product.criticality || "N/A"}</p>
                    </div>

                    <div>
                        <label>Supported Markets</label>
                        <p>{product.supportedMarkets || "N/A"}</p>
                    </div>

                    <div>
                        <label>Technologies</label>
                        <p>{product.technologies || "N/A"}</p>
                    </div>
                </div>

                <div className="product-details-field">
                    <label>Description</label>
                    <p>
                        {product.description ||
                            "No description available."}
                    </p>
                </div>

                <div className="product-details-field">
                    <label>Business Purpose</label>
                    <p>
                        {product.businessPurpose ||
                            "No business purpose available."}
                    </p>
                </div>

                <div className="product-details-field">
                    <label>Notes</label>
                    <p>{product.notes || "No notes available."}</p>
                </div>
            </div>

            <div className="product-details-card">
    <div className="product-details-title">
        <div>
            <h2>Product Team & Roles</h2>
        </div>
    </div>

    {responsibilities.length === 0 ? (
        <div className="empty-state">
            No team members assigned to this product.
        </div>
    ) : (
        <div className="product-responsibilities-section">
            <div className="responsibility-navigation">
                <button
                    className="module-navigation-button"
                    onClick={handlePreviousResponsibility}
                    disabled={currentResponsibilityIndex === 0}
                >
                    Previous
                </button>

                <span className="module-counter">
                    Team Member{" "}
                    {currentResponsibilityIndex + 1} of{" "}
                    {responsibilities.length}
                </span>

                <button
                    className="module-navigation-button"
                    onClick={handleNextResponsibility}
                    disabled={
                        currentResponsibilityIndex ===
                        responsibilities.length - 1
                    }
                >
                    Next
                </button>
            </div>

            {currentResponsibility && (
                <div className="product-responsibility-card">
                    <div className="product-responsibility-card-header">
                        <h3>
                            {getTeamMemberName(
                                currentResponsibility.teamMemberId
                            )}
                        </h3>
                    </div>

                    <div className="product-responsibility-field">
                        <label>Responsibility</label>

                        <p>
                            {
                                currentResponsibility.responsibility
                            }
                        </p>
                    </div>

                    <div className="product-responsibility-field">
                        <label>Description</label>

                        <p>
                            {currentResponsibility.description ||
                                "No description available."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )}
</div>
<div className="product-details-card">
                <div className="product-details-title">
                    <h2>Modules</h2>

                    <button
                        className="add-module-button"
                        onClick={() =>
                            navigate(`/products/${id}/modules/new`)
                        }
                    >
                        Add Module
                    </button>
                </div>

                {modules.length === 0 ? (
                    <div className="empty-state">
                        No module available for this product.
                    </div>
                ) : (
                    <div className="modules-section">
                        <div className="module-navigation">
                            <button
                                className="module-navigation-button"
                                onClick={handlePreviousModule}
                                disabled={currentModuleIndex === 0}
                            >
                                Previous
                            </button>

                            <span className="module-counter">
                                Module {currentModuleIndex + 1} of{" "}
                                {modules.length}
                            </span>

                            <button
                                className="module-navigation-button"
                                onClick={handleNextModule}
                                disabled={
                                    currentModuleIndex ===
                                    modules.length - 1
                                }
                            >
                                Next
                            </button>
                        </div>

                        {currentModule && (
                            <div className="module-card">
                                <div className="module-card-header">
                                    <h3>{currentModule.name}</h3>

                                    <span className="module-status">
                                        {currentModule.status}
                                    </span>
                                </div>

                                <p>
                                    {currentModule.description ||
                                        "No description available."}
                                </p>

                                <div className="module-card-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            navigate(
                                                `/products/${id}/modules/${currentModule.id}/edit`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            setDeleteModuleId(
                                                currentModule.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
<div className="product-details-card">
                <div className="product-details-title">
                    <h2>Repository</h2>

                    {!repository && (
                        <button
                            className="add-module-button"
                            onClick={() =>
                                navigate(
                                    `/products/${id}/repository/new`
                                )
                            }
                        >
                            Add Repository
                        </button>
                    )}
                </div>

                {!repository ? (
                    <div className="empty-state">
                        No repository available for this product.
                    </div>
                ) : (
                    <div className="repository-card">
                        <div className="repository-card-header">
                            <h3>{repository.name}</h3>

                            <span className="repository-branch">
                                {repository.mainBranch}
                            </span>
                        </div>

                        <div className="repository-field">
                            <label>GitHub URL</label>

                            <a
                                href={repository.gitHubURL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {repository.gitHubURL}
                            </a>
                        </div>

                        <div className="repository-field">
                            <label>Description</label>

                            <p>
                                {repository.description ||
                                    "No description available."}
                            </p>
                        </div>

                        <div className="module-card-actions">
                            <button
                                className="edit-button"
                                onClick={() =>
                                    navigate(
                                        `/products/${id}/repository/${repository.id}/edit`
                                    )
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="delete-button"
                                onClick={() =>
                                    setDeleteRepositoryId(repository.id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
<div className="product-details-card">
                <div className="product-details-title">
                    <h2>Documentation</h2>

                    <button
                        className="add-module-button"
                        onClick={() =>
                            navigate(`/products/${id}/documents/new`)
                        }
                    >
                        Add Document
                    </button>
                </div>

                {documents.length === 0 ? (
                    <div className="empty-state">
                        No documentation available for this product.
                    </div>
                ) : (
                    <div className="modules-section">
                        <div className="module-navigation">
                            <button
                                className="module-navigation-button"
                                onClick={handlePreviousDocument}
                                disabled={currentDocumentIndex === 0}
                            >
                                Previous
                            </button>

                            <span className="module-counter">
                                Document {currentDocumentIndex + 1} of{" "}
                                {documents.length}
                            </span>

                            <button
                                className="module-navigation-button"
                                onClick={handleNextDocument}
                                disabled={
                                    currentDocumentIndex ===
                                    documents.length - 1
                                }
                            >
                                Next
                            </button>
                        </div>

                        {currentDocument && (
                            <div className="document-card">
                                <div className="document-card-header">
                                    <h3>{currentDocument.name}</h3>

                                    <span className="document-type">
                                        {currentDocument.documentType ||
                                            "Document"}
                                    </span>
                                </div>

                                <div className="document-field">
                                    <label>Description</label>

                                    <p>
                                        {currentDocument.description ||
                                            "No description available."}
                                    </p>
                                </div>

                                <div className="document-details">
                                    <div className="document-field">
                                        <label>Last Updated</label>

                                        <p>
                                            {currentDocument.lastUpdatedDate
                                                ? new Date(
                                                      currentDocument.lastUpdatedDate
                                                  ).toLocaleDateString()
                                                : "N/A"}
                                        </p>
                                    </div>

                                    <div className="document-field">
                                        <label>Reference</label>

                                        {currentDocument.urlOrFileReference ? (
                                            <a
                                                href={
                                                    resolveDocumentUrl(
                                                        currentDocument.urlOrFileReference
                                                    )
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Open Document
                                            </a>
                                        ) : (
                                            <p>N/A</p>
                                        )}
                                    </div>
                                </div>

                                <div className="module-card-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            navigate(
                                                `/products/${id}/documents/${currentDocument.id}/edit`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            setDeleteDocumentId(
                                                currentDocument.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
{deleteModuleId !== null && (
                <div className="delete-popup">
                    <div className="delete-popup-content">
                        <h3>Delete Module</h3>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>
                                {
                                    modules.find(
                                        (module) =>
                                            module.id === deleteModuleId
                                    )?.name
                                }
                            </strong>
                            ?
                        </p>

                        <div className="delete-popup-actions">
                            <button
                                className="cancel-delete-button"
                                onClick={() =>
                                    setDeleteModuleId(null)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-delete-button"
                                onClick={handleDeleteModule}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteRepositoryId !== null && (
                <div className="delete-popup">
                    <div className="delete-popup-content">
                        <h3>Delete Repository</h3>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>{repository?.name}</strong>?
                        </p>

                        <div className="delete-popup-actions">
                            <button
                                className="cancel-delete-button"
                                onClick={() =>
                                    setDeleteRepositoryId(null)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-delete-button"
                                onClick={handleDeleteRepository}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteDocumentId !== null && (
                <div className="delete-popup">
                    <div className="delete-popup-content">
                        <h3>Delete Document</h3>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>
                                {
                                    documents.find(
                                        (document) =>
                                            document.id === deleteDocumentId
                                    )?.name
                                }
                            </strong>
                            ?
                        </p>

                        <div className="delete-popup-actions">
                            <button
                                className="cancel-delete-button"
                                onClick={() =>
                                    setDeleteDocumentId(null)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-delete-button"
                                onClick={handleDeleteDocument}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;