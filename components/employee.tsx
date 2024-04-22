"use client";
import { CardWithContent } from "@/components/layout/card";
import { Container, ContainerCard, ContainerBreadCrumb } from "@/components/layout/containter";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Ul, Li } from "@/components/layout/ul";
import { ComboboxDemo } from "@/components/layout/combobox"
import { ArrowRight } from "lucide-react";
import { useDsnStore } from "@/src/store/dsn.store";
import Link from "next/link";
import { DsnParser } from "@/src/parser/dsnParser";
import { useRouter } from "next/navigation";
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
    const { dsn } = useDsnStore()
    if (dsn.length === 0) {
        router.push('/')
    }
    const employees = []
    for (const dsnRow of dsn) {
        employees.push(...new DsnParser(dsnRow.dsnRows).employees)
    }
    const workContracts = []

    for (const dsnRow of dsn) {
        workContracts.push(...new DsnParser(dsnRow.dsnRows).workContracts)
    }

    const payrools = []

    for (const dsnRow of dsn) {
        payrools.push(...new DsnParser(dsnRow.dsnRows).payrool)
    }

    const employeeFind = employees.find(employee => employee.numSS === query)
    const workContractFilter = workContracts.filter(workContract => workContract.numSS === query)
    const payroolFilter = payrools.filter(payrool => payrool.numSS === query)
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/employee">Salariés</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            {query ?
                <ContainerCard>
                    <CardWithContent props={{ cardTitle: `${employeeFind?.lastname} ${employeeFind?.firstname}`, cardDescription: 'Fiche du salarié', cardFooter: `` }}>
                        <Ul>
                            <Li>Nom : {employeeFind?.lastname}</Li>
                            <Li>Prénom : {employeeFind?.firstname}</Li>
                            <Li>Adresse 1 : {employeeFind?.address1}</Li>
                            <Li>Adresse 2 : {employeeFind?.address2}</Li>
                            <Li>Adresse 3 : {employeeFind?.address3}</Li>
                            <Li>Code postal : {employeeFind?.codeZip}</Li>
                            <Li>Ville : {employeeFind?.city}</Li>
                            <Li>Date de naissance : {employeeFind?.birthday}</Li>
                            <Li>Département de naissance : {employeeFind?.codeZipBith}</Li>
                            <Li>Ville de naissance: {employeeFind?.placeOfBith}</Li>
                            <Li>Pays de naissance: {employeeFind?.countryBirth}</Li>
                        </Ul>
                    </CardWithContent>
                    <CardWithContent props={{ cardTitle: 'Contrat de travail', cardDescription: 'Liste des contrats de travail', cardFooter: `` }}>
                        <Table>
                            <TableCaption>Contrats du salarié</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Type de contrat</TableHead>
                                    <TableHead>Date de début</TableHead>
                                    <TableHead>Contrat id DSN</TableHead>
                                    <TableHead className="text-right">Détail</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {workContractFilter.map((contract) => (
                                    <TableRow key={contract.numSS}>
                                        <TableCell className="font-medium">{contract.contract}</TableCell>
                                        <TableCell>{contract.startDate}</TableCell>
                                        <TableCell>{contract.contractId}</TableCell>
                                        <TableCell className="text-right"><Link href={`/employee/${query}/`}><ArrowRight /></Link></TableCell>
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
                                {payroolFilter.map((payrool) => (
                                    <TableRow key={payrool.numSS}>
                                        <TableCell className="font-medium">{payrool.startDatePayrool}</TableCell>
                                        <TableCell>{payrool.amount}</TableCell>
                                        <TableCell>{payrool.type}</TableCell>
                                        <TableCell className="text-right"><Link href={`/employee/${query}/payrool`}><ArrowRight /></Link></TableCell>
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





        </Container>
    );
}
