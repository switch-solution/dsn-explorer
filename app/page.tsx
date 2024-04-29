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
        <CardWithContent props={{ cardTitle: 'Upload fichier DSN', cardDescription: 'Cette utilitaire fonctionne uniquement en local. Vos données ne sont pas envoyées sur le serveur. Attention les données sont réinitialisées à chaque envoi.', cardFooter: `Actuellement l\'application contient ${dsnData.length} fichiers DSN` }}>
          <UploadFileDsn />
        </CardWithContent>
        <CardWithContent props={{ cardTitle: 'Note de version', cardDescription: 'Version 0.1.0', cardFooter: `Date le 29/04/2024` }}>
          <div>
            <p>L&apos;utilitaire est en phase beta liste des fonctionnalitées disponibles : </p>
            <ul className="list-none">
              <li className="ml-2">Fonctionnalitées disponibles</li>
              <ul className="ml-4 list-disc">
                <li>Sociétés</li>
                <li>Etablissements</li>
                <li>Salariés</li>
                <li>Contrat de travail</li>
                <li>Bulletin de paie</li>
                <li>Extraction des banques</li>
                <li>Contrats de prévoyances, mutuelles et retraite complémentaire</li>
              </ul>
              <li className="ml-2">Fonctionnalitées à venir</li>
              <ul className="ml-4 list-disc">
                <li>Extraction de la liste des organisemes sociaux</li>
              </ul>
              <li className="ml-2 mt-2">Problème connu</li>
              <ul className="ml-4 list-disc">
                <li>Gestion des mutuelles employées ne fonctionne pas</li>
              </ul>
            </ul>
          </div>
        </CardWithContent>
      </ContainerCard>
    </Container>

  );
}
