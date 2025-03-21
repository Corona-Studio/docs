`@useFixer`
# 单元组件

这里存放可以直接复制以供复用的组件。建议编辑人员遵守格式使用。

请尽可能跟随统一的全站风格！ 

相关阅读：[Markdown Extensions | VitePress](https://vitepress.dev/guide/markdown)

[[toc]]

## 版权声明

::: warning 我们对CSKB内容版权的管理

无论是转载还是原创，引起的版权纠纷均由该文章的上传者承担。

此外，如果引用内容受到跨域访问阻止，请自行解决。

:::

### 转载他人文章

如果转载他人撰写的、并非首发于CSKB的文章，**必须** 在开头一级标题后附上此段。

模板中存在可选的内容。使用时，在可选段中 **至少选择一个** 并删除表示可选的`?`问号。

:::warning 转载文章

本文是转载文章，<修改状态>。如果你觉得这篇文章不错并想要引用或转载，请根据这些信息联系原作者。

原作者：作者在原文的署名

引用链接?：[页面标题](#link)

引用文章?：<参考文献格式的简短信息>

许可证：<许可证>



转载信息上次更新于 <日期>

:::

解释：

- 修改状态：依据许可，在这里解释转载的文章`未修改`、`有少量修改`、`有补充和修改`。如果有修改或补充，建议将那一部分标记出来。

- 引用链接和引用文章：如果有引用链接，可以不写引用文章；如果有引用文章，引用链接可以不写，也可以标注原文所在书本的**官方**购买链接（非购物平台）、版权页面（实在没有就不写）

- 参考文献格式的简短信息：见[引用内容和参考文献](#引用内容和参考文献)。

- 许可证：允许的许可证有多种

  - 口头许可：

    - 公开口头许可：如果原文页面存在评论区，可以在评论区询问作者是否允许搬运到CSKB，你必须说明你要搬运到CSKB，例如：
      ```txt
      你好！这篇文章很棒，我能将它搬运/转载到知识库网站kb.corona.studio吗？
      ```

      在搬运的时候，要按照作者的要求进行搬运。此类许可证可以不标注在转载信息中。

    - 非公开口头许可：请求许可的过程与公开口头许可一致，只是转为通过私信原作者、给原作者发邮件来进行沟通。请保存好这类许可的原本证据。在`许可证`这一栏应填写指向许可截图的链接。

  - 公共许可证：无论是CC系列的共享许可证还是其他什么许可证，只需要在这里写明许可证的名称。当然也可以把许可证的公开链接附在名称上。

  - 购买许可：请向原作者索取许可凭证，按需插入链接指向凭证链接或凭证的截图。可以参考上文中【口头许可-非公开口头许可】的方式。

- 日期：成文的日期。你的实际文章公开时间是可查询的，因为CSKB合并分支的时候会留下记录。

### 非成员的作者声明

如果提交文章者并非Corona Studio的成员，首先，非常感谢您的无私贡献！但是我们建议您额外进行一些操作以保护您的权利，比如在**一级标题**后添加以下内容作为版权声明。

*如果您是从其他平台复制了这篇文章到CSKB，那么这段声明也适用。但是如果这篇文章并非您原创，而您却添加了这段标记，那么我们将会讨论对您的惩罚。请确保这篇文章为您的原创，并且妥善处理了一些可能引起版权纠纷的内容。*

::: info 原创文章

这篇文章由 `<作者名称>` 原创。<联系方式>

许可证：<许可证>

成文于：<日期>

<其他内容>

:::

解释：

- 作者名称：您活跃在圈子里用的昵称，或者其他能代表您本人的名字。
- 联系方式：可选，如果您希望读者能与您联系，请在这里留下合适的联系方式，您当然可以选择不填。
- 许可证：您可以选择在这里填入CC系列共享许可证，或是其他能指向许可证的链接，或是`禁止转载`、`未经许可禁止转载`这类文字声明。
- 日期：写完这篇文章时候的日期 。
- 其他内容：可以在这里写一些其他补充文本。建议不多于100字。

## 警告

### 未能及时更新内容

如果对应的软件服务发生了更迭但是文章内对应的信息并未来得及修改，可以添加这个标记以警告读者。

::: danger 内容过时

本文内涉及到的部分信息过时，可能与最新的情况不符。

<在这里可以写涉及的内容是哪些，或是一个文章内子标题列表>

:::

### 内容施工中

如果规划了一整篇文章但是碍于各种原因需要在部分内容未完成的情况下立刻部署提交大部分文章，务必添加类似如下的提示：

::: info WIP

内容施工中。

:::

### 内容准确性存疑

如果认为文章内存在未被核实的内容或不确定的言论，可以在文章的 **开头一级标题后** 和 **文章中任意位置** 添加这个标记。

::: warning 存疑

部分内容真实性或准确性存疑，但是为了表述文本，仍然展示了存疑的内容。

<有必要的话可以写免责声明>

<这里可以将存疑的部分和疑点写下>

::: details 疑点

<如果内容太长可以写在折叠框里>

:::



## 引用、更新与勘误记录

此类记录类文本可以直接使用无序列表置于文末。如果太长，可以使用`details`块来收折。这里的内容仅供参考，你可以按照 “太长就收折，一个也不能少” 的原则自由发挥。

### 引用内容和参考文献

写在列表里的参考文献信息必然不能像写json似的写得很详细，所以建议使用这样的格式一行写完。

::: warning Oops！
由于在统一全站的句号和逗号期间半角逗号加空格的组合被替换为了全角逗号，请在书写参考文献内容时依照语言使用对应的标点符号。
:::

```
文章，书名，作者，出版社（或平台），年份（或版次）

比如：
Программирование на MySQL，«Программирование на MySQL»，Алексей Калинин，ДМК Пресс，2020
```

对于一段三行的引用列表，可以这样写：

<br>
【参考文献 二级标题】

- Database Normalization Description，Microsoft Learn: Microsoft 365 troubleshooting by helenclu，simonxjx，venusmi，dariomws，MaryQiu1987; Microsoft，06.06.2024 (u)

- Программирование на MySQL，«Программирование на MySQL»，Алексей Калинин，ДМК Пресс，2020

- MySQL数据库入门，《Introducing MySQL Database》by 传智播客，清华大学出版社，01.03.2015

<br>
也可以这样写：

:::tip 参考文献

- Database Normalization Description，Microsoft Learn: Microsoft 365 troubleshooting by helenclu，simonxjx，venusmi，dariomws，MaryQiu1987; Microsoft，06.06.2024 (u)

- Программирование на MySQL，«Программирование на MySQL»，Алексей Калинин，ДМК Пресс，2020

- MySQL数据库入门，《Introducing MySQL Database》by 传智播客，清华大学出版社，01.03.2015

:::

### 更新记录

如果一篇文章需要记录每一次更新的内容，建议将其收折。<br>比如：

::: details 更新记录

2025年1月14日：更新内容需要简短

2025年5月14日：也可以在更新内容中加入链接

2025年8月10日：用于指向CSKB分支的提交记录

:::

### 勘误

勘误同样建议收折，但是如果前期内容很少，可以暂时不收折。<br>比如：

::: details 勘误

- codingEric 提出了在 [标题](#) 处关于xxx的错误
- [Feiron Iguista](mailto:frigeso@icloud.com) 提出了关于[别的内容](#link-to-github-issues-or-somewhere-else)的错误
- ……



感谢以上热心市民！

:::

## 其他

### 为一个段落启用段前缩进

::: danger 老腊肉不喜欢

由于老腊肉不喜欢段前缩进，所以不要滥用。

目前根据我们的规则，只有简体中文、繁体中文、日语、朝鲜语是有资格启用段前缩进的。

启用段前缩进，需要满足以下条件：

::: details 启用条件

-   只能出现在教程类文档中，或前后文段密集、无法分割、长度较长并且与标题粘合紧密。
-   在上下文中，只能依靠段前缩进平衡视觉感。
-   在版面中需要通过段前缩进来整合视觉条理。
-   在vitepress中，受制于布局和版面设计，为很短小的文段（大多数情况下不能占满一行的那种）启用段前缩进将会很丑。请在尝试使用后通过热重载预览来进行参考和比对，最终在提交前确认是否要启用。
-   必须是使用中文汉字、日文、朝鲜文这类语言文字的文档中才能启用。

:::

如果要给个别段落启用段前缩进，首先要在文章上启用扩展功能。<br>
在文档的最开头处添加：`@useFixer`即可启用扩展。
然后，你需要在此文章内的段落的末尾添加一个任意内容的`code`块，比如：

```markdown

这只是一个很短的段落而已，对于它而言不需要段首缩进。但是如果整个段落很长很长很长的话，或许为了视觉友好考虑，或是为了规整文字的调性、平衡视觉，我们可以启用这样的段前缩进。只需要注意，保证`code`块处于末尾，这样的话它会隐藏，而段首的缩进就会出现。`i`

```

它的效果如下：

这只是一个很短的段落而已，对于它而言不需要段首缩进。但是如果整个段落很长很长很长的话，或许为了视觉友好考虑，或是为了规整文字的调性、平衡视觉，我们可以启用这样的段前缩进。只需要注意，保证`code`块处于末尾，这样的话它会隐藏，而段首的缩进就会出现。`i`

-----

但是如果在这个code块后有其他文本内容，取消缩进将失效。比如：

```markdown

这只是一个很短的段落而已，对于它而言不需要段首缩进。但是如果整个段落很长很长很长的话，或许为了视觉友好考虑，或是为了规整文字的调性、平衡视觉，我们可以启用这样的段前缩进。只需要注意，保证`code`块处于末尾，这样的话它会隐藏，而段首的缩进就会出现。我们建议使用`i`作为标准的启用标签，这很合适，难道不是吗？

```

它的效果如下：

这只是一个很短的段落而已，对于它而言不需要段首缩进。但是如果整个段落很长很长很长的话，或许为了视觉友好考虑，或是为了规整文字的调性、平衡视觉，我们可以启用这样的段前缩进。只需要注意，保证`code`块处于末尾，这样的话它会隐藏，而段首的缩进就会出现。我们建议使用`i`作为标准的启用标签，这很合适，难道不是吗？

----

这意味着，正常的段落包含code块将不受影响。如果段末实在需要保留code块，请在段末添加一个标点符号。

::: warning 即便如此…

为了方便排查问题，尤其是在使用实时渲染编辑器的情况下（比如Typora），尽管任意段落末尾的code块都会被视作启用此段的缩进，也请遵循语义化规范在块内书写类似于`make-indent`/`indent`/`i`这样的内容，便于辨别，而不要使用空格：在实时渲染编辑器中仅空格的code块可能难以辨认。

:::