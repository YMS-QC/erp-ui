import { MainNav } from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';

export function SiteHeader() {
    return (
        <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="p1 px-2 lg:px-4 flex h-14 items-center justify-between">
                <MainNav />
                {/* <MobileNav /> */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    {/* <div className="w-full flex-1 md:w-auto md:flex-none">
                        <CommandMenu />
                    </div> */}
                    <nav className="flex items-center">
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}