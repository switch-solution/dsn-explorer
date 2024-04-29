"use client"
import { createContext, useState } from 'react';
export type Dsn = {
    dsnId: string,
    dsnRows: {
        id: string,
        value: string,

    }[],

}
import type { EmployeeObject, EstablishmentObject, RateAtObject, BonusObject, PayroolObject, ContributionObject, WorkContractObject, SocietyObject, WorkStoppingObject, MutualObject, MutualEmployeeObject, BankObject } from "@fibre44/dsn-parser/lib/utils/type";
type DsnContextType = {
    dsn: Dsn[];
    establishments: EstablishmentObject[],
    societys: SocietyObject[],
    employees: EmployeeObject[],
    ratesAt: RateAtObject[],
    bonus: BonusObject[],
    workContracts: WorkContractObject[],
    workStoppings: WorkStoppingObject[],
    payrools: PayroolObject[],
    mutuals: MutualObject[],
    mutualEmployees: MutualEmployeeObject[],
    contribution: ContributionObject[],
    banks: BankObject[],
    addDsn: (file: Dsn) => void;
    addEmployees: (employee: EmployeeObject) => void,
    addEstablishments: (establishment: EstablishmentObject) => void
    addRatesAt: (rateAt: RateAtObject) => void
    addBonus: (bonus: BonusObject) => void
    addWorkContracts: (workContract: WorkContractObject) => void
    addSocietys: (society: SocietyObject) => void
    addWorkStoppings: (workStopping: WorkStoppingObject) => void
    addPayrools: (payrool: PayroolObject) => void
    addMutuals: (mutual: MutualObject) => void
    addMutualsEmployees: (mutualEmployee: MutualEmployeeObject) => void
    addContributions: (contribution: ContributionObject) => void
    addBanks: (bank: BankObject) => void
    removeDsn: () => void
};

export const DsnContext = createContext<DsnContextType | null>(null)

export function DsnContextProvider({ children }: { children: React.ReactNode }) {
    const [dsn, setDsn] = useState<Dsn[]>([]);
    const [societys, setSocietys] = useState<SocietyObject[]>([])
    const [employees, setEmployees] = useState<EmployeeObject[]>([])
    const [establishments, setEstablishments] = useState<EstablishmentObject[]>([])
    const [ratesAt, setRatesAt] = useState<RateAtObject[]>([])
    const [bonus, setBonus] = useState<BonusObject[]>([])
    const [workContracts, setWorkContracts] = useState<WorkContractObject[]>([])
    const [workStoppings, setWorkStoppings] = useState<WorkStoppingObject[]>([])
    const [payrools, setPayrools] = useState<PayroolObject[]>([])
    const [mutuals, setMutuals] = useState<MutualObject[]>([])
    const [mutualEmployees, setMutualEmployees] = useState<MutualEmployeeObject[]>([])
    const [contribution, setContribution] = useState<ContributionObject[]>([])
    const [banks, setBanks] = useState<BankObject[]>([])
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
    const addSocietys = (society: SocietyObject) => {
        setSocietys(prevSociety => [...prevSociety, society]);
    }
    const addWorkStoppings = (workStopping: WorkStoppingObject) => {
        setWorkStoppings(prevWorkStopping => [...prevWorkStopping, workStopping]);
    }
    const addPayrools = (payrool: PayroolObject) => {
        setPayrools(prevPayrool => [...prevPayrool, payrool]);
    }
    const addMutuals = (mutual: MutualObject) => {
        setMutuals(prevMutual => [...prevMutual, mutual]);
    }
    const addMutualsEmployees = (mutualEmployee: MutualEmployeeObject) => {
        setMutualEmployees(prevMutualEmployee => [...prevMutualEmployee, mutualEmployee]);
    }
    const addContributions = (contribution: ContributionObject) => {
        setContribution(prevContribution => [...prevContribution, contribution]);
    }
    const addBanks = (bank: BankObject) => {
        setBanks(prevBank => [...prevBank, bank]);
    }
    const removeDsn = () => {
        setDsn([]);
        setEmployees([]);
        setEstablishments([]);
        setRatesAt([]);
        setBonus([]);
        setWorkContracts([]);
        setSocietys([]);
        setWorkStoppings([]);
        setPayrools([]);
        setMutuals([]);
        setMutualEmployees([]);
        setContribution([]);
        setBanks([]);
    }
    return (
        <DsnContext.Provider value={{
            dsn,
            societys,
            employees,
            establishments,
            ratesAt,
            bonus,
            workContracts,
            workStoppings,
            payrools,
            mutuals,
            mutualEmployees,
            contribution,
            banks,
            addDsn,
            addEmployees,
            addEstablishments,
            addRatesAt,
            addBonus,
            addWorkContracts,
            addSocietys,
            addWorkStoppings,
            addPayrools,
            addMutuals,
            addMutualsEmployees,
            removeDsn,
            addContributions,
            addBanks
        }}>
            {children}
        </DsnContext.Provider>
    )

}
