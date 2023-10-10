import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileTab } from '@/app/basic-data/srm2-item/profile-tab';

const BasicDataHomePage = ({ params }: { params: { slug: string[] } }) => {
    return (
        <Tabs defaultValue="settings" className="space-y-4 w-full">
            <div className="flex flex-col items-center justify-between md:items-start h-full w-full text-lg md:text-md">
                <TabsList>
                    <TabsTrigger value="settings">推送控制</TabsTrigger>
                    <TabsTrigger value="query">数据查询</TabsTrigger>
                    <TabsTrigger value="history">推送历史</TabsTrigger>
                    <TabsTrigger value="errors">报错记录</TabsTrigger>
                </TabsList>
            </div>
            <div>
                <TabsContent value="settings" className="space-y-4 flex-glow">
                    <ProfileTab />
                </TabsContent>
                <TabsContent value="query" className="space-y-4 flex-glow" />
                <TabsContent value="history" className="space-y-4 flex-glow" />
                <TabsContent value="errors" className="space-y-4 flex-glow" />
            </div>
        </Tabs>
    );
};

export default BasicDataHomePage;
