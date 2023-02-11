import {DefaultTheme} from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
    { text: 'ProjBobcat', link: '/projbobcat/' },
    {
        text: 'MC 相关资源',
        items: [
            { text: 'CMFS', link: '/CMFS/' },
            { text: '皮肤规范', link: '/skin/' }
        ]
    },
    { text: "我们的团队", link: '/team' }
];

export default nav;
