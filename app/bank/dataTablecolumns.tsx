"use client"

import { ColumnDef } from "@tanstack/react-table"
export type Bank = {
    contributionFundBIC: string
    contributionFundIBAN: string

}

export const columns: ColumnDef<Bank>[] = [
    {
        accessorKey: "contributionFundIBAN",
        header: "IBAN",

    },
    {
        accessorKey: "contributionFundBIC",
        header: "BIC",
    },

]

