# Распознаватель компонентов форматирования журнала log4j

[[toc]]

Распознаватель компонентов форматирования журнала log4j предоставляет функции для разбора и проверки файлов ассетов игры, которые хранятся в каталоге `.minecraft/logging`.

Использование этого распознавателя ресурсов позволяет Minecraft выводить содержимое журнала, отформатированное с помощью log4j, подобно следующему:

```xml
<log4j:Event logger="ekb" timestamp="1676012129" level="INFO" thread="Render thread">
    <log4j:Message>
        <![CDATA[Created: 512x512x4 minecraft:textures/atlas/shulker_boxes.png-atlas]]>
    </log4j:Message>
</log4j:Event>
```

## Инициализация распознавателя

Вы можете инициализировать распознаватель компонентов форматирования журнала log4j с помощью следующего кода:

```c#
var resolver = new GameLoggingInfoResolver
{
    BasePath = "[GAME_ROOT_PATH]",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES]
};
```

В приведенном выше блоке кода замените эти параметры в соответствии с вашей реальной ситуацией:

|           Элемент            |               Описание                |
|:-----------------------:|:-------------------------------:|
|    [GAME_ROOT_PATH]     |   Корневой каталог игры, обычно путь к папке .minecraft   |
| [SEARCHED_VERSION_INFO] | VersionInfo версии для проверки (получается через локатор игр) |
|   [CHECK_LOCAL_FILES]   |    Проверка локальных файлов (если false, все проверки пропускаются)    |
