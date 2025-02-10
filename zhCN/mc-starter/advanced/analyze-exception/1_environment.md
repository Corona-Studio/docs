# Java Edition | 如何分析游戏崩溃问题 - 1: 游戏前检查

:::warning 转载文章

本文是转载文章，经过CSKB编辑细微修改后发布于此。如果你觉得这篇文章不错并想要引用或转载，请根据这些信息联系原作者。

原作者：Kamihakuyie

引用链接：[腾讯频道 - Kamihakuyie 的帖子](https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&appChannel=share&inviteCode=2muCpb408BT&contentID=dwOtCX&businessType=2&jumpsource=shorturl)



转载信息上次更新于 2025年1月14日

:::

[[toc]]

## **//Preface  -  前话**

Minecraft Java Edition作为一个较大的Java依赖性软件，在进行游戏时，玩家们时常会碰到启动游戏时闪退、卡死等问题，而问题的形式种类繁多，有些问题解决起来极不容易。

对此，我根据自身理论知识以及部分解决游戏崩溃问题的实践经验逐步教会大家通过游戏前的检查以及对游戏崩溃日志的分析解决启动游戏时的问题，尽我所能帮助你成功启动游戏。

此外，由于本人专业知识有所不足，只提供力所能及的帮助以及建议方案，若碰到无法解决的问题烦请谅解！

## **//Body  Part1  -  正文1：Java环境问题检查**

### **① 版本对应**

我们已经知道Minecraft Java Edition依赖JAVA运行，而不同minecraft版本所选用的JAVA版本也有所不同，那么我们最开始要做的，便是检查系统中Java环境与minecraft版本是否对应，以下是各版本对应的JAVA版本(1)：

 

- 从**1.12（17w13a）** 开始，运行Minecraft的最低要求是**Java 8**

- 从**1.17（21w19a）** 开始，运行Minecraft的最低要求是Java 16

- 从**1.18（1.18-pre2） **开始，运行Minecraft的最低要求是**Java 17**

- 从**1.20.5（24w14a）** 开始，运行Minecraft的最低要求是**Java 21**，且操作系统要求为**64位**



 :::tip 搬运补充

如果你不知道你的操作系统和位数，参见：[辨识计算机环境 | 日冕知识库](/zhCN/guide/general/check-system.html)

:::

### **② 检查版本**

那么我们如何检查**电脑**中的JAVA版本呢？一般采用以下方法：

1、Win+R键，输入cmd后回车

2、输入java --version （此处注意JAVA8以下的老版本用java -version否则报错）

3、出现以下界面即成功

可以看见我的Java为 JRE 1.8.0 Update341

![由于跨域阻止，此处换用了并非来自原文的图片](/img/mcstarter/java-version.png)

 *对于Java8，作为长期支持的版本，其一直在更新。每个小更新都通过“1.8.0 Update xxx”来区分。在极端情况下，由于存在差异，不同小更新版本的Java8都可能引发不同的问题。*



在pojav与FCL等手机Java启动器中，请借助启动器自行查询Java版本



:::tip 搬运补充

对于现代的启动器，当您电脑中存在对应版本的JRE文件，一般都能做到自动切换。对于LauncherX，我们的自动切换是在发现版本对应有问题时候询问您是继续强制启动或是使用LauncherX判断出最合适的版本。

与此同时，要想查看LauncherX当前选中的Java版本，只需打开【设置-Java虚拟机设定】即可查看。关于这段设置，参见：[全局游戏设置 | 日冕知识库](/zhCN/lxguide/settings/item/global)

:::

 

### **③ JDK？JRE？**

关于Java，一般我们会碰到**JDK**与**JRE**两种

jdk是开发工具，jre则是运行环境，而开发工具自然包含了运行环境

所以实际上两者都能运行Minecraft，最大的差别在于jdk要稍微大些，**但是**

