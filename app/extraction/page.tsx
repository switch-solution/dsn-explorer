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
import { extractionsList } from "@fibre44/dsn-parser/lib/utils/extraction"
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
            data: societyList.map((society) => {
                const row: { [key: string]: any } = {}
                Object.keys(society).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = society[key as keyof SocietyObject]
                    }
                })
                return row
            })
        },
        {
            label: "Etablissements",
            count: establishmentsList.length,
            data: establishmentsList.map((establishment) => {
                const row: { [key: string]: any } = {}
                Object.keys(establishment).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = establishment[key as keyof EstablishmentObject]
                    }
                })
                return row
            })
        },
        {
            label: "Banques",
            count: banksList.length,
            data: banksList.map((bank) => {
                const row: { [key: string]: any } = {}
                Object.keys(bank).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = bank[key as keyof BankObject]
                    }
                })
                return row
            })
        },
        {
            label: "Salariés",
            count: employeesList.length,
            data: employeesList.map((employee) => {
                const row: { [key: string]: any } = {}
                Object.keys(employee).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = employee[key as keyof EmployeeObject]
                    }
                })
                return row
            })
        },
        {
            label: "Contrats de travail",
            count: workContractsList.length,
            data: workContractsList.map((workContract) => {
                const row: { [key: string]: any } = {}
                Object.keys(workContract).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = workContract[key as keyof WorkContractObject]
                    }
                })
                return row
            })
        },
        {
            label: "Taux AT",
            count: rateAtList.length,
            data: rateAtList.map((rateAt) => {
                const row: { [key: string]: any } = {}
                Object.keys(rateAt).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = rateAt[key as keyof RateAtObject]
                    }
                })
                return row
            })
        },
        {
            label: "Bulletin de paie",
            count: payroolList.length,
            data: payroolList.map((payrool) => {
                const row: { [key: string]: any } = {}
                Object.keys(payrool).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = payrool[key as keyof PayroolObject]
                    }
                })
                return row
            })
        },
        {
            label: "Primes",
            count: bonusList.length,
            data: bonusList.map((bonus) => {
                const row: { [key: string]: any } = {}
                Object.keys(bonus).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = bonus[key as keyof BonusObject]
                    }
                })
                return row
            })
        },
        {
            label: "Contrat prévoyance/mutuelle",
            count: mutualList.length,
            data: mutualList.map((mutual) => {
                const row: { [key: string]: any } = {}
                Object.keys(mutual).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = mutual[key as keyof MutualObject]
                    }
                })
                return row

            })
        },
        {
            label: "Arrêt de travail",
            count: workStoppingList.length,
            data: workStoppingList.map((workStopping) => {
                const row: { [key: string]: any } = {}
                Object.keys(workStopping).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = workStopping[key as keyof WorkStoppingObject]
                    }
                })
                return row
            })
        },
        {
            label: "Mutuelle prévoyance",
            count: mutualList.length,
            data: mutualList.map((mutual) => {
                const row: { [key: string]: any } = {}
                Object.keys(mutual).forEach((key) => {
                    const label = extractionsList.find((extraction) => extraction.field === key)?.name
                    if (label) {
                        row[label] = mutual[key as keyof MutualObject]
                    }
                })
                return row

            })
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