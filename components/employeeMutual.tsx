"use client";
import { useContext } from "react";
import { DsnContext } from "@/src/context/dsn.context";
import { CardWithContent } from "@/components/layout/card";
import { ContainerCard } from "@/components/layout/containter";
import { Ul, Li } from "@/components/layout/ul";
import { extractionsList } from "@/src/extraction/extraction";
import type { MutualEmployeeObject } from "@fibre44/dsn-parser/lib/utils/type";
import { notFound } from "next/navigation";
export default function EmployeeMutual({ numSS, idTech }: { numSS: string, idTech: string }) {
    const context = useContext(DsnContext);
    const employeeMutualData: MutualEmployeeObject[] = []
    if (context !== null) {
        const { mutualEmployees } = context;
        employeeMutualData.push(...mutualEmployees)
    }
    if (employeeMutualData.length === 0) {
        notFound()
    }
    const extractionEmployeeMutual = extractionsList.filter(extraction => extraction.collection === 'EmployeeMutual')
    const employeeMutualFilter = employeeMutualData.filter(mutual => mutual.numSS === numSS && mutual.idTechAffiliationMutual === idTech)
    return (
        <ContainerCard>
            <CardWithContent props={{ cardTitle: 'Contrat complémentaire', cardDescription: 'Détail', cardFooter: `` }}>
                {employeeMutualFilter.map((mutual) => {
                    return extractionEmployeeMutual.map((extraction) => {
                        return <Ul key={extraction.dsnStructure}>
                            <Li name={extraction.name}
                                dsnId={extraction.dsnStructure}
                                value={mutual[extraction.field as keyof MutualEmployeeObject]}></Li>
                        </Ul>
                    })
                })}
            </CardWithContent>

        </ContainerCard>

    );
}
