"use client";
import UploadFileDsn from "@/components/upload";
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
import { useDsnStore } from "@/src/store/dsn.store";
export default function Home() {
  const { dsn } = useDsnStore()
  return (
    <Container>
      <ContainerBreadCrumb>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Upload fichier DSN</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </ContainerBreadCrumb>
      <ContainerCard>
        <CardWithContent props={{ cardTitle: 'Upload fichier DSN', cardDescription: 'Cette utilitaire fonctionne uniquement en local. Vos données ne sont pas envoyées sur le serveur.', cardFooter: `Actuellement l\'application contient ${dsn.length}` }}>
          <UploadFileDsn />
        </CardWithContent>
      </ContainerCard>
    </Container>
  );
}
