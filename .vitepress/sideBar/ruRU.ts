import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.SidebarItem[] = [
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
];

export default sidebar;
