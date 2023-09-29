'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { buttonVariants } from '@/components/ui/button';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    sideTitle: string | null;
    itemList: { href: string; title: string; description?: string }[];
}

export function Sidebar({ className, sideTitle, itemList }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className={cn('pb-2', className)}>
            <div className="">
                <h2 className="px-7 text-lg font-bold tracking-tight -ml-2">{sideTitle}</h2>
                <ScrollArea className="px-1 ">
                    <div className="space-y-1 p-2">
                        {itemList?.map((item, i) => (
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
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
