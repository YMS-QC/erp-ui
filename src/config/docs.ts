import { MainNavItem, SidebarNavItem } from '../types/nav';

interface DocsConfig {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
    mainNav: [
        // {
        //     title: '主数据推送',
        //     href: '/basic-data',
        // },
        // {
        //     title: 'Components',
        //     href: '/docs/components/accordion',
        // },
        // {
        //     title: 'Themes',
        //     href: '/themes',
        // },
        // {
        //     title: 'Examples',
        //     href: '/examples',
        // },
        // {
        //     title: 'Figma',
        //     href: '/docs/figma',
        // },
        // {
        //     title: 'GitHub',
        //     href: 'https://github.com/shadcn/ui',
        //     external: true,
        // },
        // {
        //     title: 'Twitter',
        //     href: 'https://twitter.com/shadcn',
        //     external: true,
        // },
    ],
    sidebarNav: [
        {
            title: '主数据推送',
            items: [
                {
                    title: 'SRM2-物料',
                    href: '/basic-data/srm2-item',
                    items: [],
                },
            ],
        },
    ],
};
