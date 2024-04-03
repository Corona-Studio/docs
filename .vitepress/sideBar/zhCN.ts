import type { DefaultTheme } from 'vitepress'

// To translators: All original comments should never keeped in your language file.
export const sidebar: DefaultTheme.SidebarItem[] = [
    {
        text: "日冕指南",
        collapsed: false,
        items: [
            {text: "开始", link: "/zhCN/guide/"},
            {text: "我们的团队", link: '/zhCN/guide/team'},
            {text: "指路官方", link: '/zhCN/guide/contact'},
            {text: "CSA账户", link: '/zhCN/guide/account'},
            {text: "加入我们!", link: '/zhCN/guide/joinus'},
            // {text: "审核规则", link: '/zhCN/guide/code_of_joining_application'}, // 未就绪
        ]
    },
    {
        text: "ProjBobcat",
        collapsed: true,
        items: [
            {text: "简介", link: "/zhCN/projbobcat/"},
            {text: "开始", link: "/zhCN/projbobcat/beforeWeStart"},
            {
                text: "安装与配置",
                link: "/zhCN/projbobcat/installationAndConfig",
                items: [
                    {text: "配置 Azure 应用", link: "/zhCN/projbobcat/createNewAzureApp"}
                ]
            },
            {
                text: "验证模型",
                collapsed: true,
                link: "/zhCN/projbobcat/authenticators/",
                items:[
                    {text: "离线验证模型", link: "/zhCN/projbobcat/authenticators/offline"},
                    {text: "Yggdrasil 验证模型（旧版）", link: "/zhCN/projbobcat/authenticators/yggdrasil"},
                    {text: "Microsoft 验证模型（新版）", link: "/zhCN/projbobcat/authenticators/microsoft"}
                ]
            },
            {
                text: "安装器",
                collapsed: true,
                link: "/zhCN/projbobcat/installers/",
                items: [
                    {text: "CurseForge 整合包安装器", link: "/zhCN/projbobcat/installers/curseforge"},
                    {text: "Fabric 安装器", link: "/zhCN/projbobcat/installers/fabric"},
                    {text: "Forge 安装器", link: "/zhCN/projbobcat/installers/forge"},
                    {text: "LiteLoader 安装器", link: "/zhCN/projbobcat/installers/liteloader"},
                    {text: "Optifine 安装器", link: "/zhCN/projbobcat/installers/optifine"},
                    {text: "Quilt 安装器", link: "/zhCN/projbobcat/installers/quilt"}
                ]
            },
            {
                text: "资源补全器",
                link: "/zhCN/projbobcat/resourceCompleter/",
                items: [
                    {
                        text: "资源解析器",
                        collapsed: true,
                        link: "/zhCN/projbobcat/resourceCompleter/resourceInfoResolver/index",
                        items: [
                            {text: "Assets 解析器", link: "/zhCN/projbobcat/resourceCompleter/resourceInfoResolver/assetInfoResolver"},
                            {text: "log4j 日志格式化组件解析器", link: "/zhCN/projbobcat/resourceCompleter/resourceInfoResolver/gameLoggingInfoResolver"},
                            {text: "Libraries 解析器", link: "/zhCN/projbobcat/resourceCompleter/resourceInfoResolver/libraryInfoResolver"},
                            {text: "版本信息解析器", link: "/zhCN/projbobcat/resourceCompleter/resourceInfoResolver/versionInfoResolver"}
                        ]
                    },
                    {text: "创建和配置补全器", link: "/zhCN/projbobcat/resourceCompleter/createAndConfigCompleter"}
                ]
            },
            {
                text: "附加解析器",
                link: "/zhCN/projbobcat/additionalParsers/",
                items: [
                    {text: "游戏档案解析器", link: "/zhCN/projbobcat/additionalParsers/gameProfileParser"},
                    {text: "账户档案解析器", link: "/zhCN/projbobcat/additionalParsers/accountProfileParser"}
                ]
            }
        ]
    },
    {
        text: "LauncherX 启动器指南",
        collapsed: true,
        items: [
            {
                text: "初次启动",
                link: "/zhCN/lxguide/startup/",
                collapsed: true,
                items: [
                    {text: "针对 Windows 系统", link: "/zhCN/lxguide/startup/perOsSetup/windows"},
                    {text: "针对 macOS 系统", link: "/zhCN/lxguide/startup/perOsSetup/macOS"},
                    {text: "针对 Linux 系统", link: "/zhCN/lxguide/startup/perOsSetup/linux"}
                ]
            },   
            {text: "问题反馈?", link: "/zhCN/lxguide/report-issue"},
            {
                text: '使用LauncherX',
                link: '/zhCN/lxguide/ui-guide/',
                collapsed: true,
                items: [
                    {text: "开始", link: "/zhCN/lxguide/ui-guide/"},
                    {text: "0: 主界面", link: "/zhCN/lxguide/ui-guide/0_interface"},
                    {text: "1: 游戏列表", link: "/zhCN/lxguide/ui-guide/1_gamelist"},
                    {text: "2: 下载", link: "/zhCN/lxguide/ui-guide/2_download"},
                    {text: "3: 设置和本地账户", link: "/zhCN/lxguide/ui-guide/3_settings_localAccounts"},
                ]
            },
            {
                text: "LauncherX设置",
                link: "/zhCN/lxguide/settings/",
                collapsed: false,
                items: [ 
                    {text: "文档解释：什么是“专题”，什么是“分类”", link: "/zhCN/lxguide/settings/index"},
                    {
                        text: '专题',
                        link: '/zhCN/lxguide/settings/special/',
                        collapsed: true,
                        items: [
                            {text: "初次设置：添加账户", link: "/zhCN/lxguide/settings/special/add-game-account"},
                            {text: "#帐户管理", link: "/zhCN/lxguide/settings/special/manage-accounts"},
                            {text: "检测网络", link: "/zhCN/lxguide/settings/special/check-network"},
                            {text: "#个性化", link: "/zhCN/lxguide/settings/special/customize-launcher"},
                            {text: "版本隔离与独立设置", link: "/zhCN/lxguide/settings/special/independent-config"},
                            // {
                            //     text: "仪表盘", 
                            //     link: "/zhCN/lxguide/settings/special/dashboard/",
                            //     collapsed: true,
                            //     items: [
                            // // 这玩意有必要分成多个吗
                            //     ]
                            // },             
                        ]
                    },
                    {
                        text: '分类',
                        link: '/zhCN/lxguide/settings/item/',
                        collapsed: true,
                        items: [
                            {text: "全局游戏设置", link: "/zhCN/lxguide/settings/item/global"},
                            {text: "#“外观”", link: "/zhCN/lxguide/settings/item/customize"},
                            {text: "网络", link: "/zhCN/lxguide/settings/item/network"},
                            {text: "#“多人游戏”", link: "/zhCN/lxguide/settings/item/multi-game"},
                            {text: "#“高级”", link: "/zhCN/lxguide/settings/item/advanced"},
                            {text: "启动器账户", link: "/zhCN/lxguide/settings/item/lx-account"},
                            {text: "其他", link: "/zhCN/lxguide/settings/item/others"},
                        ]
                    },
                ]
            },
            {
                text: "LauncherX功能", 
                link: "/zhCN/lxguide/features/",
                collapsed: true,
                items: [
                    {text: "仪表板", link: "/zhCN/lxguide/features/dashboard"},
                    {text: "整合包支持", link: "/zhCN/lxguide/features/modpack-support"},
                    {text: "#实时日志和错误分析器", link: "/zhCN/lxguide/features/log-window"},
                    // {text: "#P2P联机", link: "/zhCN/lxguide/features/p2p"},
                    {text: "服务器管理", link: "/zhCN/lxguide/features/manage-server"},
                    {text: "#游戏资源管理", link: "/zhCN/lxguide/features/game-assets"},

                ]
            },
            {
                text: '名词解释和其他导引',
                link: '/zhCN/lxguide/others/',
                collapsed: true,
                items: [
                    {text: '常见名词一览', link: '/zhCN/lxguide/others/general'},
                    {text: '测试导引: 善用日志', link: '/zhCN/lxguide/others/report-with-logs'},
                    {text: '优化配置: 下载合适的JRE', link: '/zhCN/lxguide/others/download-jre'},
                    {text: '优化配置: 启动参数', link: '/zhCN/lxguide/others/args'},
                    {text: '优化配置: 合理配置内存和GC、JavaAgent', link: '/zhCN/lxguide/others/adjust-ram-gc-ja'},
                ]
            }
        ],
    },
    {
        text: "CMFS",
        collapsed: true,
        items: [
            {text: "简介", link: "/zhCN/CMFS/"},
            {
                text: '帮助!',
                link: '/zhCN/CMFS/help/',
                collapsed: true,
                items: [
                    {text: "无效的会话？", link: "/zhCN/CMFS/help/invalid-session"},

                ]
            }
        ]
    },
    {
        text: 'Skript导引',
        collapsed: true,
        items: [
            {text: "入门: 准备工作", link: "/zhCN/skript/"},
            {text: "入门: 正式开始", link: "/zhCN/skript/startup"},
            {text: "注册起始点", link: "/zhCN/skript/register-entry"},

        ]
    },
    {
        text: "Minecraft",
        collapsed: true,
        items: [ 
            {text: "皮肤规范", link: "/zhCN/skin/"} 
        ]
    },
    
    {text: "通用最终用户许可协议", link: "/zhCN/geula"}
];

export default sidebar;
