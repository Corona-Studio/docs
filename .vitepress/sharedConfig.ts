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

        outline: {
            level: [2, 4], // 控制显示的标题级别范围，例如 h2 到 h3
            label: 'On This Page' // 可选，修改“On This Page”的标题
        },

        // aside:

        search: {
            provider: 'local'
        }
    }
});
