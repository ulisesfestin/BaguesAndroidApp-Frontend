
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    code: string;
    imageUrl?: string;
}

export interface AuthProps {
    authState: {authenticated: boolean | null; username: string | null; role: Role | null; id: string | null};
    onLogin: (username: string, password: string) => void;
    onRegister: (username: string, email: string, firstName: string, lastName: string, password: string, phoneNumber: string) => void;
    onLogout: () => void;
}

export enum Role {
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    CLIENT = "CLIENT",
}

export interface Order {
    id: number;
    type: string;
    status: string;
    details: {
      productName: string;
      quantity: number;
    }[];
}