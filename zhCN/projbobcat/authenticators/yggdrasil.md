# Yggdrasil 验证模型

[[toc]]

该验证模型实现了旧版 Mojang 的验证方案，目前该方案已经被弃用。

::: warning

继续使用该模型进行官方账户的验证将被视为无效的请求。
但该模型仍然可以用于登录使用第三方验证服务的服务器（例如 [AuthLib-Injector](https://github.com/yushijinhun/authlib-injector)）。

:::

## 初始化验证器

您可以通过下面的代码初始化离线验证器：

```c#
var yggdrasilAuthenticator = new YggdrasilAuthenticator
{
    AuthServer = "[CUSTOM_AUTH_SERVER]",
    Email = "[EMAIL]",
    LauncherAccountParser = launcherAccountParser,
    Password = "[PASSWORD]"
};
```

在上述代码块中，请将这些参数按照您的实际情况替换：

|          项目           |                             说明                              |
|:---------------------:|:-----------------------------------------------------------:|
| launcherAccountParser |                     对于启动器账户解析器的初始化，详见此处                     |
| [CUSTOM_AUTH_SERVER]  | 可选字段，自定义验证服务器地址，这个字段通常由第三方验证服务提供商提供，不填则使用 Mojang 官方的验证服务器地址 |
|        [EMAIL]        |                          验证账户的邮箱地址                          |
|      [PASSWORD]       |                           验证账户的密码                           |

:::tip

对于 **launcherAccountParser**（游戏档案解析器）的初始化，请参考[游戏档案解析器](/zhCN/projbobcat/additionalParsers/gameProfileParser)页面

:::

:::warning

在使用第三方验证服务器时，请使用 **https://** 而非 **http://** 协议连接到验证服务器。
使用不安全的验证服务器可能会导致敏感数据泄露等问题。

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

在验证方法完成之后，验证模型会返回验证结果，这是父类型为 [AuthResultBase](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Class/Model/Auth/AuthResultBase.cs) 的对象。
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

|             字段             |                   说明                    |
|:--------------------------:|:---------------------------------------:|
|       authResult.Id        | 该用户名的唯一标识符，ProjBobcat 使用特定的生成方式来生成这个标识符 |
|   authResult.AccessToken   |                用户账户的授权凭据                |
|    authResult.Profiles     |          用户可用的角色列表，可能包含多个可用角色           |
| authResult.SelectedProfile |  用户当前选择的角色，该字段可能为空。如果为空则需要提示用户进行手动选择。   |
|      authResult.User       |          用户账户信息摘要，包含一些基础的账户信息           |
|     authResult.LocalId     |           本地 ID，通常为随机生成的 UUID           |
|    authResult.RemoteId     |       验证服务器返回的远程 ID，通常为该用户的唯一标识符        |
