"use client";
import { useState, useContext } from "react"
import { DsnContext } from "@/src/context/dsn.context";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import type { Dsn } from "@/src/context/dsn.context";
import type { EmployeeObject, EstablishmentObject, RateAtObject, WorkContractObject } from "@/src/type/type";
import { DsnParser } from "@/src/parser/dsnParser";
export default function UploadFileDsn() {
    const dsnData: Dsn[] = []
    const addDSnData: Dsn[] = []
    const establishmentSet = new Set<string>()
    const employeeSet = new Set<string>()
    const workContractSet = new Set<string>()
    const rateAtSet = new Set<string>()
    let addFile: (file: Dsn) => void;
    let addEstablishment: (establishment: EstablishmentObject) => void;
    let addEmployee: (employee: EmployeeObject) => void;
    let addRateAt: (rateAt: RateAtObject) => void;
    let addWorkContract: (workContract: WorkContractObject) => void;
    const employeeList: EmployeeObject[] = []
    const establishmentsList: EstablishmentObject[] = []

    const context = useContext(DsnContext);
    if (context !== null) {
        const { dsn, employees, establishments, addDsn, addEstablishments, addEmployees, addRatesAt, addWorkContracts } = context;
        dsnData.push(...dsn)
        employeeList.push(...employees)
        establishmentsList.push(...establishments)
        addFile = addDsn
        addEstablishment = addEstablishments
        addEmployee = addEmployees
        addRateAt = addRatesAt
        addWorkContract = addWorkContracts
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

        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
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

        router.push("/establishment")



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