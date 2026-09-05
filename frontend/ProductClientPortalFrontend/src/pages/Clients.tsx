import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Clients.css";
import { getClients, deleteClient } from "../services/ClientService";
import type { Client } from "../types/ClientType";

const Clients = () => {
    const navigate = useNavigate();

    const [clients, setClients] = useState<Client[]>([]);
    const [deleteClientId, setDeleteClientId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const clientToDelete = clients.find(
    (client) => client.id === deleteClientId
);

const handleDelete = async () => {
    if (deleteClientId === null) {
        return;
    }

    try {
        await deleteClient(deleteClientId);

        setClients((currentClients) =>
            currentClients.filter(
                (client) => client.id !== deleteClientId
            )
        );

        setDeleteClientId(null);
    } catch (error) {
        console.error("Failed to delete client:", error);
    }
};

    useEffect(() => {
        const loadClients = async () => {
            try {
                const data = await getClients();
                setClients(data);
            } catch (error) {
                console.error("Failed to load clients:", error);
            }
        };

        loadClients();
    }, []);

    const countries = Array.from(
        new Set(clients.map((client) => client.country))
    ).sort();

    const statuses = Array.from(
        new Set(clients.map((client) => client.status))
    ).sort();

    const filteredClients = clients.filter((client) => {
        const matchesSearch = client.companyName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCountry =
            countryFilter === "" ||
            client.country === countryFilter;

        const matchesStatus =
            statusFilter === "" ||
            client.status === statusFilter;

        return matchesSearch && matchesCountry && matchesStatus;
    });

    return (
        <div className="clients-page">
            <div className="clients-header">
                <div>
                    <h1>Clients</h1>
                    <p>Manage and view client information.</p>
                </div>
            </div>

            <div className="clients-filters">
                <input
                    type="text"
                    placeholder="Search clients..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <select
                    value={countryFilter}
                    onChange={(event) =>
                        setCountryFilter(event.target.value)
                    }
                >
                    <option value="">All Countries</option>

                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
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

                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            {filteredClients.length === 0 ? (
                <div className="clients-empty-state">
                    No clients found.
                </div>
            ) : (
                <div className="clients-grid">
                    {filteredClients.map((client) => (
                        <div className="client-card" key={client.id}>
                            <div className="client-card-header">
                                <div>
                                    <h2>{client.companyName}</h2>
                                    <p>{client.country}</p>
                                </div>

                                <span className="client-status">
                                    {client.status}
                                </span>
                            </div>

                            <div className="client-card-info">
                                <div>
                                    <label>Email</label>
                                    <p>{client.email || "N/A"}</p>
                                </div>

                                <div>
                                    <label>Phone</label>
                                    <p>
                                        {client.phoneNumber || "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="client-card-notes">
                                <label>Notes</label>
                                <p>
                                    {client.notes ||
                                        "No notes available."}
                                </p>
                            </div>

                            <div className="client-card-actions">
                                <button
                                    onClick={() =>
                                        navigate(`/clients/${client.id}`)
                                    }
                                >
                                    View
                                </button>

                               <button
    onClick={() => navigate(`/clients/${client.id}/edit`)}
>
    Edit
</button>

                               <button
    className="delete-button"
    onClick={() => setDeleteClientId(client.id)}
>
    Delete
</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        {deleteClientId !== null && (
    <div className="delete-popup">
        <div className="delete-popup-content">
            <h3>Delete Client</h3>

            <p>
                Are you sure you want to delete{" "}
                <strong>{clientToDelete?.companyName}</strong>?
            </p>

            <div className="delete-popup-actions">
                <button
                    className="cancel-delete-button"
                    onClick={() => setDeleteClientId(null)}
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

export default Clients;