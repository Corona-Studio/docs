# Yggdrasil Authentication Model

[[toc]]

This authentication model implements an older version of Mojang's authentication scheme, which is now deprecated.

::: warning

Continuing to use this model for verification of official accounts will be considered an invalid request.
But the model can still be used to log in to servers that use third-party authentication services (such as [AuthLib-Injector](https://github.com/yushijinhun/authlib-injector)).

:::

## Initialize validator

You can initialize the offline validator with the following code:

```c#

var yggdrasilAuthenticator = new YggdrasilAuthenticator
{
    AuthServer = "[CUSTOM_AUTH_SERVER]",
    Email = "[EMAIL],
    LauncherAccountParser = launcherAccountParser,
    Password = "[PASSWORD]"
};

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:------------------------:|:-------------------------------------------:|
| launcherAccountParser | For initialization of the launcher account parser, see here |
| [CUSTOM_AUTH_SERVER] | Optional field, custom authentication server address. This field is usually provided by a third-party authentication service provider. If not filled in, Mojang's official authentication server address will be used |
| [EMAIL] | Email address to verify account |
| [PASSWORD] | Password to verify account |

:::tip

For the initialization of **launcherAccountParser** (game profile parser), please refer to the [Game Profile Parser](/enUS/projbobcat/additionalParsers/gameProfileParser) page

:::

:::warning

When using a third-party authentication server, use the **https://** rather than the **http://** protocol to connect to the authentication server.
Using an insecure authentication server may lead to sensitive data leakage and other issues.

:::

## Get authentication results

After you complete the initialization of the authentication model, you only need to call the authentication method of the offline verifier to complete the account authentication.

In an asynchronous context, use **AuthTaskAsync** to accomplish authentication:

```c#

var authResult = await offlineAuthenticator.AuthTaskAsync(false);

```

In a sync context, use **Auth** to finish authentication:

```c#

var authResult = offlineAuthenticator.Auth();

```

## Interpret authentication results

After the authentication method is completed, the authentication model will return the authentication result, which is of the parent type [AuthResultBase](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Class/Model/Auth/AuthResultBase.cs) object.
All authentication results contain an enumeration value **AuthStatus**, which directly indicates the success or failure of the authentication result.
Below you can see an interpretation of the authentication results:

### Failed authentication result

By judging whether **Error** is empty, you can easily judge whether the authentication results returned by the authentication model are valid.
The **Error** object will contain the following fields to tell you some details:

| Field | Description |
|:--------------------------------:|:----------------:|
| authResult.Error.Cause | The specific cause of the problem |
| authResult.Error.Error | error name |
| authResult.Error.ErrorMessage | Details of the error, possibly including a solution |

### Successful authentication result

If the **Error** field in the authentication result is empty, it means that the authentication is valid. A successful authentication result will contain the following information:

| Field | Description |
|:--------------------------:|:---------------------------------:|
| authResult.Id | The unique identifier of the username, ProjBobcat uses a specific generation method to generate this identifier |
| authResult.AccessToken | Authorization credentials for the user account |
| authResult.Profiles | List of roles available to the user, which may contain multiple available roles |
| authResult.SelectedProfile | The role currently selected by the user. This field may be empty. If it is empty, the user needs to be prompted for manual selection. |
| authResult.User | Summary of user account information, including some basic account information |
| authResult.LocalId | Local ID, usually a randomly generated UUID |
| authResult.RemoteId | The remote ID returned by the authentication server, usually a unique identifier for the user |
