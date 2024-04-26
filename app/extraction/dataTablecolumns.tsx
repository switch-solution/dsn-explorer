"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ButtonExportCsv } from "@/components/layout/buttonExportCsv"
export type Establishment = {
    label: string
    count: number
    data: {}[]

}

export const columns: ColumnDef<Establishment>[] = [
    {
        accessorKey: "label",
        header: "Libellé",

    },
    {
        accessorKey: "count",
        header: "count",
    },
    {
        accessorKey: "label",
        header: "label",
        cell: ({ row }) => {
            const data = row.original
            return (
                <ButtonExportCsv data={data.data} />

            )
        }
    },
]

