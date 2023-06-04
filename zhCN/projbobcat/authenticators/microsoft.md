# Microsoft 验证模型

[[toc]]

该验证模型实现了新版基于 Azure 的全新验证流程，适用于目前仍在维护的全部 MineCraft 版本。

## 准备工作

由于新版验证流程使用了基于 Azure 的验证方式。
因此，在开始之前请确保您已经完成了 [Azure 应用的配置](/zhCN/projbobcat/createNewAzureApp)

在完成了 Azure 的应用注册后，请确保在程序入口点完成了[微软验证器的初始化](/zhCN/projbobcat/installationAndConfig.html#配置微软登录验证器)。

### 配置缓存凭据提供方法

由于该验证模型的特殊性，开发者需要保存首次验证返回的 **刷新令牌** 和 **失效时间** 来帮助验证器完成验证。
验证器在验证时会首次调用该方法来查询本地令牌缓存的有效性，如果本地令牌仍然有效，则直接返回验证结果。
如本地缓存的令牌已失效，则需要开发者手动请求新令牌后并返回刷新后的令牌。

下面我们提供了一个该方法的样例实现：

```c#

public async Task<(bool, GraphAuthResultModel?)> CacheTokenProviderAsync()
{
    if (string.IsNullOrEmpty(XBLToken)) return (false, default);
    if (string.IsNullOrEmpty(XBLRefreshToken)) return (false, default);

    // 计算失效时间 // [!code focus]
    var expireDate = LastRefreshedTime.AddSeconds(ExpiresIn); // [!code focus]

    // 如果本地缓存令牌依旧是有效的，则直接返回当前令牌 // [!code focus]
    // 否则，使用刷新令牌请求新的令牌 // [!code focus]
    if (expireDate > DateTime.Now)
    {
        var result = new GraphAuthResultModel // [!code focus]
        { // [!code focus]
            ExpiresIn = (int)(expireDate - DateTime.Now).TotalSeconds, // [!code focus]
            AccessToken = XBLToken, // [!code focus]
            RefreshToken = XBLRefreshToken // [!code focus]
        }; // [!code focus]

        return (true, result); // [!code focus]
    }
    
    // 请求新的登录令牌 // [!code focus]
    var refreshReqDic = new List<KeyValuePair<string, string>> // [!code focus]
    { // [!code focus]
        new("client_id", MicrosoftAuthenticator.ApiSettings.ClientId), // [!code focus]
        new("refresh_token", XBLRefreshToken), // [!code focus]
        new("grant_type", "refresh_token") // [!code focus]
    }; // [!code focus]

    using var refreshReq = new HttpRequestMessage(HttpMethod.Post, MicrosoftAuthenticator.MSRefreshTokenRequestUrl) // [!code focus]
    { // [!code focus]
        Content = new FormUrlEncodedContent(refreshReqDic) // [!code focus]
    }; // [!code focus]

    using var refreshRes = await DefaultClient.SendAsync(refreshReq);
    var refreshContent = await refreshRes.Content.ReadAsStringAsync();
    var refreshModel = MicrosoftAuthenticator.ResolveMSGraphResult(refreshContent,
    GraphAuthResultModelContext.Default.GraphAuthResultModel);

    if (refreshModel is not GraphAuthResultModel model)
    {
        if (refreshModel is GraphResponseErrorModel error) // [!code focus]
        { // [!code focus]
            // 在这里处理失败的刷新操作 // [!code focus]
        } // [!code focus]

        return (false, default);
    }

    return (true, model);
}

```

## 初始化验证器

您可以通过下面的代码初始化微软验证器：

```c#

var microsoftAuthenticator = new MicrosoftAuthenticator
{
    CacheTokenProvider = CacheTokenProviderAsync,
    Email = "[EMAIL]",
    LauncherAccountParser = launcherAccountParser
};

```

在上述代码块中，请将这些参数按照您的实际情况替换：

|          项目           |                             说明                              |
|:---------------------:|:-----------------------------------------------------------:|
| launcherAccountParser |                     对于启动器账户解析器的初始化，详见此处                     |
|        [EMAIL]        |                          验证账户的邮箱地址                          |

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

|               字段               |                     说明                      |
|:------------------------------:|:-------------------------------------------:|
|         authResult.Id          |   该用户名的唯一标识符，ProjBobcat 使用特定的生成方式来生成这个标识符   |
|     authResult.AccessToken     |                  用户账户的授权凭据                  |
|      authResult.Profiles       |            用户可用的角色列表，可能包含多个可用角色             |
|   authResult.SelectedProfile   |    用户当前选择的角色，该字段可能为空。如果为空则需要提示用户进行手动选择。     |
|        authResult.User         |            用户账户信息摘要，包含一些基础的账户信息             |
|       authResult.LocalId       |             本地 ID，通常为随机生成的 UUID             |
|      authResult.RemoteId       |         验证服务器返回的远程 ID，通常为该用户的唯一标识符          |
|       authResult.XBoxUid       |                XBox Live UID                |
|        authResult.Email        |                 验证所使用的邮箱地址                  |
|   authResult.CurrentAuthTime   |   当前的验证时间，**开发者需要保存这个字段来帮助确认本地缓存令牌的有效性**    |
|      authResult.ExpiresIn      | 令牌失效时间（单位：秒），**开发者需要保存这个字段来帮助确认本地缓存令牌的有效性** |
|    authResult.RefreshToken     |       刷新令牌，**开发者需要保存这个字段来帮助刷新失效的令牌**        |
|        authResult.Skin         |                 用户账户的皮肤 URL                 |

:::warning

请使用相应的限制或是加密等操作来安全的储存用户相关令牌的机密数据，这部分数据的泄露可能会造成损失。

:::
