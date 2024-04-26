"use client";
import { useContext } from "react";
import { DsnContext } from "@/src/context/dsn.context";
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
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
export default function Page() {
  const context = useContext(DsnContext);
  let dsnData = []
  if (context !== null) {
    const { dsn } = context;
    dsnData = [...dsn]

  }

  return (
    <Container>
      <ContainerBreadCrumb>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">Accueil</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </ContainerBreadCrumb>
      <ContainerCard>
        <CardWithContent props={{ cardTitle: 'Upload fichier DSN', cardDescription: 'Cette utilitaire fonctionne uniquement en local. Vos données ne sont pas envoyées sur le serveur. Attention les données sont réinitialisées à chaque envoi.', cardFooter: `Actuellement l\'application contient ${dsnData.length}` }}>
          <UploadFileDsn />
        </CardWithContent>
      </ContainerCard>
    </Container>
  );
}
