import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Druid Demo",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b bg-background">
            <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
              <div className="flex items-center space-x-6">
                <Link href="/" className="text-xl font-semibold">
                  Druid Demo
                </Link>
                <Link
                  href="/blog"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Blog
                </Link>
                <AnimatedThemeToggler />
              </div>
              <nav className="md:block hidden flex items-center space-x-6 text-sm font-medium">
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
                <a
                  href="https://druid.sh/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Docs
                </a>
              </nav>
            </div>
          </header>
          <div className="max-w-6xl mx-auto py-4 px-6">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
