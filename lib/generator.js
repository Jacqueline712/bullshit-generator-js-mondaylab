/**
 * @description
 * ①实现文章生成的模块；
 * ②使用fs模块将生成的文章保存成文件。
 */

import {randomInt, createRandomPicker} from './random.js';

//
/**
 * 替换句子的通用方法
 * @param {*} pick 随机获取数据内容（比如famous、bosh等）的函数
 * @param {*} replacer 存放替换占位符的对象
 * @returns
 */
function sentence(pick, replacer) {
    let ret = pick(); // 返回一个句子文本
    for (const key in replacer) {
        // replacer是一个对象，存放替换占位符的规则
        // 如果 replacer[key] 是一个 pick 函数，那么让它执行「随机取一条替换占位符」的操作，否则将它直接替换占位符
        ret = ret.replace(
            new RegExp(`{{${key}}}`, 'g'),
            typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]
        );
    }
    return ret;
}

/**
 *
 * @param {*} title 文章主题
 * @param {*} corpus 语料库 JSON 文件（即corpus/data.json文件中读取的内容）
 * @param {*} min 文章配置信息-最少字数
 * @param {*} max 文章配置信息-最多字数
 * @returns
 */
export function generate(
    title,
    {
        corpus,
        min = 6000, // 文章最少字数
        max = 10000 // 文章最多字数
    } = {}
) {
    // 有了randomInt函数，就可以设置文章和段落的随机长度了
    const articleLength = randomInt(min, max);
    // 生成句子
    const {famous, bosh_before, bosh, said, conclude} = corpus;
    const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [
        famous,
        bosh_before,
        bosh,
        said,
        conclude
    ].map(createRandomPicker); // 体现函数式编程思想

    const article = [];
    let totalLength = 0;

    while (totalLength < articleLength) {
        let section = '';
        const sectionLength = randomInt(200, 500); // 每段200到500字
        while (section.length < sectionLength || !/[。？]$/.test(section)) {
            const n = randomInt(0, 100);
            if (n < 20) {
                section += sentence(pickFamous, {said: pickSaid, conclude: pickConclude});
            } else if (n < 50) {
                section += sentence(pickBoshBefore, {title}) + sentence(pickBosh, {title});
            } else {
                section += sentence(pickBosh, {title});
            }
        }
        totalLength += section.length;
        article.push(section);
    }

    return article;
}
