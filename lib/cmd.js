/**
 * command-line-args 用来替代 process.argv，它不仅能获得用户的输入，还能检测用户的输入是否正确。
 *
 */
import commandLineArgs from 'command-line-args'; // 命令行参数
import commandLineUsage from 'command-line-usage'; // 命令行使用

const sections = [
  {
    header: '狗屁不通文章生成器',
    content: '生成随机的文章段落用于测试'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'title',
        typeLabel: '{underline string}',
        description: '文章的主题。'
      },
      {
        name: 'min',
        typeLabel: '{underline number}',
        description: '文章最小字数。'
      },
      {
        name: 'max',
        typeLabel: '{underline number}',
        description: '文章最大字数。'
      }
    ]
  }
];

const usage = commandLineUsage(sections);

const optionDefinitions = [
  { name: 'help' }, // 这里也要参加下help参数，为了给报错提醒使用
  { name: 'title', type: String },
  { name: 'min', type: Number },
  { name: 'max', type: Number }
];

// commandLineArgs是基于配置的，那么我们就可以把optionDefinitions传递进来
const options = commandLineArgs(optionDefinitions);

if ('help' in options) {
  // 判断命令中如果有 --help ，那么就打印使用帮助，否则就输出文章。
  console.log(usage);
  process.exit(); // process.exit(); 表示终止程序
}

export { options };
