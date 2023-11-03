# Offline Authentication model

[[toc]]

This authentication model implements the most basic authentication function. Typically used for local debugging and authentication.

:::warning

Using this authentication model in the production process may **violate copyright laws or end user agreements** in some countries and regions. For details, see [Mojang End User Agreement](https://www.minecraft.net/en-us/eula)

:::

## Initialize validator

You can initialize the offline validator with the following code:

```c#

var offlineAuthenticator = new OfflineAuthenticator
{
    LauncherAccountParser = launcherAccountParser,
    Username = "[DISPLAY_NAME]"
};

```

In the above code block, please replace these parameters according to your actual situation:

|          Project           |             Description              |
|:---------------------:|:---------------------------:|
| launcherAccountParser |   For initialization of the launcher account resolver, see [here]()   |
|    [DISPLAY_NAME]     | The display name in the game usually consists of English characters, symbols and numbers.  |

:::tip

For the initialization of **launcherAccountParser** (game profile parser), please refer to the [Game Profile Parser](/enUS/projbobcat/additionalParsers/gameProfileParser) page

:::

## Get authentication results

After you complete the authentication of the authentication model, you only need to call the authentication method of the offline verifier to complete the account authentication.

In an asynchronous context, use **AuthTaskAsync** to finish authentication:

```c#

var authResult = await offlineAuthenticator.AuthTaskAsync(false);

```

In a sync context, use **Auth** to finish authentication:

```c#

var authResult = offlineAuthenticator.Auth();

```

## Interpret authentication results

After the authentication method is completed, the authentication model will return the authentication result, which is of type [AuthResultBase](https://github.com/Corona-Studio/ProjBobcat/blob/master/ProjBobcat/ProjBobcat/Class/Model/Auth/AuthResultBase.cs) object.
All authentication results contain an enumeration value **AuthStatus**, which directly indicates the success or failure of the authentication result.
Below you can see an interpretation of the authentication results:

### Failed authentication result

By judging whether **Error** is empty, you can easily judge whether the authentication results returned by the authentication model are valid.
The **Error** object will contain the following fields to tell you some details:

| Field | Description |
|:-----------------:|:----------------:|
| authResult.Error.Cause | The specific cause of the problem |
| authResult.Error.Error | error name |
| authResult.Error.ErrorMessage | Details of the error, possibly including a solution |

### Successful authentication result

If the **Error** field in the authentication result is empty, it means that the authentication is valid. A successful authentication result will contain the following information:

| Field | Description |
|:---------------------------------:|:--------------------------------------------:|
| authResult.Id | The unique identifier of the username, ProjBobcat uses a specific generation method to generate this identifier |
| authResult.AccessToken | The authorization credentials of the user account, which has no meaning for the offline authentication model |
| authResult.User.UUID | The UUID of this user, similar to **authResult.Id** |
| authResult.User.Properties | The user's property array. For the offline authentication model, this array contains only one valid value |