# Resource information resolver

In ProjBobcat, we use **ResourceInfoResolver** (ResourceInfoResolver)
to help the resource completer identify missing files in MineCraft.

The following table shows the resource resolvers currently supported by ProjBobcat:

| Class name | Introduction |
|:--------------------------:|:----------------------------------:|
| AssetInfoResolver | Used to parse the assets required by the game (audio, language, fonts, textures, etc.) |
| GameLoggingInfoResolver | Used to parse the log4j log formatting component officially provided by MineCraft |
| LibraryInfoResolver | Used to parse library files necessary for game startup |
| VersionInfoResolver | Used to parse JAR files provided in game JSON |
