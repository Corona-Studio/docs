import {DefaultTheme} from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
    { text: 'ProjBobcat', link: '/zhTW/projbobcat/' },
    {
        text: 'MC 相關資源',
        items: [
            { text: 'CMFS', link: '/zhTW/CMFS/' },
            { text: '面板規範', link: '/zhTW/skin/' }
        ]
    },
    { text: "我們的團隊", link: '/zhTW/team' }
];

export default nav;
