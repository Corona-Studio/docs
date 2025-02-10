import {DefaultTheme, LocaleSpecificConfig} from "vitepress";
import nav from "./navBar/ruRU";
import sidebar from "./sideBar/ruRU";

export const ruConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    description: 'Corona Studio Knowledge Base',

    themeConfig: {
        nav,

        sidebar,

        docFooter: {
            prev: 'Предыдущая страница',
            next: 'Следующая Страница',
        },

        returnToTopLabel: 'Наверх',

        darkModeSwitchLabel: 'Внешний вид',

        sidebarMenuLabel: 'архив',

        lastUpdatedText: 'обновление',

        editLink: {
            pattern: `https://github.com/Corona-Studio/docs/edit/main/:path`,
            text: 'Изменить эту страницу на GitHub',
        },

        footer: {
            message: '使用 MIT 协议发行, 喜欢我们的工作的话就给我们点一个 <a c-orange-5 target="_blank" href="https://github.com/Corona-Studio/docs">star ⭐</a> 吧！',
            copyright: `все права защищены © ${new Date().getFullYear()} - 日冕工作室`
        }
    }
};
