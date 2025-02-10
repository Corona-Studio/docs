# Optifine 安裝器

[[toc]]

::: tip

請注意, ProjBobcat 僅實現了 Optifine 自動化安裝流程, 您仍然需要自己實現 Optifine 安裝包的搜尋、下載、儲存流程. 

:::

## 實用資源

- [BMCLAPI 開發文件](https://bmclapidoc.bangbang93.com/)

## 獲取 Optifine Download Version Model

由於 ProjBobcat 的 LiteLoader 安裝器要求您在初始化安裝器時提供來自 LiteLoader 的下載資訊. 
因此, 我們將在這裡簡要描述如何根據指定的 MineCraft 版本來獲取該資訊. 

::: info

在該示例中, 我們將使用 MineCraft 1.19.2 來向您展示如何獲取. 

:::

::: warning

由於 Optifine 官方沒有提供公開的 API 文件. 因此, 在本流程中, 我們需要使用第三方的映象源來完成資料的獲取. 
在這裡, 我們使用 [BMCLAPI](https://bmclapidoc.bangbang93.com/) 來獲取相關的版本資訊. 

:::

首先, 您需要向 [https://bmclapi2.bangbang93.com/optifine/[MC_VERSION]](https://bmclapi2.bangbang93.com/optifine/1.19.2) 傳送一個 **HTTP GET** 請求. 
將 `[MC_VERSION]` 替換為您想要安裝的 MineCraft 版本. 在這裡, 我們將使用 1.19.2. 

您將看到類似下面的返回內容：

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

BMCLAPI 將返回一個 JSON 陣列, 陣列中的每一個元素即是我們需要的 Download Version Model. 

#### 將 JSON 返回轉換為 ProjBobcat 型別

如果您在您的專案中使用 [JSON.NET](https://www.newtonsoft.com/json)（Newtonsoft.JSON）. 
您可以使用類似下面的程式碼來將您獲取到的伺服器響應轉換為對應的 ProjBobcat 型別：

```c#

// 從 BMCLAPI 請求資料（示例, 非實際程式碼）
...
var responseJson = await res.Content.ReadAsStringAsync();

// 將 JSON 響應轉換為 ProjBobcat 型別 // [!code focus]
var versions = JsonConvert.DeserializeObject<List<OptifineDownloadVersionModel>>(responseJson); // [!code focus]

// 獲取使用者想要安裝的版本（示例, 非實際程式碼）
var userSelect = vm.SelectedIndex;

// 獲取單個 Download Version Model // [!code focus]
var selectedVersion = versions[userSelect]; // [!code focus]

```

此處, **selectedVersion** 即是 Optifine 安裝器所需要的 `OptifineDownloadVersionModel`. 

## 初始化安裝器

初始化 Optifine 安裝器的方式非常簡單. 
您首先需要準備好的 Optifine 安裝包 .jar 檔案. 以及一個可用的 Java 執行時. 
您需要使用到在先前步驟中取得的 `selectedVersion` 來初始化安裝器：

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

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|                  專案                   |                      說明                       |
|:-------------------------------------:|:---------------------------------------------:|
|           [GAME_ROOT_PATH]            |          遊戲根目錄, 通常為 .minecraft 資料夾的路徑          |
|       [CUSTOM_INSTALL_GAME_ID]        |              可選項, 自定義即將要安裝的遊戲的名稱               |
|        [MC_VERSION_OR_GAME_ID]        | Forge 繼承的 MineCraft 原版遊戲版本, 通常為遊戲版本. 例如：1.19.2  |
|        [VERSION_LOCATOR_INST]         |  遊戲版本定位器例項, 即初始化遊戲核心時的 **VersionLocator** 屬性   |
|      [PATH_TO_YOUR_OPTIFINE_JAR]      |               Optifine 安裝包所在的路徑               |
|      [PATH_TO_YOUR_JAVA_RUNTIME]      |           Java （javaw.exe） 執行時所在的路徑           |

## 開始安裝

在您完成安裝器的初始化後, 您只需要呼叫 Optifine 安裝器的安裝方法來完成安裝. 

在非同步上下文中, 使用 **InstallTaskAsync** 來完成安裝：

```c#

await optifineInstaller.InstallTaskAsync();

```

在同步上下文中, 使用 **Install** 來完成安裝：

```c#

optifineInstaller.Install();

```

## 報告安裝進度

在某些情況下, Optifine 安裝器可能會需要數分鐘的時間來完成安裝. 
因此, 您可能需要實時向用戶彙報安裝器目前的進度. 
為此, Optifine 安裝器提供了 **StageChangedEventDelegate** 事件來幫助您實現任務彙報. 
您只需要簡單地在 **開始安裝之前** 註冊下面的事件：

```c#

optifineInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};

```

其中,  **args.Progress** 指示了安裝器當前的百分比進度. **args.CurrentStage** 則是安裝器當前進度的文字描述. 

