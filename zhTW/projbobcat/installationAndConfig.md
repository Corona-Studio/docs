# 安裝並配置 ProjBobcat

[[toc]]

## 從發行包安裝

### Nuget

目前, 您可以方便的從 Nuget 上搜索並下載 ProjBobcat 的軟體包, 您可以在 Visual Studio 的包管理器中搜索 ProjBobcat 並將其新增到您的專案中. 

或者, 您也可以手動在 “程式包管理器控制檯” 中執行下面的命令：
```bash
NuGet\Install-Package ProjBobcat -Version 1.16.0
```

### .NET CLI

要透過 .NET CLI 來安裝 ProjBobcat, 您只需要將終端切換到包含 .csproj 檔案的專案目錄, 並在終端中執行：
```bash
dotnet add package ProjBobcat --version 1.16.0
```

### PackageReference

PackageReference 是微軟為現代 .NET 專案推出的一種新的軟體包管理規範, 
詳細資訊可以在 [MSDN](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files)
中檢視

您只需在專案的 **[專案名].csproj** 檔案中新增：
```xml
<PackageReference Include="ProjBobcat" Version="1.16.0" />
```

::: tip
其中, **1.16.0** 為 ProjBobcat 的版本號, 您可以將其替換為其他的版本號, 
所有的發行版本都可以在 [ProjBobcat - Nuget](https://www.nuget.org/packages/ProjBobcat#versions-body-tab) 中檢視. 
:::

## 從原始碼引用

另外一種使用 ProjBobcat 的方法是直接新增程式碼倉庫到您的專案引用. 

::: info
在執行下面的命令前, 您可能需要先安裝 [Git CLI](https://git-scm.com/)
:::

### 克隆 ProjBobcat 倉庫

使用命令列切換到專案解決方案的根目錄, 並在命令列中執行下面的程式碼來完成倉庫的克隆：

```bash
git clone https://github.com/Corona-Studio/ProjBobcat.git
```

### 使用 Git Submodule（子模組）的方式拉取 ProjBobcat

::: tip
Git Submodule 是一個非常實用的功能, 在這裡我們只展示了其最基本的用例. 
在 [Git 官方文件](https://git-scm.com/book/en/v2/Git-Tools-Submodules) 中您可以檢視到更多的使用案例. 
:::

使用命令列切換到專案解決方案的根目錄, 並在命令列中執行下面的程式碼來完成倉庫的克隆：

```bash
git submodule add https://github.com/Corona-Studio/ProjBobcat.git
```

### 新增對 ProjBobcat 的引用

接下來, 在 Visual Studio 的 **解決方案資源管理器** 檢視中, 右鍵點選位於樹狀圖頂層的解決方案名稱. 
並選擇 **“新增”-“現有專案”**, 並在檔案瀏覽視窗中找到剛剛克隆的 ProjBobcat 專案資料夾中的 **ProjBobcat.csproj**. 

接著, 在 **解決方案資源管理器** 找到您需要引用 ProjBobcat 的專案, 並右鍵單擊, 選擇 **“新增”-“專案引用”**. 
最後在彈出視窗中勾選 ProjBobcat 即可完成對其的引用. 

## 使用前配置

### 修改預設連線數

在使用 ProjBobcat 之前, 您需要在程式的入口點（通常是 **App.xaml.cs** 或 **Program.cs**）
中新增一些程式碼來初始化 ProjBobcat 的相關服務. 

由於 .NET 執行時預設的最大連線數限制, 在使用 ProjBobcat 下載模組時可能會遭遇效能瓶頸. 
因此, 您需要在入口處新增下面的程式碼來修改預設的最大連線數：

```c#{3}
 using System.Net;

 ServicePointManager.DefaultConnectionLimit = 512;
```

### 註冊並初始化基礎服務

接下來, 您需要在入口點新增這些程式碼來完成 ProjBobcat 服務的初始化：

#### 初始化服務容器

```c#
ServiceHelper.Init();
```

#### 初始化 CurseForge API 服務（可選）

該服務為可選專案, 如果您沒有使用任何 CurseForge 相關服務, 您可以忽略這個步驟. 

::: tip
在註冊 CurseForge 服務前, 您需要準備 CurseForge 官方下發的 API KEY. 
如果您還沒有, 請前往 [申請頁面 - CurseForge](https://support.curseforge.com/en/support/solutions/articles/9000208346-about-the-curseforge-api-and-how-to-apply-for-a-key)
來獲得您的 API KEY. 
:::

::: warning
API KEY 為敏感的個人憑據, 請妥善儲存 API KEY 並不要將其洩露給其他人. 
:::

```c#
CurseForgeAPIHelper.SetApiKey("[YOUR API KEY]");
```

將 **[YOUR API KEY]** 替換為您從 CurseForge 官方獲取的 API KEY. 

#### 初始化下載服務

在初始化下載服務時您可以選擇自定義請求時所使用的 User Agent（預設為 "ProjBobcat"）. 

```c#
HttpClientHelper.Ua = "[YOUR UA]"; // 可選
HttpClientHelper.Init();
```

### 配置微軟登入驗證器

關於 Azure Active Directory 應用具體的註冊方法請移步：
[如何註冊 Azure 應用](/zhTW/projbobcat/createNewAzureApp)

::: tip
在配置微軟驗證器前, 您需要在 Azure 註冊您的應用, 並對其進行正確的配置. 
在您完成配置之後, 您會獲得一串 Client ID. 

相關資料：

- [Azure 官網](https://azure.microsoft.com/en-us/)
- [Device code flow](https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-desktop-acquire-token-device-code-flow?tabs=dotnet)

:::

::: warning
CLIENT ID 為敏感的個人憑據, 請妥善儲存 CLIENT ID 並不要將其洩露給其他人. 
:::

```c#
MicrosoftAuthenticator.Configure(new MicrosoftAuthenticatorAPISettings
{
    ClientId = "[YOUR CLIENT ID]",
    TenentId = "consumers",
    Scopes = new[] { "XboxLive.signin", "offline_access", "openid", "profile", "email" }
});
```

在取得 Client ID 後, 將 **[YOUR CLIENT ID]** 替換為您的 Client ID. 
