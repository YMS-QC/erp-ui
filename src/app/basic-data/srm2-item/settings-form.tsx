/* eslint-disable no-nested-ternary */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import dayjs from 'dayjs';

import React from 'react';

import { CalendarIcon } from '@radix-ui/react-icons';

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

const FormSchema = z.object({
    lookBackDays: z.number().min(1, { message: '至少回溯一天' }).optional(),
    dateFrom: z
        .date()
        .min(dayjs().add(-30, 'day').toDate(), { message: '开始日期不能早于30天前' })
        .optional(),
    dateTo: z.date().optional(),
    maxUpdateRows: z.number().default(1000).optional(),
});

export function SettingsForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: '你提交了以下的值:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 z-50">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
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
                        name="lookBackDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>回溯天数</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="选择回溯天数" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Array.from(Array(7).keys()).map((i) => (
                                            <SelectItem value={String(i + 1)}>{i + 1}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>控制往前扫描多少天的数据</FormDescription>
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
                                <FormDescription>选择扫描开始日期</FormDescription>
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
                                <FormDescription>选择扫描截至日期</FormDescription>
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
                        name="maxUpdateRows"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>单次推送条数</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue="10">
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

                <div className="py-6">
                    <Button type="submit">提交</Button>
                </div>
            </form>
        </Form>
    );
}
