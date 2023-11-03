# Quilt 安装器

[[toc]]

::: tip

Please note that ProjBobcat only implements the Quilt automated installation process. You still need to implement the search, download, and save process of the Quilt installation package yourself.

:::

::: warning

The Quilt installer is currently in an experimental stage, and the related API and installation process may undergo significant changes.

:::

## Resources

- [Quilt Website](https://quiltmc.org/en/)
- [Quilt Documentation](https://quiltmc.org/en/install/)
- [Quilt Meta API](https://meta.quiltmc.org/)


## Compatibility check

Before you start installing Quilt, you need to query whether the version of MineCraft you are modifying is supported via the Quilt Meta API.

First, you need to send an **HTTP GET** request to [https://meta.quiltmc.org/v3/versions/game](https://meta.quiltmc.org/v3/versions/game).

You will see something similar to the following returned:

```json

[
  {
    "version": "1.19.3",
    "stable": true
  },
  {
    "version": "1.19.3-rc3",
    "stable": false
  },
  {...},
  {...}
]

```

Here, you need to check whether the game version you are about to install appears in Quilt's official support list.
You need to compare the game version with the `version` field in the JSON object.
**If your game does not appear on the support list, the installation will not continue. **

## Get Quilt Loader Model

Because ProjBobcat's Quilt installer requires you to provide download information from Quilt when initializing the installer.
Therefore, we will briefly describe here how to obtain this information based on a given MineCraft version.

::: info

In this example, we'll be using Minecraft version 1.19.2 to show you how to get it.

:::

First, you need to send an **HTTP GET** request to [https://meta.quiltmc.org/v3/versions/loader](https://meta.quiltmc.org/v3/versions/loader).

You will see something similar to the following returned:

```json

[
  {
    "separator": ".",
    "build": 25,
    "maven": "org.quiltmc:quilt-loader:0.18.1-beta.25",
    "version": "0.18.1-beta.25"
  },
  {...},
  {...}
]

```

Quilt Meta API will return a JSON array, and each element in the array is the Loader Artifact we need.

#### Convert JSON return to ProjBobcat type

If you are using [JSON.NET](https://www.newtonsoft.com/json)(Newtonsoft.JSON) in your project.
You can use code similar to the following to convert the server response you get into the corresponding ProjBobcat type:

```c#

// Requesting data from the Quilt Meta API (example, not actual code)
...
var responseJson = await res.Content.ReadAsStringAsync();

// Convert JSON response to ProjBobcat type // [!code focus]
var artifacts = JsonConvert.DeserializeObject<List<QuiltLoaderModel>>(responseJson); // [!code focus]

// Get the version the user wants to install (example, not actual code)
var userSelect = vm.SelectedArtifactIndex;

// Get a single Loader Artifact // [!code focus]
var selectedArtifact = artifacts[userSelect]; // [!code focus]

```

This **selectedArtifact** is the `QuiltLoaderModel` required by the Fabric installer.

## Initialize the installer

Initializing the Quilt installer is very simple. You need to use the `selectedArtifact` obtained in the previous step to initialize the installer:

```c#

var quiltInstaller = new QuiltInstaller
{
    InheritsFrom = "[MC_VERSION_OR_GAME_ID]",
    RootPath = "[GAME_ROOT_PATH]",
    CustomId = "[CUSTOM_INSTALL_GAME_ID]",
    LoaderArtifact = selectedArtifact
};

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:----------------------------------:|:-----------------------------------------:|
| [GAME_ROOT_PATH] | The game root directory, usually the path to the .minecraft folder |
| [CUSTOM_INSTALL_GAME_ID] | Optional, customize the name of the game to be installed |
| [MC_VERSION_OR_GAME_ID] | The Minecraft original game version inherited by Forge, usually the game version. For example: 1.19.2 |

## start installation

After you complete the initialization of the installer, you only need to call the installation method of the Fabric installer to complete the installation.

In an asynchronous context, use **InstallTaskAsync** to complete the installation:

```c#

await quiltInstaller.InstallTaskAsync();

```

In a sync context, use **Install** to complete the installation:

```c#

quiltInstaller.Install();

```

## Report installation progress

In some cases, the Quilt installer may take several minutes to complete the installation.
Therefore, you may need to report the current progress of the installer to the user in real time.
For this purpose, the Quilt installer provides the **StageChangedEventDelegate** event to help you implement task reporting.
You simply need to register for the following event **before starting the installation**:

```c#

quiltInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};

```

Among them, **args.Progress** indicates the current percentage progress of the installer. **args.CurrentStage** is a text description of the current progress of the installer.
