"use client"
import { createContext, useState } from "react";


//default values
export const userContextDefault: UserContextData = {
    token: null,
    handleToken: (token: string | null) => { }
};

//provider
export const UserContext = createContext<UserContextData>(
    userContextDefault
);

//hooks that components can use to change the values
export function useUserContextValue(): UserContextData {
    const [token, setToken] = useState<string | null>(null);

    const handleToken = (token: string | null) => {
        setToken(token)
    };

    return {
        token,
        handleToken,
    };
}


export const UserContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = useUserContextValue()
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};