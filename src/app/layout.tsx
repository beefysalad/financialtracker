import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Footer } from "./components/shared/Footer";
import { Navbar } from "./components/shared/Navbar";
import { AppSidebar } from "./components/shared/Sidebar";
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
  title: "Budget Hive | Track your finances",
  description: "App to track financial transactions",
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
            <SidebarProvider>
              <div className='flex h-screen w-full'>
                <div className='flex-none'>
                  <AppSidebar />
                </div>

                <div className='flex flex-col flex-1 w-full'>
                  <Navbar />

                  <main className='flex flex-col items-center w-full mx-auto px-4 min-h-screen py-5'>
                    {children}
                  </main>

                  <Footer />
                </div>
              </div>

              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
