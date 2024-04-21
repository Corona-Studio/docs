# docs [![Deploy](https://github.com/Corona-Studio/CSKB_Hosting/actions/workflows/deploy.yml/badge.svg)](https://github.com/Corona-Studio/CSKB_Hosting/actions/workflows/deploy.yml)

日冕知识库文档，使用 Markdown 撰写。

## 简介

这里是日冕知识库官方仓库，里面包含了有关于团队项目的详细介绍以及开发文档。同时也包含部分 MineCraft 游戏内容的相关规范。
目前已经支持包括 简体中文、繁体中文、俄罗斯语等语言。项目使用 MIT 协议开源，欢迎广大热心网友帮助我们支持更多的语言！

<img width="1031" alt="image" src="https://user-images.githubusercontent.com/25716486/218275312-68e63c3b-97d8-49d7-ae07-bc86f6e68fb0.png">

## 帮助我们添加一个新语言支持？

1. 首先，您需要点击右上方的 `Fork` 来取得可修改的仓库副本
2. 将项目克隆到本地，使用您常用的 IDE 打开项目
3. [确定您即将翻译的语言的 i18n 缩写](https://segmentfault.com/a/1190000019287972)。假如您即将翻译的语言是 **繁体中文（台湾）**，您在之后使用到的名称则是 **zhTW**，呈现在页面中的语言名称必须对应的是“繁体中文（台湾）”（或“台湾繁体”）。“繁体中文（香港）”、简体中文（新加坡）与Español(Mexico)、Русский(Украина)同理。
**请注意, 您将要为一个或多个地区适配适合当地语言习惯的本地化文本。您首先需要考虑的即是国际承认和地区习惯之间的平衡。任何我们认为会造成不良影响的内容均会被移除, 且制造此内容者将会被移出贡献者列表。**
4. 跳转到项目目录下的 `docs/.vitepress` 文件夹，您将在这个目录下找到如下内容：

  - navBar（用于存放顶部导航条的翻译内容）
  - searchBar（用于存放搜索条的翻译内容）
  - sideBar（用于存放侧边导航栏的翻译内容）
  - `i18n 缩写`.ts（用于整合上述翻译内容）
  - config.ts（配置文件总成）

5. 您需要分别在 `navBar`、`searchBar`、`sideBar` 下创建新的翻译配置文件，代码定义参照各目录下的 `zhCN.ts`，**部分代码变量名可能包含 i18n 字段**，请将其修改为您将要翻译的语言的 i18n 缩写！
6. 在完成上一步的文件创建和翻译工作后，您需要在 `docs/.vitepress` 目录下创建 `i18n 缩写`.ts`，代码定义参照与同目录下的 `zhCN.ts` 保持一致，**代码变量名包含 i18n 字段**，请将其修改为您将要翻译的语言的 i18n 缩写！
7. 在 `docs/.vitepress/sharedConfig.ts` 文件中找到如下内容：

**注意在顶部添加相应的 import**

```typescript

algolia: {
  appId: '-',
  apiKey: '-',
  indexName: 'kb-corona',
  locales: {
    root: zhSearchBarLocale,
    ruRU: ruSearchBarLocale,
    zhTW: zhTWSearchBarLocale,
    enUS: enUSSearchBarLocale,
    /* 在此处添加您的搜索条的翻译内容 */
  }
}

```

8. 在 `docs/.vitepress/config.ts` 中找到如下内容：

**注意在顶部添加相应的 import**

```typescript

locales: {
  root: { label: '简体中文', lang: 'zh-CN', ...zhConfig },
  ruRU: { label: 'Русский', lang: 'ru-RU', ...ruConfig },
  zhTW: { label: '繁體中文(台)', lang: 'zh-TW', ...zhTWConfig },
  enUS: { label: 'English(US)', lang: 'en-US', ...enUSConfig },
  /* 在此处添加您的翻译内容整合 */
},

```

9. 最后，在 `docs` 目录下创建一个新的文件夹，文件夹名称为您将要翻译的语言的 **i18n 缩写**，并将同目录下 `zhCN` 文件夹中的内容 **复制** 到您刚刚创建的文件夹中。
**请注意：翻译文稿命名需要符合国际公认的标准。**
10. 同时，将 `docs` 目录下的 index.md 也复制到在上一步创建的文件夹中。
11. 将文件夹中的所有内容翻译为目标语言。在完成后，您即可向本仓库提交 PR！
12. 在我们审核完成后，将会决定是否合并到主分支。感谢您的参与！

请注意！我们强烈建议您在提交前对自己的撰文进行测试。您需要先下载[我们配置好的环境](https://github.com/Corona-Studio/CSKB_Hosting)，然后将您的docs克隆到这个仓库本地副本的根目录（覆盖docs），并根据那里的`readme.md`安装好调试环境。然后，运行调试环境来进行测试。

## 贡献

感谢每一位翻译作者的无私奉献！

### 多语言贡献者

<a href="https://github.com/Corona-Studio/docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Corona-Studio/docs" />
</a>
<br><br>

+ [法棍面包](https://github.com/fr1g)
  - 俄罗斯语（ru-RU）
  - 西班牙语（es-US）
+ [KormiMeiko](https://github.com/KormiMeiko)
  - 繁体中文（zh-TW）
+ [Japerz](https://github.com/japerz12138)
  - 英语(美国) (en-US)

<br><br>

![Alt](https://repobeats.axiom.co/api/embed/243ea556dfcaf8738e432d5347cbcf91855f6ddd.svg "Repobeats analytics image")
