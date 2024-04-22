import { Establishment } from "@/components/establishment";
export default function Page({ params }: { params: { nic: string } }) {

    return <Establishment query={params.nic} />

}