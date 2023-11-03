# Game account parser

The game profile parser is responsible for outputing the user account into the official launcher configuration file.

## Initialize the parser

The way to initialize the parser is very simple:

```c#

var launcherAccountParser
    = new DefaultLauncherAccountParser(rootPath, clientToken)

```

Among them, **rootPath** is the root directory where the core is located (that is, the directory where the .minecraft folder is located).
**clientToken** is a randomly generated GUID.
