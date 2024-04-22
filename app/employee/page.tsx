"use client";
import { columns } from "./dataTablecolumns"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DataTable } from "@/components/layout/datatable";
import { useDsnStore } from "@/src/store/dsn.store";
import { useRouter } from "next/navigation";
import { DsnParser } from "@/src/parser/dsnParser";
import { Container, ContainerBreadCrumb, ContainerCard } from "@/components/layout/containter";
export default function Page() {
    const router = useRouter()
    const { dsn } = useDsnStore()
    if (dsn.length === 0) {
        router.push('/')
    }
    const employees = []
    for (const dsnRow of dsn) {
        employees.push(...new DsnParser(dsnRow.dsnRows).employees)
    }
    const employeesDatas = employees.map(employee => {
        return {
            numSS: employee.numSS,
            lastname: employee.lastname,
            firstname: employee.firstname
        }
    })
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
            <ContainerCard>
                <DataTable columns={columns} data={employeesDatas} inputSearch="lastname" inputSearchPlaceholder="Chercher par nom" />
            </ContainerCard>
        </Container>


    )

}