import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductForm.css";
import {
    getProducts,
    addProduct,
    updateProduct,
} from "../services/ProductService";
import type { ProductFormData } from "../types/ProductType";

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        description: "",
        businessPurpose: "",
        lifecycleStatus: "",
        currentVersion: "",
        supportedMarkets: "",
        criticality: "",
        technologies: "",
        notes: "",
    });

    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const loadProduct = async () => {
            try {
                const products = await getProducts();

                const product = products.find(
                    (product) => product.id === Number(id)
                );

                if (!product) {
                    setError("Product not found.");
                    return;
                }

                setFormData({
                    name: product.name,
                    description: product.description || "",
                    businessPurpose: product.businessPurpose || "",
                    lifecycleStatus: product.lifecycleStatus,
                    currentVersion: product.currentVersion,
                    supportedMarkets: product.supportedMarkets || "",
                    criticality: product.criticality || "",
                    technologies: product.technologies || "",
                    notes: product.notes || "",
                });
            } catch (error) {
                console.error("Failed to load product:", error);
                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id, isEditMode]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setSaving(true);
        setError("");

        try {
           if (isEditMode) {
    await updateProduct(Number(id), formData);
} else {
    await addProduct(formData);
}

            navigate("/products");
        } catch (error) {
            console.error("Failed to save product:", error);
            setError("Failed to save product.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="product-form-page">
                <p>Loading product...</p>
            </div>
        );
    }

    if (error && isEditMode && !formData.name) {
        return (
            <div className="product-form-page">
                <p>{error}</p>

                <button onClick={() => navigate("/products")}>
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="product-form-page">
            <div className="product-form-header">
                <div>
                    <h1>
                        {isEditMode ? "Edit Product" : "Add New Product"}
                    </h1>

                    <p>
                        {isEditMode
                            ? "Update product information."
                            : "Enter the information for the new product."}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="product-form-back"
                >
                    Back to Products
                </button>
            </div>

            {error && (
                <div className="product-form-error">
                    {error}
                </div>
            )}

            <form
                className="product-form"
                onSubmit={handleSubmit}
            >
                <div className="product-form-grid">
                    <div className="product-form-field">
                        <label htmlFor="name">Product Name</label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="product-form-field">
                        <label htmlFor="currentVersion">
                            Current Version
                        </label>

                        <input
                            id="currentVersion"
                            name="currentVersion"
                            type="text"
                            value={formData.currentVersion}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="product-form-field">
                        <label htmlFor="lifecycleStatus">
                            Lifecycle Status
                        </label>

                        <select
                            id="lifecycleStatus"
                            name="lifecycleStatus"
                            value={formData.lifecycleStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select status
                            </option>
                            <option value="Active">Active</option>
                            <option value="Maintenance">
                                Maintenance
                            </option>
                            <option value="Planned">Planned</option>
                            <option value="Deprecated">
                                Deprecated
                            </option>
                        </select>
                    </div>

                    <div className="product-form-field">
                        <label htmlFor="criticality">
                            Criticality
                        </label>

                        <select
                            id="criticality"
                            name="criticality"
                            value={formData.criticality}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select criticality
                            </option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>

                    <div className="product-form-field">
                        <label htmlFor="supportedMarkets">
                            Supported Markets
                        </label>

                        <input
                            id="supportedMarkets"
                            name="supportedMarkets"
                            type="text"
                            value={formData.supportedMarkets}
                            onChange={handleChange}
                            placeholder="e.g. Lebanon, UAE, Saudi Arabia"
                        />
                    </div>

                    <div className="product-form-field">
                        <label htmlFor="technologies">
                            Technologies
                        </label>

                        <input
                            id="technologies"
                            name="technologies"
                            type="text"
                            value={formData.technologies}
                            onChange={handleChange}
                            placeholder="e.g. React, .NET, SQL Server"
                        />
                    </div>

                    <div className="product-form-field product-form-full">
                        <label htmlFor="businessPurpose">
                            Business Purpose
                        </label>

                        <textarea
                            id="businessPurpose"
                            name="businessPurpose"
                            value={formData.businessPurpose}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>

                    <div className="product-form-field product-form-full">
                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>

                    <div className="product-form-field product-form-full">
                        <label htmlFor="notes">Notes</label>

                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>
                </div>

                <div className="product-form-actions">
                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : isEditMode
                                ? "Update Product"
                                : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;