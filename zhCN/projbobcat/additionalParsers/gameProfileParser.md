# 游戏档案解析器

游戏档案解析器负责将搜索到的本地游戏写入到官方启动器的配置文件中. 

## 初始化解析器

初始化解析器的方式非常简单：

```c#
var launcherProfileParser
    = new DefaultLauncherProfileParser(rootPath, clientToken)
```

其中, **rootPath** 为核心所在的根目录（即 .minecraft 文件夹所在的目录）. 
**clientToken** 为一个随机生成的 GUID. 
