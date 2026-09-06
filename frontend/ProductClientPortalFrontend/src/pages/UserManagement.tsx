import { useEffect, useState } from "react";
import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
} from "../services/UserService";
import type { User } from "../types/UserType";
import "./UserManagement.css";

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User");
    const [isActive, setIsActive] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [deleting, setDeleting] = useState(false);

    const getRoleName = (userRole: string | number) => {
        if (typeof userRole === "number") {
            return userRole === 1 ? "Admin" : "User";
        }

        if (userRole === "1") {
            return "Admin";
        }

        return userRole;
    };

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to load users:", error);
                setError("Failed to load users.");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const reloadUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to load users:", error);
            setError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setRole("User");
        setIsActive(true);
        setEditingUser(null);
        setShowForm(false);
        setError("");
    };

    const openAddForm = () => {
        setEditingUser(null);
        setName("");
        setEmail("");
        setPassword("");
        setRole("User");
        setIsActive(true);
        setError("");
        setShowForm(true);
    };

    const openEditForm = (user: User) => {
        setEditingUser(user);
        setName(user.name);
        setEmail(user.email);
        setPassword("");
        setRole(getRoleName(user.role));
        setIsActive(user.isActive);
        setError("");
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            setError("Name and email are required.");
            return;
        }

        if (!editingUser && !password.trim()) {
            setError("Password is required when creating a user.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            if (editingUser) {
                const updatedUser: User = {
                    ...editingUser,
                    name: name.trim(),
                    email: email.trim(),
                    role: role === "Admin" ? 1 : 0,
                    isActive,
                };

                await updateUser(editingUser.id, updatedUser);
            } else {
                const newUser: User = {
                    id: 0,
                    name: name.trim(),
                    email: email.trim(),
                    password,
                    role: role === "Admin" ? 1 : 0,
                    isActive,
                };

                await addUser(newUser);
            }

            await reloadUsers();
            resetForm();
        } catch (error) {
            console.error("Failed to save user:", error);
            setError("Failed to save user.");
        } finally {
            setSaving(false);
        }
    };

    const handleToggleStatus = async (user: User) => {
        const action = user.isActive
            ? "deactivate"
            : "activate";

        try {
            setError("");

            const updatedUser: User = {
                ...user,
                role: getRoleName(user.role) === "Admin" ? 1 : 0,
                isActive: !user.isActive,
            };

            await updateUser(user.id, updatedUser);
            await reloadUsers();
        } catch (error) {
            console.error(
                `Failed to ${action} user:`,
                error
            );

            setError(`Failed to ${action} user.`);
        }
    };

    const openDeleteModal = (user: User) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
        setError("");
    };

    const closeDeleteModal = () => {
        if (deleting) {
            return;
        }

        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const handleDelete = async () => {
        if (!userToDelete) {
            return;
        }

        try {
            setDeleting(true);
            setError("");

            await deleteUser(userToDelete.id);
            await reloadUsers();

            setShowDeleteModal(false);
            setUserToDelete(null);
        } catch (error) {
            console.error("Failed to delete user:", error);
            setError("Failed to delete user.");
        } finally {
            setDeleting(false);
        }
    };

    const filteredUsers = users.filter((user) => {
        const search = searchTerm.toLowerCase().trim();
        const userRole = getRoleName(user.role).toLowerCase();

        return (
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search) ||
            userRole.includes(search)
        );
    });

    if (loading) {
        return (
            <div className="user-management">

                <div className="user-management-header">
                    <div>
                        <h1>User Management</h1>

                        <p>
                            Manage portal users and their access.
                        </p>
                    </div>
                </div>

                <div className="user-management-loading">
                    Loading users...
                </div>

            </div>
        );
    }

    return (
        <div className="user-management">

            <div className="user-management-header">

                <div>
                    <h1>User Management</h1>

                    <p>
                        Manage portal users, roles, and account status.
                    </p>
                </div>

                <button
                    type="button"
                    className="add-user-button"
                    onClick={openAddForm}
                >
                    Add User
                </button>

            </div>

            {error && (
                <div className="user-management-error">
                    {error}
                </div>
            )}

            {showForm && (
                <div className="user-form-section">

                    <div className="user-form-header">

                        <div>
                            <h2>
                                {editingUser
                                    ? "Edit User"
                                    : "Add User"}
                            </h2>

                            <p>
                                {editingUser
                                    ? "Update the user's account information."
                                    : "Create a new portal user."}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="close-form-button"
                            onClick={resetForm}
                        >
                            ×
                        </button>

                    </div>

                    <form
                        className="user-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="user-form-grid">

                            <div className="user-field">
                                <label htmlFor="name">
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Enter name"
                                    required
                                />
                            </div>

                            <div className="user-field">
                                <label htmlFor="email">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter email"
                                    required
                                />
                            </div>

                            {!editingUser && (
                                <div className="user-field">
                                    <label htmlFor="password">
                                        Password
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                            )}

                            <div className="user-field">
                                <label htmlFor="role">
                                    Role
                                </label>

                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) =>
                                        setRole(e.target.value)
                                    }
                                >
                                    <option value="User">
                                        User
                                    </option>

                                    <option value="Admin">
                                        Admin
                                    </option>
                                </select>
                            </div>

                            <div className="user-field user-status-field">

                                <label>
                                    Account Status
                                </label>

                                <label className="status-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) =>
                                            setIsActive(
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span>
                                        Active
                                    </span>
                                </label>

                            </div>

                        </div>

                        <div className="user-form-actions">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="save-user-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editingUser
                                        ? "Save Changes"
                                        : "Add User"}
                            </button>

                        </div>

                    </form>

                </div>
            )}

            <div className="users-section">

                <div className="users-section-header">

                    <div>
                        <h2>Users</h2>

                        <span>
                            {filteredUsers.length}{" "}
                            {filteredUsers.length === 1
                                ? "user"
                                : "users"}
                        </span>
                    </div>

                    <div className="user-search">

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            placeholder="Search users..."
                        />

                    </div>

                </div>

                {filteredUsers.length === 0 ? (
                    <div className="user-empty-state">
                        {searchTerm
                            ? "No users match your search."
                            : "No users found."}
                    </div>
                ) : (
                    <div className="users-table-container">

                        <table className="users-table">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((user) => {
                                    const userRole = getRoleName(user.role);

                                    return (
                                        <tr key={user.id}>

                                            <td>
                                                <span className="user-name">
                                                    {user.name}
                                                </span>
                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        userRole === "Admin"
                                                            ? "role-badge admin"
                                                            : "role-badge user"
                                                    }
                                                >
                                                    {userRole}
                                                </span>
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        user.isActive
                                                            ? "status-badge active"
                                                            : "status-badge inactive"
                                                    }
                                                >
                                                    {user.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="user-actions">

                                                    <button
                                                        type="button"
                                                        className="edit-button"
                                                        onClick={() =>
                                                            openEditForm(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="status-button"
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        {user.isActive
                                                            ? "Deactivate"
                                                            : "Activate"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="delete-button"
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            {showDeleteModal && userToDelete && (
                <div
                    className="delete-modal-overlay"
                    onClick={closeDeleteModal}
                >
                    <div
                        className="delete-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="delete-modal-header">
                            <div>
                                <h2>Delete User</h2>

                                <p>
                                    This action cannot be undone.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="delete-modal-close"
                                onClick={closeDeleteModal}
                                disabled={deleting}
                            >
                                ×
                            </button>
                        </div>

                        <div className="delete-modal-content">

                            <p>
                                Are you sure you want to delete
                                <strong> {userToDelete.name}</strong>?
                            </p>

                            <p className="delete-modal-warning">
                                The user's account and associated access
                                will be permanently removed.
                            </p>

                        </div>

                        <div className="delete-modal-actions">

                            <button
                                type="button"
                                className="delete-modal-cancel"
                                onClick={closeDeleteModal}
                                disabled={deleting}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="delete-modal-confirm"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete User"}
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default UserManagement;