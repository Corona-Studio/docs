# Распознаватель библиотек

[[toc]]

Распознаватель библиотек предоставляет функции для разбора и проверки файлов ассетов игры, которые хранятся в каталоге `.minecraft/libraries`. Эти файлы являются файлами времени выполнения, необходимыми для запуска Minecraft.

## Инициализация распознавателя

Вы можете инициализировать распознаватель библиотек с помощью следующего кода:

```c#
var resolver = new LibraryInfoResolver
{
    BasePath = "[GAME_ROOT_PATH]",
    ForgeUriRoot = "https://files.minecraftforge.net/maven/",
    ForgeMavenUriRoot = "https://maven.minecraftforge.net/",
    ForgeMavenOldUriRoot = "https://files.minecraftforge.net/maven/",
    FabricMavenUriRoot = "https://maven.fabricmc.net/",
    LibraryUriRoot = "https://libraries.minecraft.net/",
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
