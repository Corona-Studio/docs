import {DefaultTheme, LocaleSpecificConfig} from "vitepress";
import nav from "./navBar/zhTW";
import sidebar from "./sideBar/zhTW";

export const zhTWConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    description: 'Corona Studio Knowledge Base',

    themeConfig: {
        nav,

        sidebar,

        docFooter: {
            prev: '上一頁',
            next: '下一頁',
        },

        returnToTopLabel: '返回頂部',

        darkModeSwitchLabel: '外觀',

        sidebarMenuLabel: '歸檔',

        lastUpdatedText: '更新於',

        editLink: {
            pattern: `https://github.com/Corona-Studio/docs/edit/main/:path`,
            text: '在 GitHub 上編輯此頁',
        },

        footer: {
            message: '使用 MIT 協議發行, 喜歡我們的工作的話就給我們點一個 <a c-orange-5 target="_blank" href="https://github.com/Corona-Studio/docs">star ⭐</a> 吧！',
            copyright: `版權所有 © ${new Date().getFullYear()} - 日冕工作室`
        }
    }
};