在**JAVA 17 及以上版本**中jre兼容性较差，建议使用jdk

 

此外，Java还存在不同公司的牌子，如Oracle、Bellsoft、Zulu等，但是实际上都差不多

（至少我现在没有分析因为Java牌子问题报错的）

 

### **④ 还是崩溃了！**

上述为游戏前检查Java环境，而如果Java环境存在问题导致崩溃，在崩溃日志中（游戏所在文件夹的logs里，或使用LauncherX右键点击游戏然后选择【打开-日志】，选择latest.log）你或许会发现以下内容：

```
The requested compatibility level **JAVA_21 could not be set**。Level is not supported by the active JRE or ASM version (**Java 17.0**，ASM 9.6 (ASM10_EXPERIMENTAL))
```

【 这是直接告诉你该用Java21而你用的是Java17 】



``` 
Error loading class: XXXXX (java.lang.IllegalArgumentException: **Class file major version 65** is not supported by active ASM (version 9.0 **supports class version 61**)，reading XXXXX)
```

【 这是由于ASM无法读取高版本Java导致的问题，需要切换到低版本Java 】

 

对于第二个问题，我们可以看到它提示了**Class编译版本号**，对于MC来说常见的与jdk版本对应如下(2)：

 

- Java 8 对应的class文件版本号是52

- Java 16 对应的class文件版本号是60

- Java 17 对应的class文件版本号是61

- Java 21 对应的class文件版本号是65

 

### **⑤ 借助启动器**

LauncherX等现代的（反正，就是这几年内更新过的（包括Minecraft官方推出的启动器 —— 这是一定会帮你准备好Java的））Minecraft启动器会提示并帮助你自动下载Java（关于如何使用LauncherX内置的Java下载功能，参见：[使用LauncherX下载JRE(仅限Windows)](/zhCN/lxguide/others/download-jre.html#使用launcherx内置的下载-windows-x64)），但当自动下载失效时请手动下载Java，参见：[如何手动下载Java环境](/zhCN/lxguide/others/download-jre)

 

## **//Body Part2  -  正文2：mods及其前置检查**

 ::: warning 这节内容经过编辑修改

要想阅读原文，参见[页首](#)的**引用信息**。

:::

 

**一般来说**，只有启用相应前置才能启动对应mods

（不一般的情况：用sodium以及iris兼容optifine+OptiFabric光影 等）(5)

 

此外，在进行游戏前检索你所安装mods的冲突关系并且避免之也是一种解决启动问题的重要方式。在LauncherX中下载到游戏的Mod会自动下载依赖，并且你可以在游戏Mod管理和Mod下载界面看到Mod的依赖关系。

 

## **//Epilogue  -  本篇结语**

现在你已经对游戏前必要环境的检查了然于心了，你可以试着启动游戏，如果游戏与模组正常启动，那么恭喜你学会了基本教程。如果游戏依旧崩溃，那也没关系，我们将继续深入学习崩溃日志的阅读理解并解决问题。

此外，本文系我知识、经验与时间的结晶，请尊重他人成果，如有不足之处还烦请补充，十分感谢！

 

**//References  -  参考文献**

(1)  社区团队  ，Minecraft wiki  ， https://zh.minecraft.wiki/w/Java%E7%89%88

(2)  lzhfdxhxm  ， CSDN  ， JDK version和class file version(Class编译版本号)对应关系-CSDN博客

(3)  @杉狐， 频道帖子   ， https://pd.qq.com/s/cqw2bzlul?shareSource=5

(4)   @SGfannr  ， 频道帖子  ，https://pd.qq.com/s/47d19raiu?shareSource=5

(5) Iris Shaders 、Sodium开发团队  ，  MC百科  ， github  Iris Shaders - MC百科|最大的Minecraft中文MOD百科 (mcmod.cn)

CaffeineMC/sodium-fabric: A Fabric mod designed to improve frame rates and reduce micro-stutter (github.com)
