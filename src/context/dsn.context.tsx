"use client"
import { createContext, useState } from 'react';
export type Dsn = {
    dsnId: string,
    dsnRows: {
        id: string,
        value: string,

    }[],

}
import type { EmployeeObject, EstablishmentObject, RateAtObject, BonusObject, MutualObject, WorkContractObject } from "@/src/type/type";
type DsnContextType = {
    dsn: Dsn[];
    establishments: EstablishmentObject[],
    employees: EmployeeObject[],
    ratesAt: RateAtObject[],
    bonus: BonusObject[],
    workContracts: WorkContractObject[],
    addDsn: (file: Dsn) => void;
    addEmployees: (employee: EmployeeObject) => void,
    addEstablishments: (establishment: EstablishmentObject) => void
    addRatesAt: (rateAt: RateAtObject) => void
    addBonus: (bonus: BonusObject) => void
    addWorkContracts: (workContract: WorkContractObject) => void
};

export const DsnContext = createContext<DsnContextType | null>(null)

export function DsnContextProvider({ children }: { children: React.ReactNode }) {
    const [dsn, setDsn] = useState<Dsn[]>([]);
    const [employees, setEmployees] = useState<EmployeeObject[]>([])
    const [establishments, setEstablishments] = useState<EstablishmentObject[]>([])
    const [ratesAt, setRatesAt] = useState<RateAtObject[]>([])
    const [bonus, setBonus] = useState<BonusObject[]>([])
    const [workContracts, setWorkContracts] = useState<WorkContractObject[]>([])

    const addDsn = (file: Dsn) => {
        setDsn(prevDsn => [...prevDsn, file]);
    }
    const addEmployees = (employee: EmployeeObject) => {
        setEmployees(prevEmployee => [...prevEmployee, employee]);
    }
    const addEstablishments = (establishment: EstablishmentObject) => {
        setEstablishments(prevEstablishment => [...prevEstablishment, establishment]);
    }
    const addRatesAt = (rateAt: RateAtObject) => {
        setRatesAt(prevRateAt => [...prevRateAt, rateAt]);
    }
    const addBonus = (bonus: BonusObject) => {
        setBonus(prevBonus => [...prevBonus, bonus]);
    }
    const addWorkContracts = (workContract: WorkContractObject) => {
        setWorkContracts(prevWorkContract => [...prevWorkContract, workContract]);
    }
    return (
        <DsnContext.Provider value={{
            dsn,
            employees,
            establishments,
            ratesAt,
            bonus,
            workContracts,
            addDsn,
            addEmployees,
            addEstablishments,
            addRatesAt,
            addBonus,
            addWorkContracts

        }}>
            {children}
        </DsnContext.Provider>
    )

}
