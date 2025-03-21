# 在我们开始之前

在我们正式开始使用 ProjBobcat, 您需要对您的项目属性做一下必要的检查和调整以满足 ProjBobcat 的运行需要. 

[[toc]]

## 运行时要求

您需要保证您项目的 dotNET 框架至少运行在 .NET 6.0 及更高的版本当中以满足. 

目前受支持的 .NET 版本：
- .NET 6.0
- .NET 7.0 （推荐）

::: warning

我们在先前的版本更新中已经移除了对 **.NET 5.0** 运行时的支持. 

:::

## 项目属性

由于 Windows 系统机制, 您需要在项目属性中关闭 **首选 32 位** 的生成选项. 否则您在使用 ProjBobcat 部分组件时会出现预料之外的结果. 

您需要在 Visual Studio 中切换到项目的属性页面, 并找到 **首选 32 位** 的勾选框, 并将其取消勾选. 

## 32 位系统支持

::: warning

ProjBobcat 从项目立项开始就决定放弃对 32 位系统的全部支持, 因为它真的很老, 很老了（

:::
