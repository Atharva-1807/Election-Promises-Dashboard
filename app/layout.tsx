import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Election Promises Dashboard',
  description: 'A neutral, factual dashboard for viewing municipal election promises',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
