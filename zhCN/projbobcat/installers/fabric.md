# Fabric 安装器

[[toc]]

::: tip

请注意，ProjBobcat 仅实现了 Fabric 自动化安装流程，您仍然需要自己实现 Fabric 安装包的搜索、下载、保存流程。

:::

## 实用资源

- [Fabric 官方网站](https://fabricmc.net/)
- [Fabric Meta API](https://meta.fabricmc.net/)

## 获取 Fabric Loader Artifact

由于 ProjBobcat 的 Fabric 安装器要求您在初始化安装器时提供来自 Fabric 官方的 Loader Artifact 信息。
因此，我们将在这里简要描述如何根据指定的 MineCraft 版本来获取该信息。

::: info

在该示例中，我们将使用 MineCraft 1.19.2 来向您展示如何获取。

:::

### 向 Fabric Meta API 发送请求

首先，您需要向 [https://meta.fabricmc.net/v2/versions/loader/[MC_VERSION]](https://meta.fabricmc.net/v2/versions/loader/1.19.2) 发送一个 **HTTP GET** 请求。
将 `[MC_VERSION]` 替换为您想要安装的 MineCraft 版本。在这里，我们将使用 1.19.2。

您将看到类似下面的返回内容：

```json
[
  {
    "loader": {
      "separator": ".",
      "build": 11,
      "maven": "net.fabricmc:fabric-loader:0.14.11",
      "version": "0.14.11",
      "stable": true
    },
    "intermediary": {
      "maven": "net.fabricmc:intermediary:1.19.2",
      "version": "1.19.2",
      "stable": true
    },
    "launcherMeta": {
      "version": 1,
      "libraries": {...},
      "mainClass": {...}
    }
  },
  {...},
  {...}
]
```

Fabric Meta API 将返回一个 JSON 数组，数组中的每一个元素即是我们需要的 Loader Artifact。

#### 将 JSON 返回转换为 ProjBobcat 类型

如果您在您的项目中使用 [JSON.NET](https://www.newtonsoft.com/json)（Newtonsoft.JSON）。
您可以使用类似下面的代码来将您获取到的服务器响应转换为对应的 ProjBobcat 类型：

```c#
// 从 Fabric Meta API 请求数据（示例，非实际代码）
...
var responseJson = await res.Content.ReadAsStringAsync();

// 将 JSON 响应转换为 ProjBobcat 类型 // [!code focus]
var artifacts = JsonConvert.DeserializeObject<List<FabricLoaderArtifactModel>>(responseJson); // [!code focus]

// 获取用户想要安装的版本（示例，非实际代码）
var userSelect = vm.SelectedArtifactIndex;

// 获取单个 Loader Artifact // [!code focus]
var selectedArtifact = artifacts[userSelect]; // [!code focus]
```

此处，**selectedArtifact** 即是 Fabric 安装器所需要的 `FabricLoaderArtifactModel`。

## 初始化安装器

初始化 Fabric 安装器的方式非常简单。您需要使用到在先前步骤中取得的 `selectedArtifact` 来初始化安装器：

```c#
var fabricInstaller = new FabricInstaller
{
    LoaderArtifact = selectedArtifact,
    VersionLocator = [VERSION_LOCATOR_INST],
    RootPath = "[GAME_ROOT_PATH]",
    CustomId = "[CUSTOM_INSTALL_GAME_ID]",
    InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
};
```

在上述代码块中，请将这些参数按照您的实际情况替换：

|                 项目                  |                      说明                       |
|:-----------------------------------:|:---------------------------------------------:|
|          [GAME_ROOT_PATH]           |          游戏根目录，通常为 .minecraft 文件夹的路径          |
|      [CUSTOM_INSTALL_GAME_ID]       |              可选项，自定义即将要安装的游戏的名称               |
|       [MC_VERSION_OR_GAME_ID]       | Forge 继承的 MineCraft 原版游戏版本，通常为游戏版本。例如：1.19.2  |
|       [VERSION_LOCATOR_INST]        |  游戏版本定位器实例，即初始化游戏核心时的 **VersionLocator** 属性   |

## 开始安装

在您完成安装器的初始化后，您只需要调用 Fabric 安装器的安装方法来完成安装。

在异步上下文中，使用 **InstallTaskAsync** 来完成安装：

```c#
await fabricInstaller.InstallTaskAsync();
```

在同步上下文中，使用 **Install** 来完成安装：

```c#
fabricInstaller.Install();
```

## 报告安装进度

在某些情况下，Fabric 安装器可能会需要数分钟的时间来完成安装。
因此，您可能需要实时向用户汇报安装器目前的进度。
为此，Fabric 安装器提供了 **StageChangedEventDelegate** 事件来帮助您实现任务汇报。
您只需要简单地在 **开始安装之前** 注册下面的事件：

```c#
fabricInstaller.StageChangedEventDelegate += (_,  args) => {
    ReportProgress(args.Progress,  args.CurrentStage);
};
```

其中， **args.Progress** 指示了安装器当前的百分比进度。**args.CurrentStage** 则是安装器当前进度的文字描述。
