import { Inter } from 'next/font/google';

import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="h-screen -z-50">
                    <ThemeProvider attribute="class" defaultTheme="system">
                        <SiteHeader />
                        {children}
                    </ThemeProvider>
                </div>
            </body>
        </html>
    );
}
