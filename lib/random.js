/**
 * @description 返回一定范围内的整数，用来控制随机生成的文章和段落的长度范围。
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function randomInt(min = 0, max = 100) {
    const p = Math.random();
    // 对最小值和最大值进行线性插值，然后将结果向下取整即可
    // 线性插值相关文章: https://juejin.cn/post/7205957899654807611
    return Math.floor(min * (1 - p) + max * p);
}

/*
function randomPick(arrs) {
  return arr[Math.floor(arrs.length * Math.random())];
}
*/

// 用过程抽象的方法，把random改成一个高阶函数
/**
 * 用高阶函数的一个重要原因：我们的语料库只需要在初始化时加载一次，而随机语料的获取操作要进行许多次。
 * 那么我们直接用高阶函数在 createRandomPicker 的时候，通过函数闭包将语料库的数组绑定到返回的 randomPick 过程里，
 * 就不用在每次随机获取的时候都传入数组参数了，使用上更方便。
 */
export function createRandomPicker(arr) {
    arr = [...arr]; // copy 数组，以免修改原始数据
    // randomPick方法，可以从数组中随机选择元素
    function randomPick() {
        const len = arr.length - 1; // 将随机取数的范围从数组长度更改为数组长度减一，这样就不会取到最后一位的元素
        const index = randomInt(0, len);
        const picked = arr[index];
        /**
         * 防止重复逻辑：
         * 把每次取到的元素和数组最后一位的元素进行交换，这样每次取过的元素下一次就在数组最后一位，下一次也就不能取到它了。
         * 而下一次取到的数又会将它换出来，那么再一次就又能取到它了。
         */
        [arr[index], arr[len]] = [arr[len], arr[index]];
        return picked;
    }
    randomPick(); // 抛弃第一次选择结果
    return randomPick;
}

/**
 * 总结：
 * ①randomInt 返回一定范围内的整数，用来控制随机生成的文章和段落的长度范围。
 * ②randomPick 函数能够从语料库的数组中随机地选择元素，并返回。
 */
