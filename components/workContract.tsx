"use client";
import { useContext } from "react"
import { DsnContext } from "@/src/context/dsn.context";
import { CardWithContent } from "@/components/layout/card";
import { ContainerCard } from "@/components/layout/containter";
import { Ul, Li } from "@/components/layout/ul";
import { notFound } from "next/navigation";
import { extractionsList } from "@/src/extraction/extraction";
import { WorkContractObject } from "@fibre44/dsn-parser/lib/utils/type";

export default function WorkContract({ numSS, contractId }: { numSS: string, contractId: string }) {
    const workContractList = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { workContracts } = context;
        workContractList.push(...workContracts)
    }
    const workContractFind = workContractList.find(workContract => workContract.numSS === numSS && workContract.contractId === contractId)
    if (!workContractFind) {
        notFound()
    }
    const extractionWorkContract = extractionsList.filter(extraction => extraction.collection === 'WorkContract')

    return (
        <ContainerCard>
            <CardWithContent props={{ cardTitle: 'Contrat de travail', cardDescription: 'Liste des contrats de travail', cardFooter: `` }}>
                <Ul>
                    {extractionWorkContract.map((extraction) => {
                        return <Li key={extraction.dsnStructure}
                            name={extraction.name}
                            dsnId={extraction.dsnStructure}
                            value={workContractFind?.[extraction.field as keyof WorkContractObject]}></Li>
                    })
                    }
                </Ul>

            </CardWithContent>

        </ContainerCard>
    );
}
