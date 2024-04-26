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
    let employeesList = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { employees } = context;
        employeesList.push(...employees)
    }
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
                            <Link href="/employee">Salariés</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerCard>
                <DataTable columns={columns} data={employeesList} inputSearch="lastname" inputSearchPlaceholder="Chercher par nom" />
            </ContainerCard>
        </Container>


    )

}