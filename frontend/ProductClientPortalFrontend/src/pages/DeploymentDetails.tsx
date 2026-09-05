import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DeploymentDetails.css";

import {
    getDeployment,
    deleteDeployment,
} from "../services/DeploymentService";

import {
    getDeploymentEnvironments,
    deleteDeploymentEnvironment,
} from "../services/DeploymentEnvironmentService";

import { getClients } from "../services/ClientService";
import { getProducts } from "../services/ProductService";

import type { Deployment } from "../types/DeploymentType";
import type { DeploymentEnvironment } from "../types/DeploymentEnvironmentType";
import type { Client } from "../types/ClientType";
import type { Product } from "../types/ProductType";

const DeploymentDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [deployment, setDeployment] =
        useState<Deployment | null>(null);

    const [clients, setClients] = useState<Client[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [environments, setEnvironments] = useState<
        DeploymentEnvironment[]
    >([]);

    const [currentEnvironmentIndex, setCurrentEnvironmentIndex] =
        useState(0);

    const [deleteEnvironmentId, setDeleteEnvironmentId] =
        useState<number | null>(null);

    const [deleteDeploymentPopup, setDeleteDeploymentPopup] =
        useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (!id) {
                return;
            }

            try {
                const [
                    deploymentData,
                    clientData,
                    productData,
                    allEnvironments,
                ] = await Promise.all([
                    getDeployment(Number(id)),
                    getClients(),
                    getProducts(),
                    getDeploymentEnvironments(),
                ]);

                setDeployment(deploymentData);
                setClients(clientData);
                setProducts(productData);

                const deploymentEnvironments =
                    allEnvironments.filter(
                        (environment) =>
                            environment.deploymentId ===
                            Number(id)
                    );

                setEnvironments(deploymentEnvironments);
                setCurrentEnvironmentIndex(0);
            } catch (error) {
                console.error(
                    "Failed to load deployment details:",
                    error
                );
            }
        };

        loadData();
    }, [id]);

    const getClientName = (clientId: number) => {
        const client = clients.find(
            (client) => client.id === clientId
        );

        return client?.companyName ?? "Unknown Client";
    };

    const getProductName = (productId: number) => {
        const product = products.find(
            (product) => product.id === productId
        );

        return product?.name ?? "Unknown Product";
    };

    const currentEnvironment =
        environments[currentEnvironmentIndex];

    const environmentToDelete = environments.find(
        (environment) =>
            environment.id === deleteEnvironmentId
    );

    const handlePreviousEnvironment = () => {
        if (currentEnvironmentIndex > 0) {
            setCurrentEnvironmentIndex(
                (currentIndex) => currentIndex - 1
            );
        }
    };

    const handleNextEnvironment = () => {
        if (
            currentEnvironmentIndex <
            environments.length - 1
        ) {
            setCurrentEnvironmentIndex(
                (currentIndex) => currentIndex + 1
            );
        }
    };

    const handleDeleteEnvironment = async () => {
        if (deleteEnvironmentId === null) {
            return;
        }

        try {
            await deleteDeploymentEnvironment(
                deleteEnvironmentId
            );

            setEnvironments((currentEnvironments) =>
                currentEnvironments.filter(
                    (environment) =>
                        environment.id !==
                        deleteEnvironmentId
                )
            );

            setCurrentEnvironmentIndex((currentIndex) => {
                if (
                    currentIndex >=
                    environments.length - 1
                ) {
                    return Math.max(
                        0,
                        currentIndex - 1
                    );
                }

                return currentIndex;
            });

            setDeleteEnvironmentId(null);
        } catch (error) {
            console.error(
                "Failed to delete environment:",
                error
            );
        }
    };

    const handleDeleteDeployment = async () => {
        if (!deployment) {
            return;
        }

        try {
            await deleteDeployment(deployment.id);

            navigate("/deployments");
        } catch (error) {
            console.error(
                "Failed to delete deployment:",
                error
            );
        }
    };

    if (!deployment) {
        return (
            <div className="deployment-details-page">
                <p>Deployment not found.</p>
            </div>
        );
    }

    return (
        <div className="deployment-details-page">
            <div className="deployment-details-header">
                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/deployments")
                    }
                >
                    ← Back to Deployments
                </button>

                <div className="deployment-details-heading">
                    <div>
                        <h1>Deployment Details</h1>

                        <p>
                            {getClientName(
                                deployment.clientId
                            )}{" "}
                            —{" "}
                            {getProductName(
                                deployment.productId
                            )}
                        </p>
                    </div>

                    <div className="deployment-details-header-actions">
                        <button
                            className="edit-button"
                            onClick={() =>
                                navigate(
                                    `/deployments/${deployment.id}/edit`
                                )
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="delete-button"
                            onClick={() =>
                                setDeleteDeploymentPopup(
                                    true
                                )
                            }
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="deployment-details-card">
                <div className="deployment-details-title">
                    <h2>Deployment Information</h2>
                </div>

                <div className="deployment-info-grid">
                    <div className="deployment-info-item">
                        <label>Client</label>
                        <p>
                            {getClientName(
                                deployment.clientId
                            )}
                        </p>
                    </div>

                    <div className="deployment-info-item">
                        <label>Product</label>
                        <p>
                            {getProductName(
                                deployment.productId
                            )}
                        </p>
                    </div>

                    <div className="deployment-info-item">
                        <label>Product Version</label>
                        <p>
                            {deployment.productVersion}
                        </p>
                    </div>

                    <div className="deployment-info-item">
                        <label>Go-Live Date</label>
                        <p>
                            {deployment.goLiveDate
                                ? new Date(
                                      deployment.goLiveDate
                                  ).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>

                    <div className="deployment-info-item">
                        <label>Deployment Status</label>
                        <p>
                            {deployment.deploymentStatus}
                        </p>
                    </div>

                    <div className="deployment-info-item">
                        <label>Support Tier</label>
                        <p>
                            {deployment.supportTier}
                        </p>
                    </div>
                </div>

                <div className="deployment-notes-section">
                    <label>Client-Specific Notes</label>

                    <p>
                        {deployment.clientSpecificNotes ||
                            "No client-specific notes available."}
                    </p>
                </div>
            </div>

            <div className="deployment-details-card">
                <div className="deployment-section-header">
                    <div>
                        <h2>Environments</h2>

                        <p className="deployment-section-subtitle">
                            Environments configured for this
                            deployment.
                        </p>
                    </div>

                    <button
                        className="add-environment-button"
                        onClick={() =>
                            navigate(
                                `/deployments/${deployment.id}/environments/new`
                            )
                        }
                    >
                        Add Environment
                    </button>
                </div>

                {environments.length === 0 ? (
                    <div className="empty-environments">
                        No environments configured for this
                        deployment.
                    </div>
                ) : (
                    <div className="environments-section">
                        <div className="environment-navigation">
                            <button
                                className="environment-nav-button"
                                onClick={
                                    handlePreviousEnvironment
                                }
                                disabled={
                                    currentEnvironmentIndex ===
                                    0
                                }
                            >
                                Previous
                            </button>

                            <span className="environment-counter">
                                Environment{" "}
                                {currentEnvironmentIndex + 1}{" "}
                                of {environments.length}
                            </span>

                            <button
                                className="environment-nav-button"
                                onClick={
                                    handleNextEnvironment
                                }
                                disabled={
                                    currentEnvironmentIndex ===
                                    environments.length - 1
                                }
                            >
                                Next
                            </button>
                        </div>

                        {currentEnvironment && (
                            <div className="environment-card">
                                <div className="environment-card-header">
                                    <div>
                                        <h3>
                                            {
                                                currentEnvironment.name
                                            }
                                        </h3>

                                        <span className="environment-type">
                                            {
                                                currentEnvironment.type
                                            }
                                        </span>
                                    </div>

                                    <div className="environment-actions">
                                        <button
                                            className="edit-environment-button"
                                            onClick={() =>
                                                navigate(
                                                    `/deployments/${deployment.id}/environments/${currentEnvironment.id}/edit`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-environment-button"
                                            onClick={() =>
                                                setDeleteEnvironmentId(
                                                    currentEnvironment.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="environment-info-grid">
                                    <div className="environment-info-item">
                                        <label>
                                            Purpose
                                        </label>
                                        <p>
                                            {currentEnvironment.purpose ||
                                                "N/A"}
                                        </p>
                                    </div>

                                    <div className="environment-info-item">
                                        <label>
                                            Server Name
                                        </label>
                                        <p>
                                            {currentEnvironment.serverName ||
                                                "N/A"}
                                        </p>
                                    </div>

                                    <div className="environment-info-item">
                                        <label>
                                            Operating System
                                        </label>
                                        <p>
                                            {currentEnvironment.operatingSystem ||
                                                "N/A"}
                                        </p>
                                    </div>

                                    <div className="environment-info-item">
                                        <label>
                                            Application URL
                                        </label>
                                        <p>
                                            {currentEnvironment.applicationUrl ? (
                                                <a
                                                    href={
                                                        currentEnvironment.applicationUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {
                                                        currentEnvironment.applicationUrl
                                                    }
                                                </a>
                                            ) : (
                                                "N/A"
                                            )}
                                        </p>
                                    </div>

                                    <div className="environment-info-item">
                                        <label>
                                            Database Information
                                        </label>
                                        <p>
                                            {currentEnvironment.databaseInformation ||
                                                "N/A"}
                                        </p>
                                    </div>

                                    <div className="environment-info-item">
                                        <label>
                                            Monitoring Link
                                        </label>
                                        <p>
                                            {currentEnvironment.monitoringLink ? (
                                                <a
                                                    href={
                                                        currentEnvironment.monitoringLink
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {
                                                        currentEnvironment.monitoringLink
                                                    }
                                                </a>
                                            ) : (
                                                "N/A"
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="environment-text-section">
                                    <div>
                                        <label>
                                            Access Instructions
                                        </label>
                                        <p>
                                            {currentEnvironment.accessInstructions ||
                                                "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <label>
                                            Notes
                                        </label>
                                        <p>
                                            {currentEnvironment.notes ||
                                                "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {deleteEnvironmentId !== null && (
                <div className="delete-popup">
                    <div className="delete-popup-content">
                        <h3>Delete Environment</h3>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>
                                {environmentToDelete?.name}
                            </strong>
                            ?
                        </p>

                        <div className="delete-popup-actions">
                            <button
                                className="cancel-delete-button"
                                onClick={() =>
                                    setDeleteEnvironmentId(
                                        null
                                    )
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-delete-button"
                                onClick={
                                    handleDeleteEnvironment
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteDeploymentPopup && (
                <div className="delete-popup">
                    <div className="delete-popup-content">
                        <h3>Delete Deployment</h3>

                        <p>
                            Are you sure you want to delete
                            this deployment?
                        </p>

                        <div className="delete-popup-actions">
                            <button
                                className="cancel-delete-button"
                                onClick={() =>
                                    setDeleteDeploymentPopup(
                                        false
                                    )
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-delete-button"
                                onClick={
                                    handleDeleteDeployment
                                }
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

export default DeploymentDetails;