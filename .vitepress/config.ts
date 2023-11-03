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
        root: { label: '简体中文', lang: 'zh-CN', ...zhConfig },
        enUS: { label: 'English(US)', lang: 'en-US', ...enUSConfig },
        ruRU: { label: 'Русский', lang: 'ru-RU', ...ruConfig },
		zhTW: { label: '正體中文', lang: 'zh-TW', ...zhTWConfig }  
    },
});


