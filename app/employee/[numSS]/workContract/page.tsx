"use client";
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

import { useDsnStore } from "@/src/store/dsn.store";
import { DsnParser } from "@/src/parser/dsnParser";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { numSS: string } }) {
    const router = useRouter()
    const { dsn } = useDsnStore()
    if (dsn.length === 0) {
        router.push('/')
    }

    const workContracts = []

    for (const dsnRow of dsn) {
        workContracts.push(...new DsnParser(dsnRow.dsnRows).workContracts)
    }

    const workContractFilter = workContracts.filter(workContract => workContract.numSS === params.numSS)
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
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/employee?query=${params.numSS}`}>{params.numSS}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>

            <ContainerCard>
                <CardWithContent props={{ cardTitle: 'Contrat de travail', cardDescription: 'Liste des contrats de travail', cardFooter: `` }}>
                    {
                        <ul>
                            <li>Type de contrat : {workContractFilter.at(0)?.contract}</li>
                        </ul>
                    }

                </CardWithContent>

            </ContainerCard>







        </Container>
    );
}
