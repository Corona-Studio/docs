# 好好利用日志文件!

本文将介绍如何在参与测试时或遭遇自己无法解决的问题时使用程序日志来帮助解决问题。当然，这种信息对于我们排除问题也是十分有用的。部分内容不可避免地可能存在一些隐私痕迹，但请相信我们只是需要解决问题，并会帮您保护隐私.

[[toc]]

## LauncherX日志

LauncherX日志存在于LauncherX目录下。在Windows中，该目录和LauncherX本体存在于一个文件夹里; 而对于macOS，它存在于 `用户文件夹(小房子图标)/资源库(图书馆图标)/Application Support/`之中 (可以在此目录中按下按键`L`来快速定位L开头的项目。如果您手足够快可以快速点击`La`); 而对于Linux，该目录存在于/home/documents/ 下。其中的LauncherLog文件夹中储存着启动器的日志，而如果启动过游戏则会产生GameLog以储存部分游戏日志。如下图所示:

![LauncherX目录](/img/lxguide/reportWithLogs/lx_log_folder_direction.png)

如下图所示的是LauncherX的日志文件内容。您应该将距离错误发生时最新的那个文件用于问题分析.

![LauncherX Log Example](/img/lxguide/reportWithLogs/lx_launcher_log_example.png)
...

## EventVwr日志(仅Windows)

### 什么是EventVwr?

EventVwr，即Event Viewer 事件查看器。它存在于System32目录下，名称为`eventvwr.exe`，可以通过`Win + R`快捷键「运行」窗口直接打开。它会事无巨细地记录系统中的事件，包括作为应用程序的LauncherX的部分崩溃信息.

首先，使用上述快捷键，输入eventvwr并点击运行.

![run new](/img/lxguide/reportWithLogs/win_r.png)

在新出现的`事件查看器`窗口里找到默认就在左侧的目录导航栏，如图选中 `Windows日志 - 应用程序`

![choose](/img/lxguide/reportWithLogs/expand_eventvwr_navigation.png)

在中间靠上的窗口中依次点击**红色错误图标，且来源为「.NET Runtime」的项目** ，并在下方确认是否是来自LauncherX的项目.

![figure correct item](/img/lxguide/reportWithLogs/lx_eventvwr_item.jpg)

调整下半部分的大小 (鼠标拖拽上下窗口的中间分界线) 确认是否如上图所示: Application: LauncherX.Avalonia.exe<br>并且包含许多「at」开头的错误信息。如果是，您可以将这些错误信息复制发给我们 (LXIT/邮箱等，详见: [向我们反馈](/zhCN/lxguide/report-issue))

:::tip

请记好LauncherX发生错误时的时间，这有助于快速寻找对应的事件项目。<br>如若需要刷新事件管理器展示的列表，请点击左上角菜单栏的「操作-刷新」

:::

## macOS日志

### 不是崩溃弹窗吗?

崩溃弹窗中的内容往往包含的是与系统内核深度相关的信息，一般对诊断LauncherX没有任何帮助.

### 如何获取LauncherX崩溃瞬间的日志

首先，请确认这个错误会**稳定复现**.

然后，打开终端，并找到您的LauncherX主文件 (一般应该放在**应用程序**文件夹，文件名称一般是`LauncherX.Avalonia.app`)

右键点击它并点击“显示包内容”

在包内容中，依次打开目录: Contents/MacOS/ 。这里面应该可以找到一个名为LauncherX.Avalonia的文件。这是LauncherX的入口.

将这个文件拖入终端并点击Enter，LauncherX就会伴随着终端窗口中的日志滚动而开始运行.

在这个状态下尝试复现导致崩溃的问题。如果确实崩溃了，终端窗口中应该会显示如图的内容:

![figure correct item](/img/lxguide/reportWithLogs/lx_macos_logs.png)

请将这一段**Unhandled Exception**复制给我们作为线索.

## Linux日志

使用终端运行LauncherX将会显示完整的日志。请参考上文关于**macOS日志**的内容向我们提供线索!

## 游戏日志

敬请期待。与此相关的阅读: [了解更多关于日志窗口的信息](/zhCN/lxguide/features/log-window)
