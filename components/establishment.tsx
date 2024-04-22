"use client";
import { CardWithContent } from "@/components/layout/card";
import { Container, ContainerCard, ContainerBreadCrumb } from "@/components/layout/containter";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ComboboxDemo } from "@/components/layout/combobox"

import { useDsnStore } from "@/src/store/dsn.store";
import { DsnParser } from "@/src/parser/dsnParser";
import { useRouter } from "next/navigation";

export function Establishment({ query }: { query: string }) {
    const router = useRouter()
    const { dsn } = useDsnStore()
    if (dsn.length === 0) {
        router.push('/')
    }
    const establishementSet = new Set()
    const establishments = []
    for (const dsnRow of dsn) {
        const establishment = new DsnParser(dsnRow.dsnRows).establishment
        const nic = establishment.nic
        if (!establishementSet.has(nic)) {
            establishments.push({
                id: dsnRow.dsnId,
                establishment: new DsnParser(dsnRow.dsnRows).establishment
            })
            establishementSet.add(nic)
        }
    }
    const establishmentCombobox = establishments.map(establishment => {
        return {
            value: establishment.establishment.nic,
            label: establishment.establishment.nic
        }
    })
    const establishmentFilter = establishments.filter(establishmentFilter => establishmentFilter.establishment.nic === query)
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/establishment">Etablissements</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerCard>
                {establishmentFilter.map(establishment => {
                    return (
                        <CardWithContent key={establishment.id} props={{ cardTitle: 'en attente', cardDescription: 'Liste de vos établissements', cardFooter: `Actuellement l\'application contient ${dsn.length}` }}>
                            <ul>
                                <li>Nic : {establishment.establishment.nic}</li>
                                <li>Apet : {establishment.establishment.apet}</li>
                                <li>Adresse 1 : {establishment.establishment.adress1}</li>
                                <li>Adresse 2 : {establishment.establishment.adress2}</li>
                                <li>Adresse 3 : {establishment.establishment.adress3}</li>
                                <li>Code postal : {establishment.establishment.zipCode}</li>
                                <li>Ville : {establishment.establishment.city}</li>

                            </ul>
                        </CardWithContent>
                    )
                })
                }

            </ContainerCard>
        </Container>
    );
}
