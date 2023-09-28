/* eslint-disable react/jsx-no-comment-textnodes */

'use client';

import * as React from 'react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

export function MainNav() {
    // const pathname = usePathname();

    return (
        <div className="hidden md:flex md:items-center md:justify-between">
            <Link href="/" className="mr-6 px-3 flex items-center">
                <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
                {/* <Link
                    href="/docs"
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname === '/docs' ? 'text-foreground' : 'text-foreground/60',
                    )}
                >
                    Documentation
                </Link>
                <Link
                    href="/docs/components"
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname?.startsWith('/docs/components')
                            ? 'text-foreground'
                            : 'text-foreground/60',
                    )}
                >
                    Components
                </Link>
                <Link
                    href="/themes"
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname?.startsWith('/themes') ? 'text-foreground' : 'text-foreground/60',
                    )}
                >
                    Themes
                </Link>
                <Link
                    href="/examples"
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname?.startsWith('/examples')
                            ? 'text-foreground'
                            : 'text-foreground/60',
                    )}
                >
                    Examples
                </Link>
                <Link
                    href={siteConfig.links.github}
                    className={cn(
                        'hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block',
                    )}
                >
                    GitHub
                </Link> */}
            </nav>
        </div>
    );
}
