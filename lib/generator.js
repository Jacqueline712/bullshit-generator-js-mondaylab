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
    //
    /**
     * 生成文章规则：
     * 段落由句子组成，文章又由段落组成。
     * 规定每个段落的字数在 200~500 字之间。
     * 每个段落包含20%的名人名言（famous），80%的废话（bosh）。
     * 其中，废话里带前置从句（bosh_before）的废话占文章句子的30%，不带前置从句的废话占文章句子的50%。
     * 规定文章的字数在用户设置的最小字数到最大字数之间。
     */

    // 如果文章的字数 未超过 文章设置的总字数，则继续生成段落
    while (totalLength < articleLength) {
        // 添加段落
        let section = '';
        // 将段落长度设置为200到500字之间
        const sectionLength = randomInt(200, 500); // 每段200到500字
        // ①如果当前段落字数小于段落长度，或者当前段落不是以「句号。」和「问号？」结尾
        while (section.length < sectionLength || !/[。？]$/.test(section)) {
            // 取一个 0~100 的随机数
            const n = randomInt(0, 100);
            // 如果 n 小于20，生成一条名人名言，也就是文章中有百分之二十的句子是名人名言
            if (n < 20) {
                // 添加名人名言
                section += sentence(pickFamous, {said: pickSaid, conclude: pickConclude});
            }
            // 如果 n 小于50，生成一个带有前置从句的废话
            else if (n < 50) {
                // 添加带前置从句的废话
                section += sentence(pickBoshBefore, {title}) + sentence(pickBosh, {title});
            }
            // 否则生成一个不带有前置从句的废话
            else {
                // 添加不带前置从句的废话
                section += sentence(pickBosh, {title});
            }
        }
        // 段落结束，更新总长度
        totalLength += section.length;
        // 将段落存放到文章列表中
        article.push(section);
    }
    // 将文章返回，文章是段落数组的形式
    return article;
}
