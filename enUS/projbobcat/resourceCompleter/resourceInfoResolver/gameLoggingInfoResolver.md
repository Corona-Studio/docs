# log4j log formatting component resolver

[[toc]]

The log4j log formatting component resolver provides parsing and verification functions for game asset files. These files are stored in
`.minecraft/logging` directory

Using this resource resolver allows MineCraft to output log content formatted by log4j, similar to the following:

```xml

<log4j:Event logger="ekb" timestamp="1676012129" level="INFO" thread="Render thread">
    <log4j:Message>
        <![CDATA[Created: 512x512x4 minecraft:textures/atlas/shulker_boxes.png-atlas]]>
    </log4j:Message>
</log4j:Event>

```

## Initialize Resolver

You can initialize the log4j log formatting component resolver with the following code:

```c#

var resolver = new GameLoggingInfoResolver
{
    BasePath = "[GAME_ROOT_PATH]",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES]
};

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:-----------------------:|:-----------------------------:|
| [GAME_ROOT_PATH] | The game root directory, usually the path to the **.minecraft** folder |
| [SEARCHED_VERSION_INFO] | VersionInfo of the version to check (obtained via game locator) |
| [CHECK_LOCAL_FILES] | Check local files (if false, skip all checks) |
