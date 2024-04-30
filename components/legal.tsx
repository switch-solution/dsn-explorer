
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function Legal({
    name,
    email,
    cloud,
    cloudSocialReason,
    cloudAdress,
    address,
    siren
}: {
    name: string,
    email: string,
    cloud: string,
    cloudSocialReason: string,
    cloudAdress: string,
    address: string,
    siren: string
}


) {
    return (
        <Card className="w-100% mt-2">
            <CardHeader>
                <CardTitle>Mention légale</CardTitle>
                <CardDescription>DSN-Explorer</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    <span>Identité : {name}</span>
                    <span>SIREN : {siren}</span>
                    <span>Adresse : {address}</span>
                    <span>Email : {email}</span>
                    <span>Herbergeur : {cloud}</span>
                    <span>Raison social de l&apos;herbergeur : {cloudSocialReason}</span>
                    <span>Adresse de l&apos;herbergeur : {cloudAdress}</span>

                </div>
            </CardContent>
            <CardFooter className="flex flex-start">
                Source disponible : <Link href={'https://github.com/switch-solution/dsn-explorer'}>https://github.com/switch-solution/dsn-explorer</Link>
            </CardFooter>
        </Card>
    )

}