# 注册起始点

:::tip 本文中起始点是包含了Event、Function、Command之类触发脚本具体逻辑的、作为一段脚本第一行和其相关配置的内容.

:::

[[toc]]

## 定义

**起始点** :   是定义一段脚本触发起点的语句，一般包含事件、方法、指令。严格来说，指令注册相当于一种特殊的事件监听，而指令也可以视为一种可以在游戏或控制台中快捷调用的方法。

## 类型

### Event 事件

事件是最基础的、与Bukkit事件关联紧密的触发器，一般随着事件触发也会附带一些和当前触发事件相关的局部变量，但是这些事实上的局部变量使用 表达(expression) 的方式使用。比如对于事件`on explode`，存在表达`event-location`表示「单个爆炸事件发生时的位置」，诸如此类。它们传递了事件相关的具体信息。此外，如果您学过JavaScript，可以将这一系列表达视为 object.addEventListener(event，eventCallback，…) 中，eventCallback可以作为参数接受的Event对象.

要注册事件，将事件以0缩进置于单行，并在事件名称后加上冒号，换行后的内容直到下一个起始点之前都属于一段脚本.

`````skript
 # 注册投掷物击中事件监听
 on projectile hit:
 		event-block is gravel:
 				broadcast "Hit on a gravel" 
`````



### Function 方法/函数

方法是相对安全的一段被封装的逻辑，可以返回一个值用于在调用后赋值给变量。它可以接受多个参数并进行处理.

要注册方法，以0缩进开始按照格式编写方法声明:

`````skript
# 如果需要返回值 (即，如果方法计算结果需要被赋值给变量(插入字符串也算赋值变量)):
function NameOfFunction(argumentName: <Type> ...):: <Optional Return Type>:

# 或者，如果不需要返回值(返回为void/<null>):
function NameOfFunction(argumentName: <Type>):

# 换行后的一个缩进内容开始即为方法的逻辑内容
# <Type>/<Optional Return Type>为传入参数的sk内置类型，比如: text，player，number...
# 方法名不可重复.
`````

并在次行以一个单位的缩进开始编写逻辑.

换行后的内容直到下一个起始点之前都属于一段脚本方法的内容.



### Command 命令

命令可以视为一个可通过游戏内指令触发的方法，因为它可以接受参数。但是它不能替代方法，原因是:

- 不能直接返回值到调用的脚本语句中。但是可以在处理逻辑的最后将结果赋值给一个全局变量.
- 脚本内调用任何命令都必须使用`make xxx execute command`， 因此传参类型的选择更少.

要开始定义一个命令，需要以0缩进开始按格式编写命令声明:

````skript
 # 请通过实际测试来确认同名指令覆盖的情况.
command /commandName <...args>: # 在此之后一个缩进的内容是声明命令的属性.
		<...properties>
		trigger:
				
				# 在trigger后一个缩进的内容会被视为命令的逻辑内容.
				
 # <...args>: 可选的参数定义。如果希望命令能够接受参数，使用以下方式为参数添加「槽位」:
 		# command /commandName [<Type>]:  
    # 实际使用中，预留的参数位可以不填。对应的逻辑需要在编写脚本逻辑时候自行判断.
    # 依照定义的参数顺序，可以在逻辑中使用expression “arg-x” (x为从1开始的参数序号)来取得传入的值.
    # 比如: command /ACommand [<text>] [<text>]: 接受两个参数，arg-1即为第一个[<text>]
    
 # <...properties>: 除了trigger这个必要属性之外的一切可选属性。下文会介绍各个可选属性.
 # 这些属性都需要在trigger之前.
````

:::warning 请注意

在实际运用中，可能会出现命令传入数字然后进行计算的情况。但是Skript解释器有可能将`arg-1`识别为「arg减去1」.

为了避免这种情况引发的意外，请尝试改用以下expression中的其他形式表达参数

:::

源代码中，解释器接受以下表达来指代参数:

```sk
[the] last arg[ument][s]
[the] arg[ument][s](-| )%number%
[the] (1st|2nd|3rd|4-90th) arg[ument][s]
[the] arg[ument][s]
[the] %type%( |-)arg[ument][( |-)%number%]
[the] arg[ument]( |-)%type%[( |-)%number%]
```

示例:

```sk
the last argument
arg-1
argument 6
13th arguments
the argument
the player argument
arg-item type-3
```

摘抄自: [Skript Hub Tutorial文章 by Blueyescat](https://skripthub.net/tutorials/10)。



## 扩展

### Command声明时的可选属性

可选属性的值直接用双引号包裹并写在属性名的冒号后方.

**executable by**: 可被执行的对象，可选: player，command block，console
　　**usage**: 接受text，用于向客户端返回此命令的用法.
　　**description**: 接受text，提供给其他插件的命令描述。
　　**permission**: 接受text，可以是权限管理插件的权限组.
　　**permission message**: 接受text，在无权限使用指令时的错误信息。比如「你无权使用!」
　　**cooldown**: 接受数字+时间单位，这是命令使用的冷却时间。比如: cooldown: 10 seconds
　　**cooldown message**: 接受text，在尝试于冷却期内使用命令时的错误信息.
　　**cooldown bypass**: 接受text，可以绕过冷却的权限名称，可以是权限管理插件的权限组.
　　**cooldown storage**: 接受一个变量，将可以通过全局变量保存玩家的冷却阶段，并且冷却将在服务器重启/插件重载后持续生效。<br>　　**aliases**: 接受直接输入，定义这个指令的别名

*待补充*



### options定义

一般可以将这类入口声明在文件最开头的地方。它接受一系列预设的变量定义。它不包含具体的逻辑.

在此定义的内容可以通过`{@Name}`作为变量调用.



