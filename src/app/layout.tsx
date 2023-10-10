import { Noto_Sans } from 'next/font/google';

import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/app/auth/auth-provider';

import './globals.css';

const Noto = Noto_Sans({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: 'normal',
    preload: true,
    fallback: ['Microsoft YaHei', 'PingFang SC'],
    adjustFontFallback: true,
    subsets: ['cyrillic', 'latin', 'latin-ext', 'vietnamese'],
    variable: '--font-noto-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${Noto.variable}`}>
            <body>
                <div className="h-screen container font-sans">
                    <AuthProvider>
                        <ThemeProvider attribute="class" defaultTheme="system">
                            <SiteHeader />
                            {children}
                            <Toaster />
                        </ThemeProvider>
                    </AuthProvider>
                </div>
            </body>
        </html>
    );
}
