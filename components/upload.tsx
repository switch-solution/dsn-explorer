"use client";
import { useState, useContext } from "react"
import { DsnContext } from "@/src/context/dsn.context";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import type { Dsn } from "@/src/context/dsn.context";
import { DsnParser } from "@fibre44/dsn-parser";
import type { EmployeeObject, EstablishmentObject, JobObject, IdccObject, RateAtObject, WorkContractObject, ContributionObject, BankObject, WorkStoppingObject, PayroolObject, SocietyObject, MutualObject, MutualEmployeeObject } from "@fibre44/dsn-parser/lib/utils/type";

export default function UploadFileDsn() {

    const dsnData: Dsn[] = []
    const addDSnData: Dsn[] = []
    const establishmentSet = new Set<string>()
    const employeeSet = new Set<string>()
    const workContractSet = new Set<string>()
    const rateAtSet = new Set<string>()
    const workStoppingSet = new Set<string>()
    const payroolSet = new Set<string>()
    const societySet = new Set<string>()
    const mutualSet = new Set<string>()
    const mutualEmployeeSet = new Set<string>()
    const contributionSet = new Set<string>()
    const bankSet = new Set<string>()
    const jobSet = new Set<string>()
    const idccSet = new Set<string>()
    let addFile: (file: Dsn) => void;
    let addEstablishment: (establishment: EstablishmentObject) => void;
    let addJobLabel: (job: JobObject) => void;
    let addIdccLabel: (idcc: IdccObject) => void;
    let addEmployee: (employee: EmployeeObject) => void;
    let addRateAt: (rateAt: RateAtObject) => void;
    let addWorkContract: (workContract: WorkContractObject) => void;
    let addWorkStopping: (workStopping: WorkStoppingObject) => void;
    let addPayrool: (payrool: PayroolObject) => void;
    let addSociety: (society: SocietyObject) => void;
    let addMutual: (mutual: MutualObject) => void;
    let addMutualEmployee: (mutualEmployee: MutualEmployeeObject) => void;
    let addIdcc: (idcc: IdccObject) => void;
    let removeAll: () => void;
    let addContribution: (contribution: ContributionObject) => void;
    let addBank: (bank: BankObject) => void;
    const employeeList: EmployeeObject[] = []
    const establishmentsList: EstablishmentObject[] = []
    const workStoppingList: WorkStoppingObject[] = []
    const payroolList: PayroolObject[] = []
    const mutualList: MutualObject[] = []
    const banksList: BankObject[] = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { dsn,
            employees,
            establishments,
            workStoppings,
            payrools, mutuals,
            mutualEmployees,
            contribution,
            banks,
            jobs,
            addDsn,
            addEstablishments,
            addEmployees,
            addIdcc,
            addJobs,
            addRatesAt,
            addWorkContracts,
            addWorkStoppings,
            addPayrools,
            addSocietys,
            addMutuals,
            removeDsn,
            addMutualsEmployees,
            addContributions,
            addBanks } = context;
        dsnData.push(...dsn)
        employeeList.push(...employees)
        establishmentsList.push(...establishments)
        workStoppingList.push(...workStoppings)
        payroolList.push(...payrools)
        mutualList.push(...mutuals)
        banksList.push(...banks)
        addFile = addDsn
        addEstablishment = addEstablishments
        addEmployee = addEmployees
        addRateAt = addRatesAt
        addWorkContract = addWorkContracts
        addWorkStopping = addWorkStoppings
        addPayrool = addPayrools
        addSociety = addSocietys
        addMutual = addMutuals
        removeAll = removeDsn
        addJobLabel = addJobs
        addIdccLabel = addIdcc
        addMutualEmployee = addMutualsEmployees
        addContribution = addContributions
        addBank = addBanks
    }
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const parseFile = async (file: File, random: string) => {
        return new Promise((resolve, reject) => {
            const dsnRows: any = []
            const dsnRowsObject: { id: string, value: string }[] = []
            const reader = new FileReader()
            reader.readAsText(file, 'ISO-8859-1');
            reader.onload = function (e: any) {
                // Le contenu du fichier est dans e.target.result
                dsnRows.splice(0, dsnRows.length)
                //On récupère le texte dans la variable dsnRows
                if (e.target && e.target.result) {
                    const text = e.target.result as string; //Une structure DSN ressemble à ca S10.G00.00.003,'11.0.9.0.2'
                    const lines = text.split('\n'); //On split le texte en lignes
                    dsnRows.push(...lines);
                    for (const row of dsnRows) {
                        let lineSplit = row.split(`,'`) //On split chaque ligne en colonnes
                        let id = lineSplit.at(0)
                        let value = lineSplit.at(1).replace(/'/g, "").replace(/\r/g, "")
                        dsnRowsObject.push({
                            id,
                            value
                        });
                    }
                }
                resolve(dsnRowsObject);

            }//Fin boucle lecture
            reader.onerror = function (e) {
                reject(new Error("Erreur de lecture du fichier : " + e));
            };
        })
    }

    const extractData = async (dsnData: Dsn[]) => {
        for (let dsn of dsnData) {
            const parser = new DsnParser(dsn.dsnRows)
            const establishment = parser.establishment
            if (!establishmentSet.has(establishment.nic)) {
                establishmentSet.add(establishment.nic)
                addEstablishment(establishment)
            }
            const jobs = parser.job
            for (const job of jobs) {
                if (!jobSet.has(job.employmentLabel)) {
                    jobSet.add(job.employmentLabel)
                    addJobLabel(job)
                }
            }
            const idcc = parser.idcc
            for (const idccObject of idcc) {
                if (!idccSet.has(idccObject.idcc)) {
                    idccSet.add(idccObject.idcc)
                    addIdccLabel(idccObject)
                }
            }
            const employees = parser.employees
            for (const employee of employees) {
                if (!employeeSet.has(employee.numSS)) {
                    employeeSet.add(employee.numSS)
                    addEmployee(employee)
                }
            }
            const ratesAt = parser.rateAt
            for (const rateAt of ratesAt) {
                if (!rateAtSet.has(rateAt.idWorkAccidentRisk)) {
                    rateAtSet.add(rateAt.idWorkAccidentRisk)
                    addRateAt(rateAt)
                }
            }
            const workContracts = parser.workContracts
            for (const workContract of workContracts) {
                if (!workContractSet.has(`${workContract.numSS}-${workContract.contractId}`)) {
                    workContractSet.add(`${workContract.numSS}-${workContract.contractId}`)
                    addWorkContract(workContract)
                }
            }
            const workStoppings = parser.workStopping
            for (const workStopping of workStoppings) {
                if (!workStoppingSet.has(`${workStopping.numSS}-${workStopping.date}`)) {
                    workStoppingSet.add(`${workStopping.numSS}-${workStopping.date}`)
                    addWorkStopping(workStopping)
                }
            }
            const payrools = parser.payrool
            for (const payrool of payrools) {
                addPayrool(payrool)

            }
            const society = parser.society
            if (!societySet.has(society.siren)) {
                societySet.add(society.siren)
                addSociety(society)
            }
            const mutuals = parser.mutual
            for (const mutual of mutuals) {
                if (!mutualSet.has(mutual.contractId ? mutual.contractId : "")) {
                    mutualSet.add(mutual.contractId ? mutual.contractId : "")
                    addMutual(mutual)
                }
            }
            const mutualEmployees = parser.mutualEmployee
            for (const mutualEmployee of mutualEmployees) {
                if (!mutualEmployeeSet.has(mutualEmployee.idTechAffiliationMutual)) {
                    mutualEmployeeSet.add(mutualEmployee.idTechAffiliationMutual)
                    addMutualEmployee(mutualEmployee)
                }
            }
            const contributions = parser.contribution
            for (const contribution of contributions) {
                if (!contributionSet.has(contribution.idContribution)) {
                    contributionSet.add(contribution.idContribution)
                    addContribution(contribution)
                }
                addContribution(contribution)
            }
            const banks = parser.bank
            for (const bank of banks) {
                if (!bankSet.has(bank.contributionFundIBAN)) {
                    bankSet.add(bank.contributionFundIBAN)
                    addBank(bank)
                }
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)
        toast(`Début chargement des données`, {
            description: new Date().toLocaleDateString(),
            action: {
                label: "fermer",
                onClick: () => undefined,
            },
        })
        removeAll()

        const dsn = (e.target as HTMLFormElement).elements[0] as HTMLInputElement
        const files = dsn.files ? Array.from(dsn.files) : []
        try {
            //Load file
            for (let file of files) {
                const random = Math.random().toString(36).substring(7)
                const dsnRows = await parseFile(file, random) as { id: string, value: string }[]
                addFile({ dsnId: random, dsnRows: dsnRows })
                addDSnData.push({ dsnId: random, dsnRows: dsnRows })
            }
            //Extraction file
            await extractData(addDSnData)


        } catch (err) {
            setLoading(false);
            toast(`${err}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => {
                    },
                },
            });
            console.error(err);
        }

        toast(`Fin chargement des données`, {
            description: new Date().toLocaleDateString(),
            action: {
                label: "fermer",
                onClick: () => undefined,
            },
        })
        router.push("/extraction")
        setLoading(false);

    }
    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="dsn">DSN</Label>
            <Input id="dsn" name="dsn" type="file" accept=".dsn" required multiple />
            <Button type="submit" disabled={loading}>Envoyer</Button>
        </form>

    )

}