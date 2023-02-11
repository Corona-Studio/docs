import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'CSKB',

    description: 'Corona Studio Knowledge Base',

    markdown: {
        // options for @mdit-vue/plugin-toc
        // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
        toc: { level: [1, 2, 3] },
        lineNumbers: true
    },

    themeConfig: {

        algolia: {
            appId: 'TR09SJHXWC',
            apiKey: '4df6fda8f27b61a2ad20014fd8fd867c',
            indexName: 'kb-corona',
            locales: {
                zh: {
                    placeholder: '搜索文档',
                    translations: {
                        button: {
                            buttonText: '搜索文档',
                            buttonAriaLabel: '搜索文档'
                        },
                        modal: {
                            searchBox: {
                                resetButtonTitle: '清除查询条件',
                                resetButtonAriaLabel: '清除查询条件',
                                cancelButtonText: '取消',
                                cancelButtonAriaLabel: '取消'
                            },
                            startScreen: {
                                recentSearchesTitle: '搜索历史',
                                noRecentSearchesText: '没有搜索历史',
                                saveRecentSearchButtonTitle: '保存至搜索历史',
                                removeRecentSearchButtonTitle: '从搜索历史中移除',
                                favoriteSearchesTitle: '收藏',
                                removeFavoriteSearchButtonTitle: '从收藏中移除'
                            },
                            errorScreen: {
                                titleText: '无法获取结果',
                                helpText: '你可能需要检查你的网络连接'
                            },
                            footer: {
                                selectText: '选择',
                                navigateText: '切换',
                                closeText: '关闭',
                                searchByText: '搜索提供者'
                            },
                            noResultsScreen: {
                                noResultsText: '无法找到相关结果',
                                suggestedQueryText: '你可以尝试查询',
                                reportMissingResultsText: '你认为该查询应该有结果？',
                                reportMissingResultsLinkText: '点击反馈'
                            }
                        }
                    }
                }
            }
        },

        logo: {
            light: "/img/favicon/favicon_light.png",
            dark: "/img/favicon/favicon_dark.png"
        },

        nav: [
            { text: 'ProjBobcat', link: '/projbobcat/' },
            {
                text: 'MC 相关资源',
                items: [
                    { text: 'CMFS', link: '/CMFS/' },
                    { text: '皮肤规范', link: '/skin/' }
                ]
            },
            { text: "我们的团队", link: '/team' }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Corona-Studio' }
        ],

        sidebar: [
            {
                text: "指南",
                collapsed: false,
                items: [
                    {text: "开始", link: "/guide/"},
                    {text: "我们的团队", link: '/team'}
                ]
            },
            {
                text: "CMFS",
                collapsed: false,
                items: [
                    {text: "简介", link: "/CMFS/"}
                ]
            },
            {
                text: "LauncherX 启动器 - 仪表盘",
                collapsed: false,
                items: [
                    {text: "仪表盘", link: "/dashboard/"},
                    {text: "聚合搜索组件", link: "/dashboard/search"}
                ],
            },
            {
                text: "Minecraft",
                collapsed: false,
                items: [
                    {text: "皮肤规范", link: "/skin/"}
                ]
            },
            {
                text: "ProjBobcat",
                collapsed: false,
                items: [
                    {text: "简介", link: "/projbobcat/"},
                    {text: "开始", link: "/projbobcat/beforeWeStart"},
                    {
                        text: "安装与配置",
                        link: "/projbobcat/installationAndConfig",
                        items: [
                            {text: "配置 Azure 应用", link: "/projbobcat/createNewAzureApp"}
                        ]
                    },
                    {
                        text: "安装器",
                        collapsed: false,
                        link: "/projbobcat/installers/",
                        items: [
                            {text: "CurseForge 整合包安装器", link: "/projbobcat/installers/curseforge"},
                            {text: "Fabric 安装器", link: "/projbobcat/installers/fabric"},
                            {text: "Forge 安装器", link: "/projbobcat/installers/forge"},
                            {text: "LiteLoader 安装器", link: "/projbobcat/installers/liteloader"},
                            {text: "Optifine 安装器", link: "/projbobcat/installers/optifine"},
                            {text: "Quilt 安装器", link: "/projbobcat/installers/quilt"}
                        ]
                    },
                    {
                        text: "资源补全器",
                        link: "/projbobcat/resourceCompleter/",
                        items: [
                            {
                                text: "资源解析器",
                                collapsed: false,
                                link: "/projbobcat/resourceCompleter/resourceInfoResolver/index",
                                items: [
                                    {text: "Assets 解析器", link: "/projbobcat/resourceCompleter/resourceInfoResolver/assetInfoResolver"},
                                    {text: "log4j 日志格式化组件解析器", link: "/projbobcat/resourceCompleter/resourceInfoResolver/gameLoggingInfoResolver"},
                                    {text: "Libraries 解析器", link: "/projbobcat/resourceCompleter/resourceInfoResolver/libraryInfoResolver"},
                                    {text: "版本信息解析器", link: "/projbobcat/resourceCompleter/resourceInfoResolver/versionInfoResolver"}
                                ]
                            },
                            {text: "创建和配置补全器", link: "/projbobcat/resourceCompleter/createAndConfigCompleter"}
                        ]
                    }
                ]
            }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © ${new Date().getFullYear()} - Corona Studio`
        }
    }
})
