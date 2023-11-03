# LiteLoader Installer

[[toc]]

::: tip

Please note that ProjBobcat only implements the LiteLoader automated installation process. You still need to implement the search, download, and save process of the LiteLoader installation package yourself.

:::

::: warning

LiteLoader, as the early Minecraft mod system, has lacked maintenance and follow-up support for a long time.
Therefore, we may remove support for LiteLoader installation in future release.

:::

## Resources

- [LiteLoader Versions API](https://dl.liteloader.com/versions/versions.json)
- [BMCLAPI Development documentation](https://bmclapidoc.bangbang93.com/)

## Get LiteLoader Download Version Model

Because ProjBobcat's LiteLoader installer requires you to provide download information from the LiteLoader when initializing the installer.
Therefore, we will briefly describe here how to obtain this information based on a given MineCraft version.

::: info

In this example, we'll be using Minecraft 1.7.10 to show you how to get it.

:::

::: warning

Since LiteLoader officially does not provide public API documentation. Therefore, in this process, we need to use a third-party mirror source to complete data acquisition.
Here, we use [BMCLAPI](https://bmclapidoc.bangbang93.com/) to obtain relevant version information.

:::

First, you need to send an **HTTP GET** request to [https://bmclapi2.bangbang93.com/liteloader/list?mcversion=[MC_VERSION]](https://bmclapi2.bangbang93.com/liteloader/list?mcversion=1.7.10).
Replace `[MC_VERSION]` with the Minecraft version you want to install. Here we will use 1.7.10 for demostration.

You will see something similar to the following returned:

```json

{
  "_id": "59685511433f993503c1c879",
  "mcversion": "1.7.10",
  "build": {
    "tweakClass": "com.mumfrey.liteloader.launch.LiteLoaderTweaker",
    "libraries": [...],
    "stream": "RELEASE",
    "file": "liteloader-1.7.10.jar",
    "version": "1.7.10_04",
    "md5": "63ada46e033d0cb6782bada09ad5ca4e",
    "timestamp": "1414368553",
    "srcJar": "liteloader-1.7.10_04-mcpnames-sources.jar",
    "mcpJar": "liteloader-1.7.10_04-mcpnames.jar"
  },
  "hash": "63ada46e033d0cb6782bada09ad5ca4e",
  "type": "RELEASE",
  "version": "1.7.10_04",
  "__v": 0
}

```

BMCLAPI will return a JSON object, and deserializing the object into the ProjBobcat type is the `LiteLoaderDownloadVersionModel` we need.

#### Convert JSON return to ProjBobcat type

If you are using [JSON.NET](https://www.newtonsoft.com/json)(Newtonsoft.JSON) in your project.
You can use code similar to the following to convert the server response you get into the corresponding ProjBobcat type:

```c#

// Requesting data from BMCLAPI (example, not actual code)
...
var responseJson = await res.Content.ReadAsStringAsync();

// Convert JSON response to ProjBobcat type // [!code focus]
var versionModel = JsonConvert.DeserializeObject<LiteLoaderDownloadVersionModel>(responseJson); // [!code focus]

```

This **versionModel** is the `LiteLoaderDownloadVersionMode` required by the Fabric installer.

## Get RawVersionModel

When initializing the LiteLoader installer, the installer needs to use the raw JSON content of the MineCraft game version corresponding to the LiteLoader.
That is, the contents of the `[ROOT_PATH]/versions/[MC_VERSION]/[MC_VERSION].json` file.

If you have installed the original game corresponding to LiteLoader, you can get the `RawVersionModel` through the following code:

```c#

// Get the path to the version JSON file
var jsonPath = GamePathHelper.GetGameJsonPath(rP, id);

// Read the contents of the file
var jsonContent = await File.ReadAllTextAsync(jsonPath);

// Convert JSON content to RawVersionModel
var baseVersionModel = JsonConvert.DeserializeObject<RawVersionModel>(jsonContent);

```

This **baseVersionModel** is the `RawVersionModel` required by the LiteLoader installer.

## Initialize the installer

The way to initialize the LiteLoader installer is very simple.
You need to initialize the installer using the `versionModel` and `baseVersionModel` obtained in the previous steps:

```c#

var liteLoaderInstaller = new LiteLoaderInstaller
{
    InheritVersion = baseVersionModel,
    InheritsFrom = "[MC_VERSION_OR_GAME_ID]",
    RootPath = "[GAME_ROOT_PATH]",
    VersionModel = versionModel,
    CustomId = "[CUSTOM_INSTALL_GAME_ID]"
};

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:----------------------------------:|:------------------------------------------:|
| [GAME_ROOT_PATH] | The game root directory, usually the path to the **.minecraft** folder |
| [CUSTOM_INSTALL_GAME_ID] | Optional, customize the name of the game to be installed |
| [MC_VERSION_OR_GAME_ID] | The Minecraft original game version inherited by Forge, usually the game version. For example: 1.19.2 |
| [VERSION_LOCATOR_INST] | Game version locator instance, that is, the **VersionLocator** attribute when initializing the game core |

## start installation

After you complete the initialization of the installer, you only need to call the installation method of the LiteLoader installer to complete the installation.

In an asynchronous context, use **InstallTaskAsync** to complete the installation:

```c#

await liteLoaderInstaller.InstallTaskAsync();

```

In a sync context, use **Install** to complete the installation:

```c#

liteLoaderInstaller.Install();

```

## Report installation progress

In some cases, the LiteLoader installer may take several minutes to complete the installation.
Therefore, you may need to report the current progress of the installer to the user in real time.
To this end, the LiteLoader installer provides the **StageChangedEventDelegate** event to help you implement task reporting.
You simply need to register for the following event **before starting the installation**:

```c#

liteLoaderInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};

```

Among them, **args.Progress** indicates the current percentage progress of the installer. **args.CurrentStage** is a text description of the current progress of the installer.
