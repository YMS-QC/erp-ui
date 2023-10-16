import React from 'react';

import { Sidebar } from '@/components/sidebar';

const itemList = [
    {
        title: `SRM2-物料`,
        href: `/basic-data/srm2-items`,
    },
    {
        title: `SRM2-接收事务`,
        href: `/basic-data/srm2-rcv`,
    },
];

const BasicDataLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-background">
            <div className="grid md:grid-cols-5 lg:grid-cols-7 w-full h-max">
                <Sidebar
                    itemList={itemList}
                    className="hidden md:flex md:col-span-1 h-full w-full space-y-4 py-2 border-r"
                />
                <div className="h-full space-y-4 py-2 md:col-start-2 md:col-end-6 lg:col-end-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BasicDataLayout;
