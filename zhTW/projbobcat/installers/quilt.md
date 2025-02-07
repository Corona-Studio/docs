# Quilt 安裝器

[[toc]]

::: tip

請注意, ProjBobcat 僅實現了 Quilt 自動化安裝流程, 您仍然需要自己實現 Quilt 安裝包的搜尋、下載、儲存流程. 

:::

::: warning

Quilt 安裝器目前處於試驗階段, 相關的 API 以及安裝流程可能會出現較大幅度的變更. 

:::

## 實用資源

- [Quilt 官方網站](https://quiltmc.org/en/)
- [Quilt 安裝指南](https://quiltmc.org/en/install/)
- [Quilt Meta API](https://meta.quiltmc.org/)


## 相容性檢查

在開始安裝 Quilt 之前, 您需要透過 Quilt Meta API 來查詢您將要修改的 MineCraft 版本是否受支援. 

首先, 您需要向 [https://meta.quiltmc.org/v3/versions/game](https://meta.quiltmc.org/v3/versions/game) 傳送一個 **HTTP GET** 請求. 

您將看到類似下面的返回內容：

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

在這裡, 您需要檢查您即將要安裝的遊戲版本是否出現在 Quilt 官方的支援列表當中. 
您需要將遊戲版本與 JSON 物件中的 `version` 欄位作比較. 
**如果您的遊戲沒有出現在支援列表當中, 安裝將無法繼續. **

## 獲取 Quilt Loader Model

由於 ProjBobcat 的 Quilt 安裝器要求您在初始化安裝器時提供來自 Quilt 的下載資訊. 
因此, 我們將在這裡簡要描述如何根據指定的 MineCraft 版本來獲取該資訊. 

::: info

在該示例中, 我們將使用 MineCraft 1.19.2 來向您展示如何獲取. 

:::

首先, 您需要向 [https://meta.quiltmc.org/v3/versions/loader](https://meta.quiltmc.org/v3/versions/loader) 傳送一個 **HTTP GET** 請求. 

您將看到類似下面的返回內容：

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

Quilt Meta API 將返回一個 JSON 陣列, 陣列中的每一個元素即是我們需要的 Loader Artifact. 

#### 將 JSON 返回轉換為 ProjBobcat 型別

如果您在您的專案中使用 [JSON.NET](https://www.newtonsoft.com/json)（Newtonsoft.JSON）. 
您可以使用類似下面的程式碼來將您獲取到的伺服器響應轉換為對應的 ProjBobcat 型別：

```c#

// 從 Quilt Meta API 請求資料（示例, 非實際程式碼）
...
var responseJson = await res.Content.ReadAsStringAsync();

// 將 JSON 響應轉換為 ProjBobcat 型別 // [!code focus]
var artifacts = JsonConvert.DeserializeObject<List<QuiltLoaderModel>>(responseJson); // [!code focus]

// 獲取使用者想要安裝的版本（示例, 非實際程式碼）
var userSelect = vm.SelectedArtifactIndex;

// 獲取單個 Loader Artifact // [!code focus]
var selectedArtifact = artifacts[userSelect]; // [!code focus]

```

此處, **selectedArtifact** 即是 Fabric 安裝器所需要的 `QuiltLoaderModel`. 

## 初始化安裝器

初始化 Quilt 安裝器的方式非常簡單. 您需要使用到在先前步驟中取得的 `selectedArtifact` 來初始化安裝器：

```c#

var quiltInstaller = new QuiltInstaller
{
    InheritsFrom = "[MC_VERSION_OR_GAME_ID]",
    RootPath = "[GAME_ROOT_PATH]",
    CustomId = "[CUSTOM_INSTALL_GAME_ID]",
    LoaderArtifact = selectedArtifact
};

```

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|                 專案                  |                      說明                       |
|:-----------------------------------:|:---------------------------------------------:|
|          [GAME_ROOT_PATH]           |          遊戲根目錄, 通常為 .minecraft 資料夾的路徑          |
|      [CUSTOM_INSTALL_GAME_ID]       |              可選項, 自定義即將要安裝的遊戲的名稱               |
|       [MC_VERSION_OR_GAME_ID]       | Forge 繼承的 MineCraft 原版遊戲版本, 通常為遊戲版本. 例如：1.19.2  |

## 開始安裝

在您完成安裝器的初始化後, 您只需要呼叫 Fabric 安裝器的安裝方法來完成安裝. 

在非同步上下文中, 使用 **InstallTaskAsync** 來完成安裝：

```c#

await quiltInstaller.InstallTaskAsync();

```

在同步上下文中, 使用 **Install** 來完成安裝：

```c#

quiltInstaller.Install();

```

## 報告安裝進度

在某些情況下, Quilt 安裝器可能會需要數分鐘的時間來完成安裝. 
因此, 您可能需要實時向用戶彙報安裝器目前的進度. 
為此, Quilt 安裝器提供了 **StageChangedEventDelegate** 事件來幫助您實現任務彙報. 
您只需要簡單地在 **開始安裝之前** 註冊下面的事件：

```c#

quiltInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};

```

其中,  **args.Progress** 指示了安裝器當前的百分比進度. **args.CurrentStage** 則是安裝器當前進度的文字描述. 
