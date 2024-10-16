import { jwtDecode } from "jwt-decode";
import apiClient, { setAuthToken } from "../api/apiClient";
import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

export enum Role {
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    CLIENT = "CLIENT",
}

interface AuthProps {
    authState: {authenticated: boolean | null; username: string | null; role: Role | null};
    onLogin: (username: string, password: string) => void;
    onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        authenticated: boolean | null;
        username: string | null;
        role: Role | null;
    }>({
        authenticated: null,
        username: null,
        role: null,
    });

    async function login(username: string, password: string) {
        const loginResponse = await apiClient.post("/auth/login", { username, password });
        if (loginResponse.status === 200) {
            const token = loginResponse.data.token;
            const decodedToken: { role: Role; sub: string } = jwtDecode(token);
            const role = decodedToken.role;
            const username = decodedToken.sub;
            setAuthState({
                authenticated: true,
                username: username,
                role: role,
            });
            setAuthToken(token);
        } else {
            Alert.alert("Error", "Invalid username or password");
        }
    };

    const logout = async () => {
        setAuthState({ 
            authenticated: false, 
            username: null, 
            role: null 
        });
        setAuthToken(null);
    };

    const value = {
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}