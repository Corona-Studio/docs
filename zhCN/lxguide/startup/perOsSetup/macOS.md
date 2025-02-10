# 针对 macOS 系统的特殊设置

## 一般问题

对于 macOS 用户，若您在打开 LauncherX 时候出现“已损坏”相关的错误弹窗，请执行以下操作：

- 打开 “终端.app”
- 打开您的访达窗口，并找您的LauncherX执行文件 (LauncherX.app 或 LauncherX.Avalonia.app)
- 在终端输入 `sudo xattr -d com.apple.quarantine` 或者 `sudo xattr -cr` (任选其一即可)
- 在上述指令末尾有一个空格的前提下，将您的 **LauncherX APP** 拖入到终端窗口
- 运行。终端将会要求您输入管理员账户的密码。请凭感觉如实输入，终端不会在显示区域呈现您任何的输入记录
- 在键入密码之后按下键盘上的 `Enter` 确认，执行成功不会有任何提示。
- 然后再次尝试启动 LauncherX，如果再次失败，请务必[向我们反馈](/zhCN/lxguide/report-issue)。

## 对于基于 ARM64 架构的macOS

::: warning

由于 Mojang 官方还并未正式支持 ARM64 版本的 macOS 游戏与对应的JRE下载，
因此，在使用 LauncherX 之前，您需要手动下载并安装 JRE 运行时。

:::

### 下载并安装 JRE 运行时

在这里我们将使用 [Azul JDK](https://www.azul.com/downloads/#zulu) 来演示 JRE 的安装。

在 [Azul JDK 官方网站](https://www.azul.com/downloads/#zulu) 中，稍微下拉一点即可看到 JDK 版本筛选框：

![azul-website](/img/lxguide/perOsSetup/azul-website.png)

在 **Operating System** 处选择 macOS，在 **Architecture** 处选择 **ARM 64-bit**
即可获取到所有可用的 JDK 版本。

在右侧的 **Download** 按钮中选择 `.zip` 格式的 JDK 运行时，下载后将其解压到任意一处本地文件夹。
随后在 LauncherX 中选择 **手动添加**，并选择 JDK 文件夹 **bin/** 目录下的 **java** 可执行文件即可。

有关于JRE的选择，参见:   [配置内存和GC、JavaAgent](/zhCN/lxguide/others/adjust-ram-gc-ja)