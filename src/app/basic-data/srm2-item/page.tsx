import React from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BasicDataHomePage = ({ params }: { params: { slug: string[] } }) => {
    // const path = params?.slug ?? null;
    // const topic = path ? path[0] : null;

    // console.log(topic);
    const { toast } = useToast();

    return (
        <div className="flex flex-col items-start h-full w-full">
            <Tabs defaultValue="settings" className="space-y-4 w-full">
                <TabsList>
                    <TabsTrigger value="settings">推送配置</TabsTrigger>
                    <TabsTrigger value="query">数据查询</TabsTrigger>
                    <TabsTrigger value="history">推送历史</TabsTrigger>
                    <TabsTrigger value="errors">报错记录</TabsTrigger>
                </TabsList>
                <TabsContent value="settings" className="space-y-4 flex-glow">
                    <Button
                        variant="outline"
                        onClick={() => {
                            toast({
                                description: 'Your message has been sent.',
                                className: ' z-50',
                            });
                        }}
                    >
                        Show Toast
                    </Button>
                </TabsContent>
                <TabsContent value="query" className="space-y-4 flex-glow" />
                <TabsContent value="history" className="space-y-4 flex-glow" />
                <TabsContent value="errors" className="space-y-4 flex-glow" />
            </Tabs>
        </div>
    );
};

export default BasicDataHomePage;
