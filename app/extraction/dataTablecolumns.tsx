"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ButtonExportCsv } from "@/components/layout/buttonExportCsv"
import { ButtonExportXlsx } from "@/components/layout/butttonExportXlsx"
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
        id: "csv",
        header: "csv",
        cell: ({ row }) => {
            const data = row.original
            return (
                <ButtonExportCsv data={data.data} />
            )
        }
    },
    {
        id: "excel",
        header: "Excel",
        cell: ({ row }) => {
            const data = row.original
            return (
                <ButtonExportXlsx data={data.data} />
            )
        }
    },
]

