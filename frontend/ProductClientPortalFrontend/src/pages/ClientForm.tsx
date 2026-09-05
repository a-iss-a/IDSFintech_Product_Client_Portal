import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ClientForm.css";
import {
    addClient,
    getClients,
    updateClient,
} from "../services/ClientService";
import type { ClientFormData } from "../types/ClientType";

const ClientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<ClientFormData>({
        companyName: "",
        country: "",
        email: "",
        phoneNumber: "",
        status: "Active",
        notes: "",
    });

    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const loadClient = async () => {
            try {
                const clients = await getClients();

                const client = clients.find(
                    (client) => client.id === Number(id)
                );

                if (!client) {
                    setError("Client not found.");
                    return;
                }

                setFormData({
                    companyName: client.companyName,
                    country: client.country,
                    email: client.email || "",
                    phoneNumber: client.phoneNumber || "",
                    status: client.status,
                    notes: client.notes || "",
                });
            } catch (error) {
                console.error("Failed to load client:", error);
                setError("Failed to load client.");
            } finally {
                setLoading(false);
            }
        };

        loadClient();
    }, [id, isEditMode]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setError("");

        try {
            if (isEditMode) {
                await updateClient(Number(id), formData);
            } else {
                await addClient(formData);
            }

            navigate("/clients");
        } catch (error) {
            console.error("Failed to save client:", error);
            setError("Failed to save client.");
        }
    };

    if (loading) {
        return (
            <div className="client-form-page">
                <p>Loading client...</p>
            </div>
        );
    }

    return (
        <div className="client-form-page">
            <div className="client-form-header">
                <div>
                    <h1>
                        {isEditMode ? "Edit Client" : "Add New Client"}
                    </h1>

                    <p>
                        {isEditMode
                            ? "Update client information"
                            : "Add a new client to the portal"}
                    </p>
                </div>
            </div>

            {error && (
                <div className="client-form-error">
                    {error}
                </div>
            )}

            <form
                className="client-form"
                onSubmit={handleSubmit}
            >
                <div className="client-form-grid">
                    <div className="form-group">
                        <label htmlFor="companyName">
                            Company Name
                        </label>

                        <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">
                            Country
                        </label>

                        <input
                            id="country"
                            name="country"
                            type="text"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">
                            Phone Number
                        </label>

                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">
                            Status
                        </label>

                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="form-group form-group-full">
                        <label htmlFor="notes">
                            Notes
                        </label>

                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={5}
                        />
                    </div>
                </div>

                <div className="client-form-actions">
                    <button
                        type="button"
                        className="client-form-cancel"
                        onClick={() => navigate("/clients")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="client-form-submit"
                    >
                        {isEditMode ? "Save Changes" : "Add Client"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClientForm;