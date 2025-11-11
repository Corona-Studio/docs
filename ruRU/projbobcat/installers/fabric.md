# Установщик Fabric

[[toc]]

::: tip

Обратите внимание, что ProjBobcat реализует только автоматизированный процесс установки Fabric. Вам все равно нужно самостоятельно реализовать процессы поиска, загрузки и сохранения установочных пакетов Fabric.

:::

## Полезные ресурсы

- [Официальный сайт Fabric](https://fabricmc.net/)
- [Fabric Meta API](https://meta.fabricmc.net/)

## Получение артефакта загрузчика Fabric

Поскольку установщик Fabric в ProjBobcat требует, чтобы вы предоставили информацию об артефакте загрузчика от официального Fabric при инициализации установщика.
Поэтому здесь мы кратко опишем, как получить эту информацию в соответствии с указанной версией Minecraft.

::: info

В этом примере мы будем использовать Minecraft 1.19.2, чтобы показать вам, как его получить.

:::

### Отправка запроса в Fabric Meta API

Сначала вам нужно отправить запрос **HTTP GET** на [https://meta.fabricmc.net/v2/versions/loader/[MC_VERSION]](https://meta.fabricmc.net/v2/versions/loader/1.19.2).
Замените `[MC_VERSION]` на версию Minecraft, которую вы хотите установить. Здесь мы будем использовать 1.19.2.

Вы увидите ответ, подобный следующему:

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

Fabric Meta API вернет массив JSON, и каждый элемент в массиве — это артефакт загрузчика, который нам нужен.

#### Преобразование ответа JSON в тип ProjBobcat

Если вы используете [JSON.NET](https://www.newtonsoft.com/json) (Newtonsoft.JSON) в своем проекте.
Вы можете использовать код, подобный приведенному ниже, для преобразования ответа сервера, который вы получили, в соответствующий тип ProjBobcat:

```c#
// Запрос данных из Fabric Meta API (пример, не реальный код)
...
var responseJson = await res.Content.ReadAsStringAsync();

// Преобразование ответа JSON в тип ProjBobcat // [!code focus]
var artifacts = JsonConvert.DeserializeObject<List<FabricLoaderArtifactModel>>(responseJson); // [!code focus]

// Получение версии, которую хочет установить пользователь (пример, не реальный код)
var userSelect = vm.SelectedArtifactIndex;

// Получение одного артефакта загрузчика // [!code focus]
var selectedArtifact = artifacts[userSelect]; // [!code focus]
```

Здесь **selectedArtifact** — это `FabricLoaderArtifactModel`, необходимый установщику Fabric.

## Инициализация установщика

Инициализировать установщик Fabric очень просто. Вам нужно использовать `selectedArtifact`, полученный на предыдущем шаге, для инициализации установщика:

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

В приведенном выше блоке кода замените эти параметры в соответствии с вашей реальной ситуацией:

|                 Элемент                  |                      Описание                       |
|:-----------------------------------:|:---------------------------------------------:|
|          [GAME_ROOT_PATH]           |          Корневой каталог игры, обычно путь к папке .minecraft          |
|      [CUSTOM_INSTALL_GAME_ID]       |              Необязательно, пользовательское имя игры, которую вы собираетесь установить               |
|       [MC_VERSION_OR_GAME_ID]       | Версия оригинальной игры Minecraft, от которой наследуется Forge, обычно версия игры. Например: 1.19.2  |
|       [VERSION_LOCATOR_INST]        |  Экземпляр локатора версий игры, то есть свойство **VersionLocator** при инициализации ядра игры   |

## Начало установки

После завершения инициализации установщика вам нужно только вызвать метод установки установщика Fabric для завершения установки.

В асинхронном контексте используйте **InstallTaskAsync** для завершения установки:

```c#
await fabricInstaller.InstallTaskAsync();
```

В синхронном контексте используйте **Install** для завершения установки:

```c#
fabricInstaller.Install();```

## Отчет о ходе установки

В некоторых случаях установка с помощью установщика Fabric может занять несколько минут.
Поэтому вам может потребоваться сообщать пользователю о текущем ходе установки в режиме реального времени.
Для этого установщик Fabric предоставляет событие **StageChangedEventDelegate**, чтобы помочь вам реализовать отчет о задачах.
Вам просто нужно зарегистрировать следующее событие **перед началом установки**:

```c#
fabricInstaller.StageChangedEventDelegate += (_,  args) => {
    ReportProgress(args.Progress,  args.CurrentStage);
};
```

Где **args.Progress** указывает текущий процент выполнения установщика. **args.CurrentStage** — это текстовое описание текущего этапа установщика.
