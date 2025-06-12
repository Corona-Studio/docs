# 限制客户端

::: info 服主功能

此功能适合想要限制玩家登录方式的服主使用。这些设置可以在导出完整包时轻松地通过导出前配置完成，而无需直接影响当前正在使用的启动器。相关阅读：[LauncherX的整合包支持 | 日冕知识库](/zhCN/lxguide/features/modpack-support.html#·-额外选项)

:::

[[toc]]



## 限制账户登录

### 限制账户类型

LauncherX允许限制用户只能使用指定的游戏账户登录方式。此功能需要在LauncherX工作目录下的`LauncherX`文件夹内创建名为`DISABLE_CREATE_ACCOUNT_TYPE`的文件完成。

这个文件的内容逐行接受这些预期的文字：`Offline` /`Microsoft` /`ThirdParty`。LauncherX读取这个文件时是**大小写敏感**的。

举例，以下的写法将只允许玩家添加[微软登录、第三方验证]：

`````
Offline
`````

也就是说，写在此flag文件的登录方式将被**禁用**。



::: danger 

不可以同时选择三个禁用。三个都禁用将被视为无效的flag文件。

:::



### 限制特定的第三方登录

LauncherX允许限制特定的第三方认证的外置登录服务器。此功能需要在LauncherX工作目录下的`LauncherX`文件夹内创建名为`LIMIT_THIRD_PARTY_LOGIN_API`的文件完成。

这个功能可以和**限制账户类型**搭配使用。

文件的内容必须是**一行URL**，指向外置登录时的验证服务。比如：

`````text
https://api.skin.org/yggdrasil
`````

暂不支持限制“仅允许列表内的外置登录”，因此仅可以设置一个外置登录验证服务器。即便如下写了多行URL：

`````
https://api.skin.org/yggdrasil
https://giganticskin.org/yggdrasil
`````

也是无效的，只会使用第一个URL。