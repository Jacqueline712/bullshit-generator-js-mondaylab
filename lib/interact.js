import readline from 'readline';

/**
 * 我们每次输出一个提问并的等待用户输入答案，所以将它封装成一个返回Promise的异步方法
 * @param {*} rl
 * @param {*} param1
 * @returns
 */
function question(rl, { text, value }) {
  const q = `${text}(${value})\n`;
  // 利用异步机制 —— Promise来结束用户输入的监听事件
  return new Promise((resolve) => {
    rl.question(q, (answer) => {
      resolve(answer || value);
    });
  });
}

/**
 * 实现一个interact.js的模块，
 * 让它接受我们定义好的一系列问题，
 * 并等待用户一一回答
 * @param {Array} questions
 * @returns
 */
// questions 是一个数组，内容如 {text, value}
export async function interact(questions) {
  // 通过 readline.createInterface创建一个可交互的命令行对象。
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const answers = [];
  /**
   * 然后，我们遍历questions数组，等待每一个问题的答案，
   * 并将答案存放在answers数组中readline.createInterface返回的对象有一个question方法，
   * 它是个异步方法，接受一个问题描述和一个回调函数 —— 用于接受用户的输入。
   */
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const answer = await question(rl, q);
    answers.push(answer); // 保存用户的输入，如果用户输入为空，则使用缺省值
  }
  rl.close();
  return answers;
}
