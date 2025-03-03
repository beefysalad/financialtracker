import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navbar } from "./components/shared/Navbar";
import { Footer } from "./components/shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Basecode  | PTRCK",
  description: "Fullstack basecode for Next.JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className='flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto px-4 min-h-screen'>
              {children}
            </main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
