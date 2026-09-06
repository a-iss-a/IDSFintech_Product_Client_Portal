import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

import { getProducts } from "../services/ProductService";
import type { Product } from "../types/ProductType";

import { getClients } from "../services/ClientService";
import type { Client } from "../types/ClientType";

import { getDeployments } from "../services/DeploymentService";
import type { Deployment } from "../types/DeploymentType";

import { getTeamMembers } from "../services/TeamMemberService";
import type { TeamMember } from "../types/TeamMemberType";

import { getUsers } from "../services/UserService";
import type { User } from "../types/UserType";

const AdminDashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [
                    productData,
                    clientData,
                    deploymentData,
                    teamMemberData,
                    userData,
                ] = await Promise.all([
                    getProducts(),
                    getClients(),
                    getDeployments(),
                    getTeamMembers(),
                    getUsers(),
                ]);

                setProducts(productData);
                setClients(clientData);
                setDeployments(deploymentData);
                setTeamMembers(teamMemberData);
                setUsers(userData);
            } catch (error) {
                console.error(
                    "Failed to load admin dashboard:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const activeProducts = products.filter(
        (product) =>
            product.lifecycleStatus.toLowerCase() === "active"
    );

    const recentProducts = [...products]
        .sort((a, b) => {
            const dateA = new Date(
                a.updatedAt ?? a.createdAt
            ).getTime();

            const dateB = new Date(
                b.updatedAt ?? b.createdAt
            ).getTime();

            return dateB - dateA;
        })
        .slice(0, 5);

    const getProductStatus = (product: Product) => {
        return product.lifecycleStatus || "Unknown";
    };

    if (loading) {
        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1>Admin Dashboard</h1>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>

                <p>
                    Overview of the IDS Fintech Products Portal.
                </p>
            </div>

            <div className="dashboard-stats">

                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p>{products.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Active Products</h3>
                    <p>{activeProducts.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Clients</h3>
                    <p>{clients.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Deployments</h3>
                    <p>{deployments.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Team Members</h3>
                    <p>{teamMembers.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
                </div>

            </div>

            <div className="dashboard-section">

                <h2>
                    Recently Added or Updated Products
                </h2>

                {recentProducts.length === 0 ? (
                    <div className="empty-state">
                        No products available.
                    </div>
                ) : (
                    <div className="products-table-container">

                        <table className="products-table">

                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Status</th>
                                    <th>Version</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentProducts.map(
                                    (product) => (
                                        <tr key={product.id}>
                                            <td>
                                                {product.name}
                                            </td>

                                            <td>
                                                {getProductStatus(
                                                    product
                                                )}
                                            </td>

                                            <td>
                                                {
                                                    product.currentVersion
                                                }
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            <div className="dashboard-section">

                <h2>Quick Navigation</h2>

                <div className="quick-navigation">

                    <Link to="/products">
                        Products
                    </Link>

                    <Link to="/clients">
                        Clients
                    </Link>

                    <Link to="/deployments">
                        Deployments
                    </Link>

                    <Link to="/team-members">
                        Team Members
                    </Link>

                </div>

            </div>

            <div className="dashboard-section">

                <h2>Administration</h2>

                <div className="quick-navigation admin-navigation">

                    <Link to="/users">
                        Manage Users
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;
