# Forge 安装器

在 ProjBobcat 中, 我们支持了几乎所有主流 MineCraft 版本的 Forge 自动化安装. 

[[toc]]

::: tip

请注意, ProjBobcat 仅实现了 Forge 自动化安装流程, 您仍然需要自己实现 Forge 安装包的搜索、下载、保存流程. 

:::

## 判断应该使用哪一种 Forge 安装器

由于 Forge 团队在后续的版本中修改了 Forge 的打包规范以及安装流程. 因此, 您需要手动判断应该使用哪一种安装器. 
在 ProjBobcat 中, 我们已经为您实现了相关的判断逻辑. 您只需要简单地调用下面的方法：

```c#
var mcVersion = "[MC_VERSION]";
var forgeJarPath = "[PATH_TO_YOUR_FORGE_INSTALLER]";
var forgeVersion = ForgeInstallerFactory.GetForgeArtifactVersion(mcVersion, "[FORGE_VERSION]");

var isLegacy = ForgeInstallerFactory.IsLegacyForgeInstaller(forgeJarPath, forgeVersion);  // [!code focus]
```

在上述代码块中, 请将这些参数按照您的实际情况替换：

|               项目                |                     说明                     |
|:-------------------------------:|:------------------------------------------:|
|          [MC_VERSION]           |    将 Forge 安装到的 MineCraft 版本, 例如：1.19.2     |
| [PATH_TO_YOUR_FORGE_INSTALLER]  |           Forge 安装器 .jar 文件所在的路径           |
|         [FORGE_VERSION]         |      Forge 的具体版本, 通常为 XX.X.X, 例如：43.2.0      |

在您完成替换并成功执行上述的代码片段之后, **isLegacy** 会指示当前 Forge 安装器应当使用哪一种 Forge 安装器. 

## 初始化旧版安装器

如果在上面的流程中, **isLegacy** 的值为 **true**, 这意味着您需要使用旧版安装器来完成 Forge 的安装. 
要初始化旧版安装器, 只需实例化 **LegacyForgeInstaller** 并提供相应的参数：

```c#
IForgeInstaller forgeInstaller =
    new LegacyForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                RootPath = "[GAME_ROOT_PATH]",
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                ForgeVersion = "[FORGE_VERSION]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };
```

在上述代码块中, 请将这些参数按照您的实际情况替换：

|                 项目                 |                      说明                      |
|:----------------------------------:|:--------------------------------------------:|
|          [GAME_ROOT_PATH]          |         游戏根目录, 通常为 .minecraft 文件夹的路径          |
|      [CUSTOM_INSTALL_GAME_ID]      |              可选项, 自定义即将要安装的游戏的名称              |
|      [MC_VERSION_OR_GAME_ID]       | Forge 继承的 MineCraft 原版游戏版本, 通常为游戏版本. 例如：1.19.2 |

## 初始化新版安装器

```c#
IForgeInstaller forgeInstaller =
    new HighVersionForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                JavaExecutablePath = "[PATH_TO_YOUR_JAVA_RUNTIME]",
                RootPath = "[GAME_ROOT_PATH]",
                VersionLocator = [VERSION_LOCATOR_INST],
                DownloadUrlRoot = “[LIBRARIES_URL_ROOT]”,
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                MineCraftVersion = "[MC_VERSION]",
                MineCraftVersionId = "[ACTUAL_MC_GAME_ID]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };
```

在上述代码块中, 请将这些参数按照您的实际情况替换：

|                 项目                  |                                      说明                                       |
|:-----------------------------------:|:-----------------------------------------------------------------------------:|
|     [PATH_TO_YOUR_JAVA_RUNTIME]     |                           Java （javaw.exe） 运行时所在的路径                           |
|        [LIBRARIES_URL_ROOT]         |                下载源的根 URL, 例如："https://bmclapi2.bangbang93.com/"                |
|       [VERSION_LOCATOR_INST]        |                  游戏版本定位器实例, 即初始化游戏核心时的 **VersionLocator** 属性                   |
|         [ACTUAL_MC_GAME_ID]         | 实际的 MineCraft 游戏名称, 即原版游戏在 **version** 文件夹下的名称. 一般情况下, 这个值和 **[MC_VERSION]** 一致.  |

## 根据 **isLegacy** 值进行统一初始化

由于 **LegacyForgeInstaller** 和 **HighVersionForgeInstaller** 同时实现了 **IForgeInstaller** 接口. 
因此, 您可以很方便的使用一个三元运算符来选择性的初始化对应的安装器：

```c#{4-100}
var isLegacy = ForgeInstallerFactory.IsLegacyForgeInstaller(forgeJarPath, forgeVersion);

IForgeInstaller forgeInstaller = isLegacy
            ? new LegacyForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                RootPath = "[GAME_ROOT_PATH]",
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                ForgeVersion = "[FORGE_VERSION]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            }
            : new HighVersionForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                JavaExecutablePath = "[PATH_TO_YOUR_JAVA_RUNTIME]",
                RootPath = "[GAME_ROOT_PATH]",
                VersionLocator = [VERSION_LOCATOR_INST],
                DownloadUrlRoot = “[LIBRARIES_URL_ROOT]”,
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                MineCraftVersion = "[MC_VERSION]",
                MineCraftVersionId = "[ACTUAL_MC_GAME_ID]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };
```

## 开始安装

在您完成安装器的初始化后, 您只需要调用 Forge 安装器的安装方法来完成安装. 

在异步上下文中, 使用 **InstallForgeTaskAsync** 来完成安装：

```c#
await forgeInstaller.InstallForgeTaskAsync();
```

在同步上下文中, 使用 **InstallForge** 来完成安装：

```c#
forgeInstaller.InstallForge();
```

## 报告安装进度

在某些情况下, Forge 安装器可能会需要数分钟的时间来完成安装. 
因此, 您可能需要实时向用户汇报安装器目前的进度. 
为此, Forge 安装器提供了 **StageChangedEventDelegate** 事件来帮助您实现任务汇报. 
您只需要简单地在 **开始安装之前** 注册下面的事件：

```c#
((InstallerBase)forgeInstaller).StageChangedEventDelegate += (_, args) =>
{
    ReportProgress(args.Progress * 100, args.CurrentStage);
};
```

其中,  **args.Progress** 指示了安装器当前的百分比进度. **args.CurrentStage** 则是安装器当前进度的文字描述. 
