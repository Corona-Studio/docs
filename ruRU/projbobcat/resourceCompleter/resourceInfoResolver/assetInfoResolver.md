# Распознаватель ассетов

[[toc]]

Распознаватель ассетов предоставляет функции для разбора и проверки файлов ассетов игры, которые обычно хранятся в каталоге `.minecraft/assets`.

## Получение списка версий манифеста версий

Сначала вам нужно отправить запрос **HTTP GET** на [https://launchermeta.mojang.com/mc/game/version_manifest.json](https://launchermeta.mojang.com/mc/game/version_manifest.json).

Вы увидите ответ, подобный следующему:

```json
{
  "latest": {
    "release": "1.19.3",
    "snapshot": "23w06a"
  },
  "versions": [
    {
      "id": "23w06a",
      "type": "snapshot",
      "url": "https://piston-meta.mojang.com/v1/packages/92ed97b686fe8904d8ec00fd486c435582fd0155/23w06a.json",
      "time": "2023-02-08T15:11:06+00:00",
      "releaseTime": "2023-02-08T15:00:04+00:00"
    },
    ...
  ]
}
```

Сервер Mojang вернет объект JSON, и поле **versions** — это массив версий, который нам нужен.

### Преобразование ответа JSON в тип ProjBobcat

Если вы используете [JSON.NET](https://www.newtonsoft.com/json) (Newtonsoft.JSON) в своем проекте.
Вы можете использовать код, подобный приведенному ниже, для преобразования ответа сервера, который вы получили, в соответствующий тип ProjBobcat:

```c#
// Запрос данных из Mojang API (пример, не реальный код)
...
var responseJson = await res.Content.ReadAsStringAsync();

// Преобразование ответа JSON в тип ProjBobcat // [!code focus]
var manifest = JsonConvert.DeserializeObject<VersionManifest>(responseJson); // [!code focus]

// Получение списка версий // [!code focus]
var versions = manifest.Versions; // [!code focus]
```

Здесь **versions** — это массив `Versions`, необходимый распознавателю ассетов.


## Инициализация распознавателя

Вы можете инициализировать распознаватель ассетов с помощью следующего кода:

```c#
var resolver = new AssetInfoResolver
{
    AssetIndexUriRoot = "https://launchermeta.mojang.com/",
    AssetUriRoot = "https://resources.download.minecraft.net/",
    BasePath = "[GAME_ROOT_PATH]",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES],
    Versions = versions // Массив версий, полученный на предыдущем шаге
};
```

В приведенном выше блоке кода замените эти параметры в соответствии с вашей реальной ситуацией:

|           Элемент            |               Описание                |
|:-----------------------:|:-------------------------------:|
|    [GAME_ROOT_PATH]     |   Корневой каталог игры, обычно путь к папке .minecraft   |
| [SEARCHED_VERSION_INFO] | VersionInfo версии для проверки (получается через локатор игр) |
|   [CHECK_LOCAL_FILES]   |    Проверка локальных файлов (если false, все проверки пропускаются)    |
