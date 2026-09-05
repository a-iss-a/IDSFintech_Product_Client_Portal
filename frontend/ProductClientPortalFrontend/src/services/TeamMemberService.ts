import api from "./api";
import type {
    TeamMember,
    TeamMemberFormData,
} from "../types/TeamMemberType";

export const getTeamMembers = async (): Promise<TeamMember[]> => {
    const response = await api.get("/TeamMember");
    return response.data.teamMembers;
};

export const getTeamMember = async (
    id: number
): Promise<TeamMember | null> => {
    const response = await api.get(`/TeamMember/${id}`);
    return response.data.teamMember;
};

export const addTeamMember = async (
    teamMember: TeamMemberFormData
) => {
    const response = await api.post("/TeamMember/Add", teamMember);
    return response.data;
};

export const updateTeamMember = async (
    id: number,
    teamMember: TeamMemberFormData
) => {
    const response = await api.put(`/TeamMember/${id}`, {
        id,
        ...teamMember,
    });

    return response.data;
};

export const deleteTeamMember = async (id: number) => {
    await api.delete(`/TeamMember/${id}`);
};
