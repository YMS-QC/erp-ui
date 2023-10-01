/* eslint-disable no-nested-ternary */

'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    dateRange: DateRange | undefined;
    setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const dateFormat = 'YYYY年-MM月-DD日';

export function DateRangePicker({ className, dateRange, setDate }: DateRangePickerProps) {
    return (
        <div className={cn('grid grid-cols-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        className={cn(
                            'w-full justify-between text-left font-normal col-start-1 col-end-3',
                            !dateRange && 'text-muted-foreground',
                        )}
                    >
                        {dateRange?.from ? (
                            dateRange.to ? (
                                <>
                                    {dayjs(dateRange.from).format(dateFormat)} -{' '}
                                    {dayjs(dateRange.to).format(dateFormat)}
                                </>
                            ) : (
                                dayjs(dateRange.from).format(dateFormat)
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}

                        <CalendarIcon className="mr-2 h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
