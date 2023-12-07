# 离线验证模型

[[toc]]

该验证模型实现了最基础的验证功能。通常用于本地调试和验证。

:::warning

在生产环节使用该验证模型在部分国家和地区可能会**违反版权法或是最终用户协议**，详见 [Mojang 最终用户协议（英文）](https://www.minecraft.net/en-us/eula)

:::

## 初始化验证器

您可以通过下面的代码初始化离线验证器：

```c#
var offlineAuthenticator = new OfflineAuthenticator
{
    LauncherAccountParser = launcherAccountParser,
    Username = "[DISPLAY_NAME]"
};
```

在上述代码块中，请将这些参数按照您的实际情况替换：

|          项目           |             说明              |
|:---------------------:|:---------------------------:|
| launcherAccountParser |   对于启动器账户解析器的初始化，详见[此处]()   |
|    [DISPLAY_NAME]     | 游戏中的显示名称，通常是由英文字符、符号以及数字组成  |

:::tip

对于 **launcherAccountParser**（游戏档案解析器）的初始化，请参考[游戏档案解析器](/zhCN/projbobcat/additionalParsers/gameProfileParser)页面

:::

## 获取验证结果

在您完成验证模型的初始化后，您只需要调用离线验证器的验证方法来完成账户验证。

在异步上下文中，使用 **AuthTaskAsync** 来完成验证：

```c#
var authResult = await offlineAuthenticator.AuthTaskAsync(false);
```

在同步上下文中，使用 **Auth** 来完成验证：

```c#
var authResult = offlineAuthenticator.Auth();
```

## 解读验证结果

在验证方法完成之后，验证模型会返回验证结果，这是一个类型为 [AuthResultBase](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Class/Model/Auth/AuthResultBase.cs) 的对象。
所有的验证结果都包含一个枚举值 **AuthStatus**，该枚举值直接指示了验证结果的成功或是失败。
在下面您可以看到对验证结果的解读：

### 失败的验证结果

通过判断 **Error** 是否为空，您可以很轻松的判断验证模型返回的验证结果是否是有效的，
**Error** 对象会包含以下字段来告诉您一些细节：

|              字段               |        说明        |
|:-----------------------------:|:----------------:|
|    authResult.Error.Cause     |    导致问题的具体原因     |
|    authResult.Error.Error     |       错误名称       |
| authResult.Error.ErrorMessage | 错误的详细信息，可能包含解决方案 |

### 成功的验证结果

如果验证结果中的 **Error** 字段为空，则表示本次验证是有效的，成功的验证结果会包含下面的信息：

|             字段              |                   说明                    |
|:---------------------------:|:---------------------------------------:|
|        authResult.Id        | 该用户名的唯一标识符，ProjBobcat 使用特定的生成方式来生成这个标识符 |
|   authResult.AccessToken    |       用户账户的授权凭据，这对于离线验证模型是没有任何意义的       |
|    authResult.User.UUID     |    该用户的 UUID，与 **authResult.Id** 类似     |
| authResult.User.Properties  |    用户的属性数组，对于离线验证模型来说，该数组只包含唯一一个有效值     |
