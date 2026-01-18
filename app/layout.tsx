import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sight",
  description: "Sistema de anotações",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      {/* <head>
        <link rel="shortcut icon" href="@/public/window.svg" type="image/x-icon" /> 
      </head> */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}



import './globals.css'