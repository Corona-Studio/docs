# Skript脚本语言入门指南: 正式开始

:::tip 学习Skript语言需要您有较好的英语基础和敢于尝试的勇气，试一试一般不会有什么坏结果。

:::

[[toc]]

## 前提条件

您应该先阅读了「准备工作」章节，然后再阅读下文的进阶内容.

## 按要素入门

按照不同的语义元素进行循序渐进的分类介绍。

### Events 事件

Event(事件) 在符合条件地发生后（譬如，on shoot就是在某一实体发射了一个“projectile（发射物，比如雪球、箭之类的）”的那一瞬间触发。），才会触发脚本中对应的内容。一段脚本必须存在于一个event与表示“这是个event”的冒号之后，大概长这样：

`````skript
on shoot:
`````

event之前可以有空行，但是不能有空格。Event和以后会讲到的其他注册(方法注册、指令注册等)一样，都是定义了一段脚本开始执行的条件。在event之后，需要换行并打四个空格（或者在编辑器内按下tab键），之后开始写下在这个事件发生后，sk需要执行什么命令。对于Event的后续处理，sk保留了一系列可以直接调用的常/变量，详见SkriptHub文档.

值得注意的是，sk是缩进较为敏感的，类似yaml。缩进敏感这个词比较好从字面理解，就是说，对“一行字符相对输入起始的位置”有着严格要求。稍有不对的地方，都将会引发意外的问题。

