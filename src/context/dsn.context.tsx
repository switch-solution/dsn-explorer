"use client"
import { createContext, useState } from 'react';
export type Dsn = {
    dsnId: string,
    dsnRows: {
        id: string,
        value: string,

    }[],
}
type DsnContextType = {
    dsn: Dsn[];
    addDsn: (file: Dsn) => void;
};

export const DsnContext = createContext<DsnContextType | null>(null)

export function DsnContextProvider({ children }: { children: React.ReactNode }) {
    const [dsn, setDsn] = useState<Dsn[]>([]);
    const addDsn = (file: Dsn) => {
        setDsn(prevDsn => [...prevDsn, file]);
    }
    return (
        <DsnContext.Provider value={{
            dsn,
            addDsn
        }}>
            {children}
        </DsnContext.Provider>
    )

}
