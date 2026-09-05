import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ClientDetails.css";
import { getClients } from "../services/ClientService";
import type { Client } from "../types/ClientType";

const ClientDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClient = async () => {
            try {
                const clients = await getClients();

                const selectedClient = clients.find(
                    (client) => client.id === Number(id)
                );

                setClient(selectedClient || null);
            } catch (error) {
                console.error("Failed to load client:", error);
            } finally {
                setLoading(false);
            }
        };

        loadClient();
    }, [id]);

    if (loading) {
        return (
            <div className="client-details-page">
                <p>Loading client...</p>
            </div>
        );
    }

    if (!client) {
        return (
            <div className="client-details-page">
                <p>Client not found.</p>

                <button onClick={() => navigate("/clients")}>
                    Back to Clients
                </button>
            </div>
        );
    }

    return (
        <div className="client-details-page">
            <div className="client-details-header">
                <div>
                    <h1>{client.companyName}</h1>
                    <p>{client.country}</p>
                </div>

                <button onClick={() => navigate("/clients")}>
                    Back to Clients
                </button>
            </div>

            <section className="client-details-section">
                <h2>Basic Information</h2>

                <div className="client-details-info">
                    <div>
                        <label>Company Name</label>
                        <p>{client.companyName}</p>
                    </div>

                    <div>
                        <label>Country</label>
                        <p>{client.country}</p>
                    </div>

                    <div>
                        <label>Email</label>
                        <p>{client.email || "N/A"}</p>
                    </div>

                    <div>
                        <label>Phone</label>
                        <p>{client.phoneNumber || "N/A"}</p>
                    </div>

                    <div>
                        <label>Status</label>
                        <p>{client.status}</p>
                    </div>
                </div>

                <div className="client-details-notes">
                    <label>Notes</label>
                    <p>{client.notes || "No notes available."}</p>
                </div>
            </section>
        </div>
    );
};

export default ClientDetails;