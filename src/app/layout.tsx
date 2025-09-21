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
        <header className="bg-[rgb(0,123,255)] text-white py-4 px-6 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Druid SDK Demo
            </Link>
            <nav className="flex space-x-6">
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <a
                href="https://github.com/druid-sh/sdk"
                className="hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@druid-sh/sdk"
                className="hover:underline"
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
