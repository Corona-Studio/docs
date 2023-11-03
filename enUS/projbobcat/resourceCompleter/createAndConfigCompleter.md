# Create and configure completers

[[toc]]

## Initialize the completer

The method of creating a resource completer is very simple. You only need to use the following code to complete the initialization of the completer:

```c#

var completer = new DefaultResourceCompleter
{
    MaxDegreeOfParallelism = [MAX_DEGREE_OF_PARALLELISM],
    ResourceInfoResolvers = new List<IResourceInfoResolver>
    {
        ... // Initialization of resource information resolvers
    },
    TotalRetry = [NUMBER_OF_TOTAL_RETRY],
    CheckFile = [CHECK_FILE_AFTER_DOWNLOADED],
    DownloadParts = [TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE]
};

```

::: tip

For tutorials on the initialization of the resource information resolver, please refer to the chapter [Resource Information Resolver](/enUS/projbobcat/resourceCompleter/resourceInfoResolver/index)
:::

In the above code block, please replace these parameters according to your actual situation:

| Project | Data Type | Description |
|:------------------------------------------------:|:--------|:----------------------------:|
| [MAX_DEGREE_OF_PARALLELISM] | INT | Resource check parallelism (check the number of game resources at the same time) |
| [CHECK_FILE_AFTER_DOWNLOADED] | BOOLEAN | Check file integrity after file download is complete (if resource checksum exists) |
| [TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE] | INT | Number of fragments when downloading large files |

::: warning

**[MAX_DEGREE_OF_PARALLELISM]** and **[TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE]**
Please adjust the value according to the hardware performance as appropriate. Setting a value that is too large may cause a decrease in throughput.

:::

## Complete game resources

After initializing the resource completer, you only need to call the completion method to start checking and completing operations:

In an asynchronous context, use **CheckAndDownloadTaskAsync** to complete the installation:

```c#

var result = await completer.CheckAndDownloadTaskAsync(); // [!code focus]

if (result.TaskStatus == TaskResultStatus.Error && (result.Value?.IsLibDownloadFailed ?? false))
{
     // After completing the completion, the resource inspector will return the execution results.
     // You can check the property value in result to determine whether completion is complete
    
     // IsLibDownloadFailed will reflect whether the library files necessary for startup have been successfully completed.
     // Generally speaking, if the completion of the library file fails, it is likely to cause the game to fail to start.
}

```

In a sync context, use **CheckAndDownload** to complete the installation:

```c#

var result = completer.CheckAndDownload(); // [!code focus]

```

## Report progress

In some cases, the resource completer may take several minutes to complete checking and downloading the resource.
Therefore, you may need to report the completer's current progress to the user in real time.

### Report Resource Inspector progress

You can get real-time check progress by registering the event **GameResourceInfoResolveStatus**:

```c#

completer.GameResourceInfoResolveStatus += (_, args) => 
    { ReportProgress(args.Progress, args.Status); };

```

Among them, **args.Progress** indicates the current percentage progress of the checker. **args.Status** is a text description of the current progress of the checker.

### Report completion file download progress

You can get real-time check progress by registering the event **DownloadFileCompletedEvent**:

```c#

completer.DownloadFileCompletedEvent += (sender, args) =>
{
     // The sender parameter is the last successfully downloaded file of the completer, the type is DownloadFile
     // args returns the download status of the file (success/failure), and the retry count of the file,
     // Type is DownloadFileCompletedEventArgs
};

```

::: tip

+ [DownloadFile Class Structure](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Class/Model/DownloadFile.cs)
+ [DownloadFileCompletedEventArgs Event Structure](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Event/DownloadFileCompletedEventArgs.cs)

:::

### Report progress information for files being downloaded

You can get real-time check progress by registering the event **DownloadFileChangedEvent**:

```c#

rC.DownloadFileChangedEvent += (_, args) =>
{
    // args returns the specific information of the file being downloaded (number of bytes received, total number of bytes, current speed, percentage progress)
     // Type is DownloadFileChangedEventArgs
};

```

::: tip

+ [DownloadFileChangedEventArgs Event Structure](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Event/DownloadFileChangedEventArgs.cs)

:::
