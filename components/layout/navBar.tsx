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
    Pickaxe,
    Scale,
    HeartPulse,
    Landmark,

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
                                <Link href={`/extraction`}
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                ><Pickaxe /></Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Extraction</TooltipContent>

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
                                <Link href={`/bank`}
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                ><Landmark /></Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Banque</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={`/mutual`}
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                ><HeartPulse /></Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Mutuelle</TooltipContent>
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
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link href={`https://github.com/switch-solution/dsn-explorer`}
                                        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                    ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg></Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Github</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link href={`/legal`}
                                        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                    ><Scale /></Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Mention légale</TooltipContent>
                            </Tooltip>
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
                        <span className="sr-only">Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="size-5" />
                            Accueil
                        </Link>
                        <Link
                            href="/extraction"
                            className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                            <Pickaxe className="size-5" />
                            Extraction
                        </Link>
                        <Link
                            href="/establishment"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Building2 className="size-5" />
                            Etablissement
                        </Link>
                        <Link
                            href="/bank"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Landmark className="size-5" />
                            Banque
                        </Link>
                        <Link
                            href="/mutual"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <HeartPulse className="size-5" />
                            Mutuelle
                        </Link>
                        <Link
                            href="/employee"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Users2 className="size-5" />
                            Salariés
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </>



    )

}

