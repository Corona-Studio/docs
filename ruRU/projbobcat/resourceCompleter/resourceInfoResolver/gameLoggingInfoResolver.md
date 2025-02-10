# log4j 日志格式化组件解析器

[[toc]]

log4j 日志格式化组件解析器提供了对游戏资产文件的解析和验证功能, 这些文件存放在
`.minecraft/logging` 目录下

使用该资源解析器可以使 MineCraft 输出经过 log4j 格式化后的日志内容, 类似于如下的内容：

```xml

<log4j:Event logger="ekb" timestamp="1676012129" level="INFO" thread="Render thread">
    <log4j:Message>
        <![CDATA[Created: 512x512x4 minecraft:textures/atlas/shulker_boxes.png-atlas]]>
    </log4j:Message>
</log4j:Event>

```

## 初始化解析器

你可以通过下面的代码来初始化 log4j 日志格式化组件解析器：

```c#

var resolver = new GameLoggingInfoResolver
{
    BasePath = "[GAME_ROOT_PATH]",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES]
};

```

在上述代码块中, 请将这些参数按照您的实际情况替换：

|           项目            |               说明                |
|:-----------------------:|:-------------------------------:|
|    [GAME_ROOT_PATH]     |   游戏根目录, 通常为 .minecraft 文件夹的路径   |
| [SEARCHED_VERSION_INFO] | 要检查的版本的 VersionInfo （通过游戏定位器获得） |
|   [CHECK_LOCAL_FILES]   |    检查本地文件（如果为 false, 则跳过所有检查）    |
