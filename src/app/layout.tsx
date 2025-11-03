import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/navbar"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Michael Ryan | Web Developer Portfolio",
  description: "Modern futuristic portfolio built with Next.js & Tailwind.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Michael Ryan Portfolio",
    description: "Modern futuristic portfolio built with Next.js & Tailwind.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
