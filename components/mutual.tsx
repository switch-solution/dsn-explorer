"use client";
import { useContext } from "react"
import { CardWithContent } from "@/components/layout/card";
import { ContainerCard } from "@/components/layout/containter";
import { MutualObject } from "@fibre44/dsn-parser/lib/utils/type";
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

export function Mutual() {
    const context = useContext(DsnContext);
    const mutualList: MutualObject[] = []
    if (context !== null) {
        const { mutuals } = context;
        mutualList.push(...mutuals)
    }

    return (

        <ContainerCard>
            <CardWithContent props={{ cardTitle: 'Mutuelle/Prévoyance', cardDescription: 'Liste de vos contrats de prévoyance/mutuelle', cardFooter: `` }}>
                <Table>
                    <TableCaption>Liste des contrats prévoyance/mutuelle.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Organisme</TableHead>
                            <TableHead>Date de validité</TableHead>
                            <TableHead>Population</TableHead>
                            <TableHead>Id</TableHead>
                            <TableHead>Organisme délégataire</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mutualList.map((mutual) => {
                            return (
                                <TableRow key={mutual.techId}>
                                    <TableCell>{mutual.organisme}</TableCell>
                                    <TableCell>{mutual.date}</TableCell>
                                    <TableCell>{mutual.covererd}</TableCell>
                                    <TableCell>{mutual.techId}</TableCell>
                                    <TableCell>{mutual.delegate}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell className="text-right">{mutualList.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardWithContent>

        </ContainerCard>

    );
}
