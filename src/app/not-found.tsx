'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="w-full my-32">
            <div className="flex flex-col items-center justify-center my-auto space-y-1">
                <h1 className="font-semibold text-muted-foreground text-8xl">404</h1>
                <p className=" block p-5">你访问的页面不存在</p>
                <Button variant="default" className="mt-12 p2">
                    <Link href="/">主页</Link>
                </Button>
            </div>
        </div>
    );
}
