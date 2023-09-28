'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    // items: {
    //     href: string;
    //     title: string;
    // }[];
}

const items = [
    {
        title: 'Profile',
        href: '/examples/forms',
    },
    {
        title: 'Account',
        href: '/examples/forms/account',
    },
    {
        title: 'Appearance',
        href: '/examples/forms/appearance',
    },
    {
        title: 'Notifications',
        href: '/examples/forms/notifications',
    },
    {
        title: 'Display',
        href: '/examples/forms/display',
    },
];

export function SidebarNav({ className, ...props }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <nav className={cn('flex-col md:space-y-1', className)} {...props}>
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        pathname === item.href
                            ? 'bg-muted hover:bg-muted'
                            : 'hover:bg-transparent hover:underline',
                        'justify-start',
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    );
}
