import { options } from './lib/cmd.js';
import { loadCorpus, saveCorpus } from './lib/corpus.js';
import { generate } from './lib/generator.js';
import { createRandomPicker } from './lib/random.js';
import { interact } from './lib/interact.js';

// 将读取JSON文件的代码封装成一个函数loadCorpus
const corpus = loadCorpus('corpus/data.json');
// 通过pickTitle随机选择一个title
let title = options.title || createRandomPicker(corpus.title)();

// 通过async/await的方式，等待用户回答所有问题后，再进行文章生成的操作
(async function () {
  if (Object.keys(options).length <= 0) {
    const answers = await interact(
      /**
       * 设计一个问题的数据结构
       * 包含3个问题对象：
       * text —— 问题的文字描述
       * value —— 表示问题的默认值
       */
      [
        { text: '请输入文章主题', value: title },
        { text: '请输入最小字数', value: 6000 },
        { text: '请输入最大字数', value: 10000 }
      ]
    );
    title = answers[0];
    options.min = answers[1];
    options.max = answers[2];
  }
  // 调用generate函数，拿到article数组
  // options是相对应的配置项
  const article = generate(title, { corpus, ...options });
  const output = saveCorpus(title, article);

  console.log(`生成成功！文章保存于：${output}`);
})();
