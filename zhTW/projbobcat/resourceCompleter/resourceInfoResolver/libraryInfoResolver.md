# Libraries 解析器

[[toc]]

Libraries 解析器提供了對遊戲資產檔案的解析和驗證功能, 這些檔案存放在
`.minecraft/libraries` 目錄下, 這些檔案是啟動 MineCraft 所必需的執行時檔案. 

## 初始化解析器

你可以透過下面的程式碼來初始化 Libraries 解析器：

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

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|           專案            |               說明                |
|:-----------------------:|:-------------------------------:|
|    [GAME_ROOT_PATH]     |   遊戲根目錄, 通常為 .minecraft 資料夾的路徑   |
| [SEARCHED_VERSION_INFO] | 要檢查的版本的 VersionInfo （透過遊戲定位器獲得） |
|   [CHECK_LOCAL_FILES]   |    檢查本地檔案（如果為 false, 則跳過所有檢查）    |
