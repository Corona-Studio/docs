# 資源資訊解析器

在 ProjBobcat 中, 我們使用 **資源資訊解析器**（ResourceInfoResolver）
來幫助資源補全器確定 MineCraft 缺失的檔案. 

下表展示了目前 ProjBobcat 所支援的資源解析器：

|            類名            |                 簡介                  |
|:------------------------:|:-----------------------------------:|
|    AssetInfoResolver     |     用於解析遊戲所需要的資產（音訊、語言、字型和貼圖等）      |
| GameLoggingInfoResolver  | 用於解析 MineCraft 官方所提供的 log4j 日誌格式化元件 |
|   LibraryInfoResolver    |           用於解析遊戲啟動所必須的庫檔案           |
|   VersionInfoResolver    |       用於解析遊戲 JSON 中提供的 JAR 檔案       |
