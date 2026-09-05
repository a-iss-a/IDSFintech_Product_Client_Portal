import { useEffect, useState } from "react";
import "./Deployments.css";
import {
    getDeployments,
    deleteDeployment,
} from "../services/DeploymentService";
import type { Deployment } from "../types/DeploymentType";
import { getClients } from "../services/ClientService";
import type { Client } from "../types/ClientType";
import { getProducts } from "../services/ProductService";
import type { Product } from "../types/ProductType";
import { useNavigate } from "react-router-dom";

const Deployments = () => {
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [deleteDeploymentId, setDeleteDeploymentId] = useState<
        number | null
    >(null);

    const [search, setSearch] = useState("");
    const [clientFilter, setClientFilter] = useState("");
    const [productFilter, setProductFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    deploymentData,
                    clientData,
                    productData,
                ] = await Promise.all([
                    getDeployments(),
                    getClients(),
                    getProducts(),
                ]);

                setDeployments(deploymentData);
                setClients(clientData);
                setProducts(productData);
            } catch (error) {
                console.error(
                    "Failed to load deployments:",
                    error
                );
            }
        };

        loadData();
    }, []);

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

    const deploymentToDelete = deployments.find(
        (deployment) =>
            deployment.id === deleteDeploymentId
    );

    const handleDelete = async () => {
        if (deleteDeploymentId === null) {
            return;
        }

        try {
            await deleteDeployment(deleteDeploymentId);

            setDeployments((currentDeployments) =>
                currentDeployments.filter(
                    (deployment) =>
                        deployment.id !== deleteDeploymentId
                )
            );

            setDeleteDeploymentId(null);
        } catch (error) {
            console.error(
                "Failed to delete deployment:",
                error
            );
        }
    };

    const filteredDeployments = deployments.filter(
        (deployment) => {
            const clientName = getClientName(
                deployment.clientId
            );

            const productName = getProductName(
                deployment.productId
            );

            const matchesSearch =
                clientName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                productName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                deployment.productVersion
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesClient =
                clientFilter === "" ||
                deployment.clientId ===
                    Number(clientFilter);

            const matchesProduct =
                productFilter === "" ||
                deployment.productId ===
                    Number(productFilter);

            const matchesStatus =
                statusFilter === "" ||
                deployment.deploymentStatus ===
                    statusFilter;

            return (
                matchesSearch &&
                matchesClient &&
                matchesProduct &&
                matchesStatus
            );
        }
    );

    return (
        <div className="deployments-page">
            <div className="deployments-header">
                <div>
                    <h1>Deployments</h1>
                    <p>
                        View and manage IDS Fintech client
                        deployments
                    </p>
                </div>

                <button
                    className="add-deployment-button"
                    onClick={() =>
                        navigate("/deployments/new")
                    }
                >
                    Add Deployment
                </button>
            </div>

            <div className="deployments-filters">
                <input
                    type="text"
                    placeholder="Search deployments..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                <select
                    value={clientFilter}
                    onChange={(event) =>
                        setClientFilter(event.target.value)
                    }
                >
                    <option value="">All Clients</option>

                    {clients.map((client) => (
                        <option
                            key={client.id}
                            value={client.id}
                        >
                            {client.companyName}
                        </option>
                    ))}
                </select>

                <select
                    value={productFilter}
                    onChange={(event) =>
                        setProductFilter(event.target.value)
                    }
                >
                    <option value="">All Products</option>

                    {products.map((product) => (
                        <option
                            key={product.id}
                            value={product.id}
                        >
                            {product.name}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(event.target.value)
                    }
                >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Maintenance">
                        Maintenance
                    </option>
                    <option value="Planned">Planned</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div className="deployments-grid">
                {filteredDeployments.map(
                    (deployment) => (
                        <div
                            className="deployment-card"
                            key={deployment.id}
                        >
                            <div className="deployment-card-header">
                                <div>
                                    <h2>
                                        {getClientName(
                                            deployment.clientId
                                        )}
                                    </h2>

                                    <p className="deployment-product">
                                        {getProductName(
                                            deployment.productId
                                        )}
                                    </p>
                                </div>

                                <span className="deployment-status">
                                    {
                                        deployment.deploymentStatus
                                    }
                                </span>
                            </div>

                            <div className="deployment-card-info">
                                <p>
                                    <strong>
                                        Product Version:
                                    </strong>{" "}
                                    {
                                        deployment.productVersion
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Support Tier:
                                    </strong>{" "}
                                    {
                                        deployment.supportTier
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Go-Live Date:
                                    </strong>{" "}
                                    {deployment.goLiveDate
                                        ? new Date(
                                              deployment.goLiveDate
                                          ).toLocaleDateString()
                                        : "N/A"}
                                </p>
                            </div>

                            <p className="deployment-notes">
                                {deployment.clientSpecificNotes ||
                                    "No client-specific notes available."}
                            </p>

                            <div className="deployment-card-actions">
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/deployments/${deployment.id}`
                                        )
                                    }
                                >
                                    View
                                </button>

                                <button
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
                                        setDeleteDeploymentId(
                                            deployment.id
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>

            {filteredDeployments.length === 0 && (
                <div className="empty-deployments">
                    No deployments found.
                </div>
            )}

            {deleteDeploymentId !== null && (
                <div className="delete-popup">
                    <div className="delete-popup-content">
                        <h3>Delete Deployment</h3>

                        <p>
                            Are you sure you want to delete the
                            deployment for{" "}
                            <strong>
                                {
                                    deploymentToDelete
                                        ? getClientName(
                                              deploymentToDelete.clientId
                                          )
                                        : ""
                                }
                            </strong>
                            ?
                        </p>

                        <div className="delete-popup-actions">
                            <button
                                className="cancel-delete-button"
                                onClick={() =>
                                    setDeleteDeploymentId(
                                        null
                                    )
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-delete-button"
                                onClick={handleDelete}
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

export default Deployments;