"use client"
import { useContext } from "react";
import { DsnContext } from "@/src/context/dsn.context";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
    Home,
    LineChart,
    Building2,
    Users2,
    PanelLeft,
    Package2,
    ShoppingCart,
    Package,
    User,

} from "lucide-react"
export default function NavBar() {
    const dsnData = []
    const context = useContext(DsnContext);
    if (context !== null) {
        const { dsn } = context;
        dsnData.push(...dsn)
    }
    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <TooltipProvider>
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/"
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <Home className="size-5" />
                                    <span className="sr-only">Extraire vos fichiers</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Accueil</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={`/establishment`}
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"

                                ><Building2 /></Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Etablissement</TooltipContent>

                        </Tooltip>
                        <Tooltip>

                            <TooltipTrigger asChild>
                                <Link href={`/employee`}
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"

                                ><User /></Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Salariés</TooltipContent>
                        </Tooltip>


                    </nav>
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={`/data`}
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    {dsnData.length}
                                    <span className="sr-only font-bold">{dsnData.length}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Nombre de DSN</TooltipContent>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>
                                        <ThemeToggle />
                                        <span className="sr-only">Thême</span>
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent side="right">Thême</TooltipContent>
                            </Tooltip>
                        </Tooltip>

                    </nav>
                </TooltipProvider>
            </aside>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="size-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package2 className="size-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="size-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                            <ShoppingCart className="size-5" />
                            Orders
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Package className="size-5" />
                            Products
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Users2 className="size-5" />
                            Customers
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <LineChart className="size-5" />
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </>



    )

}

