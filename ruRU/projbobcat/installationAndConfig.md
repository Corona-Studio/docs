# 安装并配置 ProjBobcat

[[toc]]

## 从发行包安装

### Nuget

目前, 您可以方便的从 Nuget 上搜索并下载 ProjBobcat 的软件包, 您可以在 Visual Studio 的包管理器中搜索 ProjBobcat 并将其添加到您的项目中. 

或者, 您也可以手动在 “程序包管理器控制台” 中执行下面的命令：
```bash
NuGet\Install-Package ProjBobcat -Version 1.16.0
```

### .NET CLI

要通过 .NET CLI 来安装 ProjBobcat, 您只需要将终端切换到包含 .csproj 文件的项目目录, 并在终端中执行：
```bash
dotnet add package ProjBobcat --version 1.16.0
```

### PackageReference

PackageReference 是微软为现代 .NET 项目推出的一种新的软件包管理规范, 
详细信息可以在 [MSDN](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files)
中查看

您只需在项目的 **[项目名].csproj** 文件中添加：
```xml
<PackageReference Include="ProjBobcat" Version="1.16.0" />
```

::: tip
其中, **1.16.0** 为 ProjBobcat 的版本号, 您可以将其替换为其他的版本号, 
所有的发行版本都可以在 [ProjBobcat - Nuget](https://www.nuget.org/packages/ProjBobcat#versions-body-tab) 中查看. 
:::

## 从源码引用

另外一种使用 ProjBobcat 的方法是直接添加代码仓库到您的项目引用. 

::: info
在执行下面的命令前, 您可能需要先安装 [Git CLI](https://git-scm.com/)
:::

### 克隆 ProjBobcat 仓库

使用命令行切换到项目解决方案的根目录, 并在命令行中执行下面的代码来完成仓库的克隆：

```bash
git clone https://github.com/Corona-Studio/ProjBobcat.git
```

### 使用 Git Submodule（子模块）的方式拉取 ProjBobcat

::: tip
Git Submodule 是一个非常实用的功能, 在这里我们只展示了其最基本的用例. 
在 [Git 官方文档](https://git-scm.com/book/en/v2/Git-Tools-Submodules) 中您可以查看到更多的使用案例. 
:::

使用命令行切换到项目解决方案的根目录, 并在命令行中执行下面的代码来完成仓库的克隆：

```bash
git submodule add https://github.com/Corona-Studio/ProjBobcat.git
```

### 添加对 ProjBobcat 的引用

接下来, 在 Visual Studio 的 **解决方案资源管理器** 视图中, 右键点击位于树状图顶层的解决方案名称. 
并选择 **“添加”-“现有项目”**, 并在文件浏览窗口中找到刚刚克隆的 ProjBobcat 项目文件夹中的 **ProjBobcat.csproj**. 

接着, 在 **解决方案资源管理器** 找到您需要引用 ProjBobcat 的项目, 并右键单击, 选择 **“添加”-“项目引用”**. 
最后在弹出窗口中勾选 ProjBobcat 即可完成对其的引用. 

## 使用前配置

### 修改默认连接数

在使用 ProjBobcat 之前, 您需要在程序的入口点（通常是 **App.xaml.cs** 或 **Program.cs**）
中添加一些代码来初始化 ProjBobcat 的相关服务. 

由于 .NET 运行时默认的最大连接数限制, 在使用 ProjBobcat 下载模块时可能会遭遇性能瓶颈. 
因此, 您需要在入口处添加下面的代码来修改默认的最大连接数：

```c#{3}
 using System.Net;

 ServicePointManager.DefaultConnectionLimit = 512;
```

### 注册并初始化基础服务

接下来, 您需要在入口点添加这些代码来完成 ProjBobcat 服务的初始化：

#### 初始化服务容器

```c#
ServiceHelper.Init();
```

#### 初始化 CurseForge API 服务（可选）

该服务为可选项目, 如果您没有使用任何 CurseForge 相关服务, 您可以忽略这个步骤. 

::: tip
在注册 CurseForge 服务前, 您需要准备 CurseForge 官方下发的 API KEY. 
如果您还没有, 请前往 [申请页面 - CurseForge](https://support.curseforge.com/en/support/solutions/articles/9000208346-about-the-curseforge-api-and-how-to-apply-for-a-key)
来获得您的 API KEY. 
:::

::: warning
API KEY 为敏感的个人凭据, 请妥善保存 API KEY 并不要将其泄露给其他人. 
:::

```c#
CurseForgeAPIHelper.SetApiKey("[YOUR API KEY]");
```

将 **[YOUR API KEY]** 替换为您从 CurseForge 官方获取的 API KEY. 

#### 初始化下载服务

在初始化下载服务时您可以选择自定义请求时所使用的 User Agent（默认为 "ProjBobcat"）. 

```c#
HttpClientHelper.Ua = "[YOUR UA]"; // 可选
HttpClientHelper.Init();
```

### 配置微软登录验证器

关于 Azure Active Directory 应用具体的注册方法请移步：
[如何注册 Azure 应用](/ruRU/projbobcat/createNewAzureApp)

::: tip
在配置微软验证器前, 您需要在 Azure 注册您的应用, 并对其进行正确的配置. 
在您完成配置之后, 您会获得一串 Client ID. 

相关资料：

- [Azure 官网](https://azure.microsoft.com/en-us/)
- [Device code flow](https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-desktop-acquire-token-device-code-flow?tabs=dotnet)

:::

::: warning
CLIENT ID 为敏感的个人凭据, 请妥善保存 CLIENT ID 并不要将其泄露给其他人. 
:::

```c#
MicrosoftAuthenticator.Configure(new MicrosoftAuthenticatorAPISettings
{
    ClientId = "[YOUR CLIENT ID]",
    TenentId = "consumers",
    Scopes = new[] { "XboxLive.signin", "offline_access", "openid", "profile", "email" }
});
```

在取得 Client ID 后, 将 **[YOUR CLIENT ID]** 替换为您的 Client ID. 
