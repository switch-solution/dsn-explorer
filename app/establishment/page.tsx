"use client";
import { columns } from "./dataTablecolumns"
import { useState, useContext } from "react"
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
import { useRouter } from "next/navigation";
import { DsnParser } from "@/src/parser/dsnParser";
import { Container, ContainerBreadCrumb, ContainerCard } from "@/components/layout/containter";
export default function Page() {
    const dsnData = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { dsn } = context;
        dsnData.push(...dsn)
    }
    const router = useRouter()
    //const { dsn } = useDsnStore()
    if (dsnData.length === 0) {
        router.push('/')
    }
    const establishementSet = new Set()
    const establishments = []
    for (const dsnRow of dsnData) {
        const establishment = new DsnParser(dsnRow.dsnRows).establishment
        const nic = establishment.nic
        if (!establishementSet.has(nic)) {
            establishments.push({
                id: dsnRow.dsnId,
                establishment: new DsnParser(dsnRow.dsnRows).establishment
            })
            establishementSet.add(nic)
        }
    }
    const establishmentDatas = establishments.map(establishment => {
        return {
            nic: establishment.establishment.nic,
            apet: establishment.establishment.apet
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
                            <Link href="/establishment">Etablissements</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerCard>
                <DataTable columns={columns} data={establishmentDatas} inputSearch="nic" inputSearchPlaceholder="Chercher par NIC" />
            </ContainerCard>
        </Container>


    )

}