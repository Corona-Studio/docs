# Game file parser

The game archive parser is responsible for outputing the searched local games into the configuration file of the official launcher.

## Initialize the parser

The way to initialize the parser is very simple:

```c#

var launcherProfileParser
    = new DefaultLauncherProfileParser(rootPath, clientToken)

```

Among them, **rootPath** is the root directory where the core is located (that is, the directory where the .minecraft folder is located).
**clientToken** is a randomly generated GUID.
