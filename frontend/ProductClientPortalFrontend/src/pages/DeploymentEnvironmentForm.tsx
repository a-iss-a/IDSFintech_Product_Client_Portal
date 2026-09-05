import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Deployment } from "../types/DeploymentType";
import type {
    DeploymentEnvironmentFormData,
} from "../types/DeploymentEnvironmentType";
import {
    getDeployment,
} from "../services/DeploymentService";
import {
    getDeploymentEnvironment,
    addDeploymentEnvironment,
    updateDeploymentEnvironment,
} from "../services/DeploymentEnvironmentService";
import "./DeploymentEnvironmentForm.css";
import { getClients } from "../services/ClientService";
import type { Client } from "../types/ClientType";
import { getProducts } from "../services/ProductService";
import type { Product } from "../types/ProductType";

const DeploymentEnvironmentForm = () => {
    const navigate = useNavigate();

    const { id, environmentId } = useParams<{
        id: string;
        environmentId: string;
    }>();

    const isEditMode = Boolean(environmentId);

    const [deployment, setDeployment] =
        useState<Deployment | null>(null);

    const [client, setClient] =
        useState<Client | null>(null);

    const [product, setProduct] =
        useState<Product | null>(null);

    const [formData, setFormData] = useState({
        deploymentId: Number(id),
        name: "",
        type: "",
        purpose: "",
        serverName: "",
        operatingSystem: "",
        applicationUrl: "",
        databaseInformation: "",
        monitoringLink: "",
        accessInstructions: "",
        notes: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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
                ] = await Promise.all([
                    getDeployment(Number(id)),
                    getClients(),
                    getProducts(),
                ]);

                setDeployment(deploymentData);

                if (deploymentData) {
                    const deploymentClient =
                        clientData.find(
                            (currentClient) =>
                                currentClient.id ===
                                deploymentData.clientId
                        );

                    const deploymentProduct =
                        productData.find(
                            (currentProduct) =>
                                currentProduct.id ===
                                deploymentData.productId
                        );

                    setClient(
                        deploymentClient ?? null
                    );

                    setProduct(
                        deploymentProduct ?? null
                    );
                }

                if (isEditMode && environmentId) {
                    const environment =
                        await getDeploymentEnvironment(
                            Number(environmentId)
                        );

                    if (environment) {
                        setFormData({
                            deploymentId:
                                environment.deploymentId,
                            name: environment.name,
                            type: environment.type,
                            purpose:
                                environment.purpose ?? "",
                            serverName:
                                environment.serverName ?? "",
                            operatingSystem:
                                environment.operatingSystem ??
                                "",
                            applicationUrl:
                                environment.applicationUrl ??
                                "",
                            databaseInformation:
                                environment.databaseInformation ??
                                "",
                            monitoringLink:
                                environment.monitoringLink ??
                                "",
                            accessInstructions:
                                environment.accessInstructions ??
                                "",
                            notes:
                                environment.notes ?? "",
                        });
                    }
                }
            } catch (error) {
                console.error(
                    "Failed to load environment form:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, isEditMode, environmentId]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (
    event: React.FormEvent
) => {
    event.preventDefault();

    if (!formData.name.trim()) {
        return;
    }

    if (!formData.type.trim()) {
        return;
    }

    if (!deployment) {
        return;
    }

    if (!client) {
        return;
    }

    if (!product) {
        return;
    }

    const completeDeployment = {
        ...deployment,
        client,
        product,
    };

    const environmentData: DeploymentEnvironmentFormData = {
        deploymentId: formData.deploymentId,
        name: formData.name,
        type: formData.type,
        purpose: formData.purpose,
        serverName: formData.serverName,
        operatingSystem: formData.operatingSystem,
        applicationUrl: formData.applicationUrl,
        databaseInformation:
            formData.databaseInformation,
        monitoringLink: formData.monitoringLink,
        accessInstructions:
            formData.accessInstructions,
        notes: formData.notes,
        deployment: completeDeployment,
    };

    try {
        setSaving(true);

        if (isEditMode && environmentId) {
            await updateDeploymentEnvironment(
                Number(environmentId),
                environmentData
            );
        } else {
            await addDeploymentEnvironment(
                environmentData
            );
        }

        navigate(`/deployments/${id}`);
    } catch (error) {
        console.error(
            "Failed to save environment:",
            error
        );
    } finally {
        setSaving(false);
    }
};

    const handleBack = () => {
        navigate(`/deployments/${id}`);
    };

    if (loading) {
        return (
            <div className="deployment-environment-form-page">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="deployment-environment-form-page">
            <div className="deployment-environment-form-header">
                <button
                    className="back-button"
                    onClick={handleBack}
                >
                    ← Back to Deployment
                </button>

                <h1>
                    {isEditMode
                        ? "Edit Environment"
                        : "Add Environment"}
                </h1>

                {deployment && (
                    <p className="deployment-environment-form-subtitle">
                        Environment for deployment #
                        {deployment.id}
                    </p>
                )}
            </div>

            <form
                className="deployment-environment-form"
                onSubmit={handleSubmit}
            >
                <div className="form-section">
                    <h2>Environment Information</h2>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">
                                Environment Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Production"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">
                                Environment Type
                            </label>

                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select environment type
                                </option>

                                <option value="Development">
                                    Development
                                </option>

                                <option value="Testing">
                                    Testing
                                </option>

                                <option value="Staging">
                                    Staging
                                </option>

                                <option value="Production">
                                    Production
                                </option>

                                <option value="UAT">
                                    UAT
                                </option>

                                <option value="Demo">
                                    Demo
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="purpose">
                            Purpose
                        </label>

                        <textarea
                            id="purpose"
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                            placeholder="Describe the purpose of this environment..."
                            rows={3}
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Server Information</h2>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="serverName">
                                Server Name
                            </label>

                            <input
                                id="serverName"
                                name="serverName"
                                type="text"
                                value={
                                    formData.serverName
                                }
                                onChange={handleChange}
                                placeholder="e.g. PROD-SERVER-01"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="operatingSystem">
                                Operating System
                            </label>

                            <input
                                id="operatingSystem"
                                name="operatingSystem"
                                type="text"
                                value={
                                    formData.operatingSystem
                                }
                                onChange={handleChange}
                                placeholder="e.g. Windows Server 2022"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>
                        Application & Database
                    </h2>

                    <div className="form-group">
                        <label htmlFor="applicationUrl">
                            Application URL
                        </label>

                        <input
                            id="applicationUrl"
                            name="applicationUrl"
                            type="url"
                            value={
                                formData.applicationUrl
                            }
                            onChange={handleChange}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="databaseInformation">
                            Database Information
                        </label>

                        <textarea
                            id="databaseInformation"
                            name="databaseInformation"
                            value={
                                formData.databaseInformation
                            }
                            onChange={handleChange}
                            placeholder="Database name, server, type, or other relevant information..."
                            rows={4}
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>
                        Monitoring & Access
                    </h2>

                    <div className="form-group">
                        <label htmlFor="monitoringLink">
                            Monitoring Link
                        </label>

                        <input
                            id="monitoringLink"
                            name="monitoringLink"
                            type="url"
                            value={
                                formData.monitoringLink
                            }
                            onChange={handleChange}
                            placeholder="https://monitoring.example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="accessInstructions">
                            Access Instructions
                        </label>

                        <textarea
                            id="accessInstructions"
                            name="accessInstructions"
                            value={
                                formData.accessInstructions
                            }
                            onChange={handleChange}
                            placeholder="Describe how authorized users can access this environment..."
                            rows={4}
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Notes</h2>

                    <div className="form-group">
                        <label htmlFor="notes">
                            Additional Notes
                        </label>

                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Add any additional information..."
                            rows={4}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={handleBack}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : isEditMode
                            ? "Update Environment"
                            : "Add Environment"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeploymentEnvironmentForm;