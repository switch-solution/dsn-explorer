"use client";
import { columns } from "./dataTablecolumns"
import { useContext } from "react"
import { DsnContext } from "@/src/context/dsn.context";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DataTable } from "@/components/layout/datatable";
import Link from "next/link";
import { EstablishmentObject, EmployeeObject, WorkContractObject, RateAtObject, PayroolObject, SocietyObject, MutualObject, BonusObject, WorkStoppingObject, BankObject } from "@fibre44/dsn-parser/lib/utils/type";
import { Container, ContainerBreadCrumb, ContainerCard } from "@/components/layout/containter";
export default function Page() {
    const establishmentsList: EstablishmentObject[] = []
    const employeesList: EmployeeObject[] = []
    const workContractsList: WorkContractObject[] = []
    const rateAtList: RateAtObject[] = []
    const payroolList: PayroolObject[] = []
    const societyList: SocietyObject[] = []
    const mutualList: MutualObject[] = []
    const bonusList: BonusObject[] = []
    const banksList: BankObject[] = []
    const workStoppingList: WorkStoppingObject[] = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { establishments, employees, workContracts, ratesAt, payrools, societys, mutuals, bonus, workStoppings, banks } = context;
        establishmentsList.push(...establishments)
        employeesList.push(...employees)
        workContractsList.push(...workContracts)
        rateAtList.push(...ratesAt)
        payroolList.push(...payrools)
        societyList.push(...societys)
        mutualList.push(...mutuals)
        bonusList.push(...bonus)
        workStoppingList.push(...workStoppings)
        banksList.push(...banks)
    }
    const datas = [
        {
            label: "Sociétés",
            count: societyList.length,
            data: societyList
        },
        {
            label: "Etablissements",
            count: establishmentsList.length,
            data: establishmentsList
        },
        {
            label: "Banques",
            count: banksList.length,
            data: banksList
        },
        {
            label: "Salariés",
            count: employeesList.length,
            data: employeesList
        },
        {
            label: "Contrats de travail",
            count: workContractsList.length,
            data: workContractsList
        },
        {
            label: "Taux AT",
            count: rateAtList.length,
            data: rateAtList
        },
        {
            label: "Bulletin de paie",
            count: payroolList.length,
            data: payroolList
        },
        {
            label: "Primes",
            count: bonusList.length,
            data: bonusList
        },
        {
            label: "Contrat prévoyance/mutuelle",
            count: mutualList.length,
            data: mutualList
        },
        {
            label: "Arrêt de travail",
            count: workStoppingList.length,
            data: workStoppingList
        },
        {
            label: "Mutuelle prévoyance",
            count: mutualList.length,
            data: mutualList
        }
    ]
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Accueil</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/extraction">Extraction</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerCard>
                <DataTable columns={columns} data={datas} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" />
            </ContainerCard>
        </Container>


    )

}