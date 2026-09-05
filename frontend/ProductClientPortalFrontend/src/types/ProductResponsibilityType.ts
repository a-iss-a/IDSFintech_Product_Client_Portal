import type { Product } from "./ProductType";
import type { TeamMember } from "./TeamMemberType";

export interface ProductResponsibility {
    id: number;
    productId: number;
    teamMemberId: number;
    responsibility: string;
    description: string | null;
}

export interface ProductResponsibilityFormData {
    productId: number;
    teamMemberId: number;
    responsibility: string;
    description: string;
    product: Product;
    teamMember: TeamMember;
}
