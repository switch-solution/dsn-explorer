"use client";
import { useState, useContext } from "react"
import { DsnContext } from "@/src/context/dsn.context";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import type { Dsn } from "@/src/context/dsn.context";

export default function UploadFileDsn() {
    const dsnData = []
    let addFile: (file: Dsn) => void;
    let lenghtDsnLoad = 0
    const context = useContext(DsnContext);
    if (context !== null) {
        const { dsn, addDsn } = context;
        lenghtDsnLoad = dsn.length
        dsnData.push(...dsn)
        addFile = addDsn
    }
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const parseFile = async (file: File, random: string) => {
        return new Promise((resolve, reject) => {
            const dsnRows: any = []
            const dsnRowsObject: { id: string, value: string }[] = []
            const reader = new FileReader()
            reader.readAsText(file, 'ISO-8859-1');
            reader.onload = function (e: any) {
                // Le contenu du fichier est dans e.target.result
                dsnRows.splice(0, dsnRows.length)
                //On récupère le texte dans la variable dsnRows
                if (e.target && e.target.result) {
                    const text = e.target.result as string; //Une structure DSN ressemble à ca S10.G00.00.003,'11.0.9.0.2'
                    const lines = text.split('\n'); //On split le texte en lignes
                    dsnRows.push(...lines);
                    for (const row of dsnRows) {
                        let lineSplit = row.split(`,'`) //On split chaque ligne en colonnes
                        let id = lineSplit.at(0)
                        let value = lineSplit.at(1).replace(/'/g, "").replace(/\r/g, "")
                        dsnRowsObject.push({
                            id,
                            value

                        });
                    }
                }
                resolve(dsnRowsObject);

            }//Fin boucle lecture
            reader.onerror = function (e) {
                reject(new Error("Erreur de lecture du fichier : " + e));
            };
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const dsn = (e.target as HTMLFormElement).elements[0] as HTMLInputElement
        const files = dsn.files ? Array.from(dsn.files) : []
        try {
            for (let file of files) {
                lenghtDsnLoad++
                if (lenghtDsnLoad <= 20) {
                    const random = Math.random().toString(36).substring(7)
                    const dsnRows = await parseFile(file, random) as { id: string, value: string }[]
                    addFile({ dsnId: random, dsnRows: dsnRows })
                }

            }
        } catch (err) {
            setLoading(false);
            toast(`${err}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => {
                    },
                },
            });
            console.error(err);
        }
        if (lenghtDsnLoad > 20) {
            toast(`Vous ne pouvez pas charger plus de 20 fichiers. Vous devevez actualiser la page pour vider la mémoire.`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => {
                    },
                },
            })
            router.refresh()

        } else {
            router.push("/establishment")

        }

        setLoading(false);

    }
    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="dsn">DSN</Label>
            <Input id="dsn" name="dsn" type="file" accept=".dsn" required multiple />
            <Button type="submit" disabled={loading}>Envoyer</Button>
        </form>

    )

}