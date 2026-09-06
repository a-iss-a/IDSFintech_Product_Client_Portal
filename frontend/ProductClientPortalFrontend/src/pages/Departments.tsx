import { useEffect, useState } from "react";
import {
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
} from "../services/DepartmentService";
import type { Department } from "../types/DepartmentType";
import "./Departments.css";

const Departments = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingDepartment, setEditingDepartment] =
        useState<Department | null>(null);

    const [name, setName] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] =
        useState<Department | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getDepartments();
                setDepartments(data);
            } catch (error) {
                console.error(
                    "Failed to load departments:",
                    error
                );

                setError("Failed to load departments.");
            } finally {
                setLoading(false);
            }
        };

        loadDepartments();
    }, []);

    const reloadDepartments = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error(
                "Failed to load departments:",
                error
            );

            setError("Failed to load departments.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName("");
        setEditingDepartment(null);
        setShowForm(false);
        setError("");
    };

    const openAddForm = () => {
        setEditingDepartment(null);
        setName("");
        setError("");
        setShowForm(true);
    };

    const openEditForm = (department: Department) => {
        setEditingDepartment(department);
        setName(department.name);
        setError("");
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Department name is required.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            if (editingDepartment) {
                const updatedDepartment: Department = {
                    ...editingDepartment,
                    name: name.trim(),
                };

                await updateDepartment(
                    editingDepartment.id,
                    updatedDepartment
                );
            } else {
                const newDepartment: Department = {
                    id: 0,
                    name: name.trim(),
                };

                await addDepartment(newDepartment);
            }

            await reloadDepartments();
            resetForm();
        } catch (error) {
            console.error(
                "Failed to save department:",
                error
            );

            setError("Failed to save department.");
        } finally {
            setSaving(false);
        }
    };

    const openDeleteModal = (department: Department) => {
        setDepartmentToDelete(department);
        setShowDeleteModal(true);
        setError("");
    };

    const closeDeleteModal = () => {
        if (deleting) {
            return;
        }

        setShowDeleteModal(false);
        setDepartmentToDelete(null);
    };

    const handleDelete = async () => {
        if (!departmentToDelete) {
            return;
        }

        try {
            setDeleting(true);
            setError("");

            await deleteDepartment(departmentToDelete.id);
            await reloadDepartments();

            setShowDeleteModal(false);
            setDepartmentToDelete(null);
        } catch (error) {
            console.error(
                "Failed to delete department:",
                error
            );

            setError(
                "This department could not be deleted " +
                    "because team members are still " +
                    "assigned to it. Please reassign or " +
                    "remove those team members first."
            );
        } finally {
            setDeleting(false);
        }
    };

    const filteredDepartments = departments.filter(
        (department) =>
            department.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim())
    );

    if (loading) {
        return (
            <div className="departments">

                <div className="departments-header">
                    <div>
                        <h1>Departments</h1>

                        <p>
                            Manage departments and teams.
                        </p>
                    </div>
                </div>

                <div className="departments-loading">
                    Loading departments...
                </div>

            </div>
        );
    }

    return (
        <div className="departments">

            <div className="departments-header">

                <div>
                    <h1>Departments</h1>

                    <p>
                        Manage departments used across the portal.
                    </p>
                </div>

                <button
                    type="button"
                    className="add-department-button"
                    onClick={openAddForm}
                >
                    Add Department
                </button>

            </div>

            {error && (
                <div className="departments-error">
                    {error}
                </div>
            )}

            {showForm && (
                <div className="department-form-section">

                    <div className="department-form-header">

                        <div>
                            <h2>
                                {editingDepartment
                                    ? "Edit Department"
                                    : "Add Department"}
                            </h2>

                            <p>
                                {editingDepartment
                                    ? "Update the department information."
                                    : "Create a new department."}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="close-department-form-button"
                            onClick={resetForm}
                        >
                            ×
                        </button>

                    </div>

                    <form
                        className="department-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="department-field">

                            <label htmlFor="department-name">
                                Department Name
                            </label>

                            <input
                                id="department-name"
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Enter department name"
                                required
                            />

                        </div>

                        <div className="department-form-actions">

                            <button
                                type="button"
                                className="department-cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="save-department-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editingDepartment
                                        ? "Save Changes"
                                        : "Add Department"}
                            </button>

                        </div>

                    </form>

                </div>
            )}

            <div className="departments-section">

                <div className="departments-section-header">

                    <div>
                        <h2>Departments</h2>

                        <span>
                            {filteredDepartments.length}{" "}
                            {filteredDepartments.length === 1
                                ? "department"
                                : "departments"}
                        </span>
                    </div>

                    <div className="department-search">

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            placeholder="Search departments..."
                        />

                    </div>

                </div>

                {filteredDepartments.length === 0 ? (
                    <div className="department-empty-state">
                        {searchTerm
                            ? "No departments match your search."
                            : "No departments found."}
                    </div>
                ) : (
                    <div className="departments-table-container">

                        <table className="departments-table">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredDepartments.map(
                                    (department) => (
                                        <tr key={department.id}>

                                            <td>
                                                <span className="department-name">
                                                    {department.name}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="department-actions">

                                                    <button
                                                        type="button"
                                                        className="department-edit-button"
                                                        onClick={() =>
                                                            openEditForm(
                                                                department
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="department-delete-button"
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                department
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    )
                                )}
                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            {showDeleteModal &&
                departmentToDelete && (
                    <div
                        className="department-delete-modal-overlay"
                        onClick={closeDeleteModal}
                    >
                        <div
                            className="department-delete-modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <div className="department-delete-modal-header">

                                <div>
                                    <h2>
                                        Delete Department
                                    </h2>

                                    <p>
                                        This action cannot be undone.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="department-delete-modal-close"
                                    onClick={closeDeleteModal}
                                    disabled={deleting}
                                >
                                    ×
                                </button>

                            </div>

                            <div className="department-delete-modal-content">

                                <p>
                                    Are you sure you want to
                                    delete
                                    <strong>
                                        {" "}
                                        {departmentToDelete.name}
                                    </strong>
                                    ?
                                </p>

                                <p className="department-delete-modal-warning">
                                    The department will be
                                    permanently removed.
                                </p>

                                {error && (
                                    <p className="department-delete-modal-error">
                                        {error}
                                    </p>
                                )}

                            </div>

                            <div className="department-delete-modal-actions">

                                <button
                                    type="button"
                                    className="department-delete-modal-cancel"
                                    onClick={closeDeleteModal}
                                    disabled={deleting}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="department-delete-modal-confirm"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                >
                                    {deleting
                                        ? "Deleting..."
                                        : "Delete Department"}
                                </button>

                            </div>

                        </div>
                    </div>
                )}

        </div>
    );
};

export default Departments;
