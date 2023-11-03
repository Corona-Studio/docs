# Version information resolver

[[toc]]

The version information resolver provides parsing and verification functions for game asset files. These files are stored in
`.minecraft/versions/{GAME_VERSION}/{GAME_VERSION}.jar` directory. These files are the core files necessary to start MineCraft.

## Initialize the parser

You can initialize the initialization parser with the following code:

```c#

var resolver = new VersionInfoResolver
{
    BasePath = "[GAME_ROOT_PATH]",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES]
};

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:-----------------------:|:--------------------------------:|
| [GAME_ROOT_PATH] | The game root directory, usually the path to the .minecraft folder |
| [SEARCHED_VERSION_INFO] | VersionInfo of the version to check (obtained via game locator) |
| [CHECK_LOCAL_FILES] | Check local files (if false, skip all checks) |
