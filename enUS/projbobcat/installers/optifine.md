# Optifine Installer

[[toc]]

::: tip

Please note that ProjBobcat only implements the Optifine automated installation process. You still need to implement the search, download, and save process of the Optifine installation package yourself.

:::

## Resources

- [BMCLAPI Development Documentation](https://bmclapidoc.bangbang93.com/)

## Get Optifine Download Version Model

Because ProjBobcat's Optifine installer requires you to provide download information from Optifine when initializing the installer.
Therefore, we will briefly describe here how to obtain this information based on a given Minecraft version.

::: info

In this example, we'll be using Minecraft version 1.19.2 to show you how to get it.

:::

::: warning

Since Optifine officially does not provide public API documentation. Therefore, in this process, we need to use a third-party mirror source to complete data acquisition.
Here, we use [BMCLAPI](https://bmclapidoc.bangbang93.com/) to obtain relevant version information.

:::

First, you need to send an **HTTP GET** request to [https://bmclapi2.bangbang93.com/optifine/[MC_VERSION]](https://bmclapi2.bangbang93.com/optifine/1.19.2).
Replace `[MC_VERSION]` with the MineCraft version you want to install. Here we will use version 1.19.2.

You will see something similar to the following returned:

```json

[
  {
    "_id": "6307b8a38a3998ab475d139d",
    "mcversion": "1.19.2",
    "patch": "H9",
    "type": "HD_U",
    "__v": 0,
    "filename": "OptiFine_1.19.2_HD_U_H9.jar",
    "forge": "Forge 43.1.1"
  },
  {...},
  {...}
]

```

BMCLAPI will return a JSON array, and each element in the array is the Download Version Model we need.

#### Convert JSON return to ProjBobcat type

If you are using [JSON.NET](https://www.newtonsoft.com/json)(Newtonsoft.JSON) in your project.
You can use code similar to the following to convert the server response you get into the corresponding ProjBobcat type:

```c#

// Requesting data from BMCLAPI (example, not actual code)
...
var responseJson = await res.Content.ReadAsStringAsync();

// Convert JSON response to ProjBobcat type // [!code focus]
var versions = JsonConvert.DeserializeObject<List<OptifineDownloadVersionModel>>(responseJson); // [!code focus]

// Get the version the user wants to install (example, not actual code)
var userSelect = vm.SelectedIndex;

// Get a single Download Version Model // [!code focus]
var selectedVersion = versions[userSelect]; // [!code focus]

```

Here, **selectedVersion** is the `OptifineDownloadVersionModel` required by the Optifine installer.

## Initialize the installer

The way to initialize the Optifine installer is very simple.
You first need to prepare the Optifine installation package .jar file. and a Java runtime available.
You need to initialize the installer using the `selectedVersion` obtained in the previous step:

```c#

var optifineInstaller = new OptifineInstaller
{
    JavaExecutablePath = "[PATH_TO_YOUR_JAVA_RUNTIME]",
    OptifineDownloadVersion = selectedVersion,
    OptifineJarPath = "[PATH_TO_YOUR_OPTIFINE_JAR]",
    RootPath = "[GAME_ROOT_PATH]",
    CustomId = "[CUSTOM_INSTALL_GAME_ID]",
    InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
};

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:----------------------------------------:|:------------------------------------------------:|
| [GAME_ROOT_PATH] | The game root directory, usually the path to the .minecraft folder |
| [CUSTOM_INSTALL_GAME_ID] | Optional, customize the name of the game to be installed |
| [MC_VERSION_OR_GAME_ID] | The MineCraft original game version inherited by Forge, usually the game version. For example: 1.19.2 |
| [VERSION_LOCATOR_INST] | Game version locator instance, that is, the **VersionLocator** attribute when initializing the game core |
| [PATH_TO_YOUR_OPTIFINE_JAR] | The path where the Optifine installation package is located |
| [PATH_TO_YOUR_JAVA_RUNTIME] | The path where Java (javaw.exe) runtime is located |

## start installation

After you complete the initialization of the installer, you only need to call the installation method of the Optifine installer to complete the installation.

In an asynchronous context, use **InstallTaskAsync** to complete the installation:

```c#

await optifineInstaller.InstallTaskAsync();

```

In a sync context, use **Install** to complete the installation:

```c#

optifineInstaller.Install();

```

## Report installation progress

In some cases, the Optifine installer may take several minutes to complete the installation.
Therefore, you may need to report the current progress of the installer to the user in real time.
For this purpose, the Optifine installer provides the **StageChangedEventDelegate** event to help you implement task reporting.
You simply need to register for the following event **before starting the installation**:

```c#

optifineInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};

```

Among them, **args.Progress** indicates the current percentage progress of the installer. **args.CurrentStage** is a text description of the current progress of the installer.

