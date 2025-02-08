# 提交本地化翻译贡献

::: tip 感谢您的无私工作！

本文将以LauncherX i18n提交为例, 通过 `Github Desktop` 提交贡献内容. 

简而述之, 大体的步骤为：确认提交贡献的项目仓库-fork-提交修改-提交Pull Request-等待合并

:::

[[toc]]

## 准备工作

::: info 先决条件

- 您持有一个Github账户,  且具备连接到Github的方法与能力
- 您当然可以是个Git新手. 或许您可以去查看：[协作处理拉取请求 - GitHub 文档](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests) 来了解一般的工作模式
- 您下载了Github Desktop并且在上面登陆了您的Github账户

:::

与其他我们公开征集贡献的仓库一样, 您需要先登陆好您的Github账户, 然后打开[Corona-Studio/LauncherX-i18n: The i18n project for LauncherX (github.com)](https://github.com/Corona-Studio/LauncherX-i18n), 找到【fork】按键, 点击它. 

接下来可以按照默认的设置, 直接点击【Create Fork】进行下一步. 一切正常的话, 您此时应该会被导航到您名下的fork仓库. 您的提交都需要先暂存在这里. 

## 开始操作

### 1. 提交到名下的fork

1. 在您名下的fork仓库页面, 点击【Code】按钮, 它一般具有特别的颜色

2. 点击【Open in Github Desktop】. 如果浏览器询问您是否允许此网站打开Github Desktop, 请允许

3. 确保连接可用性, 然后在您方便使用的路径下, 点击【Clone】然后等待完成

4. 完成后, 您可以通过诸如Visual Studio Code之类的编辑器进行编辑. 变更产生后, 您将可以将内容提交到您的fork仓库. 

   ![githubDesktopUI](/img/general/misc/ghdesktop-example-ui.png)

   左侧您可以看到作出更改的文件, 左下方的第一个输入框是必填的, 这里概述您此次提交做了什么；而第二个可用于对第一个输入框的补充说明. 完成了这方面的填写, 即可点击下方的【Commit to xxx】提交更改. 

5. 此时, 如图中显示为 “Pull origin” 的按钮处会变为 “Push origin”, 点击它将可以把本地仓库的变更同步到Github上托管的您名下的fork仓库. 

### 2. 将名下的fork仓库内容提交到我们的上游仓库

在您的变更提交到您名下的fork仓库之后, 还没完：

1. 打开我们的上游仓库（在您名下的仓库会显示 “**forked from xxx**”, 点击这个链接可以前往我们的上游仓库）
2. 点击【Pull Requests】（这个按钮和Code、Issues等标签类按钮同级）
3. 点击【New pull request】
4. 点击【compare across forks】
5. 点击切换【head repository: 】中的内容, 切换到您名下的fork仓库, 然后点击【Create pull request】
6. 填写简要的说明[1]和详细的说明[2]（如有必要）, 然后点击【Create pull request】
7. 等待我们进行审核、编辑和合并即可！在通过之后, 您会收到邮件提醒（取决于您的Github设置）

### 3. 同步我们的上游仓库

我们的上游仓库时不时会有内容更新, 这可能来自管理员, 也可能来自其他贡献者. 

#### a. 同步仓库

1. 在浏览器中打开您名下的fork仓库
2. 点击Sync with upstream（或其他文字链接, 类似于此）
3. 请注意：这可能导致您的未提交修改内容丢失. 但是好在Git会保存您的历史记录. 
4. 在Github Desktop中, 点击Fetch Origin以从Github获取仓库最新信息. 如果有更新变更, 此处会变为【Pull origin】按钮可供点击. 
5. 点击【Pull origin】以将仓库的新变更拉取到本地. 

#### b. 处理冲突

来自各方的修改都可能引发冲突, 即便绝大多数情况下冲突都由我们来辨识和处理解决. 但是当您遇到冲突, 请按照Github Desktop的提示和冲突检查器找到冲突的行. 一般而言, 冲突与原文可能以以下格式展示：

```text
>>>>>>>> 
冲突, 来自上游
========
原文, 您的内容
<<<<<<<<

// 请以实际情况为准
```

您需要自行确认哪些内容是您需要保留的. 将不需要的内容包括**冲突标识符**（）一并删除后, 在Github Desktop中mark as resolved（或等待它自行检查）

参考文章：[在 GitHub 上解决合并冲突 - GitHub 文档](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github)



## 跋&注意事项

- 测试您的语言文档, 参见：[我想贡献多语言了！ | 日冕知识库](/zhCN/lxguide/features/tricks/debug-lang-file)
- 您可能在此期间遇到各种问题. 欢迎来到我们任何一个交流群中就您遇到的问题提问, 但是我们更希望您可以自己先去使用搜索引擎或聚合类AI查询相关的解决方法. 

- ::: warning 不要修改别人的内容

  您应该专心于自己主要贡献的部分. 如果您认为其他人的什么地方写的有问题, 可以先通过issue提交您的意见和建议. 

  :::