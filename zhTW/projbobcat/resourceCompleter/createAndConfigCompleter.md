# 建立和配置補全器

[[toc]]

## 初始化補全器

建立一個資源補全器的方法非常簡單, 您只需要使用下面的程式碼即可完成補全器的初始化：

```c#

var completer = new DefaultResourceCompleter
{
    MaxDegreeOfParallelism = [MAX_DEGREE_OF_PARALLELISM],
    ResourceInfoResolvers = new List<IResourceInfoResolver>
    {
        ... // 資源資訊解析器的初始化
    },
    TotalRetry = [NUMBER_OF_TOTAL_RETRY],
    CheckFile = [CHECK_FILE_AFTER_DOWNLOADED],
    DownloadParts = [TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE]
};

```

::: tip

資源資訊解析器的初始化相關教程請參見 [資源資訊解析器](/zhTW/projbobcat/resourceCompleter/resourceInfoResolver/index) 章節

:::

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|                    專案                    | 資料型別    |              說明              |
|:----------------------------------------:|:--------|:----------------------------:|
|       [MAX_DEGREE_OF_PARALLELISM]        | INT     |    資源檢查並行程度（同時檢查遊戲資源的數量）     |
|      [CHECK_FILE_AFTER_DOWNLOADED]       | BOOLEAN |  在檔案下載完成後檢查檔案完整性（如果存在資源校檢碼）  |
| [TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE] | INT     |         大檔案下載時的分片數量          |

::: warning

**[MAX_DEGREE_OF_PARALLELISM]** 和 **[TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE]**
的數值大小請視硬體效能酌情調整, 設定過大的數值可能會導致會導致吞吐量的下降. 

:::

## 補全遊戲資源

在完成資源補全器的初始化操作後, 您只需要呼叫補全方法即可開始執行檢查和補全操作：

在非同步上下文中, 使用 **CheckAndDownloadTaskAsync** 來完成安裝：

```c#

var result = await completer.CheckAndDownloadTaskAsync(); // [!code focus]

if (result.TaskStatus == TaskResultStatus.Error && (result.Value?.IsLibDownloadFailed ?? false))
{
    // 在完成補全後, 資源檢查器會返回執行結果. 
    // 您可以檢查 result 中的屬性值來確定補全是否完成
    
    // IsLibDownloadFailed 會反映啟動必須的庫檔案是否已經成功補全
    // 通常來說, 如果庫檔案的補全失敗, 很有可能會導致遊戲的啟動失敗
}

```

在同步上下文中, 使用 **CheckAndDownload** 來完成安裝：

```c#

var result = completer.CheckAndDownload(); // [!code focus]

```

## 報告進度

在某些情況下, 資源補全器可能會需要數分鐘的時間來完成資源的檢查和下載. 
因此, 您可能需要實時向用戶彙報補全器目前的進度. 

### 報告資源檢查器的進度

您可以透過註冊事件 **GameResourceInfoResolveStatus** 來獲取實時的檢查進度：

```c#

completer.GameResourceInfoResolveStatus += (_, args) => 
    { ReportProgress(args.Progress, args.Status); };

```

其中,  **args.Progress** 指示了檢查器當前的百分比進度. **args.Status** 則是檢查器當前進度的文字描述. 

### 報告補全器檔案下載進度

您可以透過註冊事件 **DownloadFileCompletedEvent** 來獲取實時的檢查進度：

```c#

completer.DownloadFileCompletedEvent += (sender, args) =>
{
    // sender 引數為補全器上一個成功下載的檔案, 型別為 DownloadFile
    // args 返回了該檔案的下載狀態（成功 / 失敗）, 以及檔案的重試計數, 
    // 型別為 DownloadFileCompletedEventArgs
};

```

::: tip

+ [DownloadFile 類結構](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Class/Model/DownloadFile.cs)
+ [DownloadFileCompletedEventArgs 事件結構](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Event/DownloadFileCompletedEventArgs.cs)

:::

### 報告下載中的檔案的進度資訊

您可以透過註冊事件 **DownloadFileChangedEvent** 來獲取實時的檢查進度：

```c#

rC.DownloadFileChangedEvent += (_, args) =>
{
    // args 返回了下載中的檔案的具體資訊（已接收的位元組數、總共的位元組數、當前速度、百分比進度）
    // 型別為 DownloadFileChangedEventArgs
};

```

::: tip

+ [DownloadFileChangedEventArgs 事件結構](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Event/DownloadFileChangedEventArgs.cs)

:::
