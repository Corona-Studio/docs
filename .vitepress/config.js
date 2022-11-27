export default {
    title: 'CSKB',

    description: 'Corona Studio Knowledge Base',

    themeConfig: {
        sidebar: [
            {
                text: "指南",
                collapsible: true,
                items: [
                    {text: "开始", link: "/guide/"}
                ]
            },
            {
                text: "CMFS",
                collapsible: true,
                items: [
                    {text: "简介", link: "/CMFS/"}
                ]
            },
            {
                text: "LauncherX 启动器 - 仪表盘",
                collapsible: true,
                items: [
                    {text: "仪表盘", link: "/dashboard/"},
                    {text: "聚合搜索组件", link: "/dashboard/search"}
                ]
            },
            {
                text: "Minecraft",
                collapsible: true,
                items: [
                    {text: "皮肤规范", link: "/skin/"}
                ]
            },
            {
                text: "ProjBobcat",
                collapsible: true,
                items: [
                    {text: "简介", link: "/projbobcat/"},
                    {text: "开始", link: "/projbobcat/beforeWeStart"},
                    {
                        text: "安装与配置",
                        link: "/projbobcat/installationAndConfig",
                        items:[
                            {text: "配置 Azure 应用", link: "/projbobcat/createNewAzureApp"}
                        ]
                    },
                ]
            }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © ${new Date().getFullYear()} - Corona Studio`
        },
    }
}
