'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { Sidebar } from '@/components/sidebar';
import { Menu } from '@/components/menu';

const BasicDataLayout = ({ children }: { children: React.ReactNode }) => {
    const params = useParams();

    const { slug } = params;

    const topic = slug[0];

    console.log(slug);

    return (
        <div className="bg-background">
            <div className="grid lg:grid-cols-6 w-full">
                <Sidebar
                    itemTitle="主数据推送"
                    itemList={[`srm2-items`]}
                    elected="-"
                    className="hidden lg:block lg:border-r lg:col-span-1"
                />
                <div className="lg:block lg:col-span-5">
                    <Menu title={topic} />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BasicDataLayout;
