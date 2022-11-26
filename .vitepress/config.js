export default {
    title: 'CSKB',

    description: 'Corona Studio Knowledge Base',

    themeConfig: {
        sidebar: [
            {
                text: "指南",
                items: [
                    {text: "开始", link: "/guide/"}
                ]
            },
            {
                text: "LauncherX 启动器 - 仪表盘",
                items: [
                    {text: "仪表盘", link: "/dashboard/"},
                    {text: "聚合搜索组件", link: "/dashboard/search"}
                ]
            },
            {
                text: "Minecraft",
                items: [
                    {text: "皮肤规范", link: "/skin/"}
                ]
            },
            {
                text: "ProjBobcat",
                items: [
                    {text: "简介", link: "/projbobcat/"},
                    {text: "开始", link: "/projbobcat/beforeWeStart"},
                    {text: "安装与配置", link: "/projbobcat/installationAndConfig"}
                ]
            }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © ${new Date().getFullYear()} - Corona Studio`
        },
    }
}
