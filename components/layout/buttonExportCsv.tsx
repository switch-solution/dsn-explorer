"use client";
import { Button } from "@/components/ui/button";
import { exportToCsv } from "@/src/csv/exportToCsv";
import { File } from "lucide-react";
import { ContainerExport } from "./containter";
export function ButtonExportCsv({ data }: { data: any[] }) {

    const handleClick = () => {
        exportToCsv(data)
    }

    return (
        <ContainerExport>
            <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm"
                onClick={handleClick}
            >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Exporter au format csv</span>
            </Button>
        </ContainerExport>
    )

}