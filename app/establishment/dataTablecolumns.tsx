"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
export type Establishment = {
    nic: string
    apet: string

}

export const columns: ColumnDef<Establishment>[] = [
    {
        accessorKey: "nic",
        header: "Nic",

    },
    {
        accessorKey: "apet",
        header: "apet",
    },
    {
        accessorKey: "label",
        header: "label",
        cell: ({ row }) => {
            const establishment = row.original
            return (
                <Link href={`/establishment/${establishment.nic}`}><ArrowRight /></Link>

            )
        }
    },
]

