"use client";
import { useContext } from "react"
import { CardWithContent } from "@/components/layout/card";
import { ContainerCard } from "@/components/layout/containter";
import { EstablishmentObject } from "@/src/type/type";
import { DsnContext } from "@/src/context/dsn.context";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ButtonExportCsv } from "@/components/layout/buttonExportCsv";
import { DsnParser } from "@/src/parser/dsnParser";
import { useRouter } from "next/navigation";
import { Ul, Li } from "./layout/ul";
export function Establishment({ query }: { query: string }) {
    const router = useRouter()
    const dsnData = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { dsn } = context;
        dsnData.push(...dsn)
    }

    if (dsnData.length === 0) {
        router.push('/')
    }
    const establishments = []
    const dsnStructure = []
    for (const dsnRow of dsnData) {
        establishments.push(new DsnParser(dsnRow.dsnRows).establishment)
    }

    if (dsnData.length > 0) {
        dsnStructure.push(...new DsnParser(dsnData[0].dsnRows).dsnStructure('Establishment'))
    }

    const establishmentFind = establishments.find(establishmentFilter => establishmentFilter.nic === query)
    if (!establishmentFind) {
        throw new Error('Establishment not found')
    }
    const establishmentSet = new Set()
    for (const establishment of establishments) {

    }

    const rateAtList = []

    for (const dsnRow of dsnData) {
        rateAtList.push(...new DsnParser(dsnRow.dsnRows).rateAt)
    }

    const rateAtFilter = rateAtList.filter(rateAt => rateAt.nic === query)
    const rateAtSet = new Set()
    const rateAtDatas = []
    for (const rateAt of rateAtFilter) {
        if (!rateAtSet.has(rateAt.idWorkAccidentRisk)) {
            rateAtDatas.push({
                idWorkAccidentRisk: rateAt.idWorkAccidentRisk,
                rateAt: rateAt.rateAt
            })
            rateAtSet.add(rateAt.idWorkAccidentRisk)
        }
    }
    const mutuals = []
    for (const dsnRow of dsnData) {
        mutuals.push(...new DsnParser(dsnRow.dsnRows).mutual)
    }

    return (
        <>

            <ButtonExportCsv data={establishments} />

            <ContainerCard>
                <CardWithContent props={{ cardTitle: 'Etablissement', cardDescription: 'Liste de vos établissements', cardFooter: `` }}>
                    <Ul>
                        {dsnStructure.map((establishment) => {
                            const field = establishment.field as keyof EstablishmentObject
                            const dsnId = establishment.dsnStructure
                            const name = establishment.name
                            const value = establishmentFind[field]
                            return <Li key={field} value={value ? value : ''} dsnId={dsnId} name={name} />

                        })}
                    </Ul>
                </CardWithContent>
                <CardWithContent props={{ cardTitle: 'Taux AT', cardDescription: 'Liste des taux AT', cardFooter: `` }}>
                    <Table>
                        <TableCaption>Liste des taux AT.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Code risque</TableHead>
                                <TableHead>Taux</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rateAtDatas.map((rateAt) => (
                                <TableRow key={rateAt.idWorkAccidentRisk}>
                                    <TableCell className="font-medium">{rateAt.idWorkAccidentRisk}</TableCell>
                                    <TableCell>{rateAt.rateAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">{rateAtDatas.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardWithContent>

            </ContainerCard>
        </>
    );
}
