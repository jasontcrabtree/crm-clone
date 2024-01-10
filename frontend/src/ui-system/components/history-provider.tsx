'use client';

import { createContext, useContext, useState } from "react";

export interface HistoryProps {
    history: string[];
    updateHistory: (historyItem: string) => void;
}

export const HistoryContext = createContext<HistoryProps>({
    history: [],
    updateHistory: () => { }
});

const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [history, setHistory] = useState<string[]>([]);

    const updateHistory = (historyItem: string) => {
        setHistory(prevState => [...prevState, historyItem]);
    }

    return (
        <HistoryContext.Provider value={{ history, updateHistory }}>
            {children}
        </HistoryContext.Provider>
    );
}

export const useHistoryContext = () => useContext(HistoryContext);

export default HistoryProvider;
