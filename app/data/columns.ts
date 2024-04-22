"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Dsn = {
    id: string
    dsnId: string
    value: string
}

export const columns: ColumnDef<Dsn>[] = [
    {
        accessorKey: "id",
        header: "Code interne DSN",
    },
    {
        accessorKey: "dsnId",
        header: "Structure DSN",
    },
    {
        accessorKey: "value",
        header: "Valeur",
    },
]
