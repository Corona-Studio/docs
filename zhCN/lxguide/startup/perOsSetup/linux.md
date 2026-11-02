# 针对 Linux 系统的特殊设置

[[toc]]

## 对于基于 ARM64 架构的 Linux 发行版

::: warning

由于 Mojang 官方还并未正式支持 ARM64 版本的 Linux 游戏。
因此，在使用 LauncherX 之前，您需要手动下载并安装 JRE 运行时。

:::

### 下载并安装 JRE 运行时

在这里我们将使用 [Azul JDK](https://www.azul.com/downloads/#zulu) 来演示 JRE 的安装。

在 [Azul JDK 官方网站](https://www.azul.com/downloads/#zulu) 中，稍微下拉一点即可看到 JDK 版本筛选框：

![azul-website](/img/lxguide/perOsSetup/azul-website.png)

在 **Operating System** 处选择 **Linux**，在 **Architecture** 处选择 **ARM 64-bit**
即可获取到所有可用的 JDK 版本。

在右侧的 **Download** 按钮中选择 `.tar.gz` 格式的 JDK 运行时，下载后将其解压到任意一处本地文件夹。
随后在 LauncherX 中选择 **手动添加**，并选择 JDK 文件夹 **bin/** 目录下的 **java** 可执行文件即可。

有关于JRE的选择，参见:   [配置内存和GC、JavaAgent](/zhCN/lxguide/others/adjust-ram-gc-ja)

## 如果您无法启动

您需要尝试做出以下操作：

- 打开新的终端，或者使用刚才出现的终端
- 在其中键入 `export LC_CTYPE=en_US.UTF-8`，执行
- （如果有必要的话，上述步骤可以使用管理员权限[sudo]）
- 再次尝试运行。如果失败，尝试重新登录。
- 如果再次失败，请务必依照 [这里的方法](/zhCN/lxguide/report-issue) 向我们反馈。

:::tip 这个问题可能已经在正式发布的稳定版中解决了.

:::

## 其他建议

若您需要其他更加详细的配置，或者纯小白用户，建议阅读：[Linux配置指南](/zhCN/lxguide/startup/others/Linux-Guide)

- 专项：Linux需要其他平台一样的UI外观！如何移除掉丑陋的标题栏并保持窗口按钮：[Linux：干掉标题栏，还我一致感 | 日冕知识库](/zhCN/lxguide/settings/special/linux-as-others)
