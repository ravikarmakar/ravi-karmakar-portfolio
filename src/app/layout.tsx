import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/components/loading-provider";
import { HydrationGuard } from "@/components/providers/hydration-guard";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Footer } from "@/components/footer";
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ravi-karmakar-portfolio.vercel.app"),
  title: `${SITE_CONFIG.name} ${SITE_CONFIG.lastName} — ${SITE_CONFIG.role}`,
  description: SITE_CONFIG.description,
  keywords: [
    `${SITE_CONFIG.name} ${SITE_CONFIG.lastName}`,
    "Full-Stack Developer",
    "System Architect",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: `${SITE_CONFIG.name} ${SITE_CONFIG.lastName}`, url: SOCIAL_LINKS.github }],
  creator: `${SITE_CONFIG.name} ${SITE_CONFIG.lastName}`,
  publisher: `${SITE_CONFIG.name} ${SITE_CONFIG.lastName}`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ravi Karmakar — Full-Stack Developer & System Architect",
    description:
      "Building high-concurrency digital infrastructure. Portfolio showcasing real-time systems, AI-powered tools, and production-grade web platforms.",
    url: "https://ravi-karmakar-portfolio.vercel.app",
    siteName: "Ravi Karmakar Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: SOCIAL_LINKS.avatar,
        width: 1200,
        height: 630,
        alt: "Ravi Karmakar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravi Karmakar — Full-Stack Developer & System Architect",
    description: "Building high-concurrency digital infrastructure.",
    images: [SOCIAL_LINKS.avatar],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark overflow-x-hidden antialiased relative`}
    >
      <body
        suppressHydrationWarning
        className="relative min-h-full overflow-x-hidden bg-black text-white"
      >
        {/* Strips browser extension attributes before React hydration */}
        <Script src="/fix-extensions.js" strategy="beforeInteractive" />
        <HydrationGuard>
          <div className="relative min-h-screen">
            <SmoothScroll>
              <LoadingProvider>
                {children}
                <Footer />
              </LoadingProvider>
            </SmoothScroll>
          </div>
        </HydrationGuard>
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" suppressHydrationWarning />
      </body>
    </html>
  );
}
