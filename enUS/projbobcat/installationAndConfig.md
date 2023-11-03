# Install and configure ProjBobcat

[[toc]]

## Install from distribution package

### Nuget

Currently, you can easily search and download the ProjBobcat package from Nuget. You can search for ProjBobcat in the package manager of Visual Studio and add it to your project.
```bash
NuGet\Install-Package ProjBobcat -Version 1.16.0
```

### .NET CLI

To install ProjBobcat via the .NET CLI, you just need to switch the terminal to the project directory containing the .csproj file and execute in the terminal：
```bash
dotnet add package ProjBobcat --version 1.16.0
```

### PackageReference

PackageReference is a new software package management specification launched by Microsoft for modern .NET projects.
Details can be found at [MSDN](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files)
View in

All you need to do is add in your project's **[project name].csproj** file:
```xml
<PackageReference Include="ProjBobcat" Version="1.16.0" />
```

::: tip
Among them, **1.16.0** is the version number of ProjBobcat. You can replace it with other version numbers.
All released versions can be viewed at [ProjBobcat - Nuget](https://www.nuget.org/packages/ProjBobcat#versions-body-tab).
:::

## Get from source code

Another way to use ProjBobcat is to add the code repository directly to your project reference.

::: info
Before executing the following command, you may need to install [Git CLI](https://git-scm.com/)
:::

### Clone the ProjBobcat repository

Use the command line to switch to the root directory of the project solution and execute the following code in the command line to complete the cloning of the warehouse:

```bash
git clone https://github.com/Corona-Studio/ProjBobcat.git
```

### Use Git Submodule to pull ProjBobcat

::: tip
Git Submodule is a very practical feature, and here we only show its most basic use cases.
You can see more use cases in [Git Documentation](https://git-scm.com/book/en/v2/Git-Tools-Submodules).
:::

Use the command line to switch to the root directory of the project solution and execute the following code in the command line to complete the cloning of the warehouse:

```bash
git submodule add https://github.com/Corona-Studio/ProjBobcat.git
```

### Add a reference to ProjBobcat

Next, in Visual Studio's Solution Explorer view, right-click the solution name at the top of the tree.
And select **Add-"Existing Project"** and find **ProjBobcat.csproj** in the folder of the ProjBobcat project you just cloned in the file browser window.

Next, find the project you need to reference ProjBobcat in **Solution Explorer**, right-click, and select **"Add"-"Project Reference"**.
Finally, check ProjBobcat in the pop-up window to complete the reference.

##Configure before use

### Modify the default number of connections

Before using ProjBobcat, you need to set the entry point of your program (usually **App.xaml.cs** or **Program.cs**)
Add some code to initialize ProjBobcat related services.

Due to the default maximum connection limit of the .NET runtime, you may encounter a performance bottleneck when using ProjBobcat to download modules.
Therefore, you need to add the following code at the entrance to modify the default maximum number of connections:

```c#{3}
 using System.Net;

 ServicePointManager.DefaultConnectionLimit = 512;
```

### Register and initialize basic services

Next, you need to add this code to the entry point to complete the initialization of the ProjBobcat service:

#### Initialize service container

```c#
ServiceHelper.Init();
```

#### Initialize CurseForge API service (optional)

This service is optional, if you are not using any CurseForge related services, you can ignore this step.

::: tip
Before registering for the CurseForge service, you need to prepare the API KEY officially issued by CurseForge.
If you haven't already, please go to the [Application Page - CurseForge](https://support.curseforge.com/en/support/solutions/articles/9000208346-about-the-curseforge-api-and-how-to-apply-for-a-key)
to get your API KEY.
:::

::: warning
API KEY is a sensitive personal credential. Please keep the API KEY properly and do not disclose it to others.
:::

```c#
CurseForgeAPIHelper.SetApiKey("[YOUR API KEY]");
```

Replace **[YOUR API KEY]** with the API KEY you officially obtained from CurseForge.

#### Initialize download service

When initializing the download service, you can choose to customize the User Agent used when making requests (the default is "ProjBobcat").

```c#
HttpClientHelper.Ua = "[YOUR UA]"; // OPTIONAL
HttpClientHelper.Init();
```

### Configure Microsoft Login Authenticator

For specific registration methods for Azure Active Directory applications, please go to:
[Create New Azure Application](/enUS/projbobcat/createNewAzureApp)

::: tip
Before configuring Microsoft Authenticator, you need to register your app with Azure and configure it correctly.
After you complete the configuration, you will get a Client ID.

Relevant information:

- [Azure Website](https://azure.microsoft.com/en-us/)
- [Device code flow](https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-desktop-acquire-token-device-code-flow?tabs=dotnet)

:::

::: warning
The CLIENT ID is a sensitive personal credential, please keep the CLIENT ID properly and do not disclose it to others.
:::

```c#
MicrosoftAuthenticator.Configure(new MicrosoftAuthenticatorAPISettings
{
    ClientId = "[YOUR CLIENT ID]",
    TenentId = "consumers",
    Scopes = new[] { "XboxLive.signin", "offline_access", "openid", "profile", "email" }
});
```

After obtaining the Client ID, replace **[YOUR CLIENT ID]** with your Client ID.
