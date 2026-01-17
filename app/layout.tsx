import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AllToolsHere | Discover the Best Developer Tools",
    template: "%s | AllToolsHere",
  },
  description: "Discover and launch the best developer tools, AI apps, and SaaS products. Join a community of makers and early adopters.",
  keywords: ["developer tools", "SaaS", "AI apps", "product launch", "tech community"],
  authors: [{ name: "AllToolsHere" }],
  creator: "AllToolsHere",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alltoolshere.com",
    title: "AllToolsHere | Discover the Best Developer Tools",
    description: "Discover and launch the best developer tools, AI apps, and SaaS products.",
    siteName: "AllToolsHere",
    images: [
      {
        url: "https://alltoolshere.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AllToolsHere",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AllToolsHere | Discover the Best Developer Tools",
    description: "Discover and launch the best developer tools, AI apps, and SaaS products.",
    creator: "@AllToolsHere",
    images: ["https://alltoolshere.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required for next-themes as it modifies the HTML element's class/style
    // based on user preference (localStorage) which is not known during server-side rendering.
    // See: https://github.com/pacocoursey/nex t-themes#with-app
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
