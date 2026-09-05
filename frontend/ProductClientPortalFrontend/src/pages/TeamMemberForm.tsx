import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {
    TeamMemberFormData,
} from "../types/TeamMemberType";
import type { Department } from "../types/DepartmentType";
import {
    getTeamMember,
    addTeamMember,
    updateTeamMember,
} from "../services/TeamMemberService";
import { getDepartments } from "../services/DepartmentService";
import "./TeamMemberForm.css";

const TeamMemberForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const isEditMode = Boolean(id);

    const [departments, setDepartments] = useState<Department[]>([]);

    const [formData, setFormData] = useState<TeamMemberFormData>({
        departmentId: null,
        name: "",
        jobTitle: "",
        email: "",
        status: "Active",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const departmentList = await getDepartments();
                setDepartments(departmentList);

                if (isEditMode) {
                    const teamMember = await getTeamMember(Number(id));

                    if (teamMember) {
                        setFormData({
                            departmentId: teamMember.departmentId,
                            name: teamMember.name,
                            jobTitle: teamMember.jobTitle ?? "",
                            email: teamMember.email,
                            status: teamMember.status,
                        });
                    }
                }
            } catch (error) {
                console.error(
                    "Failed to load team member data:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, isEditMode]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]:
                name === "departmentId"
                    ? value === ""
                        ? null
                        : Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setSaving(true);

            if (isEditMode) {
                await updateTeamMember(
                    Number(id),
                    formData
                );
            } else {
                await addTeamMember(formData);
            }

            navigate("/team-members");
        } catch (error) {
            console.error(
                "Failed to save team member:",
                error
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="team-member-form-page">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="team-member-form-page">
            <div className="team-member-form-header">
                <div>
                    <h1>
                        {isEditMode
                            ? "Edit Team Member"
                            : "Add Team Member"}
                    </h1>

                    <p>
                        {isEditMode
                            ? "Update the team member information."
                            : "Add a new team member to the organization."}
                    </p>
                </div>
            </div>

            <form
                className="team-member-form"
                onSubmit={handleSubmit}
            >
                <div className="form-field">
                    <label htmlFor="name">
                        Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter team member name"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="jobTitle">
                        Job Title
                    </label>

                    <input
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Enter job title"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="departmentId">
                        Department
                    </label>

                    <select
                        id="departmentId"
                        name="departmentId"
                        value={formData.departmentId ?? ""}
                        onChange={handleChange}
                    >
                        <option value="">
                            No Department
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department.id}
                                value={department.id}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
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
                    </select>
                </div>

                <div className="team-member-form-actions">
                    <button
                        type="button"
                        className="cancel-form-button"
                        onClick={() =>
                            navigate("/team-members")
                        }
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-form-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : isEditMode
                                ? "Update Team Member"
                                : "Add Team Member"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeamMemberForm;

