"use client";
import { useContext } from "react";
import { DsnContext } from "@/src/context/dsn.context";
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
import { Ul, Li } from "@/components/layout/ul";
import { DsnParser } from "@/src/parser/dsnParser";
import { notFound, useRouter } from "next/navigation";
import { BonusObject } from "@/src/type/type";
import Link from "next/link";
export default function Page({ params }: { params: { numSS: string, startDate: string } }) {
    const context = useContext(DsnContext);
    const dsnData = []
    if (context !== null) {
        const { dsn } = context;
        dsnData.push(...dsn)
    }

    const router = useRouter()
    if (dsnData.length === 0) {
        router.push('/')
    }
    const dsnWorkContractId = []

    const bonusList = []
    for (const dsnRow of dsnData) {
        bonusList.push(...new DsnParser(dsnRow.dsnRows).bonus)
        dsnWorkContractId.push(...new DsnParser(dsnRow.dsnRows).dsnStructure('Bonus'))
    }
    const bonusFind = bonusList.find(bonus => bonus.numSS === params.numSS && bonus.dateStartBonus === params.startDate)
    if (!bonusFind) {
        notFound()
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
                            <BreadcrumbLink href="/employee">Salariés</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/employee/${params.numSS}`}>{params.numSS}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>

            <ContainerCard>
                <CardWithContent props={{ cardTitle: 'Primes', cardDescription: 'Liste des primes', cardFooter: `` }}>

                    <Ul>
                        {dsnWorkContractId.map((bonus) => {
                            const field = bonus.field as keyof BonusObject
                            const dsnId = bonus.dsnStructure
                            const name = bonus.name
                            const value = bonusFind[field]
                            return <Li key={field} value={value ? value : ''} dsnId={dsnId} name={name} />
                        })}
                    </Ul>


                </CardWithContent>

            </ContainerCard>







        </Container>
    );
}
