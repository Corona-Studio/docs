# CurseForge 整合包安装器

[[toc]]

::: tip

请注意，ProjBobcat 仅实现了 CurseForge 整合包的自动化安装流程，您仍然需要自己实现 CurseForge 整合包的搜索、下载、保存流程。

:::

## 实用资源

- [CurseForge 官方网站](https://www.curseforge.com/)
- [CurseForge API](https://docs.curseforge.com/)

## 初始化安装器

初始化 CurseForge 安装器的方式非常简单：

```c#
var curseForgeInstaller = new CurseForgeInstaller
{
    GameId = "[CUSTOM_INSTALL_GAME_ID]",
    ModPackPath = "[PATH_TO_YOUR_MODPACK]",
    RootPath = "[GAME_ROOT_PATH]"
};
```

在上述代码块中，请将这些参数按照您的实际情况替换：

|                  项目                  |             说明              |
|:------------------------------------:|:---------------------------:|
|           [GAME_ROOT_PATH]           | 游戏根目录，通常为 .minecraft 文件夹的路径 |
|       [CUSTOM_INSTALL_GAME_ID]       |     可选项，自定义即将要安装的游戏的名称      |
|        [PATH_TO_YOUR_MODPACK]        |     CurseForge 整合包所在的路径     |

## 开始安装

在您完成安装器的初始化后，您只需要调用 CurseForge 安装器的安装方法来完成安装。

在异步上下文中，使用 **InstallTaskAsync** 来完成安装：

```c#
await curseForgeInstaller.InstallTaskAsync();
```

在同步上下文中，使用 **Install** 来完成安装：

```c#
curseForgeInstaller.Install();
```

## 报告安装进度

在某些情况下，CurseForge 安装器可能会需要数分钟的时间来完成安装。
因此，您可能需要实时向用户汇报安装器目前的进度。
为此，CurseForge 安装器提供了 **StageChangedEventDelegate** 事件来帮助您实现任务汇报。
您只需要简单地在 **开始安装之前** 注册下面的事件：

```c#
curseForgeInstaller.StageChangedEventDelegate += (_,  args) => {
    ReportProgress(args.Progress,  args.CurrentStage);
};
```

其中， **args.Progress** 指示了安装器当前的百分比进度。**args.CurrentStage** 则是安装器当前进度的文字描述。

