import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ravi Karmakar — Full-Stack Developer & System Architect",
  description:
    "Building high-concurrency digital infrastructure under Krmsolutions. Portfolio showcasing real-time systems, AI-powered tools, and production-grade web platforms.",
  keywords: [
    "Ravi Karmakar",
    "Full-Stack Developer",
    "System Architect",
    "Krmsolutions",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Ravi Karmakar" }],
  openGraph: {
    title: "Ravi Karmakar — Full-Stack Developer & System Architect",
    description:
      "Building high-concurrency digital infrastructure under Krmsolutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravi Karmakar — Full-Stack Developer & System Architect",
    description:
      "Building high-concurrency digital infrastructure under Krmsolutions.",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="relative min-h-full bg-black text-white">
        {children}
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
