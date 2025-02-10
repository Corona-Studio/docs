import {DefaultTheme, LocaleSpecificConfig} from "vitepress";
import nav from "./navBar/zhCN";
import sidebar from "./sideBar/zhCN";

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    lang: 'zhCN',
    title: '日冕知识库',
    description: 'Corona Studio Knowledge Base',

    themeConfig: {
        nav,

        sidebar,

        docFooter: {
            prev: '上一页',
            next: '下一页',
        },

        returnToTopLabel: '返回顶部',

        darkModeSwitchLabel: '外观',

        sidebarMenuLabel: '归档',

        lastUpdatedText: '更新于',

        editLink: {
            pattern: `https://github.com/Corona-Studio/docs/edit/main/:path`,
            text: '在 GitHub 上编辑此页',
        },

        footer: {
            message: '使用 MIT 协议发行, 喜欢我们的工作的话就给我们点一个 <a c-orange-5 target="_blank" href="https://github.com/Corona-Studio/docs">star ⭐</a> 吧！',
            copyright: `版权所有 © ${new Date().getFullYear()} - 日冕工作室`
        }
    }
};
