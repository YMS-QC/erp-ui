'use client';

import { signOut, useSession } from 'next-auth/react';

import { AvatarIcon, EnterIcon } from '@radix-ui/react-icons';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function LogButton() {
    const { data: session } = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {session ? (
                        <EnterIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    ) : (
                        <AvatarIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    )}
                    <span className="sr-only">账户</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {session ? (
                    <DropdownMenuItem onClick={() => signOut()}>注销</DropdownMenuItem>
                ) : (
                    <DropdownMenuItem>
                        <Link href="/auth/signin" className=" block w-full">
                            登录
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
