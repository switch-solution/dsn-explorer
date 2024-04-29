"use client";
import { useContext } from "react";
import { DsnContext } from "@/src/context/dsn.context";
import { CardWithContent } from "@/components/layout/card";
import { ContainerCard } from "@/components/layout/containter";
import { Ul, Li } from "@/components/layout/ul";
import { extractionsList } from "@/src/extraction/extraction";
import type { BonusObject, ContributionObject, PayroolObject } from "@fibre44/dsn-parser/lib/utils/type";
export default function Payrool({ numSS, startDate }: { numSS: string, startDate: string }) {
    const context = useContext(DsnContext);
    const bonusData: BonusObject[] = []
    const contributionData: ContributionObject[] = []
    const payroolData: PayroolObject[] = []
    if (context !== null) {
        const { bonus, contribution, payrools } = context;
        bonusData.push(...bonus)
        contributionData.push(...contribution)
        payroolData.push(...payrools)
    }
    const extractionPayrool = extractionsList.filter(extraction => extraction.collection === 'Payrool')
    const payroolFilter = payroolData.filter(payrool => payrool.numSS === numSS)
    const extractionBonus = extractionsList.filter(extraction => extraction.collection === 'Bonus')
    const bonusFilter = bonusData.filter(bonus => bonus.numSS === numSS)
    const extractionContribution = extractionsList.filter(extraction => extraction.collection === 'Contribution')
    const payroolContributionFilter = contributionData.filter(contribution => contribution.numSS === numSS)
    return (
        <ContainerCard>
            <CardWithContent props={{ cardTitle: 'Primes', cardDescription: 'Liste des primes', cardFooter: `` }}>
                {bonusFilter.map((payrool) => {
                    return extractionBonus.map((extraction) => {
                        return <Ul key={extraction.dsnStructure}>
                            <Li name={extraction.name}
                                dsnId={extraction.dsnStructure}
                                value={payrool[extraction.field as keyof BonusObject]}></Li>
                        </Ul>
                    })
                })}
            </CardWithContent>
            <CardWithContent props={{ cardTitle: 'Cotisation', cardDescription: 'Liste des cotisation', cardFooter: `` }}>
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
