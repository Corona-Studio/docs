# LiteLoader 安装器

[[toc]]

::: tip

请注意, ProjBobcat 仅实现了 LiteLoader 自动化安装流程, 您仍然需要自己实现 LiteLoader 安装包的搜索、下载、保存流程. 

:::

::: warning

LiteLoader 作为早期 MineCraft 的模组系统, 已经长期缺乏维护和后续支持. 
因此, 我们可能会在后续的版本中移除对 LiteLoader 安装的支持. 

:::

## 实用资源

- [LiteLoader Versions API](https://dl.liteloader.com/versions/versions.json)
- [BMCLAPI 开发文档](https://bmclapidoc.bangbang93.com/)

## 获取 LiteLoader Download Version Model

由于 ProjBobcat 的 LiteLoader 安装器要求您在初始化安装器时提供来自 LiteLoader 的下载信息. 
因此, 我们将在这里简要描述如何根据指定的 MineCraft 版本来获取该信息. 

::: info

在该示例中, 我们将使用 MineCraft 1.7.10 来向您展示如何获取. 

:::

::: warning

由于 LiteLoader 官方没有提供公开的 API 文档. 因此, 在本流程中, 我们需要使用第三方的镜像源来完成数据的获取. 
在这里, 我们使用 [BMCLAPI](https://bmclapidoc.bangbang93.com/) 来获取相关的版本信息. 

:::

首先, 您需要向 [https://bmclapi2.bangbang93.com/liteloader/list?mcversion=[MC_VERSION]](https://bmclapi2.bangbang93.com/liteloader/list?mcversion=1.7.10) 发送一个 **HTTP GET** 请求. 
将 `[MC_VERSION]` 替换为您想要安装的 MineCraft 版本. 在这里, 我们将使用 1.7.10. 

您将看到类似下面的返回内容：

```json

{
  "_id": "59685511433f993503c1c879",
  "mcversion": "1.7.10",
  "build": {
    "tweakClass": "com.mumfrey.liteloader.launch.LiteLoaderTweaker",
    "libraries": [...],
    "stream": "RELEASE",
    "file": "liteloader-1.7.10.jar",
    "version": "1.7.10_04",
    "md5": "63ada46e033d0cb6782bada09ad5ca4e",
    "timestamp": "1414368553",
    "srcJar": "liteloader-1.7.10_04-mcpnames-sources.jar",
    "mcpJar": "liteloader-1.7.10_04-mcpnames.jar"
  },
  "hash": "63ada46e033d0cb6782bada09ad5ca4e",
  "type": "RELEASE",
  "version": "1.7.10_04",
  "__v": 0
}

```

BMCLAPI 将返回一个 JSON 对象, 将该对象反序列化为 ProjBobcat 类型即是我们需要的 `LiteLoaderDownloadVersionModel`. 

#### 将 JSON 返回转换为 ProjBobcat 类型

如果您在您的项目中使用 [JSON.NET](https://www.newtonsoft.com/json)（Newtonsoft.JSON）. 
您可以使用类似下面的代码来将您获取到的服务器响应转换为对应的 ProjBobcat 类型：

```c#

// 从 BMCLAPI 请求数据（示例, 非实际代码）
...
var responseJson = await res.Content.ReadAsStringAsync();

// 将 JSON 响应转换为 ProjBobcat 类型 // [!code focus]
var versionModel = JsonConvert.DeserializeObject<LiteLoaderDownloadVersionModel>(responseJson); // [!code focus]

```

此处, **versionModel** 即是 Fabric 安装器所需要的 `LiteLoaderDownloadVersionMode`. 

## 获取 RawVersionModel

在初始化 LiteLoader 安装器时, 安装器需要使用 LiteLoader 对应的 MineCraft 游戏版本的原始 JSON 内容. 
即 `[ROOT_PATH]/versions/[MC_VERSION]/[MC_VERSION].json` 文件的内容. 

如果您已经安装了 LiteLoader 对应的原版游戏, 您可以通过下面的代码获取到 `RawVersionModel`：

```c#

// 获取版本 JSON 文件所在的路径
var jsonPath = GamePathHelper.GetGameJsonPath(rP, id);

// 读取该文件的内容
var jsonContent = await File.ReadAllTextAsync(jsonPath);

// 将 JSON 内容转换为 RawVersionModel
var baseVersionModel = JsonConvert.DeserializeObject<RawVersionModel>(jsonContent);

```

此处, **baseVersionModel** 即是 LiteLoader 安装器所需要的 `RawVersionModel`. 

## 初始化安装器

初始化 LiteLoader 安装器的方式非常简单. 
您需要使用到在先前步骤中取得的 `versionModel` 和 `baseVersionModel` 来初始化安装器：

```c#

var liteLoaderInstaller = new LiteLoaderInstaller
{
    InheritVersion = baseVersionModel,
    InheritsFrom = "[MC_VERSION_OR_GAME_ID]",
    RootPath = "[GAME_ROOT_PATH]",
    VersionModel = versionModel,
    CustomId = "[CUSTOM_INSTALL_GAME_ID]"
};

```

在上述代码块中, 请将这些参数按照您的实际情况替换：

|                 项目                  |                      说明                       |
|:-----------------------------------:|:---------------------------------------------:|
|          [GAME_ROOT_PATH]           |          游戏根目录, 通常为 .minecraft 文件夹的路径          |
|      [CUSTOM_INSTALL_GAME_ID]       |              可选项, 自定义即将要安装的游戏的名称               |
|       [MC_VERSION_OR_GAME_ID]       | Forge 继承的 MineCraft 原版游戏版本, 通常为游戏版本. 例如：1.19.2  |
|       [VERSION_LOCATOR_INST]        |  游戏版本定位器实例, 即初始化游戏核心时的 **VersionLocator** 属性   |

## 开始安装

在您完成安装器的初始化后, 您只需要调用 LiteLoader 安装器的安装方法来完成安装. 

在异步上下文中, 使用 **InstallTaskAsync** 来完成安装：

```c#

await liteLoaderInstaller.InstallTaskAsync();

```

在同步上下文中, 使用 **Install** 来完成安装：

```c#

liteLoaderInstaller.Install();

```

## 报告安装进度

在某些情况下, LiteLoader 安装器可能会需要数分钟的时间来完成安装. 
因此, 您可能需要实时向用户汇报安装器目前的进度. 
为此, LiteLoader 安装器提供了 **StageChangedEventDelegate** 事件来帮助您实现任务汇报. 
您只需要简单地在 **开始安装之前** 注册下面的事件：

```c#

liteLoaderInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};

```

其中,  **args.Progress** 指示了安装器当前的百分比进度. **args.CurrentStage** 则是安装器当前进度的文字描述. 
