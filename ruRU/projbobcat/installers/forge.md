# Установщик Forge

В ProjBobcat мы поддерживаем автоматическую установку Forge практически для всех основных версий Minecraft.

[[toc]]

::: tip

Обратите внимание, что ProjBobcat реализует только автоматизированный процесс установки Forge. Вам все равно нужно самостоятельно реализовать процессы поиска, загрузки и сохранения установочных пакетов Forge.

:::

## Определение того, какой установщик Forge использовать

Поскольку команда Forge изменила спецификацию упаковки и процесс установки Forge в последующих версиях, вам необходимо вручную определить, какой установщик использовать.
В ProjBobcat мы уже реализовали для вас соответствующую логику определения. Вам просто нужно вызвать следующий метод:

```c#
var mcVersion = "[MC_VERSION]";
var forgeJarPath = "[PATH_TO_YOUR_FORGE_INSTALLER]";
var forgeVersion = ForgeInstallerFactory.GetForgeArtifactVersion(mcVersion, "[FORGE_VERSION]");

var isLegacy = ForgeInstallerFactory.IsLegacyForgeInstaller(forgeJarPath, forgeVersion);  // [!code focus]
```

В приведенном выше блоке кода замените эти параметры в соответствии с вашей реальной ситуацией:

|               Элемент                |                     Описание                     |
|:-------------------------------:|:------------------------------------------:|
|          [MC_VERSION]           |    Версия Minecraft для установки Forge, например: 1.19.2     |
| [PATH_TO_YOUR_FORGE_INSTALLER]  |           Путь к файлу .jar установщика Forge           |
|         [FORGE_VERSION]         |      Конкретная версия Forge, обычно XX.X.X, например: 43.2.0      |

После того, как вы завершите замену и успешно выполните приведенный выше фрагмент кода, **isLegacy** укажет, какой установщик Forge следует использовать для текущего установщика Forge.

## Инициализация устаревшего установщика

Если в описанном выше процессе значение **isLegacy** равно **true**, это означает, что вам необходимо использовать устаревший установщик для завершения установки Forge.
Чтобы инициализировать устаревший установщик, просто создайте экземпляр **LegacyForgeInstaller** и укажите соответствующие параметры:

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

В приведенном выше блоке кода замените эти параметры в соответствии с вашей реальной ситуацией:

|                 Элемент                 |                      Описание                      |
|:----------------------------------:|:--------------------------------------------:|
|          [GAME_ROOT_PATH]          |         Корневой каталог игры, обычно путь к папке .minecraft          |
|      [CUSTOM_INSTALL_GAME_ID]      |              Необязательно, пользовательское имя игры, которую вы собираетесь установить              |
|      [MC_VERSION_OR_GAME_ID]       | Версия оригинальной игры Minecraft, от которой наследуется Forge, обычно версия игры. Например: 1.19.2 |

## Инициализация нового установщика

```c#
IForgeInstaller forgeInstaller =
    new HighVersionForgeInstaller
            {
                ForgeExecutablePath = "[PATH_TO_YOUR_FORGE_INSTALLER]",
                JavaExecutablePath = "[PATH_TO_YOUR_JAVA_RUNTIME]",
                RootPath = "[GAME_ROOT_PATH]",
                VersionLocator = [VERSION_LOCATOR_INST],
                DownloadUrlRoot = "[LIBRARIES_URL_ROOT]",
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                MinecraftVersion = "[MC_VERSION]",
                MinecraftVersionId = "[ACTUAL_MC_GAME_ID]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };
```

В приведенном выше блоке кода замените эти параметры в соответствии с вашей реальной ситуацией:

|                 Элемент                  |                                      Описание                                       |
|:-----------------------------------:|:-----------------------------------------------------------------------------:|
|     [PATH_TO_YOUR_JAVA_RUNTIME]     |                           Путь к среде выполнения Java (javaw.exe)                           |
|        [LIBRARIES_URL_ROOT]         |                Корневой URL-адрес источника загрузки, например: "https://bmclapi2.bangbang93.com/"                |
|       [VERSION_LOCATOR_INST]        |                  Экземпляр локатора версий игры, то есть свойство **VersionLocator** при инициализации ядра игры                   |
|         [ACTUAL_MC_GAME_ID]         | Фактическое имя игры Minecraft, то есть имя оригинальной игры в папке **version**. В большинстве случаев это значение совпадает с **[MC_VERSION]**. |

## Унифицированная инициализация на основе значения **isLegacy**

Поскольку **LegacyForgeInstaller** и **HighVersionForgeInstaller** одновременно реализуют интерфейс **IForgeInstaller**.
Поэтому вы можете легко использовать тернарный оператор для выборочной инициализации соответствующего установщика:

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
                DownloadUrlRoot = "[LIBRARIES_URL_ROOT]",
                CustomId = "[CUSTOM_INSTALL_GAME_ID]",
                MinecraftVersion = "[MC_VERSION]",
                MinecraftVersionId = "[ACTUAL_MC_GAME_ID]",
                InheritsFrom = "[MC_VERSION_OR_GAME_ID]"
            };
```

## Начало установки

После завершения инициализации установщика вам нужно только вызвать метод установки установщика Forge для завершения установки.

В асинхронном контексте используйте **InstallForgeTaskAsync** для завершения установки:

```c#
await forgeInstaller.InstallForgeTaskAsync();
```

В синхронном контексте используйте **InstallForge** для завершения установки:

```c#
forgeInstaller.InstallForge();
```

## Отчет о ходе установки

В некоторых случаях установка с помощью установщика Forge может занять несколько минут.
Поэтому вам может потребоваться сообщать пользователю о текущем ходе установки в режиме реального времени.
Для этого установщик Forge предоставляет событие **StageChangedEventDelegate**, чтобы помочь вам реализовать отчет о задачах.
Вам просто нужно зарегистрировать следующее событие **перед началом установки**:

```c#
((InstallerBase)forgeInstaller).StageChangedEventDelegate += (_,  args) =>
{
    ReportProgress(args.Progress * 100,  args.CurrentStage);
};
```

Где **args.Progress** указывает текущий процент выполнения установщика. **args.CurrentStage** — это текстовое описание текущего этапа установщика.
