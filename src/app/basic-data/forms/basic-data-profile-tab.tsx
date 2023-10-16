/* eslint-disable no-nested-ternary */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import React, { useState } from 'react';

import { CalendarIcon } from '@radix-ui/react-icons';

import { signOut, useSession } from 'next-auth/react';

import dayjs from 'dayjs';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import ProfileSchema from '@/app/basic-data/schemas/profile';

export function ProfileTab() {
    const pathname = usePathname();
    const { data: session }: { data: any } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const startUpApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${pathname}/start`;
    const stopApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${pathname}/stop`;

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            lookbackDays: 7,
            sleepSeconds: 30,
        },
    });

    async function onSubmit(formData: z.infer<typeof ProfileSchema>) {
        const getResponse = async () => {
            try {
                const res = await fetch(startUpApiUrl, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${session?.backendTokens?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const json = await res.json();

                return json;
            } catch (error: any) {
                return { statusCode: error.code, message: error.message };
            }
        };

        setIsLoading(true);

        const data = await getResponse();

        setIsLoading(false);

        if (data.statusCode === 200)
            toast({
                title: '成功！',
            });
        else if (data.statusCode === 401) {
            toast({
                title: '会话过期需要重新登录',
            });
            // router.replace('/basic-data/srm2-item');
            // router.push('/auth/signin');
            signOut();
        } else
            toast({
                title: '处理失败！',
                variant: 'destructive',
                description: <p>{data.message}</p>,
            });
    }

    async function handleStop(e: any) {
        e.preventDefault();

        console.log(session);

        const getResponse = async () => {
            try {
                const res = await fetch(stopApiUrl, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${session?.backendTokens?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                const json = await res.json();

                return json;
            } catch (error: any) {
                return { statusCode: error.code, message: error.message };
            }
        };

        setIsLoading(true);

        const data = await getResponse();

        setIsLoading(false);

        if (data.statusCode === 200)
            toast({
                title: '成功！',
            });
        else if (data.statusCode === 401) {
            toast({
                title: '会话过期需要重新登录',
            });
            signOut();
        } else
            toast({
                title: '处理失败！',
                variant: 'destructive',
                description: <p>{data.message}</p>,
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-[800px]  p-2">
                <Label className="text-lg">扫描配置</Label>
                <Separator />
                <div className="space-y-6 pt-2 pb-6">
                    <FormField
                        control={form.control}
                        name="lookbackDays"
                        render={({ field: { value, onChange } }) => (
                            <FormItem>
                                <FormLabel>回溯{value}天</FormLabel>
                                <FormControl>
                                    <Slider
                                        min={1}
                                        max={100}
                                        step={1}
                                        defaultValue={[value]}
                                        onValueChange={(vals) => {
                                            onChange(vals[0]);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>从{value}天开始扫描更新的数据</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sleepSeconds"
                        render={({ field: { value, onChange } }) => (
                            <FormItem>
                                <FormLabel>运行间隔时间 {value} 秒</FormLabel>
                                <FormControl>
                                    <Slider
                                        min={30}
                                        max={30 * 2 * 60}
                                        step={30}
                                        defaultValue={[value]}
                                        onValueChange={(vals) => {
                                            onChange(vals[0]);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>间隔{value}秒，运行下次扫描</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateFrom"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>开始日期</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    'w-full pl-3 text-left font-normal',
                                                    !field.value && 'text-muted-foreground',
                                                )}
                                            >
                                                {field.value ? (
                                                    dayjs(field.value).format('YYYY-MM-DD')
                                                ) : (
                                                    <span>选择日期</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(dayjs(field.value).date())}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    可不填，填写后指定从该日期开始扫描更新的数据，默认回溯一天
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dateTo"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>截至日期</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    'w-full pl-3 text-left font-normal',
                                                    !field.value && 'text-muted-foreground',
                                                )}
                                            >
                                                {field.value ? (
                                                    dayjs(field.value).format('YYYY-MM-DD')
                                                ) : (
                                                    <span>选择日期</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(dayjs(field.value).date())}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    可不填，填写后将指定扫描截至日期,默认到当前时间
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maxUpdateRows"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>最大更新条数</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue="1000">
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="最大更新条数" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Array.from(Array(10).keys()).map((i) => (
                                            <SelectItem value={String((i + 1) * 1000)}>
                                                {(i + 1) * 1000}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>控制最大更新条数.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Label className="text-lg">推送配置</Label>
                <Separator />

                <div className="space-y-6 pt-2 pb-6">
                    <FormField
                        control={form.control}
                        name="transportRowLimit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>单次推送条数</FormLabel>
                                <Select
                                    onValueChange={(val) => field.onChange(Number(val))}
                                    defaultValue="10"
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="最大更新条数" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Array.from(Array(10).keys()).map((i) => (
                                            <SelectItem value={String((i + 1) * 10)}>
                                                {(i + 1) * 10}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>单次最大推送条数</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="py-6 flex justify-end space-x-2">
                    <Button type="submit" loading={isLoading}>
                        更新配置
                    </Button>
                    <Button variant="outline" loading={isLoading} onClick={(e) => handleStop(e)}>
                        停止推送
                    </Button>
                </div>
            </form>
        </Form>
    );
}
