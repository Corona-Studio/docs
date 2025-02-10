# log4j 日誌格式化元件解析器

[[toc]]

log4j 日誌格式化元件解析器提供了對遊戲資產檔案的解析和驗證功能, 這些檔案存放在
`.minecraft/logging` 目錄下

使用該資源解析器可以使 MineCraft 輸出經過 log4j 格式化後的日誌內容, 類似於如下的內容：

```xml

<log4j:Event logger="ekb" timestamp="1676012129" level="INFO" thread="Render thread">
    <log4j:Message>
        <![CDATA[Created: 512x512x4 minecraft:textures/atlas/shulker_boxes.png-atlas]]>
    </log4j:Message>
</log4j:Event>

```

## 初始化解析器

你可以透過下面的程式碼來初始化 log4j 日誌格式化元件解析器：

```c#

var resolver = new GameLoggingInfoResolver
{
    BasePath = "[GAME_ROOT_PATH]",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES]
};

```

在上述程式碼塊中, 請將這些引數按照您的實際情況替換：

|           專案            |               說明                |
|:-----------------------:|:-------------------------------:|
|    [GAME_ROOT_PATH]     |   遊戲根目錄, 通常為 .minecraft 資料夾的路徑   |
| [SEARCHED_VERSION_INFO] | 要檢查的版本的 VersionInfo （透過遊戲定位器獲得） |
|   [CHECK_LOCAL_FILES]   |    檢查本地檔案（如果為 false, 則跳過所有檢查）    |
