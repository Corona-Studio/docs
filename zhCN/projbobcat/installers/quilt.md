# Quilt 安装器

[[toc]]

::: tip

请注意，ProjBobcat 仅实现了 Quilt 自动化安装流程，您仍然需要自己实现 Quilt 安装包的搜索、下载、保存流程。

:::

::: warning

Quilt 安装器目前处于试验阶段，相关的 API 以及安装流程可能会出现较大幅度的变更。

:::

## 实用资源

- [Quilt 官方网站](https://quiltmc.org/en/)
- [Quilt 安装指南](https://quiltmc.org/en/install/)
- [Quilt Meta API](https://meta.quiltmc.org/)


## 兼容性检查

在开始安装 Quilt 之前，您需要通过 Quilt Meta API 来查询您将要修改的 MineCraft 版本是否受支持。

首先，您需要向 [https://meta.quiltmc.org/v3/versions/game](https://meta.quiltmc.org/v3/versions/game) 发送一个 **HTTP GET** 请求。

您将看到类似下面的返回内容：

```json
[
  {
    "version": "1.19.3",
    "stable": true
  },
  {
    "version": "1.19.3-rc3",
    "stable": false
  },
  {...},
  {...}
]
```

在这里，您需要检查您即将要安装的游戏版本是否出现在 Quilt 官方的支持列表当中。
您需要将游戏版本与 JSON 对象中的 `version` 字段作比较。
**如果您的游戏没有出现在支持列表当中，安装将无法继续。**

## 获取 Quilt Loader Model

由于 ProjBobcat 的 Quilt 安装器要求您在初始化安装器时提供来自 Quilt 的下载信息。
因此，我们将在这里简要描述如何根据指定的 MineCraft 版本来获取该信息。

::: info

在该示例中，我们将使用 MineCraft 1.19.2 来向您展示如何获取。

:::

首先，您需要向 [https://meta.quiltmc.org/v3/versions/loader](https://meta.quiltmc.org/v3/versions/loader) 发送一个 **HTTP GET** 请求。

您将看到类似下面的返回内容：

```json
[
  {
    "separator": ".",
    "build": 25,
    "maven": "org.quiltmc:quilt-loader:0.18.1-beta.25",
    "version": "0.18.1-beta.25"
  },
  {...},
  {...}
]
```

Quilt Meta API 将返回一个 JSON 数组，数组中的每一个元素即是我们需要的 Loader Artifact。

#### 将 JSON 返回转换为 ProjBobcat 类型

如果您在您的项目中使用 [JSON.NET](https://www.newtonsoft.com/json)（Newtonsoft.JSON）。
您可以使用类似下面的代码来将您获取到的服务器响应转换为对应的 ProjBobcat 类型：

```c#
// 从 Quilt Meta API 请求数据（示例，非实际代码）
...
var responseJson = await res.Content.ReadAsStringAsync();

// 将 JSON 响应转换为 ProjBobcat 类型 // [!code focus]
var artifacts = JsonConvert.DeserializeObject<List<QuiltLoaderModel>>(responseJson); // [!code focus]

// 获取用户想要安装的版本（示例，非实际代码）
var userSelect = vm.SelectedArtifactIndex;

// 获取单个 Loader Artifact // [!code focus]
var selectedArtifact = artifacts[userSelect]; // [!code focus]
```

此处，**selectedArtifact** 即是 Fabric 安装器所需要的 `QuiltLoaderModel`。

## 初始化安装器

初始化 Quilt 安装器的方式非常简单。您需要使用到在先前步骤中取得的 `selectedArtifact` 来初始化安装器：

```c#
var quiltInstaller = new QuiltInstaller
{
    InheritsFrom = "[MC_VERSION_OR_GAME_ID]",
    RootPath = "[GAME_ROOT_PATH]",
    CustomId = "[CUSTOM_INSTALL_GAME_ID]",
    LoaderArtifact = selectedArtifact
};
```

在上述代码块中，请将这些参数按照您的实际情况替换：

|                 项目                  |                      说明                       |
|:-----------------------------------:|:---------------------------------------------:|
|          [GAME_ROOT_PATH]           |          游戏根目录，通常为 .minecraft 文件夹的路径          |
|      [CUSTOM_INSTALL_GAME_ID]       |              可选项，自定义即将要安装的游戏的名称               |
|       [MC_VERSION_OR_GAME_ID]       | Forge 继承的 MineCraft 原版游戏版本，通常为游戏版本。例如：1.19.2  |

## 开始安装

在您完成安装器的初始化后，您只需要调用 Fabric 安装器的安装方法来完成安装。

在异步上下文中，使用 **InstallTaskAsync** 来完成安装：

```c#
await quiltInstaller.InstallTaskAsync();
```

在同步上下文中，使用 **Install** 来完成安装：

```c#
quiltInstaller.Install();
```

## 报告安装进度

在某些情况下，Quilt 安装器可能会需要数分钟的时间来完成安装。
因此，您可能需要实时向用户汇报安装器目前的进度。
为此，Quilt 安装器提供了 **StageChangedEventDelegate** 事件来帮助您实现任务汇报。
您只需要简单地在 **开始安装之前** 注册下面的事件：

```c#
quiltInstaller.StageChangedEventDelegate += (_,  args) => {
    ReportProgress(args.Progress,  args.CurrentStage);
};
```

其中， **args.Progress** 指示了安装器当前的百分比进度。**args.CurrentStage** 则是安装器当前进度的文字描述。
