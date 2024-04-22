"use client";
import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


type CardProps = {
    cardTitle: string
    cardDescription: string
    cardFooter: string
}

export function CardWithContent({ props, children }: {
    props: CardProps, children: React.ReactNode
}) {
    return (
        <Card className="w-100% mt-2">
            <CardHeader>
                <CardTitle>{props.cardTitle}</CardTitle>
                <CardDescription>{props.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex justify-between">
                {props.cardFooter}
            </CardFooter>
        </Card>
    )
}
