import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import type { Product } from "../types/ProductType";
import { getClients } from "../services/ClientService";
import type { Client } from "../types/ClientType";
import { getDeployments } from "../services/DeploymentService";
import type { Deployment } from "../types/DeploymentType";
import { getTeamMembers } from "../services/TeamMemberService";
import type { TeamMember } from "../types/TeamMemberType";

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                const clientData = await getClients();
                setClients(clientData);
                const deploymentData = await getDeployments();
                setDeployments(deploymentData);
                const teamMemberData = await getTeamMembers();
                setTeamMembers(teamMemberData);
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
            }
        };

        loadDashboardData();
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Overview of the IDS Fintech Portal</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p>{products.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Active Products</h3>
                    <p>{products.filter(product => product.lifecycleStatus === "Active").length}</p>
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
            </div>

            <div className="dashboard-section">
    <h2>Recently Updated Products</h2>

    <div className="products-table-container">
        <table className="products-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Version</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                </tr>
            </thead>

            <tbody>
                {products
                    .slice()
                    .sort(
                        (a, b) =>
                            new Date(b.updatedAt).getTime() -
                            new Date(a.updatedAt).getTime()
                    )
                    .slice(0, 5)
                    .map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.currentVersion}</td>
                            <td>{product.lifecycleStatus}</td>
                            <td>
                                {new Date(product.updatedAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
</div>

            <div className="dashboard-section">
                <h2>Quick Navigation</h2>

                <div className="quick-navigation">
    <Link to="/products">Products</Link>
    <Link to="/clients">Clients</Link>
    <Link to="/deployments">Deployments</Link>
    <Link to="/team-members">Team Members</Link>
</div>
            </div>
        </div>
    );
};

export default Dashboard;