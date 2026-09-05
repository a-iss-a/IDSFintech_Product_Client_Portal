import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Client } from "../types/ClientType";
import type { Product } from "../types/ProductType";
import type {
    DeploymentFormData,
} from "../types/DeploymentType";
import { getClients } from "../services/ClientService";
import { getProducts } from "../services/ProductService";
import {
    getDeployment,
    addDeployment,
    updateDeployment,
} from "../services/DeploymentService";
import "./DeploymentForm.css";

const DeploymentForm = () => {
    const navigate = useNavigate();

    const { id } = useParams<{
        id: string;
    }>();

    const isEditMode = Boolean(id);

    const [clients, setClients] = useState<Client[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [formData, setFormData] = useState({
        clientId: 0,
        productId: 0,
        productVersion: "",
        goLiveDate: "",
        deploymentStatus: "",
        supportTier: "",
        clientSpecificNotes: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    clientData,
                    productData,
                ] = await Promise.all([
                    getClients(),
                    getProducts(),
                ]);

                setClients(clientData);
                setProducts(productData);

                if (isEditMode && id) {
                    const deployment =
                        await getDeployment(Number(id));

                    if (deployment) {
                        setFormData({
                            clientId:
                                deployment.clientId,
                            productId:
                                deployment.productId,
                            productVersion:
                                deployment.productVersion,
                            goLiveDate:
                                deployment.goLiveDate
                                    ? deployment.goLiveDate.substring(
                                          0,
                                          10
                                      )
                                    : "",
                            deploymentStatus:
                                deployment.deploymentStatus,
                            supportTier:
                                deployment.supportTier,
                            clientSpecificNotes:
                                deployment.clientSpecificNotes ??
                                "",
                        });
                    }
                }
            } catch (error) {
                console.error(
                    "Failed to load deployment form:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, isEditMode]);

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
            [name]:
                name === "clientId" ||
                name === "productId"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        if (!formData.clientId) {
            return;
        }

        if (!formData.productId) {
            return;
        }

        if (!formData.productVersion.trim()) {
            return;
        }

        if (!formData.deploymentStatus) {
            return;
        }

        if (!formData.supportTier) {
            return;
        }

        const selectedClient = clients.find(
            (client) => client.id === formData.clientId
        );

        const selectedProduct = products.find(
            (product) => product.id === formData.productId
        );

        if (!selectedClient || !selectedProduct) {
            return;
        }

        const deploymentData: DeploymentFormData = {
            clientId: formData.clientId,
            productId: formData.productId,
            productVersion: formData.productVersion,
            goLiveDate: formData.goLiveDate
                ? formData.goLiveDate
                : null,
            deploymentStatus:
                formData.deploymentStatus,
            supportTier: formData.supportTier,
            clientSpecificNotes:
                formData.clientSpecificNotes,
            client: selectedClient,
            product: selectedProduct,
        };

        try {
            setSaving(true);

            if (isEditMode && id) {
                await updateDeployment(
                    Number(id),
                    deploymentData
                );

                navigate(`/deployments/${id}`);
            } else {
                await addDeployment(deploymentData);

                navigate("/deployments");
            }
        } catch (error) {
            console.error(
                "Failed to save deployment:",
                error
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="deployment-form-page">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="deployment-form-page">
            <div className="deployment-form-header">
                <button
                    className="back-button"
                    onClick={() =>
                        navigate(
                            isEditMode && id
                                ? `/deployments/${id}`
                                : "/deployments"
                        )
                    }
                >
                    ← Back
                </button>

                <h1>
                    {isEditMode
                        ? "Edit Deployment"
                        : "Add Deployment"}
                </h1>
            </div>

            <form
                className="deployment-form"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label htmlFor="clientId">
                        Client
                    </label>

                    <select
                        id="clientId"
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleChange}
                        required
                    >
                        <option value={0} disabled>
                            Select a client
                        </option>

                        {clients.map((client) => (
                            <option
                                key={client.id}
                                value={client.id}
                            >
                                {client.companyName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="productId">
                        Product
                    </label>

                    <select
                        id="productId"
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        required
                    >
                        <option value={0} disabled>
                            Select a product
                        </option>

                        {products.map((product) => (
                            <option
                                key={product.id}
                                value={product.id}
                            >
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="productVersion">
                        Product Version
                    </label>

                    <input
                        id="productVersion"
                        name="productVersion"
                        type="text"
                        value={formData.productVersion}
                        onChange={handleChange}
                        placeholder="e.g. 2.5.1"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="goLiveDate">
                        Go-Live Date
                    </label>

                    <input
                        id="goLiveDate"
                        name="goLiveDate"
                        type="date"
                        value={formData.goLiveDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="deploymentStatus">
                        Deployment Status
                    </label>

                    <select
                        id="deploymentStatus"
                        name="deploymentStatus"
                        value={
                            formData.deploymentStatus
                        }
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select status
                        </option>
                        <option value="Active">
                            Active
                        </option>
                        <option value="Maintenance">
                            Maintenance
                        </option>
                        <option value="Planned">
                            Planned
                        </option>
                        <option value="Inactive">
                            Inactive
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="supportTier">
                        Support Tier
                    </label>

                    <select
                        id="supportTier"
                        name="supportTier"
                        value={formData.supportTier}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select support tier
                        </option>
                        <option value="Tier 1">
                            Tier 1
                        </option>
                        <option value="Tier 2">
                            Tier 2
                        </option>
                        <option value="Tier 3">
                            Tier 3
                        </option>
                    </select>
                </div>

                <div className="form-group full-width">
                    <label htmlFor="clientSpecificNotes">
                        Client-Specific Notes
                    </label>

                    <textarea
                        id="clientSpecificNotes"
                        name="clientSpecificNotes"
                        value={
                            formData.clientSpecificNotes
                        }
                        onChange={handleChange}
                        placeholder="Add any client-specific deployment notes..."
                        rows={5}
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() =>
                            navigate(
                                isEditMode && id
                                    ? `/deployments/${id}`
                                    : "/deployments"
                            )
                        }
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
                            ? "Update Deployment"
                            : "Add Deployment"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeploymentForm;