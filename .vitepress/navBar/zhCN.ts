import {DefaultTheme} from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
    { text: 'ProjBobcat', link: '/zhCN/projbobcat/' },
    {
        text: 'MC 相关资源',
        items: [
            { text: 'CMFS', link: '/zhCN/CMFS/' },
            { text: '皮肤规范', link: '/zhCN/skin/' }
        ]
    },
    { text: "我们的团队", link: '/zhCN/team' }
];

export default nav;
