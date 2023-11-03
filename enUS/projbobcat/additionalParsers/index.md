# Attached parser

In order to maintain the same behavior as Mojang's official launcher, ProjBobcat has implemented some additional parsers to help us keep data and files in sync with the official launcher.

The following table shows the currently implemented parsers:

|              Name              |          Description           |
|:----------------------------:|:---------------------:|
| DefaultLauncherAccountParser | Configuration file used to write verification information to the official launcher  |
| DefaultLauncherProfileParser | Used to write the searched local games to the launcher's configuration file |
