import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';
import moment from 'moment';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function loadCorpus(src) {
    const path = resolve(__dirname, '..', src);
    const data = readFileSync(path, {encoding: 'utf-8'});
    return JSON.parse(data);
}

/**
 * 将生成的文章保存下来
 * @param {*} title
 * @param {*} article
 * @returns
 */
export function saveCorpus(title, article) {
    const outputDir = resolve(__dirname, '..', 'output');
    // 对输出的文件目录做时间戳处理
    const time = moment().format('|YYYY-MM-DD|HH:mm:ss');
    const outputFile = resolve(outputDir, `${title}${time}.txt`);

    // 检查outputDir是否存在，没有则创建一个
    /**
     * existsSync 判断当前文件目录是否有output子目录，如果没有的话，
     * 则通过mkdirSync创建它，然后通过writeFileSync将文章内容写入对应的文件。
     */
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir);
    }
    // 通过字符串的join方法，将数组里面的段落内容拼成文章
    const text = `${title}\n\n    ${article.join('\n    ')}`;
    // 将text写入outputFile文件中
    writeFileSync(outputFile, text);

    return outputFile;
}
