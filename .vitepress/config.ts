import { defineConfig } from 'vitepress'
import {sharedConfig} from "./sharedConfig";
import {zhConfig} from "./zhCN";
import {ruConfig} from "./ruRU";
import {zhTWConfig} from "./zhTW";
import {enUSConfig} from "./enUS";

export default defineConfig({

    //define FavIcon
    head:[
        ['link', { rel: 'icon', href: '/img/favicon/favicon_dark.png' }]
    ],
    //...
    ...sharedConfig,

    title: 'CSKB',

    locales: {
        root: { label: '简体中文', lang: 'zh-CN', link: '/zhCN/', ...zhConfig },
        enUS: { label: 'English(US)', lang: 'en-US', link: '/enUS/', ...enUSConfig },
        ruRU: { label: 'Русский', lang: 'ru-RU', link: '/ruRU/', ...ruConfig },
		zhTW: { label: '繁體中文', lang: 'zh-TW', link: '/zhTW/', ...zhTWConfig }
    },
});


