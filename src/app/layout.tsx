import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Druid SDK Demo",
  description: "A demo of the Druid SDK for Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b bg-background">
          <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-xl font-semibold">
                Druid SDK Demo
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Blog
              </Link>
            </div>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a
                href="https://github.com/druid-sh/sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@druid-sh/sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                NPM
              </a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
