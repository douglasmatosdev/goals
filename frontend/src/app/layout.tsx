import type { Metadata } from 'next'
import Head from 'next/head'

export const metadata: Metadata = {
    title: 'Goals',
    description: 'This is a simple application where we can register and track goals'
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            <Head>
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            <html lang="en">
                <body suppressHydrationWarning={true}>{children}</body>
            </html>
        </>
    )
}
