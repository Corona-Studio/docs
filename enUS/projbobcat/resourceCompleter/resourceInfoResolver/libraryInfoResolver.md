# Libraries resolver

[[toc]]

The Libraries resolver provides parsing and verification functions for game asset files. These files are stored in
In the `.minecraft/libraries` directory, these files are the runtime files necessary to start MineCraft.

## Initialize the resolver

You can initialize the Libraries resolver with the following code:

```c#

var resolver = new LibraryInfoResolver
{
    BasePath = "[GAME_ROOT_PATH]",
    ForgeUriRoot = "https://files.minecraftforge.net/maven/",
    ForgeMavenUriRoot = "https://maven.minecraftforge.net/",
    ForgeMavenOldUriRoot = "https://files.minecraftforge.net/maven/",
    FabricMavenUriRoot = "https://maven.fabricmc.net/",
    LibraryUriRoot = "https://libraries.minecraft.net/",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES]
};

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:-----------------------:|:-------------------------------:|
| [GAME_ROOT_PATH] | The game root directory, usually the path to the .minecraft folder |
| [SEARCHED_VERSION_INFO] | VersionInfo of the version to check (obtained via game locator) |
| [CHECK_LOCAL_FILES] | Check local files (if false, skip all checks) |
