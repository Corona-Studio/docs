# 下载合适的Java运行时

下载Java运行时的方式有很多种. 这里介绍两个使用LauncherX时最主要的方法. 

[[toc]]

::: tip 前置知识

你需要确保你知道你的电脑当前运行的操作系统和CPU架构以确保获得最佳游戏体验. 

相关阅读：[辨识计算机环境 | 日冕知识库](/zhCN/guide/general/check-system.html)

:::

## 使用其他构建

一般而言, 我们建议使用来自 **Azul Zulu** 的JDK构建（根据部分反馈, 不再推荐Alibaba Dragonwell, 除非环境一定需要它）用于游戏. 在LauncherX的“设置-全局游戏设置-启动设置-资源下载” 中提供了几个版本基于x64平台的JRE下载. 这些下载是由Mojang选择的用于游戏的JRE, 一般都是来自OpenJDK的构建. 但是, 目前(2024-03-17)为止, Mojang尚未为ARM平台选择JDK. 因此, 对于ARM平台用户或想要通过更换JRE来优化游戏的用户, 我们建议使用Azul Zulu JDK, 因为它是面向服务端优化的版本, 应对高频内存I/O、高负载计算时能有更好的性能, 且都有面向ARM平台(aarch)的构建可供下载. 以下是这几种JDK的官方下载链接, 您需要打开后选择需要的版本:

-   [Azul Zulu官方下载(英文)](https://www.azul.com/downloads/#zulu): 提供各种版本的JDK构建, 可选包含JavaFX运行时 
-   [Azul Zing官方下载(英文)](https://www.azul.com/downloads/#prime): 各种新版JDK构建, 免费版可能略有不稳定的情况, 但是性能更好（一般来说, 大概） 
-   [Oracle Java SE Runtime 下载(英文)](https://www.oracle.com/cn/java/technologies/downloads/archive/): Oracle的Java下载归档站
-   [OpenJDK](https://openjdk.org/): 就是OpenJDK而已



接下来, 我们以Azul Zulu为例展示如何下载, 以及下载后应该如何让LauncherX找到.

::: warning 请注意

由于仅Windows版本的LauncherX支持深度搜索, 且深度搜索获取结果较慢, 故此接下来的教程中只使用一般搜索和手动添加.<br>并且这里只介绍下载打包为.zip的二进制文件的用法. 如果Linux用户在下载后出现问题, 请尝试下载.tar.gz, 这个格式的归档保留了权限设置.

:::

### 访问官网的下载页面

访问 https://www.azul.com/downloads/#zulu , 找到**下载区域**. 如图所示的是版本筛选框.

![azul-website](/img/lxguide/perOsSetup/azul-website.png)

1. 在 **Operating System** 处选择 Windows/macOS/Linux(请自行选择子版本/发行版), 
2. 在 **Architecture** 处选择 **x86 64-bit或ARM 64-bit** (前者是一般的amd64/x86-64架构, 后者是ARM架构. ) 
3. 在**Java Package**选择「JRE」或「JDK」(如果有需要的话, 可以选择带有FX字样的体积更大的选项. 它附带JavaFX支持)
4. 在**Java Version**选择您需要的版本(Java17/Java8). 如果右侧的**Include Older Versions**开关没有开启, 这里则不会显示用于1.17的Java16, 或其他非LTS版本.

:::tip

请前往系统设置确认您的处理器架构, 或借助LauncherX的判断: x64架构无法运行ARM架构版本LauncherX, 而ARM架构LauncherX可能可以运行x64架构版本LauncherX, 但是会有明显的警告.

:::

在您每一步的筛选器操作结束时, 该页面的可用下载列表都会依据您的条件更新.

一般而言, 建议您选择列表最开头的项目 (只要您严格地完成了系统和架构选择). 在您打算下载的项目右侧的 **Download** 按钮中选择 `.zip` 格式的运行时并点击, 等待下载完成后将其解压到任意一处本地文件夹 (最好新创建一个).
随后在 LauncherX 中选择 **搜索Java**. 如果搜索不到您新解压的JRE, 请点击**手动添加**, 并选择刚才解压的文件夹 **bin/** 目录下的 **java** 可执行文件即可  (对于Windows, 如果开启了**显示已知文件扩展名** , 则您要选择的项目名为java.exe). 



## 使用LauncherX内置的下载 (Windows x64)

::: warning 正如前文所说...

「在LauncherX的“设置-全局游戏设置-启动设置-资源下载” 中提供了几个版本基于x64平台的JRE下载. 这些下载是由Mojang选择的用于游戏的JRE, 一般都是来自OpenJDK的构建. 但是, 目前(2024-03-17)为止, Mojang尚未为ARM平台选择JDK. 因此, 对于ARM平台用户或想要通过更换JRE来优化游戏的用户, 我们建议使用Azul Zulu JDK, 因为它是面向服务端优化的版本, 应对高频内存I/O、高负载计算时能有更好的性能, 且都有面向ARM平台(aarch)的构建可供下载. 」

如果你的设备当前运行的操作系统并非Windows x64, 请回到本文最开始的地方. 这部分的内容不适合你的设备. 

:::

1. 在LauncherX的【设置-全局游戏设置-Java虚拟机设定】中找到【资源下载-下载Java】按钮, 点击它. 
2. 在弹出窗口中选择你要下载的Java, 选中后, 弹窗会提示你这个Java适合哪些版本的游戏. 
3. 点击【添加】, 稍等片刻直到下载完成. 

- 正常情况下, 下载完成后的Java会被自动发现并添加到LauncherX的Java列表中并可供选择. 如果不知道需要哪个版本的Java, 可以试着启动游戏, 如果确实缺失对应版本的Java, LauncherX会发出警告, 在警告弹窗中可以看见需要的Java版本. 

---

###### 参考更多相关文章

- 来自NitWikit：[选择、下载和安装 Java | 笨蛋 MC 开服教程 (yizhan.wiki)](https://yizhan.wiki/NitWikit/preparation/choose-and-download-and-install-java)

