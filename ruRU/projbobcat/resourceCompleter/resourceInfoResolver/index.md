# 资源信息解析器

在 ProjBobcat 中, 我们使用 **资源信息解析器**（ResourceInfoResolver）
来帮助资源补全器确定 MineCraft 缺失的文件. 

下表展示了目前 ProjBobcat 所支持的资源解析器：

|            类名            |                 简介                  |
|:------------------------:|:-----------------------------------:|
|    AssetInfoResolver     |     用于解析游戏所需要的资产（音频、语言、字体和贴图等）      |
| GameLoggingInfoResolver  | 用于解析 MineCraft 官方所提供的 log4j 日志格式化组件 |
|   LibraryInfoResolver    |           用于解析游戏启动所必须的库文件           |
|   VersionInfoResolver    |       用于解析游戏 JSON 中提供的 JAR 文件       |
