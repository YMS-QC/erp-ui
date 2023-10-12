import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/app/auth/auth-provider';

import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="h-screen container font-sans">
                    <ThemeProvider attribute="class" defaultTheme="system">
                        <AuthProvider>
                            <SiteHeader />
                            {children}
                            <Toaster />
                        </AuthProvider>
                    </ThemeProvider>
                </div>
            </body>
        </html>
    );
}
