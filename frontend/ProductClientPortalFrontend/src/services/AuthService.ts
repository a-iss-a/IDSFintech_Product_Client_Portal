import api from "./api"

export interface LoginRequest{
    email: string,
    password: string
}

export const login = async (loginRequest: LoginRequest) => {
    const response = await api.post("/Auth/login", loginRequest);
    localStorage.setItem("token", response.data.token);
    return response.data;
};