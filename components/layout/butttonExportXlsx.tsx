"use client";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { ContainerExport } from "./containter";
import XLSX from "xlsx";
export function ButtonExportXlsx({ data }: { data: any[] }) {
    const handleClick = async () => {

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "data");
        XLSX.writeFile(wb, "dsn_extraction.xlsx");
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
                <span className="sr-only sm:not-sr-only">Exporter au format Excel</span>
            </Button>
        </ContainerExport>

    )

}