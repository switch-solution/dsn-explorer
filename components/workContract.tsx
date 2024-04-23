"use client";
import { useContext } from "react"
import { DsnContext } from "@/src/context/dsn.context";
import { CardWithContent } from "@/components/layout/card";
import { ContainerCard } from "@/components/layout/containter";
import { Ul, Li } from "@/components/layout/ul";
import { DsnParser } from "@/src/parser/dsnParser";
import { notFound } from "next/navigation";
import { WorkContractObject } from "@/src/type/type";
import { ButtonExportCsv } from "@/components/layout/buttonExportCsv";
export default function WorkContract({ numSS, contractId }: { numSS: string, contractId: string }) {
    const dsnData = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { dsn } = context;
        dsnData.push(...dsn)
    }
    const dsnWorkContractId = []
    const workContracts = []
    for (const dsnRow of dsnData) {
        workContracts.push(...new DsnParser(dsnRow.dsnRows).workContracts)
        dsnWorkContractId.push(...new DsnParser(dsnRow.dsnRows).dsnStructure('WorkContract'))
    }
    const workContractFind = workContracts.find(workContract => workContract.numSS === numSS && workContract.contractId === contractId)
    if (!workContractFind) {
        notFound()
    }
    const workContractSet = new Set()
    return (
        <>

            <ButtonExportCsv data={workContracts} />
            <ContainerCard>
                <CardWithContent props={{ cardTitle: 'Contrat de travail', cardDescription: 'Liste des contrats de travail', cardFooter: `` }}>

                    <Ul>
                        {dsnWorkContractId.map((contract) => {
                            const field = contract.field as keyof WorkContractObject
                            const dsnId = contract.dsnStructure
                            const name = contract.name
                            const value = workContractFind[field]
                            if (!workContractSet.has(field)) {
                                workContractSet.add(field)
                                return <Li key={field} value={value ? value : ''} dsnId={dsnId} name={name} />
                            }
                        })}
                    </Ul>


                </CardWithContent>

            </ContainerCard>


        </>
    );
}
