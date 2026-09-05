import { useEffect, useState } from "react";
import "./Products.css";
import { getProducts, deleteProduct } from "../services/ProductService";
import type { Product } from "../types/ProductType";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [technologyFilter, setTechnologyFilter] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        };

        loadProducts();
    }, []);

    const technologies = Array.from(
        new Set(
            products
                .flatMap((product) =>
                    product.technologies
                        ? product.technologies
                              .split(",")
                              .map((technology) => technology.trim())
                        : []
                )
                .filter(Boolean)
        )
    );

    const productToDelete = products.find(
        (product) => product.id === deleteProductId
    );

    const handleDelete = async () => {
        if (deleteProductId === null) {
            return;
        }

        try {
            await deleteProduct(deleteProductId);

            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) => product.id !== deleteProductId
                )
            );

            setDeleteProductId(null);
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "" ||
            product.lifecycleStatus === statusFilter;

        const matchesTechnology =
            technologyFilter === "" ||
            product.technologies
                ?.toLowerCase()
                .includes(technologyFilter.toLowerCase());

        return matchesSearch && matchesStatus && matchesTechnology;
    });

    return (
        <div className="products-page">
            <div className="products-header">
                <div>
                    <h1>Products</h1>
                    <p>View and explore IDS Fintech products</p>
                </div>
            </div>

            <div className="products-filters">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Planned">Planned</option>
                    <option value="Deprecated">Deprecated</option>
                </select>

                <select
                    value={technologyFilter}
                    onChange={(event) =>
                        setTechnologyFilter(event.target.value)
                    }
                >
                    <option value="">All Technologies</option>

                    {technologies.map((technology) => (
                        <option key={technology} value={technology}>
                            {technology}
                        </option>
                    ))}
                </select>
            </div>

            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <div className="product-card" key={product.id}>
                        <div className="product-card-header">
                            <h2>{product.name}</h2>

                            <span className="product-status">
                                {product.lifecycleStatus}
                            </span>
                        </div>

                        <div className="product-card-info">
                            <p>
                                <strong>Version:</strong>{" "}
                                {product.currentVersion}
                            </p>

                            <p>
                                <strong>Criticality:</strong>{" "}
                                {product.criticality || "N/A"}
                            </p>

                            <p>
                                <strong>Technologies:</strong>{" "}
                                {product.technologies || "N/A"}
                            </p>
                        </div>

                        <p className="product-description">
                            {product.description ||
                                "No description available."}
                        </p>

                        <div className="product-card-actions">
                            <button
                                onClick={() =>
                                    navigate(`/products/${product.id}`)
                                }
                            >
                                View
                            </button>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/products/${product.id}/edit`
                                    )
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="delete-button"
                                onClick={() =>
                                    setDeleteProductId(product.id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {deleteProductId !== null && (
                <div className="delete-popup">
                    <div className="delete-popup-content">
                        <h3>Delete Product</h3>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>{productToDelete?.name}</strong>?
                        </p>

                        <div className="delete-popup-actions">
                            <button
                                className="cancel-delete-button"
                                onClick={() =>
                                    setDeleteProductId(null)
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

export default Products;