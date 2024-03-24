import {defineConfig} from "vitepress";
import {zhSearchBarLocale} from "./searchBar/zhCN";
import {ruSearchBarLocale} from "./searchBar/ruRU";
import {zhTWSearchBarLocale} from "./searchBar/zhTW";
import {enUSSearchBarLocale} from "./searchBar/enUS";


export const sharedConfig = defineConfig({

    markdown: {
        // options for @mdit-vue/plugin-toc
        // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
        toc: { level: [1, 2, 3] },
        lineNumbers: true,
    },

    themeConfig: {

        logo: {
            light: "/img/favicon/favicon_light.png",
            dark: "/img/favicon/favicon_dark.png"
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Corona-Studio' }
        ],

        search: {
            provider: 'algolia',
            options: {
                appId: 'TR09SJHXWC',
                apiKey: '4df6fda8f27b61a2ad20014fd8fd867c',
                indexName: 'kb-corona',
                locales: {
                    root: zhSearchBarLocale,
                    ruRU: ruSearchBarLocale,
                    zhTW: zhTWSearchBarLocale,
                    enUS: enUSSearchBarLocale
                }
            }
        }
    }
});
