import { defineConfig } from 'vitepress'
import {sharedConfig} from "./sharedConfig";
import {zhConfig} from "./zhCN";

export default defineConfig({

    ...sharedConfig,

    title: 'CSKB',

    locales: {
        root: { label: '简体中文', lang: 'zh-CN', ...zhConfig },
        ruRU: { label: 'Русский', lang: 'ru-RU', ...zhConfig }
    },
})
