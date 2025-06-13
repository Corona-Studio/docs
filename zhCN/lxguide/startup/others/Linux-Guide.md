# Linux中LauncherX的配置指南  

LauncherX是一款新生的MC启动器  
当它正式发布时，就成为了Linux上为数不多能愉快使用的MC启动器  
不过别慌，本文章就是为了讲解如何配置LauncherX而生    
接下来，让我们开始配置吧！  

## 如何下载？  
先更新系统
然后前往[Corona Studios](https://corona.studio/lx)官方网址下载  
下载完的文件应该叫"net9.0-linux.linux-x64.zip"  
解压，你会获得一个名为“LauncherX.Avalonia"的文件  

## 如何打开？  
将LauncherX.Avalonia文件移动到你想要放置的地方  
这里我建议放在/home下的一个不经常修改文件的文件夹，以便后面的工作易于进行，至于是什么嘛，猜去吧    
然后在文件管理器中右键选择打开命令行，或者打开命令行并cd到lx的文件所在目录  
输入：  

```bash
./LauncherX.Avalonia
```
>认为每次都要这么启动很麻烦？那快点往下看吧

当你看到如下页面时，说明你成功运行了LauncherX  
![欢迎界面](/img/lxguide/perOsSetup/start-page.png)

## 如何配置？  
接下来，配置你需要的外观，登录你需要登录的账户，未登录不可进入  
>:red_circle:**请注意: 目前Linux稳定版有一个右键点击账户就会闪退的Bug，内测版已经修复，但截止于2025.06.09前稳定版暂未修复**  

接下来就是要玩MC最重要的部分了：  
配置JVM运行环境  
在你登录好账户后，LauncherX会显示一个配置界面：
![配置文件](/img/lxguide/perOsSetup/choose-java-page.png)

这里有两种下载Java并配置的方法

**如果安装了Java，且LauncherX检测到了你的Java，那么可以跳过**

### 一.使用包管理器安装
```bash
sudo pacman -Sy jdk-openjdk //Arch系，Pacman会为你配置好一切
sudo dnf install java-latest-openjdk.x86_64 //RPM系，需要配置环境变量
sudo apt install openjdk-21-jdk //Deb系，需要较新系统，较老的请使用第二种方法
```
>这里我建议用较新版Java，如果想要游玩老版本MC，或想要稳定，请选择其他Jdk包
>如若无法使用上面的命令下载，请使用第二种方法

RPM系和DEB系下载完后请看这里：  
**配置Java环境变量：**  
将下面的环境变量加入.bashrc或.zshrc等shell配置文件  
```bashrc
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk
export PATH=$JAVA_HOME/bin:$PATH
export JAVA_TOOL_OPTIONS="-Dfile.encoding=UTF-8"
```
>其中java-21-openjdk可修改为自己安装的JDK版本

然后重启电脑或在终端中运行：
```bash
source ~/.bashrc //bash用户运行这个
source ~/.zshrc //zsh用户运行这个
```

### 二.使用LauncherX下载
在全局游戏设置界面，点击下载Java，选择你需要的版本，点击下载  
LauncherX会用最快的速度为你下载并配置好Java  
当你配置完JVM运行环境时，选择是否遥测之后，如果显示出如下界面，那你就就把基本准备工作做完了  
![主页](/img/lxguide/perOsSetup/launcherx-main-page.png)

>Tips点不掉吗？重启启动器就消失了

## 现在就可以下载游戏啦
>若在下载阶段出现问题，任务中心报错
那么点击设置，选择网络，将多重源补全关闭，将mojang官方服务器更换为TapXapi

**刚才说的工作马上就来**

## 创建.desktop文件（按需）
创建LauncherX.desktop文件，使用Kate或Vim等文本编辑软件编辑该文件，并把下面对应的部分粘贴进文件  
（文件中的路径需要填写自己的LauncherX所在路径和图片文件所在路径）  
LauncherX启动器图标在[这里](/img/lxguide/perOsSetup/launcherx.png)，请自行下载（如不需要请将下面的Desktop中的Icon留空）  
**悠闲的Intel显卡和AMD显卡用户：**

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
**被万恶的NVIDIA显卡毒害的用户（NVIDIA Fuck YOU！！）：**
```Desktop
[Desktop Entry]
Name=LaucherX
Version=1.0
__NV_PRIME_RENDER_OFFLOAD=1
__GLX_VENDOR_LIBRARY_NAME=nvidia
Exec=/LauncherX所在路径/LauncherX.Avalonia
Icon=/LauncherX的启动器图标所在路径/启动器图标文件
Type=Application
Terminal=false
Categories=Minecraft;Application;
```
保存，然后在文件管理器中右键选择打开命令行，或者打开命令行并cd到desktop文件的所在目录，然后输入：  
```bash
sudo mv LauncherX.desktop /usr/share/applications
```
>**温馨提醒：LauncherX在Linux系统下是手动覆盖更新的，请每次更新都放在同一个文件夹，不然会导致Desktop文件失效**

这样，你就可以通过应用程序菜单进行打开LauncherX的操作了
**到这里，你的LauncherX启动器已经可以正常使用了**

## 在wayland中使用LauncherX，并需要使用输入法？
如果配置了全局环境变量，请略过  
创建完**LauncherX.desktop**文件后，在其中的Exec行加入  

```Desktop
env XMODIFIERS=@im=fcitx //fcitx用户
env XMODIFIERS=@im=ibus //ibus用户
```
>请务必加空格后再复制

## 使用AUR安装LauncherX（Arch Linux用户可选）
除了手动安装，你也可以选择AUR仓库进行安装
```bash
paru -Sy launcherx-bin
```
（不过我本人并不建议使用AUR包，更新比官方更新稍慢，不易修复已知Bug）
## 结语
我个人觉得在Linux发行版中使用LauncherX十分容易  
所以，愉快的去游戏吧！  
