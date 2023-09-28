'use client';

import { Inter } from 'next/font/google';

import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarNav } from '@/components/sidebar-nav';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="h-screen">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <SiteHeader />
                        <div className="bg-background">
                            <div className="grid md:grid-cols-6 w-full h-max">
                                <SidebarNav className="hidden md:flex md:border-r md:border-b h-max" />
                                <div className="flex md:col-span-5 h-max">{children}</div>
                            </div>
                        </div>
                    </ThemeProvider>
                </div>
            </body>
        </html>
    );
}
