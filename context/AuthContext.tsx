import { jwtDecode } from "jwt-decode";
import apiClient, { setAuthToken } from "../api/apiClient";
import { createContext, useContext, useState } from "react";
import { AuthProps, Role } from "../types/types";
import { showAlert } from "@/utils/alerts";

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        authenticated: boolean | null;
        username: string | null;
        role: Role | null;
        id: string | null;
    }>({
        authenticated: null,
        username: null,
        role: null,
        id: null,
    });

    async function login(username: string, password: string) {
        const loginResponse = await apiClient.post("/auth/login", { username, password });
        if (loginResponse.status === 200) {
            const token = loginResponse.data.token;
            const userId = loginResponse.data.id; 
            const decodedToken: { role: Role; sub: string } = jwtDecode(token);
            const role = decodedToken.role;
            const username = decodedToken.sub;
            setAuthState({
                authenticated: true,
                username: username,
                role: role,
                id: userId,
            });
            setAuthToken(token);
        } else {
            showAlert("Invalid username or password");
        }
    };

    async function register(username: string, email: string, firstName: string, lastName: string, password: string, phoneNumber: string) {
        const registerResponse = await apiClient.post("/auth/register", { username, email, firstName, lastName, password, phoneNumber });
        if (registerResponse.status === 200) {
            const token = registerResponse.data.token;
            const userId = registerResponse.data.id; 
            const decodedToken: { role: Role; sub: string } = jwtDecode(token);
            const role = decodedToken.role;
            const username = decodedToken.sub;
            setAuthState({
                authenticated: true,
                username: username,
                role: role,
                id: userId,
            });
            setAuthToken(token);
        } else {
            showAlert("There was an error registering your account. Please try again.");
        }
    }

    const logout = async () => {
        setAuthState({ 
            authenticated: false, 
            username: null, 
            role: null,
            id: null,
        });
        setAuthToken(null);
    };

    const value = {
        onLogin: login,
        onLogout: logout,
        onRegister: register,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}