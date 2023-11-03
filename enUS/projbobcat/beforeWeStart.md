# Before we begin

Before we officially start using ProjBobcat, you need to make necessary checks and adjustments to your project properties to meet the running needs of ProjBobcat.

[[toc]]

## Runtime requirements

You need to ensure that your project's dotNET framework is running at least .NET 6.0 and higher.

Currently supported .NET versions:
- .NET 6.0
- .NET 7.0 (recommended)

::: warning

We have removed support for the **.NET 5.0** runtime in a previous version update.

:::

## Project properties

Due to Windows system mechanics, you need to turn off the build option for **Prefer 32-bit** in the project properties. Otherwise, you may experience unexpected results when using some components of ProjBobcat.

You need to switch to the project's properties page in Visual Studio and find the checkbox for **Prefer 32-bit** and uncheck it.

## 32-bit system support

::: warning

ProjBobcat decided to give up all support for 32-bit systems from the beginning of the project because it is wayyyyyyy to old LMAO

:::