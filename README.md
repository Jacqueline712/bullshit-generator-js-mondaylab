# 狗屁不通文章生成器

这是原版：https://github.com/menzi11/BullshitGenerator 的改进版本。

用 Node.js 重写，改良了一点点策略。

在线访问 https://akira-cn.github.io/bullshit-generator-js

## 改进点

- 语句更通顺了些（虽然还是狗屁不通🐶）。
- 不会出现两句连着重复的鬼畜情况。
- 段落结尾的句子结构是完整的。





## 文章结构

```
.
├── corpus 存放语料库文件
	  ├── data.json
├── index.js 项目主文件，是一个可以运行的node.js脚本
├── lib 项目依赖的库文件
	  ├── cmd.js 实现带参数的命令行交互
   	  ├── generator.js 用来生成文章内容
       ├── random.js 用来提供随机算法
	  ├── corpus.js 语料库，用来加载和保存文件功能（即loadCorpus和saveCorpus）
	  ├── interact,ts 文章生成器的交互过程
├── package.json 配置文件
└── output 存放项目输入结果

```



data.json：

- famous —— 名人名言
- bosh —— 废话
- bosh_before/said/conclude —— 用来修饰和替换famous以及bosh里面的内容



两种读取命令行参数的方式：

- `process.argv`
- `command-line-args`



两种命令行交互的方式：

- `process.stdin` —— `process.stdin`是异步的，它继承`EventEmitter`对象，能够派发和监听事件。
- `readline` —— node.js为我们提供的一个更好的内置模块，它是专门用来实现可交互命令行的。
- `process.stdout.write` —— 可以向终端输出字符，可以理解为和`cosole.log`一样的效果。区别是 `console.log` 支持多个参数，且能够格式化字符串并自动输出回车符。也就是说，`console.log`基本上可以替代`process.stdout.write`功能且更强大，所以我们就基本上不需要使用`process.stdout.write`了。不过呢，如果我们不希望输出回车换行到终端，那还是可以使用`process.stdout.write`的。
- ``













