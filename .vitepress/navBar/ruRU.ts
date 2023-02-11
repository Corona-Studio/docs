import {DefaultTheme} from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
    { text: 'ProjBobcat', link: '/ruRU/projbobcat/' },
    {
        text: 'MC 相关资源',
        items: [
            { text: 'CMFS', link: '/ruRU/CMFS/' },
            { text: '皮肤规范', link: '/ruRU/skin/' }
        ]
    },
    { text: "我们的团队", link: '/ruRU/team' }
];

export default nav;
