# Libraries 解析器

[[toc]]

Libraries 解析器提供了对游戏资产文件的解析和验证功能，这些文件存放在
`.minecraft/libraries` 目录下，这些文件是启动 MineCraft 所必需的运行时文件。

## 初始化解析器

你可以通过下面的代码来初始化 Libraries 解析器：

```c#
var resolver = new LibraryInfoResolver
{
    BasePath = "[GAME_ROOT_PATH]",
    ForgeUriRoot = "https://files.minecraftforge.net/maven/",
    ForgeMavenUriRoot = "https://maven.minecraftforge.net/",
    ForgeMavenOldUriRoot = "https://files.minecraftforge.net/maven/",
    FabricMavenUriRoot = "https://maven.fabricmc.net/",
    LibraryUriRoot = "https://libraries.minecraft.net/",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES]
};
```

在上述代码块中，请将这些参数按照您的实际情况替换：

|           项目            |               说明                |
|:-----------------------:|:-------------------------------:|
|    [GAME_ROOT_PATH]     |   游戏根目录，通常为 .minecraft 文件夹的路径   |
| [SEARCHED_VERSION_INFO] | 要检查的版本的 VersionInfo （通过游戏定位器获得） |
|   [CHECK_LOCAL_FILES]   |    检查本地文件（如果为 false，则跳过所有检查）    |