(注：和yaml一样，你可以使用#开头的一段话作为注释，提醒你别忘了这段文字是要发挥什么作用的。)



### Condition 条件

这是sk用来判断情况的“条件”，结尾需要输入冒号，并换行，相对于这个condition再进行4个空格的缩进，然后继续输入条件或想要执行的效果（下节会讲）。当然，如果你想一次性写完所有同等级的条件，换行就不必向后缩进了。向后缩进代表着之后的内容是换行前的条件的下级。区别在于：

`````skript
on chat:#在玩家发消息时候触发
    if player's tool is a golden sword: # 假如发消息的玩家手持金剑
        broadcast "%sender%在讲话时握紧了手中的金剑"

    if player's tool is a golden shovel: # 假如手持金铲铲
        message "%sender%在讲话时握紧了手中的金拍子"
`````

这样子，两条if同级，会在分别满足条件的情况下执行不一样的效果。

而不同级则是 “下一条condition作为上一条的补充，细化对最终执行效果的限制条件”：

如果李华想要 史蒂夫 在 手持 铁剑 砍地 时候 说 “大宝剑！”，可能会说“If you holding an Iron sword，say ‘大宝剑！’.”。倘若需要Sk跨次元地转告史蒂夫呢？

`````skript
on click: # 在玩家的点击事件发生时候：
    if player's name is "Steve": # 只有史蒂夫能触发
        if player's tool is a iron sword: # 只有手持铁剑时候触发。
            make player execute command "/say 大宝剑！" # 好吧，终于说出口了！
            
            # 相信你也看到了，我这里使用了“a”而不是语法中对元音前冠词的要求“an”。
            # 实际上二者均可，sk不会像你的英语老师一样负责任地计较这种事情。
            # 对了，使用「#」来标注注释，在这个标记之后同一行的全部文本都是注释的内容，会被解释器忽略.
`````

如此相扣，是不是有点麻烦？通过你未来的深入了解，你会发现有些条件是可以同时制约的。那么前面两条介绍的末尾都需要加冒号并换行、第二行都必须要加一层缩进，本示例中最后一行代码表示的是什么？为什么末尾又不加冒号了？

### Effect 效果/执行效果

即，在满足前面限制的条件的情况下，对目标执行什么操作、会造成什么影响。这像是指令一般，让一切锦上添花，真正对游戏中的玩家或世界做出操作。而先前介绍的event、condition，则是“根”和“枝叶”。

在同一段effect或condition中需要执行的effect，必须在缩进上保持一致。换行时不会再需要向后缩进（就是说，不用在已有缩进的基础上继续往后缩进） 且分隔不同的effect只需要换行即可。（对于高级一点的编辑器，比如virtual studio code（简称vsc），在你完成一行effect的编写后换行，是直接与上一句“齐头并进”的。）

:::info 关于缩进规则

类似于Python，Skript实际上接受很多缩进种类，但是要求全篇的缩进都是一致的。比如说，你可以使用Tab，或者使用2个空格，或者4个空格; 但是你不能又用Tab又用空格.

:::

effect可以直接存在于event的下级：

`````skript
on command "/hello": # 当执行指令/hello时触发（即使这个指令不存在于你的服务器中）

  cancel event#取消操作/取消事件（取消触发本段脚本的那个事件）

# 也就是说，如果没有这句话且你的服务器没有hello这条命令，服务器会告诉玩家指令不存在。
# 此举旨在制造一种“有这个指令”的假象。
  broadcast "%sender%向诸位问好！"#在前面取消事件之后执行的指令，

# 在全服务器广播“%触发事件的玩家的ID%向诸位问好！”这句话。
# 本例子中使用的缩进是2空格
`````

也可以叠在无数层condition之后。就像李华如何跨次元让史蒂夫喊出“大宝剑！”那里的示范一样。

好了，那么那对百分号是什么？



### Placeholder&Expression 占位符和表达式

一些服主在接触插件时候或许有遇到一个和某网红一点关系都没有的插件：PlaceholderAPI（简称papi）。不过这里的Placeholder在安装附属「skript-placeholders」之前和papi并不互通，但是道理是一样的：占位符。

在一段文本中插入占位符，而一旦读取到占位符所指示的变量后，占位符将被那个变量的内容替代。

比如，我们的李华同学的游戏ID叫Li_Hua，在papi中要灵活表示玩家的名字时，就应该把占位符写作%player_name%。而在sk，需要表达为%player%(玩家)或%player's name%(玩家名，稍后的文档我们将探索各种相似的Expression的不同之处)。

你应该看出来了，前面限制“只有史蒂夫能触发”时候也出现了“player's name”，那么这个限制条件除了基于“if”表示“如果”的限制条件，还和这个占位符有什么关系？

很有关系。它们都属于expression（表达），抽象但又不完全抽象。任何表达都可以写到两个百分号之间，组成一个占位符，灵活地表示一段文字。

由此，我们可以写一个比较不好用但至少能用的玩家头衔脚本了！

`````skript
on join:#每次玩家加入到服务器世界时候触发
    player's name is "Steve":#这是Steve专用之雅号
        set player's displayname to "<gold><bold>世界之王 <aqua>史蒂夫！"#这是最简单的实现方式。

 # 一段脚本结束，另一端脚本开始。这发生在同一个sk文件中。

on chat:#在聊天时候

    cancel event#把嘴捂住（不让原生的消息显示出来）
    broadcast "%sender's displayname%<r>说 %message% <gray>并仰天长笑。"

 # 把所有玩家发送的消息广播出来，达成目标效果。
`````

那么，`<gold>`，`<r>`这些都是什么？

### Text（文本）的美化

Minecraft里会出现各种各样颜色的字。无论是手持颜料右键点击有文本的告示牌，或是在Essentials/EssentialsX（插件，简称ess）和/或papi的帮助下，使用&1&c&l之类的代码表示，都会有“被染色”的文字出现。乱码效果、斜体、粗体、鼠标悬浮提示、可以点击执行命令的“文本按钮”等等等等，都可以通过这种<>包围的一段标签代码来达到效果。在这段代码之后、直到新的代码出现之前，效果都会持续。

表示颜色、表示字体效果、表示功能的代码，见官方文档 https://docs.skriptlang.org/text.html 

以下是对官方文档的表格摘抄和翻译 (颜色代码查询请访问官方文档):

| 代码(原版) | 名称          | 别名         |
| ---------- | ------------- | ------------ |
| §k         | magic test    | obfuscated   |
| §l         | bold          | b            |
| §m         | strikethrough | strike，s    |
| §n         | underlined    | underline，u |
| §o         | italic        | italics，i   |
| §r         | reset         | r            |

（reset代表重置，即将其之后的显示效果还原为默认状态。）

| 名称            | 别名           | 描述                                                         |
| --------------- | -------------- | ------------------------------------------------------------ |
| link            | open url，url  | Opens a link when player clicks on text                      |
| run command     | command，cmd   | Makes player execute a chat command when they click on text  |
| suggest command | sgt            | Adds a command to chat prompt of player when clicked         |
| tooltip         | show text，ttp | Shows a tooltip when player hovers over text with their mouse |
| font            | f              | Change the font of the text (1.16+)                          |
| insertion       | insert，ins    | Will append a text at player's current cursor in chat input only while holding SHIFT。|

(对于这些交互功能，需要你这样设置标签代码：`<名称:执行的效果（可以是在cmd:后的一段命令）>` 详见示例)

由此，你可以制作一些简单的操作交互了！

`````skript
command /spawnpoint: # 回城！（前提是有这样一个主城可以返回）
    trigger:
        if {onev.%player%} is true: # 条件、效果都可以按你希望的顺序出现。把握好执行顺序即可。
            message "你有操作未完成。"

        else: # 只有带if的condition可以有else在同级出现。
            set {onev.%player%} to true # 变量设置为布尔值true，下节会讲到。
            message "<aqua>是<magneta>否<yellow>确<dark red>认<lime>？" # 花花绿绿，实际上影响观感。
            message "<cmd:res tp main><lime>【是】<cmd:canceltip><pink>【否】"
# 点击“【是】”触发里面的命令只在你有residence领地插件且设置了名为main的领地时有效。可以替换为任意命令。
# 在玩家打开聊天并点击“【是】”之后，指令会执行。而“【否】”对应什么命令？

command /canceltip: # 任何取消提示都可以使用这一条。哪怕不在同一个sk文件内。

    if {onev.%player%} is true:
        message "已取消操作。" to the sender # 这个to the sender指向message的发送对象。在触发event的是玩家时可以不写。
        set {onev.%player%} to false#尘埃落定，既然交互结束了，那就设置为完全相反的false吧！

on command "/res tp main":
    set {onev.%player%} to false#有始有终。
    broadcast "%sender's displayname%<r>回城了！"# 告知父老乡亲。而<r>旨在不让有displayname还染了色的玩家不会让后面的文字变色。
    
    # 在本例中，使用了注册指令的方法来实现指令接收。以后我们会探讨各种事件和其他调用脚本的方法.
`````

值得一提的是，不要把服务器所有不相干的功能都写在同一个sk文件里。那样不方便管理，也会影响性能。

接下来，把一些东西存下来吧！



### Variables 变量

变量，存储和交换信息的必要「介质」。  

**局部变量** ，暂时的变量，即类似{_actions}的由大括号包括的一段字符，开头必须由`_`符号标记。在当前这一段脚本执行结束后，将会消失。并且在不同段落的脚本之间不可互通，因此也不会形成冲突.

**临时变量** (暂定名称)，需要只在服务器开启期间于内存中存在的变量，使用`-`符号开头.

**全局变量** ，长期的变量，即类似`{actions}`的由大括号包括的一段字符，且开头没有上述符号。永远会在Skript插件于服务端取消注册的时候长期存在于服务器的本地文件里。( 默认在关闭服务器时会保存到Skript的插件文件夹的`variables.csv`中，或者根据数据库设置存储在数据库里。) 并且，全局变量可以跨文件使用。

变量可以包含几个占位符，用于保存不同玩家的不同状态。在Skript v2.6.1之后，Skript会建议你不要以占位符作为变量的开头，而是像`{adv.%player%}`这样，便于区分变量来源或作用、避免同名的变量的冲突。变量可以存储很多东西：纯数字、字符串、玩家（保存玩家名），在sk不能判断你要存的是什么类型的数据时候，只需要在用"set ..。to ..."之后加“parsed as ”和你要存的类型即可完成转换。

变量存在列表存储方式，其格式为: `{[-_]VariableName::Key}`， [-_] 代表着列表也可标识为局部变量或临时变量。 列表变量可以扩展为两个Key储存的形式，比如: `{VariableName::Key1::Key2}`，并且Key可以为数字。使用`{VariableName::*}`来代指整个列表。整个列表可以被loop语法遍历.

:::warning 官方建议

在Skript 2.7之后的版本中，官方建议为一个`.sk`文件中的所有全局变量添加固定的前缀以避免跨脚本文件的全局变量出现变量污染，即倘若脚本A包含一个`{variable}`被赋值为1，另外一个脚本B包含一个`{variable}`被赋值为"XPX"，将可能导致难以预测的意外。因此将脚本A中的那个全局变量命名为`{A.variable}`，脚本B中的那个全局变量命名为`{B.variable}`，将能避免这个问题.

但是我们建议，无论使用哪个版本的Skript，都要遵守这个规则。并且，若非是不得不使用全局变量的场合，不要使用全局变量。

:::

需要注意的是，expression和字符串(text，string) 可以视为特殊的变量。前者可能包含可读写的值，会对游戏产生影响; 后者可以通过模版表达式(成对的百分号`%`) 进行插入值 (插入expression或变量).

同时还有一种特殊的expression，它是与玩家紧紧相伴，像一个隐形标签的存储方式：元数据（metadata）—— 与某些路灯挂件喜欢炒作的某宇宙基本没关系。利用元数据，你可以存储各种玩家信息，使用方法与变量很相似。除非服务器重启，否则不会被清空。

而元数据可以帮助我们制作一些需要指向目标的功能 (比如说暂时存储一个状态的信息)。这个方法比较简单，也比较笨拙：

（假设你有安装ess）

`````skript
on command "/tpatoplayer":#这种复杂的命令最适合放在服务器菜单里。

    if sender is a player:#sender可能是command block（命令方块）或console（控制台，服务器后台）。你不能指望把命令方块传送走，或者把服务端丢到世界里去。

        cancel event

        set metadata value "going" of sender to true

        message "在聊天框发送你要传送到的玩家的ID，发送~/取消操作。"



on chat:

    if metadata value "going" of sender is true:

        set metadata value "going" of sender to false # 有始有终

        if message is "~/":

            cancel event

            make sender execute command "/canceltip" # 前面提到的万物皆可调用的取消提示信息

        else:#与取消操作的可能的条件同级

            make sender execute command "/tpa %message%" # 拼接为ess的传送指令并执行。对于较高版本的Minecraft，玩家可以在聊天框空着的时候按tab补全来选择目标玩家。然后作为消息发送即可。
`````

### Types 类型

skript针对“伤害来源（damage cause）”、“生物群系（biome）”等需要分类的不同事物有着规范化语言的要求。详见官方文档：https://docs.skriptlang.org/classes.html



### 试一试吧！

在保存好你写的脚本后，在后台执行命令 sk reload all（重载所有脚本和配置）sk reload scripts（仅重载所有脚本，别把script拼成skript了）或sk reload <某个脚本文件>（重载某一个脚本）！

不出错的情况下，就可以去看看服务器里面展示的效果了！祝你成功！

## 跋 & 一些好习惯

```text
这是我（法棍 of 日冕工作室）第一次尝试写教程。写得仓促，但绝对是我一个寒假以来所学的基础的浓缩。因此，会有不少纰漏，希望高人指出。以及我认为，相对简短的文字永远不能表达最准确的事实，所以读完这篇文章，或许需要你带着去实践、去翻阅文档，打好基础，然后迈出下一步：接触各种附属，包括且不限于SkBee、McQQBot、Skript-reflect等。另外，对于新手，我推荐尝试使用官方文档 https://docs.skriptlang.org ， 而 https://skripthub.net/ 包含除了本体之外的诸多附属的使用文档，以及更多示例。（嘛 使用文档！使用说明书啦！）按照文档示例来写，也不要忘记作合理的发散的尝试，这将有助于进步！（2022年2月17日 skript.cn的中文文档尚未就绪，将在不久的将来完成译制！ ）
```

⬆️ 这是本文最开始于2022年写就时候的跋。下文是2024年的跋.

时过境迁，如今我访问skript.cn指向的论坛却发现NXDOMAIN了，貌似很多skript资源都转移到了MineBBS? 但是无论如何，老腊肉想要CSKB成为汇聚Corona Studio相关所有知识的知识库，所以我把我所累不多的大脑中的知识翻了个遍，把这篇文章从我暂时消失的博客的数据库中找出来了，并且准备在CSKB这个平台上继续更新内容.

而一些好习惯呢，就是：

首先，学会听sk的诉求。你的代码、或是来自你一些新奇的尝试，可能并不能被skript理解。这时候你需要先过skript这一关。让skript载入这个脚本，看它如何报错？报错的原因是什么？理解报错原因，回去改正你很确信的错误，然后再试一次。

然后你再试了一次，可能还是不行。或许你这会应该去文档查询用法了：如果有这样的用法，那就找你的拼写错误：可能少了什么符号？可能什么地方打错了？如果没有这种用法，那么请先思考别的解决方案，然后在文档试着搜索别的解决方案的关键词。应该有所收获。甚至最终你可能发现，只是你的skript该更新了而已。skript每次更新迭代，都会带来新的功能，可能一切报错只是因为你使用的这个版本“还听不懂你要说什么”。

最终你或许成功让skript可以理解了。但是理解的对不对，有待你进入服务器的世界一探究竟。甚至可能需要你同时登录几个不同权限组的账户来测试！而且实现的效果也可能不是一蹴而就的——需要你不断地耐心调试。代码执行到哪里出现了问题？在你认为可能的地方插几句broadcast “<一个数字，能区分出问题的地方即可>”，重载，再尝试，逐渐找到问题的根源，解决它！

倘若实在遇到瓶颈，勿忘鼻子下面有大路，不羞于求问！但是也请谨记，在保证礼貌提问虚心请教同时，“没有日志（错误报告、log之类）的问题解决无异于闭眼开车（来自apache官方文档）”，明确表述需求与问题带上错误报告，也很有必要。

还有，对于一些需要重复使用多次且不会出现关于玩家的占位符的代码，可以由指令或者方法触发，在面向客户端操作时，用一段命令要求服务端执行触发指令即可。譬如我写的日历： https://github.com/fr1g/CalendarRealCount 。

最后，愿你能早日自由地实现你所想的新奇玩法! 或者在如此面向过程的友好脚本语言的帮助下，早日参悟属于你的编程方法!

2022年2月17日 06点08分 最早发布于https://bbs.smgoro.top/threads/skript.32/ |

2024年3月22日 转移到CSKB