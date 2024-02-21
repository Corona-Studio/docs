import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.SidebarItem[] = [
    {
        text: "指南",
        collapsed: false,
        items: [
            {text: "開始", link: "/zhTW/guide/"},
            {text: "我們的團隊", link: '/zhTW/team'}
        ]
    },
    {
        text: "CMFS",
        collapsed: true,
        items: [
            {text: "簡介", link: "/zhTW/CMFS/"}
        ]
    },
    {
        text: "LauncherX 啟動器 - 儀表盤",
        collapsed: true,
        items: [
            {text: "儀表盤", link: "/zhTW/dashboard/"},
            {text: "聚合搜尋元件", link: "/zhTW/dashboard/search"}
        ],
    },
    {
        text: "Minecraft",
        collapsed: true,
        items: [
            {text: "皮膚規範", link: "/zhTW/skin/"}
        ]
    },
    {
        text: "ProjBobcat",
        collapsed: true,
        items: [
            {text: "簡介", link: "/zhTW/projbobcat/"},
            {text: "開始", link: "/zhTW/projbobcat/beforeWeStart"},
            {
                text: "安裝與配置",
                link: "/zhTW/projbobcat/installationAndConfig",
                items: [
                    {text: "配置 Azure 應用", link: "/zhTW/projbobcat/createNewAzureApp"}
                ]
            },
            {
                text: "安裝器",
                collapsed: true,
                link: "/zhTW/projbobcat/installers/",
                items: [
                    {text: "CurseForge 整合包安裝器", link: "/zhTW/projbobcat/installers/curseforge"},
                    {text: "Fabric 安裝器", link: "/zhTW/projbobcat/installers/fabric"},
                    {text: "Forge 安裝器", link: "/zhTW/projbobcat/installers/forge"},
                    {text: "LiteLoader 安裝器", link: "/zhTW/projbobcat/installers/liteloader"},
                    {text: "Optifine 安裝器", link: "/zhTW/projbobcat/installers/optifine"},
                    {text: "Quilt 安裝器", link: "/zhTW/projbobcat/installers/quilt"}
                ]
            },
            {
                text: "資源補全器",
                link: "/zhTW/projbobcat/resourceCompleter/",
                items: [
                    {
                        text: "資源解析器",
                        collapsed: true,
                        link: "/zhTW/projbobcat/resourceCompleter/resourceInfoResolver/index",
                        items: [
                            {text: "Assets 解析器", link: "/zhTW/projbobcat/resourceCompleter/resourceInfoResolver/assetInfoResolver"},
                            {text: "log4j 日誌格式化元件解析器", link: "/zhTW/projbobcat/resourceCompleter/resourceInfoResolver/gameLoggingInfoResolver"},
                            {text: "Libraries 解析器", link: "/zhTW/projbobcat/resourceCompleter/resourceInfoResolver/libraryInfoResolver"},
                            {text: "版本資訊解析器", link: "/zhTW/projbobcat/resourceCompleter/resourceInfoResolver/versionInfoResolver"}
                        ]
                    },
                    {text: "建立和配置補全器", link: "/zhTW/projbobcat/resourceCompleter/createAndConfigCompleter"}
                ]
            }
        ]
    }
];

export default sidebar;
