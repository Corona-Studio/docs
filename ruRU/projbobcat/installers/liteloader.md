# Установщик LiteLoader

[[toc]]

::: tip

Обратите внимание, что ProjBobcat реализует только автоматизированный процесс установки LiteLoader. Вам все равно нужно самостоятельно реализовать процессы поиска, загрузки и сохранения установочных пакетов LiteLoader.

:::

::: warning

LiteLoader, как система модов для ранних версий Minecraft, долгое время не обслуживалась и не поддерживалась.
Поэтому мы можем удалить поддержку установки LiteLoader в будущих версиях.

:::

## Полезные ресурсы

- [LiteLoader Versions API](https://dl.liteloader.com/versions/versions.json)
- [Документация разработчика BMCLAPI](https://bmclapidoc.bangbang93.com/)

## Получение модели версии загрузки LiteLoader

Поскольку установщик LiteLoader в ProjBobcat требует, чтобы вы предоставили информацию о загрузке от LiteLoader при инициализации установщика.
Поэтому здесь мы кратко опишем, как получить эту информацию в соответствии с указанной версией Minecraft.

::: info

В этом примере мы будем использовать Minecraft 1.7.10, чтобы показать вам, как его получить.

:::

::: warning

Поскольку официальный LiteLoader не предоставляет общедоступной документации по API, в этом процессе нам необходимо использовать сторонние зеркальные источники для получения данных.
Здесь мы используем [BMCLAPI](https://bmclapidoc.bangbang93.com/) для получения соответствующей информации о версии.

:::

Сначала вам нужно отправить запрос **HTTP GET** на [https://bmclapi2.bangbang93.com/liteloader/list?mcversion=[MC_VERSION]](https://bmclapi2.bangbang93.com/liteloader/list?mcversion=1.7.10).
Замените `[MC_VERSION]` на версию Minecraft, которую вы хотите установить. Здесь мы будем использовать 1.7.10.

Вы увидите ответ, подобный следующему:

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

BMCLAPI вернет объект JSON. Десериализация этого объекта в тип ProjBobcat — это `LiteLoaderDownloadVersionModel`, который нам нужен.

#### Преобразование ответа JSON в тип ProjBobcat

Если вы используете [JSON.NET](https://www.newtonsoft.com/json) (Newtonsoft.JSON) в своем проекте.
Вы можете использовать код, подобный приведенному ниже, для преобразования ответа сервера, который вы получили, в соответствующий тип ProjBobcat:

```c#
// Запрос данных из BMCLAPI (пример, не реальный код)
...
var responseJson = await res.Content.ReadAsStringAsync();

// Преобразование ответа JSON в тип ProjBobcat // [!code focus]
var versionModel = JsonConvert.DeserializeObject<LiteLoaderDownloadVersionModel>(responseJson); // [!code focus]
```

Здесь **versionModel** — это `LiteLoaderDownloadVersionMode`, необходимый установщику Fabric.

## Получение RawVersionModel

При инициализации установщика LiteLoader установщику необходимо использовать исходное содержимое JSON соответствующей версии игры Minecraft для LiteLoader.
То есть содержимое файла `[ROOT_PATH]/versions/[MC_VERSION]/[MC_VERSION].json`.

Если вы уже установили оригинальную игру, соответствующую LiteLoader, вы можете получить `RawVersionModel` с помощью следующего кода:

```c#
// Получение пути к файлу JSON версии
var jsonPath = GamePathHelper.GetGameJsonPath(rP, id);

// Чтение содержимого файла
var jsonContent = await File.ReadAllTextAsync(jsonPath);

// Преобразование содержимого JSON в RawVersionModel
var baseVersionModel = JsonConvert.DeserializeObject<RawVersionModel>(jsonContent);
```

Здесь **baseVersionModel** — это `RawVersionModel`, необходимый установщику LiteLoader.

## Инициализация установщика

Инициализировать установщик LiteLoader очень просто.
Вам нужно использовать `versionModel` и `baseVersionModel`, полученные на предыдущих шагах, для инициализации установщика:

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

В приведенном выше блоке кода замените эти параметры в соответствии с вашей реальной ситуацией:

|                 Элемент                  |                      Описание                       |
|:-----------------------------------:|:---------------------------------------------:|
|          [GAME_ROOT_PATH]           |          Корневой каталог игры, обычно путь к папке .minecraft          |
|      [CUSTOM_INSTALL_GAME_ID]       |              Необязательно, пользовательское имя игры, которую вы собираетесь установить               |
|       [MC_VERSION_OR_GAME_ID]       | Версия оригинальной игры Minecraft, от которой наследуется Forge, обычно версия игры. Например: 1.19.2  |
|       [VERSION_LOCATOR_INST]        |  Экземпляр локатора версий игры, то есть свойство **VersionLocator** при инициализации ядра игры   |

## Начало установки

После завершения инициализации установщика вам нужно только вызвать метод установки установщика LiteLoader для завершения установки.

В асинхронном контексте используйте **InstallTaskAsync** для завершения установки:

```c#
await liteLoaderInstaller.InstallTaskAsync();```

В синхронном контексте используйте **Install** для завершения установки:

```c#
liteLoaderInstaller.Install();
```

## Отчет о ходе установки

В некоторых случаях установка с помощью установщика LiteLoader может занять несколько минут.
Поэтому вам может потребоваться сообщать пользователю о текущем ходе установки в режиме реального времени.
Для этого установщик LiteLoader предоставляет событие **StageChangedEventDelegate**, чтобы помочь вам реализовать отчет о задачах.
Вам просто нужно зарегистрировать следующее событие **перед началом установки**:

```c#
liteLoaderInstaller.StageChangedEventDelegate += (_, args) => {
    ReportProgress(args.Progress, args.CurrentStage);
};
```

Где **args.Progress** указывает текущий процент выполнения установщика. **args.CurrentStage** — это текстовое описание текущего этапа установщика.
