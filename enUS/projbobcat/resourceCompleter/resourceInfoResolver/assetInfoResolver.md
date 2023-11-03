# Assets resolver

[[toc]]

The Assets resolver provides parsing and verification functions for game asset files. These files are generally stored in
`.minecraft/assets` directory

## Get the Version Manifest Versions list

First, you need to submit a request to [https://launchermeta.mojang.com/mc/game/version_manifest.json](https://launchermeta.mojang.com/mc/game/version_manifest.json)
Send an **HTTP GET** request.

You will see something similar to the following returned:

```json

{
  "latest": {
    "release": "1.19.3",
    "snapshot": "23w06a"
  },
  "versions": [
    {
      "id": "23w06a",
      "type": "snapshot",
      "url": "https://piston-meta.mojang.com/v1/packages/92ed97b686fe8904d8ec00fd486c435582fd0155/23w06a.json",
      "time": "2023-02-08T15:11:06+00:00",
      "releaseTime": "2023-02-08T15:00:04+00:00"
    },
    ...
  ]
}

```

The Mojang server will return a JSON object, and the **versions** field is the Versions array we need.

### Convert JSON return to ProjBobcat type

If you are using [JSON.NET](https://www.newtonsoft.com/json)(Newtonsoft.JSON) in your project.
You can use code similar to the following to convert the server response you get into the corresponding ProjBobcat type:

```c#

// Requesting data from the Mojang API (example, not actual code)
...
var responseJson = await res.Content.ReadAsStringAsync();

// Convert JSON response to ProjBobcat type // [!code focus]
var manifest = JsonConvert.DeserializeObject<VersionManifest>(responseJson); // [!code focus]

// Get the Versions list // [!code focus]
var versions = manifest.Versions; // [!code focus]

```

Here, **versions** is the `Versions` array required by the Assets resolver.


## Initialize resolver

You can initialize the Assets resolver with the following code:

```c#

var resolver = new AssetInfoResolver
{
    AssetIndexUriRoot = "https://launchermeta.mojang.com/",
    AssetUriRoot = "https://resources.download.minecraft.net/",
    BasePath = "[GAME_ROOT_PATH]",
    VersionInfo = [SEARCHED_VERSION_INFO],
    CheckLocalFiles = [CHECK_LOCAL_FILES],
    Versions = versions // Versions array obtained in the previous step
};

```

In the above code block, please replace these parameters according to your actual situation:

| Project | Description |
|:-----------------------:|:-------------------------------:|
| [GAME_ROOT_PATH] | The game root directory, usually the path to the .minecraft folder |
| [SEARCHED_VERSION_INFO] | VersionInfo of the version to check (obtained via game locator) |
| [CHECK_LOCAL_FILES] | Check local files (if false, skip all checks) |


