"use client";
import { useContext } from "react"
import { DsnContext } from "@/src/context/dsn.context";
import { CardWithContent } from "@/components/layout/card";
import { ContainerCard } from "@/components/layout/containter";
import { Ul, Li } from "@/components/layout/ul";
import { notFound } from "next/navigation";
import type { EmployeeObject, WorkContractObject, PayroolObject, WorkStoppingObject, MutualEmployeeObject } from "@fibre44/dsn-parser/lib/utils/type";
import { extractionsList } from "@/src/extraction/extraction";
import Link from "next/link";
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
import { ArrowRight } from "lucide-react";
export function Employee({ query }: { query: string }) {
    const payroolSet = new Set<string>()
    const mutualSet = new Set<string>()
    const employeesList = []
    const workContractsList: WorkContractObject[] = []
    const payroolsList: PayroolObject[] = []
    const workStoppingList: WorkStoppingObject[] = []
    const employeeMutualList: MutualEmployeeObject[] = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { employees, workContracts, payrools, workStoppings, mutualEmployees } = context;
        employeesList.push(...employees)
        workContractsList.push(...workContracts)
        payroolsList.push(...payrools)
        workStoppingList.push(...workStoppings)
        employeeMutualList.push(...mutualEmployees)
    }
    if (employeesList.length === 0) {
        notFound()
    }

    const employeeFind = employeesList.find(employee => employee.numSS === query)
    if (!employeeFind) {
        notFound()
    }
    const workContractFilter = workContractsList.filter(workContract => workContract.numSS === query)
    const payroolFilter = payroolsList.filter(payrool => payrool.numSS === query)
    const extractionEmployee = extractionsList.filter(extraction => extraction.collection === 'Employee')
    const workStoppingFilter = workStoppingList.filter(workStopping => workStopping.numSS === query)
    const employeeMutualFilter = employeeMutualList.filter(mutualEmployee => mutualEmployee.numSS === query)
    return (

        <ContainerCard>
            <CardWithContent props={{ cardTitle: `${employeeFind?.lastname} ${employeeFind?.firstname}`, cardDescription: 'Fiche du salarié', cardFooter: `` }}>
                <Ul>
                    {extractionEmployee.map((extraction) => {
                        return <Li key={extraction.dsnStructure}
                            name={extraction.name}
                            dsnId={extraction.dsnStructure}
                            value={employeeFind?.[extraction.field as keyof EmployeeObject]}></Li>
                    })
                    }
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
                        {workContractFilter.map((workContract) => {
                            return (
                                <TableRow key={workContract.contractId}>
                                    <TableCell >{workContract.contract}</TableCell>
                                    <TableCell >{workContract.startDate}</TableCell>
                                    <TableCell >{workContract.contractEndDate}</TableCell>
                                    <TableCell >{workContract.contractId}</TableCell>
                                    <TableCell ><Link href={`/employee/${query}/workContract/${workContract.contractId}`}><ArrowRight /></Link></TableCell>
                                </TableRow>
                            )
                        })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>Total</TableCell>
                            <TableCell className="text-right">{workContractFilter.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardWithContent>
            <CardWithContent props={{ cardTitle: 'Absence', cardDescription: 'Liste des absences du salarié', cardFooter: `` }}>
                <Table>
                    <TableCaption>Absence</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Type d&apos;absence</TableHead>
                            <TableHead className="text-right">Date de début d&apos;absence</TableHead>
                            <TableHead className="text-right">Date de fin d&apos;absence</TableHead>
                            <TableHead className="text-right">Subroguation</TableHead>
                            <TableHead className="text-right">Détail</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workStoppingFilter.map((workStopping) => {
                            return (
                                <TableRow key={workStopping.date}>
                                    <TableCell >{workStopping.reasonStop}</TableCell>
                                    <TableCell >{workStopping.date}</TableCell>
                                    <TableCell >{workStopping.estimatedEndDate}</TableCell>
                                    <TableCell >{workStopping.subrogation}</TableCell>
                                    <TableCell ><Link href={`/employee/${query}/payrool/${workStopping.date}`}><ArrowRight /></Link></TableCell>
                                </TableRow>
                            )
                        })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>Total</TableCell>
                            <TableCell className="text-right">{workStoppingFilter.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardWithContent>
            <CardWithContent props={{ cardTitle: 'Mutuelle/Prévoyance', cardDescription: 'Liste des contrats mutuelle/prévoyance', cardFooter: `` }}>
                <Table>
                    <TableCaption>Absence</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Identifiant</TableHead>
                            <TableHead className="text-right">Date de début d&apos;affiliation</TableHead>
                            <TableHead className="text-right">Date de fin d&apos;affiliation</TableHead>
                            <TableHead className="text-right">Option</TableHead>
                            <TableHead className="text-right">Population</TableHead>
                            <TableHead className="text-right">Détail</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employeeMutualFilter.map((mutual) => {
                            if (!mutualSet.has(mutual.idTechAffiliationMutual)) {
                                mutualSet.add(mutual.idTechAffiliationMutual)
                                return (
                                    <TableRow key={mutual.idTechAffiliationMutual}>
                                        <TableCell >{mutual.idTechAffiliationMutual}</TableCell>
                                        <TableCell >{mutual.startDateMutualEmployee}</TableCell>
                                        <TableCell >{mutual.endDateMutualEmployee}</TableCell>
                                        <TableCell >{mutual.option}</TableCell>
                                        <TableCell >{mutual.pop}</TableCell>
                                        <TableCell ><Link href={`/employee/${query}/mutual/${mutual.idTechAffiliationMutual}`}><ArrowRight /></Link></TableCell>
                                    </TableRow>
                                )
                            }

                        })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>Total</TableCell>
                            <TableCell className="text-right">{employeeMutualFilter.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardWithContent>
            <CardWithContent props={{ cardTitle: 'Paie', cardDescription: 'Liste des bulletins de paie', cardFooter: `` }}>
                <Table>
                    <TableCaption>Paie</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Date début du bulletin de paie</TableHead>
                            <TableHead>Date fin du bulletin de paie</TableHead>
                            <TableHead>Contrat id DSN</TableHead>
                            <TableHead className="text-right">Détail</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payroolFilter.map((payrool) => {
                            if (!payroolSet.has(payrool.startDatePayrool)) {
                                payroolSet.add(payrool.startDatePayrool)
                                return (
                                    <TableRow key={payrool.startDatePayrool}>
                                        <TableCell >{payrool.startDatePayrool}</TableCell>
                                        <TableCell >{payrool.endDatePayrool}</TableCell>
                                        <TableCell >{payrool.contractId}</TableCell>
                                        <TableCell ><Link href={`/employee/${query}/payrool/${payrool.startDatePayrool}`}><ArrowRight /></Link></TableCell>
                                    </TableRow>
                                )
                            }

                        })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">{payroolSet.size}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardWithContent>
        </ContainerCard>

    );
}
