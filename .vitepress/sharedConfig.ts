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
            provider: 'local'
        }
    }
});
