import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ErrorBoundary from "@/components/error-boundry"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PolicyPal - Your GenAI Insurance Advisor",
  description: "Understand, Claim, and Upgrade Your Insurance Smarter with AI-powered analysis and recommendations.",
  keywords: ["insurance", "AI", "policy analysis", "claims", "recommendations"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>{children}</ErrorBoundary>
        <Footer />
      </body>
      
    </html>
  )
}
