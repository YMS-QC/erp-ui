import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    itemTitle: string | null;
    itemList: any[];
    elected: string;
}

export function Sidebar({ className, itemTitle, itemList, elected }: SidebarProps) {
    return (
        <div className={cn('pb-12', className)}>
            <div className="space-y-4 py-4">
                <div className="py-2">
                    <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                        {itemTitle}
                    </h2>
                    <ScrollArea className="h-[800px] px-1">
                        <div className="space-y-1 p-2">
                            {itemList?.map((item, i) => (
                                <Button
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={`${item.key}`}
                                    variant="ghost"
                                    className="w-full justify-start font-normal"
                                >
                                    {item}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
