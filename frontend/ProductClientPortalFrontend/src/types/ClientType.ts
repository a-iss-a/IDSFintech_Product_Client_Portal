export interface Client {
    id: number;
    companyName: string;
    country: string;
    email: string | null;
    phoneNumber: string | null;
    status: string;
    notes: string | null;
}


export interface ClientFormData {
    companyName: string;
    country: string;
    email: string;
    phoneNumber: string;
    status: string;
    notes: string;
}
