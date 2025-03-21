# 合理分配游戏内存、选择GC、配置JavaAgent

使用LauncherX启动，游戏即便不进行特殊配置也能通过一系列默认配置达到通常标准和环境下很优质的性能。但是，由于用户电脑环境变数过多，有时候您或许需要学会对您的游戏进行一些额外配置来让您尽可能地发挥电脑的性能.

:::warning 本文可能有较多纰漏

希望热心市民能够找到后反馈到邮箱: frigeso@icloud.com

:::

[[toc]]

## 分配内存

内存是程序运行的众多关键之一，分配足够的内存将有助于您的游戏流畅稳定地运行。此处介绍的内存分配仅包含计算机基本的运行内存，而不包括其他的缓存、虚拟内存或GPU内存(显存).

一般而言，内存分配与许多因素相关，比如: 游戏版本、资源包规格、JRE、模组和模组加载器。与此同时也受到一系列外部因素影响，比如: 硬件的装机内存量、启动游戏时尚在运行的程序的内存总用量、硬件内存性能等.

接下来将详细分析这些因素，希望能对您有所帮助.

### 游戏因素

#### 1) 游戏版本

对于不同版本的原版游戏，基础建议内存各不相同.:<br>`< 1.15`: 建议512MB或更高<br>`1.15 ~ 1.17`: 建议1024MB或更高<br>`1.17 +`: 建议2048MB或更高 

#### 2) 资源包规格

一般而言，根据贴图的分辨率不同(16x 32x 64x之类)，内存需求就会不同，因为贴图材质需要被加载到内存中，所以越大的材质加载到内存中，需要的分配的内存总量越大。光影包也是如此.

#### 3) JRE

一般来说，来自不同组织/公司的不同JRE构建之间都有所差异，因为它们都是为了不同的应用环境优化的，但是整体差别并不会太大。(仍然可能存在JRE不同导致的兼容性问题，但是出现在mod客户端的可能性更大) 不同JRE可能提供不同的优化特性，这些特性里有的功能可能需要提高LauncherX权限(管理员或超级用户)

比如，OpenJ9 JRE使用OpenJ9 JVM，整体占用偏低，调度相对保守，因而游戏可能无法完全利用好已分配的大额内存。但是对于硬件性能较差的电脑，可能可以保证游戏稳定运行.

Azul Zulu和Alibaba Dragonwell是面向云计算的JDK构建，因而在应对高并发任务时可以发挥相对更好的性能.

