# LiteLoader 安裝器

[[toc]]

::: tip

請注意, ProjBobcat 僅實現了 LiteLoader 自動化安裝流程, 您仍然需要自己實現 LiteLoader 安裝包的搜尋、下載、儲存流程. 

:::

::: warning

LiteLoader 作為早期 MineCraft 的模組系統, 已經長期缺乏維護和後續支援. 
因此, 我們可能會在後續的版本中移除對 LiteLoader 安裝的支援. 

:::

## 實用資源

- [LiteLoader Versions API](https://dl.liteloader.com/versions/versions.json)
- [BMCLAPI 開發文件](https://bmclapidoc.bangbang93.com/)

## 獲取 LiteLoader Download Version Model

由於 ProjBobcat 的 LiteLoader 安裝器要求您在初始化安裝器時提供來自 LiteLoader 的下載資訊. 
因此, 我們將在這裡簡要描述如何根據指定的 MineCraft 版本來獲取該資訊. 

::: info

在該示例中, 我們將使用 MineCraft 1.7.10 來向您展示如何獲取. 

:::

::: warning

由於 LiteLoader 官方沒有提供公開的 API 文件. 因此, 在本流程中, 我們需要使用第三方的映象源來完成資料的獲取. 
在這裡, 我們使用 [BMCLAPI](https://bmclapidoc.bangbang93.com/) 來獲取相關的版本資訊. 

:::

首先, 您需要向 [https://bmclapi2.bangbang93.com/liteloader/list?mcversion=[MC_VERSION]](https://bmclapi2.bangbang93.com/liteloader/list?mcversion=1.7.10) 傳送一個 **HTTP GET** 請求. 
將 `[MC_VERSION]` 替換為您想要安裝的 MineCraft 版本. 在這裡, 我們將使用 1.7.10. 

您將看到類似下面的返回內容：

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

BMCLAPI 將返回一個 JSON 物件, 將該物件反序列化為 ProjBobcat 型別即是我們需要的 `LiteLoaderDownloadVersionModel`. 

#### 將 JSON 返回轉換為 ProjBobcat 型別

如果您在您的專案中使用 [JSON.NET](https://www.newtonsoft.com/json)（Newtonsoft.JSON）. 
您可以使用類似下面的程式碼來將您獲取到的伺服器響應轉換為對應的 ProjBobcat 型別：

```c#

// 從 BMCLAPI 請求資料（示例, 非實際程式碼）
...
var responseJson = await res.Content.ReadAsStringAsync();

// 將 JSON 響應轉換為 ProjBobcat 型別 // [!code focus]
var versionModel = JsonConvert.DeserializeObject<LiteLoaderDownloadVersionModel>(responseJson); // [!code focus]

```

此處, **versionModel** 即是 Fabric 安裝器所需要的 `LiteLoaderDownloadVersionMode`. 

## 獲取 RawVersionModel

在初始化 LiteLoader 安裝器時, 安裝器需要使用 LiteLoader 對應的 MineCraft 遊戲版本的原始 JSON 內容. 
即 `[ROOT_PATH]/versions/[MC_VERSION]/[MC_VERSION].json` 檔案的內容. 

如果您已經安裝了 LiteLoader 對應的原版遊戲, 您可以透過下面的程式碼獲取到 `RawVersionModel`：

```c#

// 獲取版本 JSON 檔案所在的路徑
var jsonPath = GamePathHelper.GetGameJsonPath(rP, id);

// 讀取該檔案的內容
var jsonContent = await File.ReadAllTextAsync(jsonPath);

// 將 JSON 內容轉換為 RawVersionModel
var baseVersionModel = JsonConvert.DeserializeObject<RawVersionModel>(jsonContent);

```

此處, **baseVersionModel** 即是 LiteLoader 安裝器所需要的 `RawVersionModel`. 

## 初始化安裝器

初始化 LiteLoader 安裝器的方式非常簡單. 
您需要使用到在先前步驟中取得的 `versionModel` 和 `baseVersionModel` 來初始化安裝器：

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

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|                 專案                  |                      說明                       |
|:-----------------------------------:|:---------------------------------------------:|
|          [GAME_ROOT_PATH]           |          遊戲根目錄, 通常為 .minecraft 資料夾的路徑          |
|      [CUSTOM_INSTALL_GAME_ID]       |              可選項, 自定義即將要安裝的遊戲的名稱               |
|       [MC_VERSION_OR_GAME_ID]       | Forge 繼承的 MineCraft 原版遊戲版本, 通常為遊戲版本. 例如：1.19.2  |
|       [VERSION_LOCATOR_INST]        |  遊戲版本定位器例項, 即初始化遊戲核心時的 **VersionLocator** 屬性   |

## 開始安裝

在您完成安裝器的初始化後, 您只需要呼叫 LiteLoader 安裝器的安裝方法來完成安裝. 

在非同步上下文中, 使用 **InstallTaskAsync** 來完成安裝：

```c#

await liteLoaderInstaller.InstallTaskAsync();

```

在同步上下文中, 使用 **Install** 來完成安裝：

```c#

liteLoaderInstaller.Install();

```

## 報告安裝進度

在某些情況下, LiteLoader 安裝器可能會需要數分鐘的時間來完成安裝. 
因此, 您可能需要實時向用戶彙報安裝器目前的進度. 
為此, LiteLoader 安裝器提供了 **StageChangedEventDelegate** 事件來幫助您實現任務彙報. 
您只需要簡單地在 **開始安裝之前** 註冊下面的事件：

```c#

liteLoaderInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};

```

其中,  **args.Progress** 指示了安裝器當前的百分比進度. **args.CurrentStage** 則是安裝器當前進度的文字描述. 
