"use client";
import { useContext } from "react";
import { DsnContext } from "@/src/context/dsn.context";
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
import { useRouter } from "next/navigation";
import { DsnParser } from "@/src/parser/dsnParser";
import Link from "next/link";
import { Container, ContainerBreadCrumb, ContainerCard } from "@/components/layout/containter";
export default function Page() {
    const router = useRouter()
    let dsnData = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { dsn } = context;
        dsnData.push(...dsn)
    }
    if (dsnData.length === 0) {
        router.push('/')
    }
    const employees = []
    for (const dsnRow of dsnData) {
        employees.push(...new DsnParser(dsnRow.dsnRows).employees)
    }
    const employeesDatas = employees.map(employee => {
        return {
            numSS: employee.numSS,
            lastname: employee.lastname,
            firstname: employee.firstname
        }
    })
    const setEmployee = new Set()
    const employeesFilter = employeesDatas.filter(employee => {
        if (!setEmployee.has(employee.numSS)) {
            setEmployee.add(employee.numSS)
            return employee
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
                            <Link href="/employee">Salariés</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerCard>
                <DataTable columns={columns} data={employeesFilter} inputSearch="lastname" inputSearchPlaceholder="Chercher par nom" />
            </ContainerCard>
        </Container>


    )

}