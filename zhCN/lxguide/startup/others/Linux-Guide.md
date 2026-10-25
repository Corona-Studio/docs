# Linux 中 LauncherX 的配置指南  

LauncherX 是一款新生的 MC 启动器。

当它正式发布时，就成为了 Linux 上为数不多能愉快使用的MC启动器。

不过别慌，本文章就是为了讲解如何配置LauncherX而生。

接下来，让我们开始配置吧！

## 开始

前往 [Corona Studios](https://corona.studio/lx) 官方网址下载包。

解压，你会获得一个名为 `LauncherX` 的文件。

将 `LauncherX` 文件移动到你想要放置的地方。

在终端中运行此二进制文件：

```bash
./LauncherX
```

当你看到如下页面时，说明你成功运行了LauncherX  
![欢迎界面](/img/lxguide/perOsSetup/start-page.png)

## 配置

LauncherX 是一款开箱即用的启动器，在第一次启动你可能需要配置 java 路径。

在你登录好账户后，LauncherX会显示一个配置界面：
![配置文件](/img/lxguide/perOsSetup/choose-java-page.png)

**如果安装了Java，且LauncherX检测到了你的Java，那么可以跳过**

通常你可以使用包管理器安装 Java，这需要参考自己发行版的官方文档。

## 桌面化

桌面环境会从 `/usr/share/applications`、`/usr/share/applications`、`~/.local/share/applications/` 目录下读取 `desktop` 文件来识别应用程序，如需从应用程序菜单快捷启动，需要创建该文件类型的文件：

创建 LauncherX.desktop 文件，使用 Kate 或 Vim 等文本编辑软件编辑该文件，并把下面对应的部分粘贴进文件。

LauncherX启动器图标在[这里](/img/lxguide/perOsSetup/launcherx.png)，请自行下载（如不需要请将下面的Desktop中的Icon留空）  

```Desktop
[Desktop Entry]
Name=LaucherX
Version=1.0
Exec=/LauncherX所在路径/LauncherX.Avalonia
Icon=/LauncherX的启动器图标所在路径/启动器图标文件
Type=Application
Terminal=false
Categories=Minecraft;Application;
```

保存，然后在文件管理器中右键选择打开命令行，或者打开命令行并cd到desktop文件的所在目录，然后输入：  
```bash
sudo mv LauncherX.desktop ~/.local/share/applications/
```

这样，你就可以通过应用程序菜单进行打开 LauncherX 的操作了。

## 环境变量

环境变量可以控制程序对系统调度的行为，他们可以被添加在你将要启动 LauncherX 的命令行会话中，或启动 LauncherX 的 Desktop 文件中。

在命令行中添加环境变量，输入下列格式的命令：

```bash
export MY_ENV=value
```

在 Desktop 文件添加环境变量，使用以下格式：

```Desktop
[Desktop Entry]
Name=A Program
Exec=export MY_ENV=value && <command>
...
```

或

```Desktop
[Desktop Entry]
Name=A Program
MY_ENV=value
Exec=<command>
...
```

### 输入法

若无法正常输入中文，请在启动前添加环境变量：

```bash
XMODIFIERS=@im=fcitx # fcitx用户
XMODIFIERS=@im=ibus # ibus用户
```

### 双显卡

双显卡用户切换显卡渲染的行为依赖于用户态驱动的环境变量。

**对于 AMD 用户**

以下是 [Mesa 3D](https://docs.mesa3d.org/envvars.html#envvar-DRI_PRIME) 文档原文：

默认 GPU 是 Wayland/Xorg 使用的 GPU 或连接到显示器的 GPU。这个变量允许选择不同的 GPU。它适用于 OpenGL 和 Vulkan（在这种情况下，“选择”意味着该 GPU 会排在报告的物理设备列表的首位）。支持的语法有：

```bash
DRI_PRIME=N：选择第 N 个非默认 GPU（N > 0）。
DRI_PRIME=pci-0000_02_00_0：选择连接到这个 PCIe 总线的 GPU。
DRI_PRIME=vendor_id:device_id：选择第一个匹配这些 ID 的 GPU。
```

对于 Vulkan，可以在后面加上 !，这时只会将所选 GPU 暴露给应用（例如：DRI_PRIME=1!）。

**对于 NVIDIA 用户**

以下是 [NVIDIA](https://download.nvidia.com/XFree86/) 文档原文：

配置图形应用程序使用 GPU 屏幕进行渲染
要将图形应用程序配置为使用 NVIDIA GPU 屏幕进行渲染，请将环境变量 __NV_PRIME_RENDER_OFFLOAD 设置为 1。如果图形应用程序使用 Vulkan 或 EGL，这就足够了。如果图形应用程序使用 GLX，还需要将环境变量 __GLX_VENDOR_LIBRARY_NAME 设置为 nvidia，这样 GLVND 就会加载 NVIDIA 的 GLX 驱动程序。

示例：

```bash
__NV_PRIME_RENDER_OFFLOAD=1
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia
```