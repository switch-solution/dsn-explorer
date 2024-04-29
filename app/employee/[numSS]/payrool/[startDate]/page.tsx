import { Container, ContainerBreadCrumb } from "@/components/layout/containter";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import Payrool from "@/components/payrool";
export default function Page({ params }: { params: { numSS: string, startDate: string } }) {

    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Accueil</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/employee">Salariés</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href={`/employee/${params.numSS}`}>{params.numSS}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link href={`/employee/${params.numSS}/payrool/${params.startDate}`}>Paie du mois de {params.startDate}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <Payrool numSS={params.numSS} startDate={params.startDate} />
        </Container>
    );
}
