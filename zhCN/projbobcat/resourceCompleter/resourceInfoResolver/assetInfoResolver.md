# Assets 解析器

[[toc]]

Assets 解析器提供了对游戏资产文件的解析和验证功能, 这些文件一般存放在
`.minecraft/assets` 目录下

## 获取 Version Manifest Versions 列表

首先, 您需要向 [https://launchermeta.mojang.com/mc/game/version_manifest.json](https://launchermeta.mojang.com/mc/game/version_manifest.json)
发送一个 **HTTP GET** 请求. 

您将看到类似下面的返回内容：

```json
{
  "latest": {
    "release": "1.19.3",
    "snapshot": "23w06a"
  },
  "versions": [
    {
      "id": "23w06a",
      "type": "snapshot",
      "url": "https://piston-meta.mojang.com/v1/packages/92ed97b686fe8904d8ec00fd486c435582fd0155/23w06a.json",
      "time": "2023-02-08T15:11:06+00:00",
      "releaseTime": "2023-02-08T15:00:04+00:00"
    },
    ...
  ]
}
```

Mojang 服务器将会返回一个 JSON 对象, **versions** 字段则是我们所需要的 Versions 数组

### 将 JSON 返回转换为 ProjBobcat 类型

如果您在您的项目中使用 [JSON.NET](https://www.newtonsoft.com/json)（Newtonsoft.JSON）. 
您可以使用类似下面的代码来将您获取到的服务器响应转换为对应的 ProjBobcat 类型：

```c#
// 从 Mojang API 请求数据（示例, 非实际代码）
...
var responseJson = await res.Content.ReadAsStringAsync();

// 将 JSON 响应转换为 ProjBobcat 类型 // [!code focus]
var manifest = JsonConvert.DeserializeObject<VersionManifest>(responseJson); // [!code focus]

// 获取 Versions 列表 // [!code focus]
var versions = manifest.Versions; // [!code focus]
```

此处, **versions** 即是 Assets 解析器所需要的 `Versions` 数组. 


## 初始化解析器

你可以通过下面的代码来初始化 Assets 解析器：

```c#
var resolver = new AssetInfoResolver
{
    AssetIndexUriRoot = "https://launchermeta.mojang.com/",
    AssetUriRoot = "https://resources.download.minecraft.net/",
    BasePath = "[GAME_ROOT_PATH]",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES],
    Versions = versions // 在上一步获取到的 Versions 数组
};
```

在上述代码块中, 请将这些参数按照您的实际情况替换：

|           项目            |               说明                |
|:-----------------------:|:-------------------------------:|
|    [GAME_ROOT_PATH]     |   游戏根目录, 通常为 .minecraft 文件夹的路径   |
| [SEARCHED_VERSION_INFO] | 要检查的版本的 VersionInfo （通过游戏定位器获得） |
|   [CHECK_LOCAL_FILES]   |    检查本地文件（如果为 false, 则跳过所有检查）    |


