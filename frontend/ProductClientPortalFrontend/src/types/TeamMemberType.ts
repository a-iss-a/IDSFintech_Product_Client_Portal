export interface TeamMember {
    id: number;
    departmentId: number | null;
    name: string;
    jobTitle: string | null;
    email: string;
    status: string;
}

export interface TeamMemberFormData {
    departmentId: number | null;
    name: string;
    jobTitle: string;
    email: string;
    status: string;
}
