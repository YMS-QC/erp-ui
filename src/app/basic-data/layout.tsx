import React from 'react';

import { Sidebar } from '@/components/sidebar';

const sideTitle = `主数据推送`;
const itemList = [
    {
        title: `SRM2-物料`,
        href: `/basic-data/srm2-item`,
    },
];

const BasicDataLayout = ({ children }: { children: React.ReactNode }) => {
    // const params = useParams();

    // const { slug } = params;

    // const topic = slug[0];

    // console.log(slug);

    return (
        <div className="bg-background">
            <div className="grid md:grid-cols-5 lg:grid-cols-6 w-full h-max">
                <Sidebar
                    sideTitle={sideTitle}
                    itemList={itemList}
                    className="hidden md:flex md:col-span-1 lg:col-span-1 md:border-r h-max w-max space-y-4 py-2 "
                />
                <div className="flex h-max space-y-4 py-2 pl-1">{children}</div>
            </div>
        </div>
    );
};

export default BasicDataLayout;
