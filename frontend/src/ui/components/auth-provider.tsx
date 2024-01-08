
"use client";

import { AuthProps, AuthProviderProps } from "@/lib/types/auth";
import { createContext } from "react";

export const AuthContext = createContext<AuthProps>({ session: false });

const AuthProvider = ({ children, session }: AuthProviderProps) => {
    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
