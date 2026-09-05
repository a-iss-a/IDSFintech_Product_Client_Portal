import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TeamMember } from "../types/TeamMemberType";
import type { Department } from "../types/DepartmentType";
import type { Product } from "../types/ProductType";
import type { ProductResponsibility } from "../types/ProductResponsibilityType";
import {
    getTeamMember,
} from "../services/TeamMemberService";
import { getDepartments } from "../services/DepartmentService";
import { getProducts } from "../services/ProductService";
import {
    getProductResponsibilities,
    deleteProductResponsibility,
} from "../services/ProductResponsibilityService";
import "./TeamMemberDetails.css";

const TeamMemberDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [responsibilities, setResponsibilities] = useState<
        ProductResponsibility[]
    >([]);

    const [currentResponsibilityIndex, setCurrentResponsibilityIndex] =
        useState(0);

    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!id) {
                return;
            }

            try {
                const [
                    member,
                    departmentList,
                    productList,
                    allResponsibilities,
                ] = await Promise.all([
                    getTeamMember(Number(id)),
                    getDepartments(),
                    getProducts(),
                    getProductResponsibilities(),
                ]);

                setTeamMember(member);
                setDepartments(departmentList);
                setProducts(productList);

                const memberResponsibilities = allResponsibilities.filter(
                    (responsibility) =>
                        responsibility.teamMemberId === Number(id)
                );

                setResponsibilities(memberResponsibilities);
                setCurrentResponsibilityIndex(0);
            } catch (error) {
                console.error(
                    "Failed to load team member details:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const getDepartmentName = () => {
        if (!teamMember?.departmentId) {
            return "No Department";
        }

        const department = departments.find(
            (department) => department.id === teamMember.departmentId
        );

        return department?.name ?? "No Department";
    };

    const getProductName = (productId: number) => {
        const product = products.find(
            (product) => product.id === productId
        );

        return product?.name ?? "Unknown Product";
    };

    const handlePreviousResponsibility = () => {
        setCurrentResponsibilityIndex((current) =>
            current === 0
                ? responsibilities.length - 1
                : current - 1
        );
    };

    const handleNextResponsibility = () => {
        setCurrentResponsibilityIndex((current) =>
            current === responsibilities.length - 1
                ? 0
                : current + 1
        );
    };

    const handleDelete = async () => {
        if (deleteId === null) {
            return;
        }

        try {
            await deleteProductResponsibility(deleteId);

            setResponsibilities((current) =>
                current.filter(
                    (responsibility) =>
                        responsibility.id !== deleteId
                )
            );

            setCurrentResponsibilityIndex((current) => {
                if (responsibilities.length <= 1) {
                    return 0;
                }

                if (current >= responsibilities.length - 1) {
                    return responsibilities.length - 2;
                }

                return current;
            });

            setDeleteId(null);
        } catch (error) {
            console.error(
                "Failed to delete product responsibility:",
                error
            );
        }
    };

    if (loading) {
        return (
            <div className="team-member-details">
                Loading...
            </div>
        );
    }

    if (!teamMember) {
        return (
            <div className="team-member-details">
                <h2>Team Member Not Found</h2>

                <button
                    className="back-button"
                    onClick={() => navigate("/team-members")}
                >
                    Back to Team Members
                </button>
            </div>
        );
    }

    const currentResponsibility =
        responsibilities[currentResponsibilityIndex];

    return (
        <div className="team-member-details">
            <div className="details-header">
                <button
                    className="back-button"
                    onClick={() => navigate("/team-members")}
                >
                    ← Back
                </button>

                <h1>Team Member Details</h1>
            </div>

            <section className="team-member-info">
                <h2>{teamMember.name}</h2>

                <div className="info-grid">
                    <div>
                        <span className="info-label">Job Title</span>
                        <p>
                            {teamMember.jobTitle || "Not specified"}
                        </p>
                    </div>

                    <div>
                        <span className="info-label">Department</span>
                        <p>{getDepartmentName()}</p>
                    </div>

                    <div>
                        <span className="info-label">Email</span>
                        <p>{teamMember.email}</p>
                    </div>

                    <div>
                        <span className="info-label">Status</span>
                        <p>{teamMember.status}</p>
                    </div>
                </div>
            </section>

            <section className="responsibilities-section">
                <div className="section-header">
                    <div>
                        <h2>Product Responsibilities</h2>
                        <p>
                            Products and responsibilities assigned to
                            this team member.
                        </p>
                    </div>

                    <button
                        className="add-responsibility-button"
                        onClick={() =>
                            navigate(
                                `/team-members/${teamMember.id}/responsibilities/new`
                            )
                        }
                    >
                        + Add Responsibility
                    </button>
                </div>

                {responsibilities.length === 0 ? (
                    <div className="empty-responsibilities">
                        <p>
                            No product responsibilities assigned.
                        </p>
                    </div>
                ) : (
                    <div className="responsibility-book">
                        <div className="responsibility-navigation">
                            <button
                                className="responsibility-nav-button"
                                onClick={
                                    handlePreviousResponsibility
                                }
                                aria-label="Previous responsibility"
                            >
                                ←
                            </button>

                            <span className="responsibility-counter">
                                {currentResponsibilityIndex + 1} /{" "}
                                {responsibilities.length}
                            </span>

                            <button
                                className="responsibility-nav-button"
                                onClick={
                                    handleNextResponsibility
                                }
                                aria-label="Next responsibility"
                            >
                                →
                            </button>
                        </div>

                        <div className="responsibility-content">
                            <h3>
                                {getProductName(
                                    currentResponsibility.productId
                                )}
                            </h3>

                            <div className="responsibility-detail">
                                <span>Responsibility</span>

                                <p>
                                    {
                                        currentResponsibility.responsibility
                                    }
                                </p>
                            </div>

                            <div className="responsibility-detail">
                                <span>Description</span>

                                <p>
                                    {currentResponsibility.description ||
                                        "No description"}
                                </p>
                            </div>
                        </div>

                        <div className="responsibility-actions">
                            <button
                                className="edit-responsibility-button"
                                onClick={() =>
                                    navigate(
                                        `/team-members/${teamMember.id}/responsibilities/${currentResponsibility.id}/edit`
                                    )
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="delete-responsibility-button"
                                onClick={() =>
                                    setDeleteId(
                                        currentResponsibility.id
                                    )
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {deleteId !== null && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal">
                        <h2>Delete Responsibility</h2>

                        <p>
                            Are you sure you want to delete this
                            product responsibility?
                        </p>

                        <div className="delete-modal-actions">
                            <button
                                className="cancel-delete-button"
                                onClick={() => setDeleteId(null)}
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

export default TeamMemberDetails;