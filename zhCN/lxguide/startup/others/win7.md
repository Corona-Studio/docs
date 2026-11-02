# Windows 7 用户指南

LauncherX宣称支持Windows7, 但是截至目前(2025年) Windows7已经是快要有20年历史的操作系统了. 随着LauncherX框架的不断迭代, 对Windows7的支持随时可能终止 (确认不再支持后, 这里将会有明显提示) ———— 接下来的操作指导是基于一个**全新安装的Windows7 Ultimate**探索而来. 部分需要手动下载和依赖的下载链接也可能随时失效.  

[[toc]]

::: warning 前置条件
LauncherX **仅支持64位操作系统**, 因此你的Windows7 必须是**64**位 **非简化版**.
:::

## 做好准备

首先, 你的Windows7设备需要确保**有网络连接**, 然后准备下载一系列的资源. 以下是需要下载的内容清单和对应的链接.

- LauncherX [官网下载](https://corona.studio/lx/download) 下载Windows x64版本
- VxKex [Github Release](https://github.com/i486/VxKex/releases/tag/Version1.1.2.1428) 下载Assets部分展示的KexSetup_Release_<版本号>.exe
- Windows更新补丁 **KB2670838** [Microsoft Update Catalog](https://www.catalog.update.microsoft.com/Search.aspx?q=KB2670838) 下载标明**Windows7**、**x64**的、文件大小为**11.3MB**的那一项, 点击那一行最右方的Download按钮.
- Windows更新补丁 **KB2533623** [Legacy Update](https://legacyupdate.net/download-center/download/26764/update-for-windows-7-x64-kb2533623) 点击页面中的*蓝色文字*「Windows6.1-KB2533623-x64.msu」下载
- Visual C++ 2015运行库 版本`14.0.23026` [MS VC REDIST 2015 14.0.23026](https://www.microsoft.com/zh-CN/download/details.aspx?id=48145) 用于补全`MSVCP140.dll`. 
- Visual C++ 2015运行库 版本`14.42.34438` [MS VC REDIST 2015 14.42.34438(下载)](https://download.visualstudio.microsoft.com/download/pr/285b28c7-3cf9-47fb-9be8-01cf5323a8df/8F9FB1B3CFE6E5092CF1225ECD6659DAB7CE50B8BF935CB79BFEDE1F3C895240/VC_redist.x64.exe) 用于补全`MSVCP140.dll`. 
- (可选) .NET Desktop Runtime 9 (视LauncherX当时使用的.NET版本为准) [.NET9 桌面运行时(下载)](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-9.0.4-windows-x64-installer)

## 开始安装

在进行此部分操作时, 建议关闭电脑上的**一切杀毒软件**. 为了避免在此期间电脑受到外来攻击, 可以考虑断网.

### 1) 准备环境容器

1. 双击文件来安装刚才下载好的两个更新补丁. 安装过程不要求重启, 可以安装完全部的两个包后再重启.
2. 重启后, 找到刚才下载好的**VxKex**安装包, 运行并安装. 执行默认的安装即可. 安装后会要求重启.
3. 再次重启后, 环境容器准备完成. 可以随便找个`.exe`文件, 右键点击它查看其属性, 若属性选项卡中出现VxKex选项卡即为安装成功.

### 2) 补全依赖库

::: info 可能存在重复的步骤
:::

1. 找到刚才下载的版本号为`14.0.23026`的VCRedist库, 双击安装;
2. 完成上一步后, 找到另外一个VCRedist库, 双击安装;
3. 刚才如果下载了.NET桌面运行时, 将其安装.
4. 重启电脑.

### 3) 应用变更

接下来, 将LauncherX放在一个 **非C盘根目录的**, 且**不是桌面**的**空**文件夹中, 然后右键点击它, 点击属性, 然后点击VxKex选项卡, 勾选“Enable VxKex for this Program”, 然后点击应用并关闭属性窗口.

理论上, 此时已经可以正常使用95%的LauncherX功能了. 双击LauncherX, 尝试运行. 如果仍然有问题, 参阅: [如何反馈问题](/zhCN/lxguide/report-issue).

## 可能的问题

已知在Windows7中运行LauncherX会遇到以下问题:

- 卡在「正在自动登陆」: 这是未正确启用VxKex导致的, 实际错误是无法使用Windows7还不支持的Win32 API来初始化联网操作.
- 下载Java闪退: 暂时不明确哪部分不工作, 建议自行下载Azul Zulu以避开此问题. 参阅: [如何下载JRE](/zhCN/lxguide/others/download-jre.md)
- 无法获取游戏列表: 请尝试切换到其他下载源并关闭混合源补全.

