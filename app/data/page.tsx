"use client";
import { useContext } from "react";
import { DsnContext } from "@/src/context/dsn.context";
import { columns } from "./columns"
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
import { DataTable } from "@/components/layout/datatable";
import Link from "next/link";

export default function Page() {
    const dsnData = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { dsn } = context;
        dsnData.push(...dsn)
    }
    const datas = dsnData.map((data) => {
        return data.dsnRows.map((row) => {
            return {
                id: data.dsnId,
                dsnId: row.id,
                value: row.value
            }
        })

    }).flat(1)
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
                            <Link href="/data">Vos données</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerCard>
                <CardWithContent props={{ cardTitle: 'Upload fichier DSN', cardDescription: 'Cette utilitaire fonctionne uniquement en local. Vos données ne sont pas envoyées sur le serveur.', cardFooter: `Actuellement l\'application contient ${dsnData.length}` }}>
                    <DataTable columns={columns} data={datas} inputSearch="id" inputSearchPlaceholder="Chercher par id interne" />
                </CardWithContent>
            </ContainerCard>
        </Container>
    );
}
