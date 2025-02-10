# CurseForge 整合包安裝器

[[toc]]

::: tip

請注意, ProjBobcat 僅實現了 CurseForge 整合包的自動化安裝流程, 您仍然需要自己實現 CurseForge 整合包的搜尋、下載、儲存流程. 

:::

## 實用資源

- [CurseForge 官方網站](https://www.curseforge.com/)
- [CurseForge API](https://docs.curseforge.com/)

## 初始化安裝器

初始化 CurseForge 安裝器的方式非常簡單：

```c#

var curseForgeInstaller = new CurseForgeInstaller
{
    GameId = "[CUSTOM_INSTALL_GAME_ID]",
    ModPackPath = "[PATH_TO_YOUR_MODPACK]",
    RootPath = "[GAME_ROOT_PATH]"
};

```

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|                  專案                  |             說明              |
|:------------------------------------:|:---------------------------:|
|           [GAME_ROOT_PATH]           | 遊戲根目錄, 通常為 .minecraft 資料夾的路徑 |
|       [CUSTOM_INSTALL_GAME_ID]       |     可選項, 自定義即將要安裝的遊戲的名稱      |
|        [PATH_TO_YOUR_MODPACK]        |     CurseForge 整合包所在的路徑     |

## 開始安裝

在您完成安裝器的初始化後, 您只需要呼叫 CurseForge 安裝器的安裝方法來完成安裝. 

在非同步上下文中, 使用 **InstallTaskAsync** 來完成安裝：

```c#

await curseForgeInstaller.InstallTaskAsync();

```

在同步上下文中, 使用 **Install** 來完成安裝：

```c#

curseForgeInstaller.Install();

```

## 報告安裝進度

在某些情況下, CurseForge 安裝器可能會需要數分鐘的時間來完成安裝. 
因此, 您可能需要實時向用戶彙報安裝器目前的進度. 
為此, CurseForge 安裝器提供了 **StageChangedEventDelegate** 事件來幫助您實現任務彙報. 
您只需要簡單地在 **開始安裝之前** 註冊下面的事件：

```c#

curseForgeInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};

```

其中,  **args.Progress** 指示了安裝器當前的百分比進度. **args.CurrentStage** 則是安裝器當前進度的文字描述. 

