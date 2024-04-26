"use client";
import { useContext } from "react";
import { DsnContext } from "@/src/context/dsn.context";
import { CardWithContent } from "@/components/layout/card";
import { ContainerCard } from "@/components/layout/containter";
import { Ul, Li } from "@/components/layout/ul";
import { extractionsList } from "@/src/extraction/extraction";
import type { PayroolObject } from "@/src/type/type";
import { notFound } from "next/navigation";
export default function Payrool({ numSS, startDate }: { numSS: string, startDate: string }) {
    const context = useContext(DsnContext);
    const payroolData: PayroolObject[] = []
    if (context !== null) {
        const { payrools } = context;
        payroolData.push(...payrools)
    }
    if (payroolData.length === 0) {
        notFound()
    }
    const extractionPayrool = extractionsList.filter(extraction => extraction.collection === 'Payrool')
    const payroolFilter = payroolData.filter(payrool => payrool.numSS === numSS && payrool.startDatePayrool === startDate)
    return (
        <ContainerCard>
            <CardWithContent props={{ cardTitle: 'Primes', cardDescription: 'Liste des primes', cardFooter: `` }}>
                {payroolFilter.map((payrool) => {
                    return extractionPayrool.map((extraction) => {
                        return <Ul key={extraction.dsnStructure}>
                            <Li name={extraction.name}
                                dsnId={extraction.dsnStructure}
                                value={payrool[extraction.field as keyof PayroolObject]}></Li>
                        </Ul>
                    })
                })}
            </CardWithContent>

        </ContainerCard>

    );
}
