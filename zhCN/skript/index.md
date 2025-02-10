# Skript脚本语言入门指南: 准备工作

:::tip 本文将指引您构建一个编写和调试Skript的环境.

:::

[[toc]]

## 介绍

### 关于Skript

Skript(简称sk)：作为一种十分接近英语这一自然语言的脚本语言，一定程度上降低了服主们发挥创意的门槛。而总还是有的：首先你要对你的英语水平很有自信——能看懂文档的范例即可；其次就是在逻辑上能够理解之——作为脚本语言，并不是能用交际英语就可以解决一切问题；也不是Siri，和它描述需求它就能为你实现（Siri也不能）。所以，要想在Sk的世界随心徜徉，首先要记住，你如何与sk交流，Skript(的解释器)才能 “听懂” (实际上所有编程语言都是这样)。

与此同时，Minecraft的各个概念（实体、区块、规则之类）还有一些计算机基础知识与名词（string字符串、integer整数之类，不过skript应该说是弱类型语言吧? 有最基本的区分: string对应text，player是玩家类型，number默认是long但是可以直接无感地变成double，很多类型都可以通过parse as语法进行转换。）也是必不可少的，但是由于其容易通过搜索引擎了解，故不在此赘述。

### 安装

首先需要一个基于Bukkit的Minecraft服务端，并且已经初始化。然后前往[SkriptLang Github Release](https://github.com/SkriptLang/Skript/releases)下载最新版Skript插件构建，将下载好的.jar文件放置在`~<server_root>/plugins/`下，然后重新启动服务端。在将插件放置在此位置并启动服务端后，Skript将在plugins目录下创建自己的工作目录`skript`。

使用服务端命令`/sk info` 来确认Skript是否已安装，以及版本信息和附属插件版本信息.

### Skript文件

Skript脚本的文件存放在它的**工作目录** 的子文件夹`scripts` 下，内容是纯文本。所有Skript脚本文件它的文件扩展名是`.sk`，手动在文件名的最前方添加符号`-`将会使其内容不被加载(与命令`/sk disable <script_name>.Skript`是同样的效果) 

在这个文件夹下新建文本文档并修改扩展名为`.sk`以创建你的第一个Skript脚本文件.



## 搭建调试环境

:::tip 为了更好地编写和调试脚本，建议自行搭建一个独立于运营服务端的环境.

:::

在最开始，请先自行寻找一个地方创建文件夹，命名最好让自己看得懂。以后我们称呼这个文件夹为「Skript 目录」

### 编辑器

我们推荐使用 **Visual Studio Code** 来编写Skript。但是实际上，可以用任意一个文本文件编辑器来编辑Skript脚本。只是根据笔者经验，VSCode是最方便的.

前往[VSCode 下载页面](https://code.visualstudio.com/download) 选择适合自己电脑的版本下载并安装。安装完成后打开VSCode，在左侧找到一个「四个方块」组成的图标 (有点类似&#xe74c; )，鼠标悬浮后若提示「扩展(Extension)」，则点击它。

在它的搜索框内搜索「Skript + SkriptInsight」，选择作者为「NickAc」的项目，点击「安装(Install)」

按需重启VSCode.

找到先前创建的Skript目录，右键点击它，点击“在VSCode打开” (Windows11目前貌似要先点击「显示更多选项」)，现在你的VSCode就已经将 Skript 目录作为一个项目打开了.

点击VSC窗口右上角的「上白下黑」的按钮 (切换面板，图标类似于&#xe745;)，以打开下方命令行面板。这个面板中命令行的起始点即为Skript目录.

### 用于调试脚本的服务端

在Skript 目录中放置一个Bukkit/Spigot/Paper/… 服务端，然后在上文中打开的命令行面板中操作控制台，像正常开服一样将其初始化.

初始化后，为其安装 **兼容的** Skript。

在VSC左侧的竖列图标中，确保选中了从上往下数的第一个图标 (资源管理器)，然后选择到scripts文件夹。使用「新建文件…」按钮(图标类似 &#xf56e; 但是右下角有个+符号) 在当前选中的目录下创建新文件.

运行服务端命令 `/sk help` 来查看skript帮助。

## 其他

可以创建一个新的脚本然后粘贴以下内容来简化执行`/sk reload scripts` 命令。

`````skript
command /skr:
		trigger:
				if sender has permission "admin":
						broadcast "脚本将在3秒内开始重载，可能带来卡顿" # 可选，用于提示其他玩家；如果在专用测试环境中调试，则可删除此行.
						wait 3 second # 配合上一条.
						make sender execute command "/sk reload scripts"
						broadcast "完成重载"
						stop
`````

这样就可以使用新注册的命令`/skr`来重载所有脚本了。





