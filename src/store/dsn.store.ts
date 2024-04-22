import { create } from "zustand";

type Dsn = {
    dsnId: string,
    dsnRows: {
        id: string,
        value: string,

    }[],
}

type DsnStoreType = {
    dsn: (Dsn)[], // Change the type of 'files' property
    addDsn: (file: Dsn) => void,
}

export const useDsnStore = create<DsnStoreType>((set) => ({
    dsn: [],
    addDsn: (file) => set((state) => ({ dsn: [...state.dsn, file] })),
}))