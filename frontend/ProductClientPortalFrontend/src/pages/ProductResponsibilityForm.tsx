import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types/ProductType";
import type { TeamMember } from "../types/TeamMemberType";
import type {
    ProductResponsibilityFormData,
} from "../types/ProductResponsibilityType";
import { getProducts } from "../services/ProductService";
import { getTeamMember } from "../services/TeamMemberService";
import {
    getProductResponsibility,
    addProductResponsibility,
    updateProductResponsibility,
} from "../services/ProductResponsibilityService";
import "./ProductResponsibilityForm.css";

const ProductResponsibilityForm = () => {
    const navigate = useNavigate();

    const { id, responsibilityId } = useParams<{
        id: string;
        responsibilityId: string;
    }>();

    const isEditMode = Boolean(responsibilityId);

    const [products, setProducts] = useState<Product[]>([]);
    const [teamMember, setTeamMember] = useState<TeamMember | null>(null);

    const [formData, setFormData] = useState({
        productId: 0,
        teamMemberId: Number(id),
        responsibility: "",
        description: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (!id) {
                return;
            }

            try {
                const [productList, member] = await Promise.all([
                    getProducts(),
                    getTeamMember(Number(id)),
                ]);

                setProducts(productList);
                setTeamMember(member);

                if (isEditMode && responsibilityId) {
                    const responsibility =
                        await getProductResponsibility(
                            Number(responsibilityId)
                        );

                    if (responsibility) {
                        setFormData({
                            productId: responsibility.productId,
                            teamMemberId: responsibility.teamMemberId,
                            responsibility:
                                responsibility.responsibility,
                            description:
                                responsibility.description ?? "",
                        });
                    }
                }
            } catch (error) {
                console.error(
                    "Failed to load responsibility form:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, isEditMode, responsibilityId]);

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
                name === "productId"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        if (!formData.productId) {
            return;
        }

        if (!formData.responsibility.trim()) {
            return;
        }

        if (!teamMember) {
            return;
        }

        const selectedProduct = products.find(
            (product) => product.id === formData.productId
        );

        if (!selectedProduct) {
            return;
        }

        const responsibilityData: ProductResponsibilityFormData = {
            productId: formData.productId,
            teamMemberId: formData.teamMemberId,
            responsibility: formData.responsibility,
            description: formData.description,
            product: selectedProduct,
            teamMember: teamMember,
        };

        try {
            setSaving(true);

            if (isEditMode && responsibilityId) {
                await updateProductResponsibility(
                    Number(responsibilityId),
                    responsibilityData
                );
            } else {
                await addProductResponsibility(
                    responsibilityData
                );
            }

            navigate(`/team-members/${id}`);
        } catch (error) {
            console.error(
                "Failed to save product responsibility:",
                error
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="product-responsibility-form-page">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="product-responsibility-form-page">
            <div className="product-responsibility-form-header">
                <button
                    className="back-button"
                    onClick={() =>
                        navigate(`/team-members/${id}`)
                    }
                >
                    ← Back to Team Member
                </button>

                <h1>
                    {isEditMode
                        ? "Edit Product Responsibility"
                        : "Add Product Responsibility"}
                </h1>
            </div>

            <form
                className="product-responsibility-form"
                onSubmit={handleSubmit}
            >
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
                    <label htmlFor="responsibility">
                        Responsibility
                    </label>

                    <input
                        id="responsibility"
                        name="responsibility"
                        type="text"
                        value={formData.responsibility}
                        onChange={handleChange}
                        placeholder="e.g. Backend Developer"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the team member's responsibility..."
                        rows={5}
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() =>
                            navigate(`/team-members/${id}`)
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
                            ? "Update Responsibility"
                            : "Add Responsibility"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductResponsibilityForm;
