import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RepositoryForm.css";
import {
    addRepository,
    getRepository,
    updateRepository,
} from "../services/RepositoryService";
import { getProducts } from "../services/ProductService";
import type { RepositoryFormData } from "../types/RepositoryType";

const RepositoryForm = () => {
    const { productId, id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<RepositoryFormData>({
        name: "",
        gitHubURL: "",
        mainBranch: "",
        description: "",
    });

    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const loadRepository = async () => {
            try {
                const repository = await getRepository(Number(id));

                if (!repository || repository.id !== Number(id)) {
                    setError("Repository not found.");
                    return;
                }

                setFormData({
                    name: repository.name,
                    gitHubURL: repository.gitHubURL,
                    mainBranch: repository.mainBranch,
                    description: repository.description || "",
                });
            } catch (error) {
                console.error("Failed to load repository:", error);
                setError("Failed to load repository.");
            } finally {
                setLoading(false);
            }
        };

        loadRepository();
    }, [id, isEditMode]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
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
                await updateRepository(
                    Number(id),
                    Number(productId),
                    formData,
                    product
                );
            } else {
                await addRepository(
                    Number(productId),
                    formData,
                    product
                );
            }

            navigate(`/products/${productId}`);
        } catch (error) {
            console.error("Failed to save repository:", error);
            setError("Failed to save repository.");
        }
    };

    if (loading) {
        return (
            <div className="repository-form-page">
                <p>Loading repository...</p>
            </div>
        );
    }

    return (
        <div className="repository-form-page">
            <div className="repository-form-header">
                <div>
                    <h1>
                        {isEditMode
                            ? "Edit Repository"
                            : "Add New Repository"}
                    </h1>

                    <p>
                        {isEditMode
                            ? "Update repository information"
                            : "Add a new repository to this product"}
                    </p>
                </div>
            </div>

            {error && (
                <div className="repository-form-error">
                    {error}
                </div>
            )}

            <form
                className="repository-form"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label htmlFor="name">
                        Repository Name
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
                    <label htmlFor="gitHubURL">
                        GitHub URL
                    </label>

                    <input
                        id="gitHubURL"
                        name="gitHubURL"
                        type="text"
                        value={formData.gitHubURL}
                        onChange={handleChange}
                        required
                    />
                </div>
<div className="form-group">
                    <label htmlFor="mainBranch">
                        Main Branch
                    </label>

                    <input
                        id="mainBranch"
                        name="mainBranch"
                        type="text"
                        value={formData.mainBranch}
                        onChange={handleChange}
                        required
                    />
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

                <div className="repository-form-actions">
                    <button
                        type="button"
                        className="repository-form-cancel"
                        onClick={() =>
                            navigate(`/products/${productId}`)
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="repository-form-submit"
                    >
                        {isEditMode
                            ? "Save Changes"
                            : "Add Repository"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RepositoryForm;