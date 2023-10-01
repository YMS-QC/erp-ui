import { CommandMenu } from '@/components/command-menu';
import { LeftSideSheet } from '@/components/left-side-sheet';
import { MainNav } from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';

export function SiteHeader() {
    return (
        <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="p1 px-2 flex h-10 items-center justify-between">
                <LeftSideSheet />
                <MainNav />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <CommandMenu />
                    </div>
                    <nav className="flex items-center">
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}
