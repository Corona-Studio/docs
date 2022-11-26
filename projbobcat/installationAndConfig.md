# 安装并配置 ProjBobcat

## 从发行包安装

### Nuget

目前，您可以方便的从 Nuget 上搜索并下载 ProjBobcat 的软件包，您可以在 Visual Studio 的包管理器中搜索 ProjBobcat 并将其添加到您的项目中。

或者，您也可以手动在 “程序包管理器控制台” 中执行下面的命令：
```bash
NuGet\Install-Package ProjBobcat -Version 1.16.0
```

### .NET CLI

要通过 .NET CLI 来安装 ProjBobcat，您只需要将终端切换到包含 .csproj 文件的项目目录，并在终端中执行：
```bash
dotnet add package ProjBobcat --version 1.16.0
```

## PackageReference

PackageReference 是微软为现代 .NET 项目推出的一种新的软件包管理规范，
详细信息可以在 [MSDN](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files)
中查看

您只需在项目的 **[项目名].csproj** 文件中添加：
```xml
<PackageReference Include="ProjBobcat" Version="1.16.0" />
```

::: tip
其中，**1.16.0** 为 ProjBobcat 的版本号，您可以将其替换为其他的版本号，
所有的发行版本都可以在 [ProjBobcat - Nuget](https://www.nuget.org/packages/ProjBobcat#versions-body-tab) 中查看。
:::
