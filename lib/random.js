/**
 * @description 返回一定范围内的整数，用来控制随机生成的文章和段落的长度范围。
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function randomInt(min = 0, max = 100) {
    const p = Math.random();
    // 对最小值和最大值进行线性插值，然后将结果向下取整即可
    return Math.floor(min * (1 - p) + max * p);
}

/*
function randomPick(arrs) {
  return arr[Math.floor(arrs.length * Math.random())];
}
*/

// 用过程抽象的方法，把random改成一个高阶函数
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
