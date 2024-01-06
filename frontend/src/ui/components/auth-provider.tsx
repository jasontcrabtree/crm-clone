"use client";

import { createContext } from "react";

export interface AuthProviderProps {
    children?: React.ReactNode;
    session?: {
        user: {
            name?: string;
            password?: string;
            email?: string;
            image?: string;
        }
    }
}

export const AuthContext = createContext<AuthProviderProps>({});

const AuthProvider = ({ children, session }: AuthProviderProps) => {

    console.log('session', session)

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;