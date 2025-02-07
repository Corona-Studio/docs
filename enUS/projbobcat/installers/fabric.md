# Fabric installer

[[toc]]

::: tip

Please note that ProjBobcat only implements the Fabric automated installation process. You still need to implement the search, download, and save process of the Fabric installation package yourself.

:::

## Resources

- [Fabric Website](https://fabricmc.net/)
- [Fabric Meta API](https://meta.fabricmc.net/)

## Get Fabric Loader Artifact

Because ProjBobcat's Fabric installer requires you to provide the official Loader Artifact information from Fabric when initializing the installer.
Therefore, we will briefly describe here how to obtain this information based on a given MineCraft version.

::: info

In this example, we'll be using Minecraft version 1.19.2 to show you how to get it.

:::

### Send request to Fabric Meta API

First, you need to send an **HTTP GET** request to [https://meta.fabricmc.net/v2/versions/loader/[MC_VERSION]](https://meta.fabricmc.net/v2/versions/loader/1.19.2).
Replace `[MC_VERSION]` with the Minecraft version you want to install. Here we will use 1.19.2 for exmaple.

You will see something similar to the following returned:

```json

[
  {
    "loader": {
      "separator": ".",
      "build": 11,
      "maven": "net.fabricmc:fabric-loader:0.14.11",
      "version": "0.14.11",
      "stable": true
    },
    "intermediary": {
      "maven": "net.fabricmc:intermediary:1.19.2",
      "version": "1.19.2",
      "stable": true
    },
    "launcherMeta": {
      "version": 1,
      "libraries": {...},
      "mainClass": {...}
    }
  },
  {...},
  {...}
]

```

Fabric Meta API will return a JSON array, and each element in the array is the Loader Artifact we need.

#### Convert JSON return to ProjBobcat type

If you are using [JSON.NET](https://www.newtonsoft.com/json)(Newtonsoft.JSON) in your project.
You can use code similar to the following to convert the server response you get into the corresponding ProjBobcat type:

```c#

// Requesting data from the Fabric Meta API (example, not actual code)
...
var responseJson = await res.Content.ReadAsStringAsync();

// Convert JSON response to ProjBobcat type // [!code focus]
var artifacts = JsonConvert.DeserializeObject<List<FabricLoaderArtifactModel>>(responseJson); // [!code focus]

// Get the version the user wants to install (example, not actual code)
var userSelect = vm.SelectedArtifactIndex;

// Get a single Loader Artifact // [!code focus]
var selectedArtifact = artifacts[userSelect]; // [!code focus]

```

Here, **selectedArtifact** is what the Fabric installer requires `FabricLoaderArtifactModel`. 

## Initialize the installer

The way to initialize the Fabric installer is very simple. You need to use the `selectedArtifact` obtained in the previous step to initialize the installer:

```c#

var fabricInstaller = new FabricInstaller
{
    LoaderArtifact = selectedArtifact,
    VersionLocator = [VERSION_LOCATOR_INST],
    RootPath = "[GAME_ROOT_PATH]",
    CustomId = "[CUSTOM_INSTALL_GAME_ID]",
    InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
};

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:----------------------------------:|:-------------------------------:|
| [GAME_ROOT_PATH] | The game root directory, usually the path to the .minecraft folder |
| [CUSTOM_INSTALL_GAME_ID] | Optional, customize the name of the game to be installed |
| [MC_VERSION_OR_GAME_ID] | The MineCraft original game version inherited by Forge, usually the game version. For example: 1.19.2 |
| [VERSION_LOCATOR_INST] | Game version locator instance, that is, the **VersionLocator** attribute when initializing the game core |

## start installation

After you complete the initialization of the installer, you only need to call the installation method of the Fabric installer to complete the installation.

In an asynchronous context, use **InstallTaskAsync** to complete the installation:

```c#

await fabricInstaller.InstallTaskAsync();

```

In a sync context, use **Install** to complete the installation:

```c#

fabricInstaller.Install();

```

## Report installation progress

In some cases, the Fabric installer may take several minutes to complete the installation.
Therefore, you may need to report the current progress of the installer to the user in real time.
To this end, the Fabric installer provides the **StageChangedEventDelegate** event to help you implement task reporting.
You simply need to register for the following event **before starting the installation**:

```c#

fabricInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};

```

Among them, **args.Progress** indicates the current percentage progress of the installer. **args.CurrentStage** is a text description of the current progress of the installer.
