import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.SidebarItem[] = [
    {
        text: "Guide",
        collapsed: false,
        items: [
            {text: "Start", link: "/enUS/guide/"},
            {text: "Our Team", link: '/enUS/team'}
        ]
    },
    {
        text: "CMFS",
        collapsed: false,
        items: [
            {text: "Introduction", link: "/enUS/CMFS/"}
        ]
    },
    {
        text: "LauncherX Guide",
        collapsed: false,
        items: [
            {
                text: "Startup",
                link: "/enUS/lxguide/startup/",
                collapsed: false,
                items: [
                    {text: "For Windows", link: "/enUS/lxguide/startup/perOsSetup/windows"},
                    {text: "For macOS", link: "/enUS/lxguide/startup/perOsSetup/macOS"},
                    {text: "For Linux ", link: "/enUS/lxguide/startup/perOsSetup/linux"}
                ]
            },
            {text: "Initial Setup: Add account", link: "/enUS/lxguide/add-game-account"},
            {text: "Dashboard", link: "/enUS/dashboard/"},
            {text: "Aggregated Search", link: "/enUS/dashboard/search"}
        ],
    },
    {
        text: "Minecraft",
        collapsed: false,
        items: [
            {text: "Skin Specs", link: "/enUS/skin/"}
        ]
    },
    {
        text: "ProjBobcat",
        collapsed: false,
        items: [
            {text: "Introduction", link: "/enUS/projbobcat/"},
            {text: "Start", link: "/enUS/projbobcat/beforeWeStart"},
            {
                text: "Install and Configuration",
                link: "/enUS/projbobcat/installationAndConfig",
                items: [
                    {text: "Configure Azure App", link: "/enUS/projbobcat/createNewAzureApp"}
                ]
            },
            {
                text: "Authenticators",
                collapsed: false,
                link: "/enUS/projbobcat/authenticators/",
                items:[
                    {text: "Offline Authenticate", link: "/enUS/projbobcat/authenticators/offline"},
                    {text: "Yggdrasil Authenticate (OLD)", link: "/enUS/projbobcat/authenticators/yggdrasil"},
                    {text: "Microsoft Authenticate (NEW)", link: "/enUS/projbobcat/authenticators/microsoft"}
                ]
            },
            {
                text: "Installers",
                collapsed: false,
                link: "/enUS/projbobcat/installers/",
                items: [
                    {text: "CurseForge Package Installer", link: "/enUS/projbobcat/installers/curseforge"},
                    {text: "Fabric Installer", link: "/enUS/projbobcat/installers/fabric"},
                    {text: "Forge Installer", link: "/enUS/projbobcat/installers/forge"},
                    {text: "LiteLoader Installer", link: "/enUS/projbobcat/installers/liteloader"},
                    {text: "Optifine Installer", link: "/enUS/projbobcat/installers/optifine"},
                    {text: "Quilt Installer", link: "/enUS/projbobcat/installers/quilt"}
                ]
            },
            {
                text: "Resource Completer",
                link: "/enUS/projbobcat/resourceCompleter/",
                items: [
                    {
                        text: "Resource Info Resolver",
                        collapsed: false,
                        link: "/enUS/projbobcat/resourceCompleter/resourceInfoResolver/index",
                        items: [
                            {text: "Assets Resolver", link: "/enUS/projbobcat/resourceCompleter/resourceInfoResolver/assetInfoResolver"},
                            {text: "log4j Logging Resolver", link: "/enUS/projbobcat/resourceCompleter/resourceInfoResolver/gameLoggingInfoResolver"},
                            {text: "Libraries Resolver", link: "/enUS/projbobcat/resourceCompleter/resourceInfoResolver/libraryInfoResolver"},
                            {text: "Version Information Resolver", link: "/enUS/projbobcat/resourceCompleter/resourceInfoResolver/versionInfoResolver"}
                        ]
                    },
                    {text: "Create and Configure a Completer", link: "/enUS/projbobcat/resourceCompleter/createAndConfigCompleter"}
                ]
            },
            {
                text: "Additional Parser",
                link: "/enUS/projbobcat/additionalParsers/",
                items: [
                    {text: "Game Archive Parser", link: "/enUS/projbobcat/additionalParsers/gameProfileParser"},
                    {text: "Account Profile Parser", link: "/enUS/projbobcat/additionalParsers/accountProfileParser"}
                ]
            }
        ]
    }
];

export default sidebar;
