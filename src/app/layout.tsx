import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { profile } from "@/data/profile"
import { siteUrl } from "@/lib/site"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/layout/navbar"
import { SiteDockLoader } from "@/components/layout/site-dock-loader"
import { Footer } from "@/components/layout/footer"
import { RevealObserver } from "@/components/reveal-observer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const title = `${profile.name}, ${profile.discipline} ${profile.role}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${profile.name}`,
  },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "full-stack engineer",
    "software engineer",
    "web development",
    "mobile development",
    "automation",
    "Next.js",
    "React Native",
    "Tunisia",
    "remote",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  colorScheme: "dark light",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="grain flex min-h-dvh flex-col overflow-x-clip">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <SiteDockLoader />
          <RevealObserver />
        </Providers>
      </body>
    </html>
  )
}