更详细的测试，参见: 蒸汽通量 在 知乎 的文章: [几张性能对比，让你明白高版本 Java 更适合 Minecraft](https://zhuanlan.zhihu.com/p/350543981)

当然，如果您实在搞不明白自己需要选择什么样的JRE，以下是我们的建议:

:::tip OpenJDK - OracleJDK(或Oracle官网下载的Java) - Azul Zulu

越靠左越稳定，越靠右性能优化越好。当然，这里列举的JRE都还挺稳定的，细微差别可能需要您亲自感受.

参考本站指南：[下载合适的Java运行时 | 日冕知识库](/zhCN/lxguide/others/download-jre)

:::

#### 4) 模组和加载器

##### a) 加载器

加载器，比如Forge、Fabric，在对游戏进程进行混入等操作时均会耗费内存。分配给游戏的内存越多，加载越流畅，直到达到加载的性能瓶颈。

与此同时，加载器维护的接口也大有不同，因此不同的加载器也有性能区别。一般认为，Fabric比Forge更加轻量级，占用也会相应更少.

##### b) 内容模组

内容模组由于向游戏中添加了新内容，会占用更多内存。具体而言，应该视单个模组中会注册和创建的方块、物品、实体量而定。与此同时，模组越多，需要的内存越多.

##### c) 优化模组

这是模组中的特例。有一些内存优化模组将会提高内存利用率或优化模组内存调度，但也可能带来一些意外的游戏行为，甚至可能与一些模组不兼容。

关于推荐的优化模组，参见此MC模组百科链接(搜索结果): [MCMOD搜索: 内存优化](https://search.mcmod.cn/s?key=%E5%86%85%E5%AD%98%E4%BC%98%E5%8C%96&filter=%26mold%3D1)

#### 5) 其他

除此之外，游戏世界中的每个区块(包含方块的x&y轴16*16大小区域)、每个实体(生物、掉落物和其他有模型的存在)都是被实际写入到内存的。一般而言，可以通过调整渲染距离来减少一次加载的区块数量来降低游戏占用。(本地游戏中通过加载器特性进行加载的区块可能也会被写入到内存) 但是如果您的可用容量足够，应该为游戏尽可能提高内存量以满足更多的区块同时加载，并且也要为区块加载和卸载之间的阶段、垃圾回收器尚未工作的时刻预留好内存以供更流畅的区块加载。在内存中，一个区块占用的空间大约是40KB.

在较新版本中(大约是1.17)添加了模拟距离调整。模拟距离是控制玩家周围生物被触发的距离的参数。越大的模拟距离，会导致越远的加载区块中的生物被加载，从而消耗更多内存。请自行在游戏中感受和测试，因为对于不同的生物(之类的实体) 需要消耗的内存量不等。并且，生物AI还会额外消耗CPU资源.

### 外部因素

#### 1) 硬件装机量

这是十分显而易见的! 您的电脑倘若只有少量的硬件内存，可分配给游戏的就不得不变少。倘若您的电脑只有4GB运行内存，那即便您在LauncherX设置为8GB也是没用的，还有可能导致崩溃、甚至是有资料丢失的风险.

#### 2) 其他程序占用

在游戏进行的过程中，其他程序(包括LauncherX，但是LauncherX在后台占用极低.) 同样会占用您的硬件内存。这里面包括您的操作系统维持运行的必要消耗，也包括您打开的其他应用程序的消耗.

#### 3) 硬件内存性能

可以通俗地理解为内存频率对需要分配的内存量之影响。粗略来看，内存规格代数会体现出系列内存速度不同，但是实际远比“频率”这一单一指标要复杂。对于游戏而言，内存条频率越高，读写速度越快，则在执行交换(比如卸载区块同时加载区块)的时候就能更快地完成内存回收。不过，这一切实际上影响很小。除非您的内存优化已经到了锱铢必较的地步，那么对于越低频率的内存，建议给游戏分配的内存越多，但也没多到哪去.

### 总结

玩得卡顿了就加内存，物理内存不够加就关闭一些其他无关程序，不然就多装几条内存吧.<br>或者，您希望了解更多关于**垃圾回收**的内容，以期进一步优化内存利用? 请接着往下看吧!

## 选择垃圾回收器(GC)

垃圾回收器(Garbage Collector，GC) 是专用于回收被占用内存的工具，依照不同的策略将不同类型的对象实例回收以释放内存资源。对于Minecraft来说，这是不可或缺的。一般而言，对于特定的游戏配置，需要尝试和调校来找出最合适的GC配置。并且，在JVM中运行的程序缺少可用内存情况下， GC 性能更为显著.

在LauncherX中可以通过选择框选择GC。目前可选的有: Disable，G1GC，SerialGC，ParallelGC，CmsGC，ZGC.

接下来将介绍这些选项，同时将其可能适合的场景列出.

- Disable: 禁用GC，非常不建议。这将会让游戏的内存回收机制回到最被动的阶段，可能导致您玩着玩着就卡死闪退。若您需要尝试没在此列出的GC(Shenandoah)，可以选择此项然后在Java虚拟机高级参数中填写对应参数.
- G1GC: [并行+并发] <del>以垃圾回收为首要任务的垃圾回收器</del>默认选择的单核GC，对游戏而言适用性最广，不知道选哪个就选它.
- SerialGC: [串行] 单核GC。只建议在内存量较少的环境下使用，甚至可以说**不建议用于1.6.4以后的版本**?  *LauncherX的调用参数并非Serial Old* 。
- ParallelGC: [并行] 多核优化的GC。可以避免在运行垃圾回收时引发的游戏线程阻塞，但是可能需要分配较多内存.
- CmsGC: [并发] 全称**Mostly Concurrenct Mark and Sweep Garbage Collector**，在Java14开始被删除。它的优势是工作时**运作过程短暂、延迟低，多核优化**，在游戏期间对计算性能影响较小。但是回收可能不及时，建议搭配较大内存，可能更适合用于多mod客户端.
- ZGC: [?] 对于需要处理突发任务较多的场景(比如多人联机的房主或服务器端)，此GC可有更好的性能。但是，这个GC只在Java15或更高版本JRE可用(在Java11推出为实验功能)。其他方面与G1GC相似.



## 配置JavaAgent

:::danger 危险!

您首先需要确保您即将使用的JavaAgent包来自可信任的源。比如，从可信任的团队官网通过加密链接下载的、已经由您亲自进行本地校对的软件包。您必须知道您这么做的后果，以及后果是否符合您的预期。一般而言，加载JavaAgent可能会被在线游戏服务器视为作弊，请确认您行为的合规性。除此之外，因加载JavaAgent导致的 [任何] 游戏行为异常、网络攻击或信息泄露等问题均不由我们负责，LauncherX不具备检测和拦截危险行为的能力。因此，若要通过JavaAgent来优化游戏，请 [一定要自行确保安全性]，否则不要使用JavaAgent!

:::

### 简介

JavaAgent本身是使用了用于更高级的Java虚拟机内调试的一套接口的软件包，本身是旨在便于在Java程序运行时进行调试，也可用于注入软件进程以进行篡改、优化、性能分析等一系列操作。简而言之，Java Agent可以理解为是一种特殊的Java程序，是在Java5以后Instrumentation接口的客户端。

在 [设置-全局游戏设置-启动设置(下半部分比较偏高级设置的部分)-JavaAgent设置]处，存在两个并列的输入框: 前者输入JavaAgent软件包的路径，后者输入JavaAgent的参数.

接下来，我们将结合Github项目: [**Minecraft Threadpool Agent**](https://github.com/saharNooby/minecraft-thread-pool-agent) 来介绍使用方法。但是请注意，并非是我们推荐使用它，任何使用JavaAgent的行为导致的意外均不由我们负责。

根据该项目的描述，这是一个用于扩大游戏可用线程池的JA，可用于客户端和服务器端，主要面对1.13之后发布的游戏版本的相关优化，用于减少CPU占用和提升启动性能、减少加载时间。根据介绍，它的作用在同时启动多个客户端/服务端时候最明显。作者表示，此JA目前 **并未在单人游戏中测试，但是在多人游戏中测试无碍，且理论上不会对单人游戏造成负面影响** 。详见该项目的README.

### 用法:

1) 在此仓库的Release中下载构建 (或使用源码自行构建)
2) 在LauncherX中: 
   1. 在Java虚拟机高级参数中添加: `-DminecraftThreadPoolSize=2 -DminecraftBootstrapThreadPoolSize=1 -DminecraftMainThreadPoolSize=2`
   2. 在JavaAgent参数中添加: [第一个输入框] `<您的下载路径目录>/minecraft-thread-pool-agent-1.0.0-shaded.jar` ; [第二个输入框] 空 (仅在JavaAgent的提供者/开发者要求您添加额外参数时再在此填入内容)
   3. 请注意: 上文中的`/`是您的系统路径分隔符，视您的操作系统而定: 如果是Windows，且不是日语/韩语的环境/区域，您应该使用`\`，否则您应该使用`¥`; 如果是macOS或Linux，使用`/`。对于较现代的Windows，可能接受`/`符号分隔，但是需要您保证 **整个路径都使用同样的分隔符** .
3) 确认LauncherX生成的拼接预览无误，启动游戏测试.
4) 需要注意的是，您可以直接按照README中的提示将参数加入到Java虚拟机高级参数中，但是使用LauncherX拼接可以避免一些难以察觉的输入失误.

:::warning 我们强烈反对一切作弊行为

:::

## 勘误

暂无。

上次更新: 2024-03-17



## 参考资料

按引用顺序排列

- -
- cncounter，GC参考手册-Java版 | GC参考手册，cncounter，2020年6月23日，https://www.bookstack.cn/read/gc-handbook/
- 壹氿，终于把CMS垃圾收集器搞懂了~ | :JVM，掘金，2021年10月28日，https://juejin.cn/post/7023935314703941663
- “非著名程序员杨某”，一文讲透Java Agent是什么玩意？能干啥？怎么用？| : Java开发技巧系列，知乎，2023年6月17日，https://zhuanlan.zhihu.com/p/636603910
- saharNooby，minecraft-thread-pool-agent | Java agent that allows to modify Minecraft client/server thread pool size，GitHub，Oct 1。2020，https://github.com/saharNooby/minecraft-thread-pool-agent