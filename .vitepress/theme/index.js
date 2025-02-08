// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import {inBrowser, useData} from "vitepress";
import {watchEffect} from "vue";

function deployObserver (to, callback = () => {}, runNow = false) {
    if(runNow) callback();
    try{
        let cfg = {
                attributes: false,
                characterData: false,
                subtree: true,
                childList: true
            },
            cbk = () => {
                // ...
                callback();
            };

        let observer = new MutationObserver(cbk);
        observer.observe(to, cfg);
        console.log("Observer applied.");
    }catch(ex){
        console.log("Failed to apply observer, maybe because the browser is not supported, or the target(to) is null.");
    }
}

export default {
    ...DefaultTheme,

    enhanceApp({ app, router, siteData }) {
        // app is the Vue 3 app instance from `createApp()`.
        // router is VitePress' custom router. `siteData` is
        // a `ref` of current site-level metadata.

        let install = function(){
            deployObserver(document.getElementById("app"), () => {
                let analyse = document.querySelectorAll("p>code");
                for(let codes of analyse){
                    if(codes.parentElement.lastChild.nodeName != "CODE") 
                        continue;
                    codes.parentElement.classList.add("indent");
                    codes.parentElement.lastChild.classList.add("hidden");
                }
            }, true);
        }

        if (!import.meta.env.SSR)
            app.use({install})

    },

    setup() {
        const { lang } = useData()
        watchEffect(() => {
            if (inBrowser) {
                document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2024 00:00:00 UTC; path=/`;
            }
        });

    }
}
