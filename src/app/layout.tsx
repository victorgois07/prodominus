import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LoadingBackdrop } from "./components/atoms/LoadingBackdrop";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prodominus - Product Management",
  description: "A modern product management system built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-balance text-gray-900">
                Prodominus
              </h1>
            </div>
          </header>

          <main>{children}</main>

          <footer className="bg-gray-50 mt-8">
            <div className="container mx-auto px-4 py-6">
              <p className="text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} Prodominus. All rights reserved.
              </p>
            </div>
          </footer>

          <LoadingBackdrop />
        </Providers>
      </body>
    </html>
  );
}
