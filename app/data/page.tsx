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
                            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/data">Vos données</BreadcrumbLink>
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
