# Optifine 安装器

[[toc]]

::: tip

请注意, ProjBobcat 仅实现了 Optifine 自动化安装流程, 您仍然需要自己实现 Optifine 安装包的搜索、下载、保存流程. 

:::

## 实用资源

- [BMCLAPI 开发文档](https://bmclapidoc.bangbang93.com/)

## 获取 Optifine Download Version Model

由于 ProjBobcat 的 LiteLoader 安装器要求您在初始化安装器时提供来自 LiteLoader 的下载信息. 
因此, 我们将在这里简要描述如何根据指定的 MineCraft 版本来获取该信息. 

::: info

在该示例中, 我们将使用 MineCraft 1.19.2 来向您展示如何获取. 

:::

::: warning

由于 Optifine 官方没有提供公开的 API 文档. 因此, 在本流程中, 我们需要使用第三方的镜像源来完成数据的获取. 
在这里, 我们使用 [BMCLAPI](https://bmclapidoc.bangbang93.com/) 来获取相关的版本信息. 

:::

首先, 您需要向 [https://bmclapi2.bangbang93.com/optifine/[MC_VERSION]](https://bmclapi2.bangbang93.com/optifine/1.19.2) 发送一个 **HTTP GET** 请求. 
将 `[MC_VERSION]` 替换为您想要安装的 MineCraft 版本. 在这里, 我们将使用 1.19.2. 

您将看到类似下面的返回内容：

```json
[
  {
    "_id": "6307b8a38a3998ab475d139d",
    "mcversion": "1.19.2",
    "patch": "H9",
    "type": "HD_U",
    "__v": 0,
    "filename": "OptiFine_1.19.2_HD_U_H9.jar",
    "forge": "Forge 43.1.1"
  },
  {...},
  {...}
]
```

BMCLAPI 将返回一个 JSON 数组, 数组中的每一个元素即是我们需要的 Download Version Model. 

#### 将 JSON 返回转换为 ProjBobcat 类型

如果您在您的项目中使用 [JSON.NET](https://www.newtonsoft.com/json)（Newtonsoft.JSON）. 
您可以使用类似下面的代码来将您获取到的服务器响应转换为对应的 ProjBobcat 类型：

```c#
// 从 BMCLAPI 请求数据（示例, 非实际代码）
...
var responseJson = await res.Content.ReadAsStringAsync();

// 将 JSON 响应转换为 ProjBobcat 类型 // [!code focus]
var versions = JsonConvert.DeserializeObject<List<OptifineDownloadVersionModel>>(responseJson); // [!code focus]

// 获取用户想要安装的版本（示例, 非实际代码）
var userSelect = vm.SelectedIndex;

// 获取单个 Download Version Model // [!code focus]
var selectedVersion = versions[userSelect]; // [!code focus]
```

此处, **selectedVersion** 即是 Optifine 安装器所需要的 `OptifineDownloadVersionModel`. 

## 初始化安装器

初始化 Optifine 安装器的方式非常简单. 
您首先需要准备好的 Optifine 安装包 .jar 文件. 以及一个可用的 Java 运行时. 
您需要使用到在先前步骤中取得的 `selectedVersion` 来初始化安装器：

```c#
var optifineInstaller = new OptifineInstaller
{
    JavaExecutablePath = "[PATH_TO_YOUR_JAVA_RUNTIME]",
    OptifineDownloadVersion = selectedVersion,
    OptifineJarPath = "[PATH_TO_YOUR_OPTIFINE_JAR]",
    RootPath = "[GAME_ROOT_PATH]",
    CustomId = "[CUSTOM_INSTALL_GAME_ID]",
    InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
};
```

在上述代码块中, 请将这些参数按照您的实际情况替换：

|                  项目                   |                      说明                       |
|:-------------------------------------:|:---------------------------------------------:|
|           [GAME_ROOT_PATH]            |          游戏根目录, 通常为 .minecraft 文件夹的路径          |
|       [CUSTOM_INSTALL_GAME_ID]        |              可选项, 自定义即将要安装的游戏的名称               |
|        [MC_VERSION_OR_GAME_ID]        | Forge 继承的 MineCraft 原版游戏版本, 通常为游戏版本. 例如：1.19.2  |
|        [VERSION_LOCATOR_INST]         |  游戏版本定位器实例, 即初始化游戏核心时的 **VersionLocator** 属性   |
|      [PATH_TO_YOUR_OPTIFINE_JAR]      |               Optifine 安装包所在的路径               |
|      [PATH_TO_YOUR_JAVA_RUNTIME]      |           Java （javaw.exe） 运行时所在的路径           |

## 开始安装

在您完成安装器的初始化后, 您只需要调用 Optifine 安装器的安装方法来完成安装. 

在异步上下文中, 使用 **InstallTaskAsync** 来完成安装：

```c#
await optifineInstaller.InstallTaskAsync();
```

在同步上下文中, 使用 **Install** 来完成安装：

```c#
optifineInstaller.Install();
```

## 报告安装进度

在某些情况下, Optifine 安装器可能会需要数分钟的时间来完成安装. 
因此, 您可能需要实时向用户汇报安装器目前的进度. 
为此, Optifine 安装器提供了 **StageChangedEventDelegate** 事件来帮助您实现任务汇报. 
您只需要简单地在 **开始安装之前** 注册下面的事件：

```c#
optifineInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};
```

其中,  **args.Progress** 指示了安装器当前的百分比进度. **args.CurrentStage** 则是安装器当前进度的文字描述. 

