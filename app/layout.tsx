import type { Metadata } from 'next'
export const dynamic = 'force-dynamic' // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import clsx from 'clsx'
import { ThemeProvider } from '@/src/theme/ThemeProvider'
import { Header } from '@/components/layout/header'
const inter = Inter({ subsets: ['latin'] })
import NavBar from '@/components/layout/navBar'
import { Toaster } from "@/components/ui/sonner"
import { DsnContextProvider } from '@/src/context/dsn.context'
export const metadata: Metadata = {
  title: 'Dsn Exploreur',
  description: 'Utilitaire de lecture de fichiers de la Déclaration Sociale Nominative (DSN)',
}

type LayoutProps = {
  children: React.ReactNode,
  modal?: React.ReactNode
}

export default async function RootLayout({
  children,
  modal
}: LayoutProps) {
  return (
    <html lang="fr" className='h-full' suppressHydrationWarning>
      <body className={clsx(inter.className, 'flex min-h-screen w-full flex-col bg-muted/40')}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <DsnContextProvider>
            <Header>
              <NavBar />
            </Header>
            <main className='flex size-full flex-col items-center'>
              {children}
              <Toaster />
            </main>
            {modal}
          </DsnContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
