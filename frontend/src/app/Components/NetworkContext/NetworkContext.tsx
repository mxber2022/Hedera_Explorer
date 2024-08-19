"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context's value
interface NetworkContextType {
    isMainnet: boolean;
    apiEndpoint: string;
    toggleNetwork: () => void;
}

// Create the context with an undefined default value
const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

// Create a provider component
export const NetworkProvider = ({ children }: { children: ReactNode }) => {
    const TESTNET_API = "https://testnet.mirrornode.hedera.com";
    const MAINNET_API = "https://mainnet.mirrornode.hedera.com";

    const [isMainnet, setIsMainnet] = useState(true);
    const [apiEndpoint, setApiEndpoint] = useState(MAINNET_API);

    const toggleNetwork = () => {
        setIsMainnet(prev => !prev);
        setApiEndpoint(prev => (prev === MAINNET_API ? TESTNET_API : MAINNET_API));
    };

    return (
        <NetworkContext.Provider value={{ isMainnet, apiEndpoint, toggleNetwork }}>
            {children}
        </NetworkContext.Provider>
    );
};

// Create a hook for consuming the context
export const useNetwork = () => {
    const context = useContext(NetworkContext);
    if (context === undefined) {
        throw new Error("useNetwork must be used within a NetworkProvider");
    }
    return context;
};
