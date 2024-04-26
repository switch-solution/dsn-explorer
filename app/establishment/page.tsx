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
import { EstablishmentObject } from "@/src/type/type";
import { Container, ContainerBreadCrumb, ContainerCard } from "@/components/layout/containter";
export default function Page() {
    const establishmentsList: EstablishmentObject[] = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { establishments } = context;
        establishmentsList.push(...establishments)
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
                            <Link href="/establishment">Etablissements</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerCard>
                <DataTable columns={columns} data={establishmentsList} inputSearch="nic" inputSearchPlaceholder="Chercher par NIC" />
            </ContainerCard>
        </Container>


    )

}