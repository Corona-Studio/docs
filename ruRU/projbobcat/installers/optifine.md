# Установщик Optifine

[[toc]]

::: tip

Обратите внимание, что ProjBobcat реализует только автоматизированный процесс установки Optifine. Вам все равно нужно самостоятельно реализовать процессы поиска, загрузки и сохранения установочных пакетов Optifine.

:::

## Полезные ресурсы

- [Документация разработчика BMCLAPI](https://bmclapidoc.bangbang93.com/)

## Получение модели версии загрузки Optifine

Поскольку установщик LiteLoader в ProjBobcat требует, чтобы вы предоставили информацию о загрузке от LiteLoader при инициализации установщика.
Поэтому здесь мы кратко опишем, как получить эту информацию в соответствии с указанной версией Minecraft.

::: info

В этом примере мы будем использовать Minecraft 1.19.2, чтобы показать вам, как его получить.

:::

::: warning

Поскольку официальный Optifine не предоставляет общедоступной документации по API, в этом процессе нам необходимо использовать сторонние зеркальные источники для получения данных.
Здесь мы используем [BMCLAPI](https://bmclapidoc.bangbang93.com/) для получения соответствующей информации о версии.

:::

Сначала вам нужно отправить запрос **HTTP GET** на [https://bmclapi2.bangbang93.com/optifine/[MC_VERSION]](https://bmclapi2.bangbang93.com/optifine/1.19.2).
Замените `[MC_VERSION]` на версию Minecraft, которую вы хотите установить. Здесь мы будем использовать 1.19.2.

Вы увидите ответ, подобный следующему:

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

BMCLAPI вернет массив JSON, и каждый элемент в массиве — это модель версии загрузки, которая нам нужна.

#### Преобразование ответа JSON в тип ProjBobcat

Если вы используете [JSON.NET](https://www.newtonsoft.com/json) (Newtonsoft.JSON) в своем проекте.
Вы можете использовать код, подобный приведенному ниже, для преобразования ответа сервера, который вы получили, в соответствующий тип ProjBobcat:

```c#
// Запрос данных из BMCLAPI (пример, не реальный код)
...
var responseJson = await res.Content.ReadAsStringAsync();

// Преобразование ответа JSON в тип ProjBobcat // [!code focus]
var versions = JsonConvert.DeserializeObject<List<OptifineDownloadVersionModel>>(responseJson); // [!code focus]

// Получение версии, которую хочет установить пользователь (пример, не реальный код)
var userSelect = vm.SelectedIndex;

// Получение одной модели версии загрузки // [!code focus]
var selectedVersion = versions[userSelect]; // [!code focus]
```

Здесь **selectedVersion** — это `OptifineDownloadVersionModel`, необходимый установщику Optifine.

## Инициализация установщика

Инициализировать установщик Optifine очень просто.
Сначала вам нужно подготовить файл .jar установщика Optifine и доступную среду выполнения Java.
Вам нужно использовать `selectedVersion`, полученный на предыдущем шаге, для инициализации установщика:

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

В приведенном выше блоке кода замените эти параметры в соответствии с вашей реальной ситуацией:

|                  Элемент                   |                      Описание                       |
|:-------------------------------------:|:---------------------------------------------:|
|           [GAME_ROOT_PATH]            |          Корневой каталог игры, обычно путь к папке .minecraft          |
|       [CUSTOM_INSTALL_GAME_ID]        |              Необязательно, пользовательское имя игры, которую вы собираетесь установить               |
|        [MC_VERSION_OR_GAME_ID]        | Версия оригинальной игры Minecraft, от которой наследуется Forge, обычно версия игры. Например: 1.19.2  |
|        [VERSION_LOCATOR_INST]         |  Экземпляр локатора версий игры, то есть свойство **VersionLocator** при инициализации ядра игры   |
|      [PATH_TO_YOUR_OPTIFINE_JAR]      |               Путь к вашему установочному пакету Optifine               |
|      [PATH_TO_YOUR_JAVA_RUNTIME]      |           Путь к среде выполнения Java (javaw.exe)           |

## Начало установки

После завершения инициализации установщика вам нужно только вызвать метод установки установщика Optifine для завершения установки.

В асинхронном контексте используйте **InstallTaskAsync** для завершения установки:

```c#
await optifineInstaller.InstallTaskAsync();
```

В синхронном контексте используйте **Install** для завершения установки:

```c#
optifineInstaller.Install();
```

## Отчет о ходе установки

В некоторых случаях установка с помощью установщика Optifine может занять несколько минут.
Поэтому вам может потребоваться сообщать пользователю о текущем ходе установки в режиме реального времени.
Для этого установщик Optifine предоставляет событие **StageChangedEventDelegate**, чтобы помочь вам реализовать отчет о задачах.
Вам просто нужно зарегистрировать следующее событие **перед началом установки**:

```c#
optifineInstaller.StageChangedEventDelegate += (_,  args) => {
    ReportProgress(args.Progress,  args.CurrentStage);
};
```

Где **args.Progress** указывает текущий процент выполнения установщика. **args.CurrentStage** — это текстовое описание текущего этапа установщика.
