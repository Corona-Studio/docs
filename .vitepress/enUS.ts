import {DefaultTheme, LocaleSpecificConfig} from "vitepress";
import nav from "./navBar/enUS";
import sidebar from "./sideBar/enUS";

export const enUSConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    description: 'Corona Studio Knowledge Base',

    themeConfig: {
        nav,

        sidebar,

        docFooter: {
            prev: 'Previous',
            next: 'Next',
        },

        returnToTopLabel: 'Top',

        darkModeSwitchLabel: 'Dark Mode',

        sidebarMenuLabel: 'Archive',

        lastUpdatedText: 'Last update',

        editLink: {
            pattern: `https://github.com/Corona-Studio/docs/edit/main/:path`,
            text: 'Edit this page on GitHub',
        },

        footer: {
            message: 'Published under the MIT license. If you like our work, please consider hit that <a c-orange-5 target="_blank" href="https://github.com/Corona-Studio/docs">star ⭐</a>!',
            copyright: `Copyright © ${new Date().getFullYear()} - Corona Studio`
        }
    }
};
