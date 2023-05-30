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
│   └── data.json
├── index.js 项目主文件，是一个可以运行的node.js脚本
├── lib 项目依赖的库文件
│   ├── generator.js 用来生成文章内容
│   └── random.js 用来提供随机算法
├── package.json 配置文件
└── output 存放项目输入结果

```