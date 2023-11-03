# CurseForge integration package installer

[[toc]]

::: tip

Please note that ProjBobcat only implements the automated installation process of the CurseForge integration package. You still need to implement the search, download, and save process of the CurseForge integration package yourself.

:::

## Resources

- [CurseForge Website](https://www.curseforge.com/)
- [CurseForge API](https://docs.curseforge.com/)

## Initialize the installer

The way to initialize the CurseForge installer is very simple:

```c#

var curseForgeInstaller = new CurseForgeInstaller
{
    GameId = "[CUSTOM_INSTALL_GAME_ID]",
    ModPackPath = "[PATH_TO_YOUR_MODPACK]",
    RootPath = "[GAME_ROOT_PATH]"
};

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:-----------------------------------------:|:----------------------:|
| [GAME_ROOT_PATH] | The game root directory, usually the path to the **.minecraft** folder |
| [CUSTOM_INSTALL_GAME_ID] | Optional, customize the name of the game to be installed |
| [PATH_TO_YOUR_MODPACK] | The path where the CurseForge integration package is located |

## Start installation

After you complete the initialization of the installer, you only need to call the installation method of the CurseForge installer to complete the installation.

In an asynchronous context, use **InstallTaskAsync** to complete the installation:

```c#

await curseForgeInstaller.InstallTaskAsync();

```

In a sync context, use **Install** to complete the installation:

```c#

curseForgeInstaller.Install();

```

## Report installation progress

In some cases, the CurseForge installer may take several minutes to complete the installation.
Therefore, you may need to report the current progress of the installer to the user in real time.
For this purpose, the CurseForge installer provides the **StageChangedEventDelegate** event to help you implement task reporting.
You simply need to register for the following event **before starting the installation**:

```c#

curseForgeInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};

```

Among them, **args.Progress** indicates the current percentage progress of the installer. **args.CurrentStage** is a text description of the current progress of the installer.

