`@useFixer`
# **报告异常&建言新策**

*创建日期 2023年11月27日，修改日期 2023年11月27日 作者：Feiron Iguista*

::: info

再次感谢您选择使用LauncherX，并且还愿意来了解如何反馈问题和提出建议！

:::

[[toc]]

## 异常反馈

您有很多方法向我们反馈。一般来说，只要能与我们取得联系，那您就可以反馈问题。但是特定的方法有助于我们整理、记录和追踪问题，所以接下来我将依照我们推荐的顺序来列出一般可用的反馈方式。`i`

另外，您或许应该在反馈前阅读关于提供错误信息的指引：[如何找到有效的错误信息和日志文件 ](/zhCN/lxguide/others/report-with-logs.md) 我们仅有在有日志文件的情况下才能更好地定位问题！`i`

### 使用Github（推荐）或Gitee上的LauncherX Issue Tracker （LXIT）

这类代码托管平台一般都有完备的Issue系统（您如果不知道这是什么的话，可以理解为：一个用于归纳问题和建议的反馈系统），我们团队中负责LauncherX者都会在您于此处提交issue时收到邮件提醒。`i`

您提交的内容，首先必须满足以下两个条件：

- 不能和其中现有的项目重复。如果您想要提交的内容已经有他人提交并且您想作出一些补充，请直接在他人已提交的issue下作出补充。
- 不能是无意义的内容。我们有群聊供您大放异想天开之彩。

然后，希望您能够遵守以下约定，以让我们能有最高效的问题处理能力：

::: warning

翻译者请注意：这一段是援引自@CodingEric已经锁定的置顶issue：[LXIT Submission Guidelines · Issue #1 · Corona-Studio/LXIT (github.com)](https://github.com/Corona-Studio/LXIT/issues/1)。这些内容同样需要进行本地化。

:::

LXIT是LauncherX的问题追踪计划。请所有参与测试的人员务必严格遵循以下规程，否则您的请求可能不会受到回应。`i`

对于问题报告，需要：

- 系统信息
- 复现步骤

对于新功能请求，需要：

- 功能描述
- 引入原因
- 如果可能，绘制用户界面示意图或者程序流程图

我们不明确规定issue的格式，您也可以同时将多个问题/功能请求写入至同一个issue中。标题不重要，但最好能简明概括问题。`i`

以下issue不被允许：

- 没有实质性内容
- 使用过激语言等其他恶意行为

感谢您的参与！ // *结束*

##### 前往Issue Tracker：

- Github：[Corona-Studio/LXIT: Issue tracker of LauncherX / LauncherX 议题追踪仓库 (github.com)](https://github.com/Corona-Studio/LXIT/issues)
- Gitee(可能不会及时回应)：[Issues · Feiron Iguista/LXIT - LauncherX Issue Tracker - Gitee.com](https://gitee.com/feironiguista/corona-lxit/issues)

------

### 通过KOOK或Discord频道(暂未创建)反馈

您可以在很多地方找到我们更新的服务器邀请。一般而言，您在加入并通过验证之后，需要在频道的列表中寻找类似于：**【反馈】LauncherX** 的文字频道。`i`

**但是！** 您必须遵守以下的格式进行反馈。与此同时，和上一条一样，无意义的、重复的内容不能提交。如果您想要补充说明已存在的问题，请找到它并点击回复。`i`

格式示范：

```
简述：界面动画卡顿
版本：（请在设置-关于 中找到出现问题的LauncherX版本。）
详细：在切换界面的时候动画总是一卡一卡的。
环境信息：macOS 13.1 arm（系统版本，系统架构。请注意：如果您在使用架构不正确的构建，则请不要发送这条反馈，除非正确的构建中也有这个问题。）  | 开启了低电量模式（补充一些您觉得可能造成问题的情况，比如您当前的内存占用率？您是否在使用第三方杀毒软件？）
复现步骤：（请使用序号标注尽可能详细的导致问题再次出现的步骤。）
```

##### 邀请链接：

- KOOK： [KOOK (kookapp.cn)](https://www.kookapp.cn/app/invite/rCdGVn)
- Discord： [暂无]

------

### (非常不推荐的方法) QQ私聊 > QQ群内反馈 > 发邮件

::: warning

不是不行，但是整理起来真的很麻烦，而且有很大概率会忘记。并且，您的建言贡献不会被记录，而是随着时间与聊天记录流过而被遗忘。

:::

在这些渠道进行反馈是效率十分低下的。虽然看起来好像能够获得我们第一时间的反应，但是整个流程是不清晰的。尤其是在群内反馈，**单线程的消息流中随时可能会被其他人的闲聊扰乱，进而进一步对问题反馈带来干扰**。不过无论如何，**有格式的内容充足的反馈总是比混乱的反馈更好**.`i`

------

### 奇怪的方法：加入我们，手动修复

您如果觉得您“一眼看出了问题所在” 并且确信自己“有能力修复”，而且打算“长期地与我们一起创造些什么”，您随时可以加入审核群！审核群的群号：**1040526762** `i`

---------------

### 另外，哪些用于反馈的信息是有用的，该如何获取有用的信息?

一般而言，截图是非常直观的信息载体。但是倘若能包含错误信息，将会更好! 比如，在「任务中心」的错误，一般会包含被折叠的错误堆栈追踪。您应该将它展开然后进行截图，这样包含的信息是很全面的。`i`

我们可能会需要您提供复现步骤或者是在您那边的LauncherX行为 (或者说，症状)，这个时候或许需要您进行屏幕录制。对于Windows 10或更新版本的用户，如果您的系统没有被精简，可以使用 XBox Game Bar的录制窗口功能 (参见: [Xbox: 了解 Windows 上的 Game Bar](https://support.xbox.com/zh-CN/help/games-apps/game-setup-and-play/get-to-know-game-bar-on-windows-10) ) ; 否则，您可以使用QQ的屏幕录制。对于macOS用户，可以使用`⌘ + ⇧ + 5` (command + shift + 5) 以进行屏幕录制。对于Linux用户或其他无法使用上述录屏工具的用户，可以下载OBS进行录制。(参见: [知乎: OBS录屏安装与简单使用方法](https://zhuanlan.zhihu.com/p/425486889))`i`

倘若游戏发生了致命错误并退出，仍然还有[保留的日志窗口或错误分析窗口](/zhCN/lxguide/features/log-window)可供分析游戏错误。那假如LauncherX发生了崩溃，一般也只有macOS会有系统级别的错误报告弹窗了，在哪里寻找错误报告呢? 请阅读: [如何找到更全面的日志文件](/zhCN/lxguide/others/report-with-logs) `i`

一般而言，我们不强求一般用户向我们详细反馈问题。但是我们希望热心市民能够提供重要且充足的错误信息，一方面帮助我们改进LauncherX，另一方面我们可以帮助您解决问题。目前，**发现并最先报告恶性bug的用户将有机会受邀加入内测** ! `i`

## 功能建议

实际上，您可以在**标明“这是一条建议”的基础上**，像反馈问题一样提交您的建议。`i`

一般而言，您需要：

- 尽可能详尽地描述您希望添加的内容
- 如果可能的话，请绘制示意图。可以在截屏的基础上圈圈点点，也可以制作框架图、甚至是原型设计（这样您或许会收到加入我们的邀请！）
- 阐述您为什么想要这些
- 最重要的：您需要在标题注明这是建议！比如：把“【建议】” 放在标题的开头。

-----------

::: tip

再次感谢您对项目的付出！

:::
