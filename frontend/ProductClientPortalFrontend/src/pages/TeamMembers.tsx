import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TeamMember } from "../types/TeamMemberType";
import type { Department } from "../types/DepartmentType";
import {
    getTeamMembers,
    deleteTeamMember,
} from "../services/TeamMemberService";
import { getDepartments } from "../services/DepartmentService";
import "./TeamMembers.css";

const TeamMembers = () => {
    const navigate = useNavigate();

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        const loadData = async () => {
        try {
            const [members, departmentList] = await Promise.all([
                getTeamMembers(),
                getDepartments(),
            ]);

            setTeamMembers(members);
            setDepartments(departmentList);
        } catch (error) {
            console.error("Failed to load team members:", error);
        }
    };
        loadData();
    }, []);

    const getDepartmentName = (departmentId: number | null) => {
        if (!departmentId) {
            return "No Department";
        }

        const department = departments.find(
            (item) => item.id === departmentId
        );

        return department?.name ?? "Unknown";
    };

    const filteredTeamMembers = teamMembers.filter((member) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            member.name.toLowerCase().includes(search) ||
            (member.jobTitle?.toLowerCase().includes(search) ?? false) ||
            member.email.toLowerCase().includes(search);

        const matchesDepartment =
            selectedDepartment === "" ||
            member.departmentId === Number(selectedDepartment);

        const matchesStatus =
            selectedStatus === "" ||
            member.status.toLowerCase() === selectedStatus.toLowerCase();

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus
        );
    });

    const handleDelete = async () => {
        if (deleteId === null) {
            return;
        }

        try {
            await deleteTeamMember(deleteId);

            setTeamMembers((current) =>
                current.filter((member) => member.id !== deleteId)
            );

            setDeleteId(null);
        } catch (error) {
            console.error("Failed to delete team member:", error);
        }
    };

    return (
        <div className="team-members-page">
            <div className="team-members-header">
                <div>
                    <h1>Team Members</h1>
                    <p>Manage the team members in the organization.</p>
                </div>

                <button
                    className="add-team-member-button"
                    onClick={() => navigate("/team-members/new")}
                >
                    + Add Team Member
                </button>
            </div>

            <div className="team-members-filters">
                <div className="search-container">
                    <label htmlFor="team-member-search">
                        Search
                    </label>

                    <input
                        id="team-member-search"
                        type="text"
                        placeholder="Search by name, job title or email..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />
                </div>

                <div className="filter-container">
                    <label htmlFor="department-filter">
                        Department
                    </label>

                    <select
                        id="department-filter"
                        value={selectedDepartment}
                        onChange={(event) =>
                            setSelectedDepartment(event.target.value)
                        }
                    >
                        <option value="">All Departments</option>

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

                <div className="filter-container">
                    <label htmlFor="status-filter">
                        Status
                    </label>

                    <select
                        id="status-filter"
                        value={selectedStatus}
                        onChange={(event) =>
                            setSelectedStatus(event.target.value)
                        }
                    >
                        <option value="">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="team-members-table-container">
                <table className="team-members-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job Title</th>
                            <th>Department</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTeamMembers.length > 0 ? (
                            filteredTeamMembers.map((member) => (
                                <tr key={member.id}>
                                    <td className="member-name">
                                        {member.name}
                                    </td>

                                    <td>
                                        {member.jobTitle || "—"}
                                    </td>

                                    <td>
                                        {getDepartmentName(
                                            member.departmentId
                                        )}
                                    </td>

                                    <td>{member.email}</td>

                                    <td>
                                        <span
                                            className={`member-status ${member.status.toLowerCase()}`}
                                        >
                                            {member.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="team-member-actions">

                                            <button className="view-button" onClick={() => 
                                                navigate(`/team-members/${member.id}`
                                                ) } >   
                                                 View 
                                            </button>
                                            <button
                                                className="edit-button"
                                                onClick={() =>
                                                    navigate(
                                                        `/team-members/${member.id}/edit`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    setDeleteId(member.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="empty-team-members"
                                >
                                    No team members found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {deleteId !== null && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal">
                        <h2>Delete Team Member</h2>

                        <p>
                            Are you sure you want to delete this team
                            member?
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

export default TeamMembers;
