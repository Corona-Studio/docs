# 针对 Windows 系统的特殊设置

::: warning

请注意,  LauncherX  **不支持** Windows7以下版本的操作系统, 以及任意一个版本的Windows S. 

:::

目前, 您不需要进行任何额外配置即可使用  LauncherX  启动器的全部功能. 

…但是您可能会遇到一些意外, 如图所示：

![exception](/img/lxguide/perOsSetup/windows-exception.png)

类似于这样的弹窗——会要求您先在Microsoft Store下载安装“供任务执行的程序”, 或者由 SmartScreen 弹出的“警示安全风险”的提示弹窗：

请将其关闭, 并且执行以下步骤（或者允许, 跳过后续步骤并再次尝试启动 LauncherX）：

1. 右键单击您的 LauncherX 可执行文件
2. 点击`“属性”`
3. 找到如图中标记出的勾选框并将其勾选: （图片中借用`Everything`刚从网上下载时的“属性”窗口为示范. ）![checkbox.png](./../../../../public/img/lxguide/perOsSetup/checkbox.png)
4. 点击`“应用”`, 然后关闭`“属性”`窗口. 
5. 尝试启动 LauncherX . 如果仍然无法工作, 请[与我们取得联系](/zhCN/guide/contact)



::: warning

如果在尝试启动 LauncherX 时候出现了来自其他安全类软件的警告, 那么您需要允许 LauncherX 运行以使用 LauncherX . 若您对 LauncherX 持有怀疑, 可以前往[VirusTotal](https://www.virustotal.com)这种权威的线上沙盒并将您下载的 LauncherX 副本上传检测. 

:::



### 对于Windows7

我们预计将在Windows10被微软结束支持后, 原则上不再为新功能在Windows7的可用性作担保；同样的, 在此发生的一年后, 原则上不再为新功能在Windows8/8.1上的可用性作担保. 但是理论上, 只要系统框架允许, LauncherX将一直在Windows7及更高版本的Windows中可用, 只是可能不能完全按照预期工作, 以及可能需要安装额外的支持性软件和运行时. 

比如我们在测试过程中发现, LauncherX若需要在Windows7上运行, 可能需要自行安装dotNET8 SDK（或Runtime）以及某个或某些**特定的Windows更新包** (KB3118401). 

- Windows7：[Download Update for Windows 7 for x64-based Systems (KB3118401) from Official Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=51161)
- Windows8/8.1：[Download Update for Windows 8.1 for x64-based Systems (KB3118401) from Official Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=51109)

再次声明：LauncherX仅支持64位操作系统, 因而在上方的链接里, 所指向的均为适用于64位操作系统的更新安装包. 

安装后, 如果有必要的话, 请尝试重启电脑以让更新内容完全生效. 