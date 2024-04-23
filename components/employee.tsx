"use client";
import { useContext } from "react"
import { DsnContext } from "@/src/context/dsn.context";
import { CardWithContent } from "@/components/layout/card";
import { ContainerCard } from "@/components/layout/containter";
import { ButtonExportCsv } from "@/components/layout/buttonExportCsv";
import { Ul, Li } from "@/components/layout/ul";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DsnParser } from "@/src/parser/dsnParser";
import { notFound, useRouter } from "next/navigation";
import type { EmployeeObject } from "@/src/type/type";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export function Employee({ query }: { query: string }) {
    const router = useRouter()
    const dsnData = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { dsn } = context;
        dsnData.push(...dsn)
    }
    if (dsnData.length === 0) {
        router.push('/')
    }

    const employees = []
    const dsnStructure = []
    for (const dsnRow of dsnData) {
        employees.push(...new DsnParser(dsnRow.dsnRows).employees)
    }
    if (dsnData.length > 0) {
        dsnStructure.push(...new DsnParser(dsnData[0].dsnRows).dsnStructure('Employee'))
    }
    const workContracts = []

    for (const dsnRow of dsnData) {
        workContracts.push(...new DsnParser(dsnRow.dsnRows).workContracts)
    }
    const payrools = []

    for (const dsnRow of dsnData) {
        payrools.push(...new DsnParser(dsnRow.dsnRows).payrool)
    }

    const employeeFind = employees.find(employee => employee.numSS === query)
    if (!employeeFind) {
        notFound()
    }
    const workContractFilter = workContracts.filter(workContract => workContract.numSS === query)

    const workContractFilterSet = new Set()
    const workContractList = []
    for (const workContract of workContractFilter) {
        const contractId = workContract.contractId
        if (!workContractFilterSet.has(contractId)) {
            workContractList.push(workContract)
            workContractFilterSet.add(contractId)
        }

    }
    const payroolFilterSet = new Set()
    const payroolList = []
    const payroolFilter = payrools.filter(payrool => payrool.numSS === query)
    for (const payrool of payroolFilter) {
        const startDatePayrool = payrool.startDatePayrool
        if (!payroolFilterSet.has(startDatePayrool)) {
            payroolList.push(payrool)
            payroolFilterSet.add(startDatePayrool)
        }
    }

    return (
        <>
            <ButtonExportCsv data={employees} />
            {query ?

                <ContainerCard>
                    <CardWithContent props={{ cardTitle: `${employeeFind?.lastname} ${employeeFind?.firstname}`, cardDescription: 'Fiche du salarié', cardFooter: `` }}>
                        <Ul>
                            {dsnStructure.map((employee) => {
                                const field = employee.field as keyof EmployeeObject
                                const dsnId = employee.dsnStructure
                                const name = employee.name
                                const value = employeeFind[field]
                                return <Li key={field} value={value ? value : ''} dsnId={dsnId} name={name} />
                            })}
                        </Ul>
                    </CardWithContent>
                    <CardWithContent props={{ cardTitle: 'Contrat de travail', cardDescription: 'Liste des contrats de travail', cardFooter: `` }}>
                        <Table>
                            <TableCaption>Contrats du salarié</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Type de contrat</TableHead>
                                    <TableHead>Date de début</TableHead>
                                    <TableHead>Date de fin</TableHead>
                                    <TableHead>Contrat id DSN</TableHead>
                                    <TableHead className="text-right">Détail</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {workContractList.map((contract) => (
                                    <TableRow key={contract.numSS}>
                                        <TableCell className="font-medium">{contract.contract}</TableCell>
                                        <TableCell>{contract.startDate}</TableCell>
                                        <TableCell>{contract.contractEndDate}</TableCell>
                                        <TableCell>{contract.contractId}</TableCell>
                                        <TableCell className="text-right"><Link href={`/employee/${query}/workContract/${contract.contractId}`}><ArrowRight /></Link></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">{workContractFilter.length}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </CardWithContent>
                    <CardWithContent props={{ cardTitle: 'Paie', cardDescription: 'Liste des bulletins de paie', cardFooter: `` }}>
                        <Table>
                            <TableCaption>Paie</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Mois de paie</TableHead>
                                    <TableHead>Date de début</TableHead>
                                    <TableHead>Contrat id DSN</TableHead>
                                    <TableHead className="text-right">Détail</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payroolList.map((payrool) => (
                                    <TableRow key={payrool.numSS}>
                                        <TableCell className="font-medium">{payrool.startDatePayrool}</TableCell>
                                        <TableCell>{payrool.amount}</TableCell>
                                        <TableCell>{payrool.type}</TableCell>
                                        <TableCell className="text-right"><Link href={`/employee/${query}/payrool/${payrool.startDatePayrool}`}><ArrowRight /></Link></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">{workContractFilter.length}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </CardWithContent>
                </ContainerCard>

                : <span>Vous devez selectionner un salarié.</span>}





        </>
    );
}
