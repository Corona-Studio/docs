# Forge 安裝器

在 ProjBobcat 中, 我們支援了幾乎所有主流 MineCraft 版本的 Forge 自動化安裝. 

[[toc]]

::: tip

請注意, ProjBobcat 僅實現了 Forge 自動化安裝流程, 您仍然需要自己實現 Forge 安裝包的搜尋、下載、儲存流程. 

:::

## 判斷應該使用哪一種 Forge 安裝器

由於 Forge 團隊在後續的版本中修改了 Forge 的打包規範以及安裝流程. 因此, 您需要手動判斷應該使用哪一種安裝器. 
在 ProjBobcat 中, 我們已經為您實現了相關的判斷邏輯. 您只需要簡單地呼叫下面的方法：

```c#

var mcVersion = "[MC_VERSION]";
var forgeJarPath = "[PATH_TO_YOUR_FORGE_INSTALLER]";
var forgeVersion = ForgeInstallerFactory.GetForgeArtifactVersion(mcVersion, "[FORGE_VERSION]");

var isLegacy = ForgeInstallerFactory.IsLegacyForgeInstaller(forgeJarPath, forgeVersion);  // [!code focus]

```

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|               專案                |                     說明                     |
|:-------------------------------:|:------------------------------------------:|
|          [MC_VERSION]           |    將 Forge 安裝到的 MineCraft 版本, 例如：1.19.2     |
| [PATH_TO_YOUR_FORGE_INSTALLER]  |           Forge 安裝器 .jar 檔案所在的路徑           |
|         [FORGE_VERSION]         |      Forge 的具體版本, 通常為 XX.X.X, 例如：43.2.0      |

在您完成替換併成功執行上述的程式碼片段之後, **isLegacy** 會指示當前 Forge 安裝器應當使用哪一種 Forge 安裝器. 

## 初始化舊版安裝器

如果在上面的流程中, **isLegacy** 的值為 **true**, 這意味著您需要使用舊版安裝器來完成 Forge 的安裝. 
要初始化舊版安裝器, 只需例項化 **LegacyForgeInstaller** 並提供相應的引數：

```c#

IForgeInstaller forgeInstaller =
    new LegacyForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                RootPath = "[GAME_ROOT_PATH]",
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                ForgeVersion = "[FORGE_VERSION]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };

```

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|                 專案                 |                      說明                      |
|:----------------------------------:|:--------------------------------------------:|
|          [GAME_ROOT_PATH]          |         遊戲根目錄, 通常為 .minecraft 資料夾的路徑          |
|      [CUSTOM_INSTALL_GAME_ID]      |              可選項, 自定義即將要安裝的遊戲的名稱              |
|      [MC_VERSION_OR_GAME_ID]       | Forge 繼承的 MineCraft 原版遊戲版本, 通常為遊戲版本. 例如：1.19.2 |

## 初始化新版安裝器

```c#

IForgeInstaller forgeInstaller =
    new HighVersionForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                JavaExecutablePath = "[PATH_TO_YOUR_JAVA_RUNTIME]",
                RootPath = "[GAME_ROOT_PATH]",
                VersionLocator = [VERSION_LOCATOR_INST],
                DownloadUrlRoot = “[LIBRARIES_URL_ROOT]”,
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                MineCraftVersion = "[MC_VERSION]",
                MineCraftVersionId = "[ACTUAL_MC_GAME_ID]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };

```

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|                 專案                  |                                      說明                                       |
|:-----------------------------------:|:-----------------------------------------------------------------------------:|
|     [PATH_TO_YOUR_JAVA_RUNTIME]     |                           Java （javaw.exe） 執行時所在的路徑                           |
|        [LIBRARIES_URL_ROOT]         |                下載源的根 URL, 例如："https://bmclapi2.bangbang93.com/"                |
|       [VERSION_LOCATOR_INST]        |                  遊戲版本定位器例項, 即初始化遊戲核心時的 **VersionLocator** 屬性                   |
|         [ACTUAL_MC_GAME_ID]         | 實際的 MineCraft 遊戲名稱, 即原版遊戲在 **version** 資料夾下的名稱. 一般情況下, 這個值和 **[MC_VERSION]** 一致.  |

## 根據 **isLegacy** 值進行統一初始化

由於 **LegacyForgeInstaller** 和 **HighVersionForgeInstaller** 同時實現了 **IForgeInstaller** 介面. 
因此, 您可以很方便的使用一個三元運算子來選擇性的初始化對應的安裝器：

```c#{4-100}

var isLegacy = ForgeInstallerFactory.IsLegacyForgeInstaller(forgeJarPath, forgeVersion);

IForgeInstaller forgeInstaller = isLegacy
            ? new LegacyForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                RootPath = "[GAME_ROOT_PATH]",
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                ForgeVersion = "[FORGE_VERSION]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            }
            : new HighVersionForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                JavaExecutablePath = "[PATH_TO_YOUR_JAVA_RUNTIME]",
                RootPath = "[GAME_ROOT_PATH]",
                VersionLocator = [VERSION_LOCATOR_INST],
                DownloadUrlRoot = “[LIBRARIES_URL_ROOT]”,
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                MineCraftVersion = "[MC_VERSION]",
                MineCraftVersionId = "[ACTUAL_MC_GAME_ID]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };

```

## 開始安裝

在您完成安裝器的初始化後, 您只需要呼叫 Forge 安裝器的安裝方法來完成安裝. 

在非同步上下文中, 使用 **InstallForgeTaskAsync** 來完成安裝：

```c#

await forgeInstaller.InstallForgeTaskAsync();

```

在同步上下文中, 使用 **InstallForge** 來完成安裝：

```c#

forgeInstaller.InstallForge();

```

## 報告安裝進度

在某些情況下, Forge 安裝器可能會需要數分鐘的時間來完成安裝. 
因此, 您可能需要實時向用戶彙報安裝器目前的進度. 
為此, Forge 安裝器提供了 **StageChangedEventDelegate** 事件來幫助您實現任務彙報. 
您只需要簡單地在 **開始安裝之前** 註冊下面的事件：

```c#

((InstallerBase)forgeInstaller).StageChangedEventDelegate += (_, args) =>
{
    ReportProgress(args.Progress * 100, args.CurrentStage);
};

```

其中,  **args.Progress** 指示了安裝器當前的百分比進度. **args.CurrentStage** 則是安裝器當前進度的文字描述. 
