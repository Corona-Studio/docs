# 创建和配置补全器

[[toc]]

## 初始化补全器

创建一个资源补全器的方法非常简单, 您只需要使用下面的代码即可完成补全器的初始化：

```c#
var completer = new DefaultResourceCompleter
{
    MaxDegreeOfParallelism = [MAX_DEGREE_OF_PARALLELISM],
    ResourceInfoResolvers = new List<IResourceInfoResolver>
    {
        ... // 资源信息解析器的初始化
    },
    TotalRetry = [NUMBER_OF_TOTAL_RETRY],
    CheckFile = [CHECK_FILE_AFTER_DOWNLOADED],
    DownloadParts = [TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE]
};
```

::: tip

资源信息解析器的初始化相关教程请参见 [资源信息解析器](/zhCN/projbobcat/resourceCompleter/resourceInfoResolver/index) 章节

:::

在上述代码块中, 请将这些参数按照您的实际情况替换：

|                    项目                    | 数据类型    |              说明              |
|:----------------------------------------:|:--------|:----------------------------:|
|       [MAX_DEGREE_OF_PARALLELISM]        | INT     |    资源检查并行程度（同时检查游戏资源的数量）     |
|      [CHECK_FILE_AFTER_DOWNLOADED]       | BOOLEAN |  在文件下载完成后检查文件完整性（如果存在资源校检码）  |
| [TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE] | INT     |         大文件下载时的分片数量          |

::: warning

**[MAX_DEGREE_OF_PARALLELISM]** 和 **[TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE]**
的数值大小请视硬件性能酌情调整, 设置过大的数值可能会导致会导致吞吐量的下降. 

:::

## 补全游戏资源

在完成资源补全器的初始化操作后, 您只需要调用补全方法即可开始执行检查和补全操作：

在异步上下文中, 使用 **CheckAndDownloadTaskAsync** 来完成安装：

```c#
var result = await completer.CheckAndDownloadTaskAsync(); // [!code focus]

if (result.TaskStatus == TaskResultStatus.Error && (result.Value?.IsLibDownloadFailed ?? false))
{
    // 在完成补全后, 资源检查器会返回执行结果. 
    // 您可以检查 result 中的属性值来确定补全是否完成
    
    // IsLibDownloadFailed 会反映启动必须的库文件是否已经成功补全
    // 通常来说, 如果库文件的补全失败, 很有可能会导致游戏的启动失败
}
```

在同步上下文中, 使用 **CheckAndDownload** 来完成安装：

```c#
var result = completer.CheckAndDownload(); // [!code focus]
```

## 报告进度

在某些情况下, 资源补全器可能会需要数分钟的时间来完成资源的检查和下载. 
因此, 您可能需要实时向用户汇报补全器目前的进度. 

### 报告资源检查器的进度

您可以通过注册事件 **GameResourceInfoResolveStatus** 来获取实时的检查进度：

```c#
completer.GameResourceInfoResolveStatus += (_, args) => 
    { ReportProgress(args.Progress, args.Status); };
```

其中,  **args.Progress** 指示了检查器当前的百分比进度. **args.Status** 则是检查器当前进度的文字描述. 

### 报告补全器文件下载进度

您可以通过注册事件 **DownloadFileCompletedEvent** 来获取实时的检查进度：

```c#
completer.DownloadFileCompletedEvent += (sender, args) =>
{
    // sender 参数为补全器上一个成功下载的文件, 类型为 DownloadFile
    // args 返回了该文件的下载状态（成功 / 失败）, 以及文件的重试计数, 
    // 类型为 DownloadFileCompletedEventArgs
};
```

::: tip

+ [DownloadFile 类结构](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Class/Model/DownloadFile.cs)
+ [DownloadFileCompletedEventArgs 事件结构](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Event/DownloadFileCompletedEventArgs.cs)

:::

### 报告下载中的文件的进度信息

您可以通过注册事件 **DownloadFileChangedEvent** 来获取实时的检查进度：

```c#
rC.DownloadFileChangedEvent += (_, args) =>
{
    // args 返回了下载中的文件的具体信息（已接收的字节数、总共的字节数、当前速度、百分比进度）
    // 类型为 DownloadFileChangedEventArgs
};
```

::: tip

+ [DownloadFileChangedEventArgs 事件结构](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Event/DownloadFileChangedEventArgs.cs)

:::
