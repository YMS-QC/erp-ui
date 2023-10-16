'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    itemList: { href: string; title: string; description?: string }[];
}

export function Sidebar({ className, itemList }: SidebarProps) {
    const pathname = usePathname();

    const sideTitle = itemList.filter((item) => item.href === pathname)[0] ?? null;

    return (
        <div className={cn('pb-2', className)}>
            <div>
                <div className="px-1 py-2 font-bold flex flex-col items-center">
                    {sideTitle.title ?? null}
                </div>

                <ScrollArea className="px-1 ">
                    <Separator />
                    <div className="space-y-1">
                        {itemList
                            ?.filter((i) => i.href !== pathname)
                            .map((item, i) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        buttonVariants({ variant: 'ghost' }),
                                        'hover:bg-muted bg-transparent hover:underline',
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
