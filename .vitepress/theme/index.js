// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import {inBrowser, useData} from "vitepress";
import {watchEffect} from "vue";

export default {
    ...DefaultTheme,

    enhanceApp({ app, router, siteData }) {
        // app is the Vue 3 app instance from `createApp()`.
        // router is VitePress' custom router. `siteData` is
        // a `ref` of current site-level metadata.
    },

    setup() {
        const { lang } = useData()
        watchEffect(() => {
            if (inBrowser) {
                document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2024 00:00:00 UTC; path=/`
            }
        })
    },
    desplayHatchContent(){
        window.onload = () => {
            if(window.location.href.includes("zhTW")){
                document.body.innerHTML.replace("/正體/g", "繁體(台)")
            }else return
        }

    }
}
