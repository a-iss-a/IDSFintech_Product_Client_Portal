import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ModuleForm.css";
import {
    addModule,
    getModulesByProduct,
    updateModule,
} from "../services/ModuleService";
import { getProducts } from "../services/ProductService";
import type { ModuleFormData } from "../types/ModuleType";

const ModuleForm = () => {
    const { productId, id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<ModuleFormData>({
        name: "",
        description: "",
        status: "Active",
    });

    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const loadModule = async () => {
            try {
                const module = await getModulesByProduct(Number(productId));

                if (!module || module.id !== Number(id)) {
                    setError("Module not found.");
                    return;
                }

                setFormData({
                    name: module.name,
                    description: module.description || "",
                    status: module.status,
                });
            } catch (error) {
                console.error("Failed to load module:", error);
                setError("Failed to load module.");
            } finally {
                setLoading(false);
            }
        };

        loadModule();
    }, [id, productId, isEditMode]);

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
            const products = await getProducts();

            const product = products.find(
                (product) => product.id === Number(productId)
            );

            if (!product) {
                setError("Product not found.");
                return;
            }

            if (isEditMode) {
                await updateModule(
    Number(id),
    Number(productId),
    formData,
    product
);
            } else {
                await addModule(
                    Number(productId),
                    formData,
                    product
                );
            }

            navigate(`/products/${productId}`);
        } catch (error) {
            console.error("Failed to save module:", error);
            setError("Failed to save module.");
        }
    };

    if (loading) {
        return (
            <div className="module-form-page">
                <p>Loading module...</p>
            </div>
        );
    }

    return (
        <div className="module-form-page">
            <div className="module-form-header">
                <div>
                    <h1>
                        {isEditMode
                            ? "Edit Module"
                            : "Add New Module"}
                    </h1>

                    <p>
                        {isEditMode
                            ? "Update module information"
                            : "Add a new module to this product"}
                    </p>
                </div>
            </div>

            {error && (
                <div className="module-form-error">
                    {error}
                </div>
            )}

            <form
                className="module-form"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label htmlFor="name">
                        Module Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
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
                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>

                        <option value="Planned">
                            Planned
                        </option>

                        <option value="Deprecated">
                            Deprecated
                        </option>
                    </select>
                </div>

                <div className="form-group form-group-full">
                    <label htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                    />
                </div>

                <div className="module-form-actions">
                    <button
                        type="button"
                        className="module-form-cancel"
                        onClick={() =>
                            navigate(`/products/${productId}`)
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="module-form-submit"
                    >
                        {isEditMode
                            ? "Save Changes"
                            : "Add Module"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModuleForm;

