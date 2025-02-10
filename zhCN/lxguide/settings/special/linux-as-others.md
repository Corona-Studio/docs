# Linux：干掉标题栏，还我一致感

不知道诸位Linux用户是否遇到过这样的烦人场景：

本来是希望LauncherX在Linux上也是简洁美观的，结果一打开发现窗口顶部有一个可憎的标题栏，盘踞在那里，破坏着LauncherX天生的和谐感？

抑或是打开LauncherX发现没有最小化、最大化、关闭 这三个按钮？

不要急！本文将给您一个“恢复LauncherX美貌”的方法。

[[toc]]

::: info 先决条件

- 您正在使用Wayland作为显示服务器。参见：[针对 Linux 系统的特殊设置 | 日冕知识库](/zhCN/lxguide/startup/perOsSetup/linux) 的最后一段
- 您已经将LauncherX更新到最新版本

:::

接下来以Manjaro KDE Plasma Wayland为基础示范如何让Linux上的LauncherX看起来和其他平台（Windows，macOS）一样。

1。启动LauncherX，前往`设置 -> 外观 -> 基础设定`，找到`主界面按钮组可见性` 或 `窗口按钮组可见性` 设置项；
2。【自动】将根据系统环境来判断是否应该显示按钮组。这个功能较为实验性，您可以考虑将其设置为“可见”：<br>![这项设置的截图](/img/lxguide/killTitleBarLinux/an-optional-manual-operation.png)
3。如果此时LauncherX存在系统给与的标题栏，请**右键**点击它，然后点击“配置特殊应用程序设置”：<br>![这项设置的截图](/img/lxguide/killTitleBarLinux/be-sure-to-config.png)不要点击“无标题栏和边框”，因为这个设置在重启后就不会再生效了。
4。按照下图进行配置：<br>![这项设置的截图](/img/lxguide/killTitleBarLinux/config-forever.png)“外观和修正” 下方的 “无标题栏和边框” 需要先点击下方的 “添加属性” 来添加，然后如图配置。
5。点击底部的 “应用” 和 “确定”，如果需要的话，请重启LauncherX。



一切顺利的话，您的LauncherX将可以是这个样子：

![这项设置的截图](/img/lxguide/killTitleBarLinux/done.png)

开始享用吧！