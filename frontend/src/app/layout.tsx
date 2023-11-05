import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Goals',
    description: 'This is a simple application where we can register and track goals'
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>{children}</body>
        </html>
    )
}
