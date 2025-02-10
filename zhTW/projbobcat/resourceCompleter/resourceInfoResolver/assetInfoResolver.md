# Assets 解析器

[[toc]]

Assets 解析器提供了對遊戲資產檔案的解析和驗證功能, 這些檔案一般存放在
`.minecraft/assets` 目錄下

## 獲取 Version Manifest Versions 列表

首先, 您需要向 [https://launchermeta.mojang.com/mc/game/version_manifest.json](https://launchermeta.mojang.com/mc/game/version_manifest.json)
傳送一個 **HTTP GET** 請求. 

您將看到類似下面的返回內容：

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

Mojang 伺服器將會返回一個 JSON 物件, **versions** 欄位則是我們所需要的 Versions 陣列

### 將 JSON 返回轉換為 ProjBobcat 型別

如果您在您的專案中使用 [JSON.NET](https://www.newtonsoft.com/json)（Newtonsoft.JSON）. 
您可以使用類似下面的程式碼來將您獲取到的伺服器響應轉換為對應的 ProjBobcat 型別：

```c#

// 從 Mojang API 請求資料（示例, 非實際程式碼）
...
var responseJson = await res.Content.ReadAsStringAsync();

// 將 JSON 響應轉換為 ProjBobcat 型別 // [!code focus]
var manifest = JsonConvert.DeserializeObject<VersionManifest>(responseJson); // [!code focus]

// 獲取 Versions 列表 // [!code focus]
var versions = manifest.Versions; // [!code focus]

```

此處, **versions** 即是 Assets 解析器所需要的 `Versions` 陣列. 


## 初始化解析器

你可以透過下面的程式碼來初始化 Assets 解析器：

```c#

var resolver = new AssetInfoResolver
{
    AssetIndexUriRoot = "https://launchermeta.mojang.com/",
    AssetUriRoot = "https://resources.download.minecraft.net/",
    BasePath = "[GAME_ROOT_PATH]",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES],
    Versions = versions // 在上一步獲取到的 Versions 陣列
};

```

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|           專案            |               說明                |
|:-----------------------:|:-------------------------------:|
|    [GAME_ROOT_PATH]     |   遊戲根目錄, 通常為 .minecraft 資料夾的路徑   |
| [SEARCHED_VERSION_INFO] | 要檢查的版本的 VersionInfo （透過遊戲定位器獲得） |
|   [CHECK_LOCAL_FILES]   |    檢查本地檔案（如果為 false, 則跳過所有檢查）    |


