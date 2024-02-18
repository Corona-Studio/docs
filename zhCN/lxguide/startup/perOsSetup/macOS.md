# 针对 macOS 系统的特殊设置

对于 macOS 用户, 若您在打开 LauncherX 时候出现“已损坏”相关的错误弹窗，请执行以下操作：

- 打开 “终端.app”
- 打开您的访达窗口, 并找您的LauncherX执行文件 (LauncherX.app 或 LauncherX.Avalonia.app)
- 在终端输入 `sudo xattr -d com.apple.quarantine`
- 在上述指令末尾有一个空格的前提下, 将您的 **LauncherX APP** 拖入到终端窗口
- 运行. 终端将会要求您输入管理员账户的密码. 请凭感觉如实输入，终端不会在显示区域呈现您任何的输入记录
- 在键入密码之后按下键盘上的 `Enter` 确认，执行成功不会有任何提示。
- 然后再次尝试启动 LauncherX，如果再次失败，请务必[向我们反馈](/zhCN/lxguide/report-issue)。