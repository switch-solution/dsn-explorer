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
import Link from "next/link";
import { Container, ContainerBreadCrumb, ContainerCard } from "@/components/layout/containter";
export default function Page() {
    const bankList = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { banks } = context;
        bankList.push(...banks)
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
                            <Link href="/bank">Banques</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerCard>
                <DataTable columns={columns} data={bankList} inputSearch="contributionFundIBAN" inputSearchPlaceholder="Chercher par iban" />
            </ContainerCard>
        </Container>


    )

}