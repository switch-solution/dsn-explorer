"use client";
import { useContext } from "react"
import { CardWithContent } from "@/components/layout/card";
import { ContainerCard } from "@/components/layout/containter";
import { EstablishmentObject, RateAtObject } from "@/src/type/type";
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
import { extractionsList } from "@/src/extraction/extraction";
import { notFound } from "next/navigation";
import { Ul, Li } from "./layout/ul";
export function Establishment({ query }: { query: string }) {
    const context = useContext(DsnContext);
    const establishementsList: EstablishmentObject[] = []
    const rateAtList: RateAtObject[] = []
    if (context !== null) {
        const { establishments, ratesAt } = context;
        establishementsList.push(...establishments)
        rateAtList.push(...ratesAt)
    }
    const extractionEstablishment = extractionsList.filter(extraction => extraction.collection === 'Establishment')

    const establishmentFind = establishementsList.find(establishment => establishment.nic === query)
    if (!establishmentFind) {
        notFound()
    }



    return (

        <ContainerCard>
            <CardWithContent props={{ cardTitle: 'Etablissement', cardDescription: 'Liste de vos établissements', cardFooter: `` }}>
                <Ul>
                    {extractionEstablishment.map((extraction) => {
                        return <Li key={extraction.dsnStructure}
                            name={extraction.name}
                            dsnId={extraction.dsnStructure}
                            value={establishmentFind?.[extraction.field as keyof EstablishmentObject]}></Li>
                    })
                    }
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
                        {rateAtList.map((rateAt) => {
                            return (
                                <TableRow key={rateAt.idWorkAccidentRisk}>
                                    <TableCell>{rateAt.idWorkAccidentRisk}</TableCell>
                                    <TableCell>{rateAt.rateAt}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">{rateAtList.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardWithContent>

        </ContainerCard>

    );
}
