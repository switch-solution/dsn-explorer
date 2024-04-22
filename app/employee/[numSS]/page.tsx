import { Employee } from "@/components/employee"
export default function Page({ params }: { params: { numSS: string } }) {

    return <Employee query={params.numSS} />

}