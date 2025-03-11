// src/app/layout.tsx
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'SuruhSuruh.id - Platform Jasa Akademik & Elektronik',
    description: 'Platform jasa pengerjaan tugas akademik dan perbaikan elektronik.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" className="dark">
        <body className="bg-dark-bg text-dark-text">
        {children}
        </body>
        </html>
    )
}