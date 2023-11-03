import {DefaultTheme} from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
    { text: 'ProjBobcat', link: '/enUS/projbobcat/' },
    {
        text: 'MineCraft Related',
        items: [
            { text: 'CMFS', link: '/enUS/CMFS/' },
            { text: 'Skin Specs', link: '/enUS/skin/' }
        ]
    },
    { text: "Our Team", link: '/enUS/team' }
];

export default nav;
