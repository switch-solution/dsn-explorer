"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
export type Employee = {
    numSS: string
    lastname: string
    firstname: string

}

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "numSS",
        header: "Numéro de sécurité sociale",

    },
    {
        accessorKey: "lastname",
        header: "Nom",
    },
    {
        accessorKey: "firstname",
        header: "Prénom",
    },
    {
        accessorKey: "label",
        header: "label",
        cell: ({ row }) => {
            const employee = row.original
            return (
                <Link href={`/employee/${employee.numSS}`}><ArrowRight /></Link>

            )
        }
    },
]

