# Forge installer

In ProjBobcat, we support automated Forge installations for almost all major MineCraft versions.

[[toc]]

::: tip

Please note that ProjBobcat only implements the Forge automated installation process. You still need to implement the search, download, and save process of the Forge installation package yourself.

:::

## Determine which Forge installer should be used

Because the Forge team has modified Forge's packaging specifications and installation process in subsequent versions. Therefore, you need to manually determine which installer to use.
In ProjBobcat, we have implemented the relevant judgment logic for you. You just need to simply call the following method:

```c#

var mcVersion = "[MC_VERSION]";
var forgeJarPath = "[PATH_TO_YOUR_FORGE_INSTALLER]";
var forgeVersion = ForgeInstallerFactory.GetForgeArtifactVersion(mcVersion, "[FORGE_VERSION]");

var isLegacy = ForgeInstallerFactory.IsLegacyForgeInstaller(forgeJarPath, forgeVersion);  // [!code focus]

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:----------------------------------:|:-----------------------------------:|
| [MC_VERSION] | The Minecraft version to install Forge into, for example: 1.19.2 |
| [PATH_TO_YOUR_FORGE_INSTALLER] | The path to the Forge installer .jar file |
| [FORGE_VERSION] | The specific version of Forge, usually XX.X.X, for example: 43.2.0 |

After you complete the replacement and successfully execute the above code snippet, **isLegacy** will indicate which Forge installer the current Forge installer should use.

## Initialize legacy installer

If in the above process, the value of **isLegacy** is **true**, it means that you need to use a legacy installer to complete the Forge installation.
To initialize the legacy installer, simply instantiate **LegacyForgeInstaller** and provide the appropriate parameters:

```c#

IForgeInstaller forgeInstaller =
    new LegacyForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                RootPath = "[GAME_ROOT_PATH]",
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                ForgeVersion = "[FORGE_VERSION]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:----------------------------------:|:-------------------------------:|
| [GAME_ROOT_PATH] | The game root directory, usually the path to the **.minecraft** folder |
| [CUSTOM_INSTALL_GAME_ID] | Optional, customize the name of the game to be installed |
| [MC_VERSION_OR_GAME_ID] | The MineCraft original game version inherited by Forge, usually the game version. For example: 1.19.2 |

## Initialize the new version of the installer

```c#

IForgeInstaller forgeInstaller =
    new HighVersionForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                JavaExecutablePath = "[PATH_TO_YOUR_JAVA_RUNTIME]",
                RootPath = "[GAME_ROOT_PATH]",
                VersionLocator = [VERSION_LOCATOR_INST],
                DownloadUrlRoot = “[LIBRARIES_URL_ROOT]”,
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                MineCraftVersion = "[MC_VERSION]",
                MineCraftVersionId = "[ACTUAL_MC_GAME_ID]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:----------------------------------:|:------------------------------------:|
| [PATH_TO_YOUR_JAVA_RUNTIME] | The path where Java (javaw.exe) runtime is located |
| [LIBRARIES_URL_ROOT] | The root URL of the download source, for example: "https://bmclapi2.bangbang93.com/" |
| [VERSION_LOCATOR_INST] | Game version locator instance, that is, the **VersionLocator** attribute when initializing the game core |
| [ACTUAL_MC_GAME_ID] | The actual MineCraft game name, the name of the original game in the **version** folder. Normally, this value is consistent with **[MC_VERSION]**. |

## Uniform initialization based on **isLegacy** value

Because **LegacyForgeInstaller** and **HighVersionForgeInstaller** both implement the **IForgeInstaller** interface.
Therefore, you can easily use a ternary operator to selectively initialize the corresponding installer:

```c#{4-100}

var isLegacy = ForgeInstallerFactory.IsLegacyForgeInstaller(forgeJarPath, forgeVersion);

IForgeInstaller forgeInstaller = isLegacy
            ? new LegacyForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                RootPath = "[GAME_ROOT_PATH]",
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                ForgeVersion = "[FORGE_VERSION]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            }
            : new HighVersionForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                JavaExecutablePath = "[PATH_TO_YOUR_JAVA_RUNTIME]",
                RootPath = "[GAME_ROOT_PATH]",
                VersionLocator = [VERSION_LOCATOR_INST],
                DownloadUrlRoot = “[LIBRARIES_URL_ROOT]”,
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                MineCraftVersion = "[MC_VERSION]",
                MineCraftVersionId = "[ACTUAL_MC_GAME_ID]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };

```

## Start installation

After you complete the initialization of the installer, you only need to call the installation method of the Forge installer to complete the installation.

In an asynchronous context, use **InstallForgeTaskAsync** to complete the installation:

```c#

await forgeInstaller.InstallForgeTaskAsync();

```

In a sync context, use **InstallForge** to complete the installation:

```c#

forgeInstaller.InstallForge();

```

## Report installation progress

In some cases, the Forge installer may take several minutes to complete the installation.
Therefore, you may need to report the current progress of the installer to the user in real time.
For this purpose, the Forge installer provides the **StageChangedEventDelegate** event to help you implement task reporting.
You simply need to register for the following event **before starting the installation**:

```c#

((InstallerBase)forgeInstaller).StageChangedEventDelegate += (_, args) =>
{
    ReportProgress(args.Progress * 100, args.CurrentStage);
};

```

Among them, **args.Progress** indicates the current percentage progress of the installer. **args.CurrentStage** is a text description of the current progress of the installer.
