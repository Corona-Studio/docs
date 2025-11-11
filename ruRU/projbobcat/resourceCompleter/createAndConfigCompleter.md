# Создание и настройка комплитера

[[toc]]

## Инициализация комплитера

Создать комплитер ресурсов очень просто, вам просто нужно использовать следующий код для завершения инициализации комплитера:

```c#
var completer = new DefaultResourceCompleter
{
    MaxDegreeOfParallelism = [MAX_DEGREE_OF_PARALLELISM],
    ResourceInfoResolvers = new List<IResourceInfoResolver>
    {
        ...// Инициализация распознавателей информации о ресурсах
    },
    TotalRetry = [NUMBER_OF_TOTAL_RETRY],
    CheckFile = [CHECK_FILE_AFTER_DOWNLOADED],
    DownloadParts = [TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE]
};
```

::: tip

Руководства по инициализации распознавателей информации о ресурсах см. в разделе [Распознаватели информации о ресурсах](/ruRU/projbobcat/resourceCompleter/resourceInfoResolver/index).

:::

В приведенном выше блоке кода замените эти параметры в соответствии с вашей реальной ситуацией:

|                    Элемент                    | Тип данных    |              Описание              |
|:----------------------------------------:|:--------|:----------------------------:|
|       [MAX_DEGREE_OF_PARALLELISM]        | INT     |    Степень параллелизма проверки ресурсов (количество одновременно проверяемых игровых ресурсов)     |
|      [CHECK_FILE_AFTER_DOWNLOADED]       | BOOLEAN |  Проверка целостности файла после его загрузки (если существует контрольная сумма ресурса)  |
| [TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE] | INT     |         Количество сегментов для загрузки больших файлов          |

::: warning

Значения **[MAX_DEGREE_OF_PARALLELISM]** и **[TOTAL_DOWNLOAD_SEGMENTS_FOR_LARGE_FILE]**
следует настраивать в зависимости от производительности оборудования. Установка слишком больших значений может привести к снижению пропускной способности.

:::

## Завершение игровых ресурсов

После завершения инициализации комплитера ресурсов вам нужно только вызвать метод завершения, чтобы начать операции проверки и завершения:

В асинхронном контексте используйте **CheckAndDownloadTaskAsync** для завершения установки:

```c#
var result = await completer.CheckAndDownloadTaskAsync(); // [!code focus]

if (result.TaskStatus == TaskResultStatus.Error && (result.Value?.IsLibDownloadFailed ?? false))
{
    // После завершения комплитер ресурсов вернет результат выполнения.
    // Вы можете проверить значения свойств в result, чтобы определить, завершено ли завершение.
    
    // IsLibDownloadFailed отражает, были ли успешно завершены необходимые для запуска библиотеки.
    // В общем, если завершение файлов библиотек не удалось, это, скорее всего, приведет к сбою запуска игры.
}
```

В синхронном контексте используйте **CheckAndDownload** для завершения установки:

```c#
var result = completer.CheckAndDownload(); // [!code focus]
```

## Отчет о ходе выполнения

В некоторых случаях комплитеру ресурсов может потребоваться несколько минут для завершения проверки и загрузки ресурсов.
Поэтому вам может потребоваться сообщать пользователю о текущем ходе выполнения комплитера в режиме реального времени.

### Отчет о ходе выполнения проверки ресурсов

Вы можете получать ход проверки в режиме реального времени, зарегистрировав событие **GameResourceInfoResolveStatus**:

```c#
completer.GameResourceInfoResolveStatus += (_,  args) => 
    { ReportProgress(args.Progress,  args.Status); };
```

Где **args.Progress** указывает текущий процент выполнения проверки. **args.Status** — это текстовое описание текущего этапа проверки.

### Отчет о ходе загрузки файлов комплитером

Вы можете получать ход проверки в режиме реального времени, зарегистрировав событие **DownloadFileCompletedEvent**:

```c#
completer.DownloadFileCompletedEvent += (sender,  args) =>
{
    // Параметр sender — это последний успешно загруженный файл комплитером, тип — DownloadFile.
    // args возвращает статус загрузки этого файла (успешно/неудачно), а также счетчик повторных попыток файла,
    // тип — DownloadFileCompletedEventArgs.
};
```

::: tip

+ [Структура класса DownloadFile](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Class/Model/DownloadFile.cs)
+ [Структура события DownloadFileCompletedEventArgs](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Event/DownloadFileCompletedEventArgs.cs)

:::

### Отчет об информации о ходе загружаемых файлов

Вы можете получать ход проверки в режиме реального времени, зарегистрировав событие **DownloadFileChangedEvent**:

```c#
rC.DownloadFileChangedEvent += (_,  args) =>
{
    // args возвращает подробную информацию о загружаемом файле (полученные байты, общее количество байтов, текущая скорость, процент выполнения).
    // тип — DownloadFileChangedEventArgs.
};
```

::: tip

+ [Структура события DownloadFileChangedEventArgs](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Event/DownloadFileChangedEventArgs.cs)

:::
