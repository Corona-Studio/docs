import { defineConfig } from 'vitepress'
import {sharedConfig} from "./sharedConfig";
import {zhConfig} from "./zhCN";
import {ruConfig} from "./ruRU";
import {zhTWConfig} from "./zhTW";

export default defineConfig({

    //define FavIcon
    head:[
        ['link', { rel: 'icon', href: '/favicon-tab.png' }]
    ],
    //...
    ...sharedConfig,

    title: 'CSKB',

    locales: {
        root: { label: '简体中文', lang: 'zh-CN', ...zhConfig },
        ruRU: { label: 'Русский', lang: 'ru-RU', ...ruConfig },
		zhTW: { label: '正體中文', lang: 'zh-TW', ...zhTWConfig }
    },
});


