const isVal = (n) => {
    const numReg = /(^[1-9]([0-9])*)|(^0$)$/;

    return numReg.test(n);
}

/** @desc 大数相乘n1*n2 */
const mul = (n1, n2) => {
    const num1 = `${n1}`;
    const num2 = `${n2}`;

    if (!isVal(num1) || !isVal(num2)) return '0';

    if (num1 === '0' || num2 === '0') return '0';

    const result = [];

    for (let i = num1.length - 1; i >= 0; i -= 1) {
        for (let j = num2.length - 1; j >= 0; j -= 1) {
            // 十位存储位
            const pos1 = i + j;
            // 个位存储位
            const pos2 = i + j + 1;

            // 位数相乘，并且加上个位数的值
            const mulNum = num1[i] * num2[j] + (+result[pos2] || 0);
            // 两个一位数相乘不会大于两位数，所以把结果分为十位和个位存储
            const tens = Math.floor(mulNum / 10) + (+result[pos1] || 0);
            const unit = mulNum % 10;

            result[pos1] = tens;
            result[pos2] = unit;
        }
    }

    return result.join('').replace(/^0+/, '');
};

/** @desc 大数相加 n1+n2 */
const plus = (n1, n2) => {
    const num1 = `${n1}`;
    const num2 = `${n2}`;

    if (!isVal(num1) || !isVal(num2)) return '';
    
    const arr1 = num1.split('');
    const arr2 = num2.split('');

    let result = '';
    let flag = 0;

    while (arr1.length || arr2.length || flag) {
        // 没有就是0
        flag += ~~arr1.pop() + ~~arr2.pop();
        // result只取个位
        result = `${flag % 10}${result}`;
        // 十位放到flag中参与下一次计算
        flag = Math.floor(flag / 10);
    }

    return result.replace(/^0+/, '');
};

/** @desc 大数相减 n1-n2 */
const sub = (n1, n2) => {
    const num1 = `${n1}`;
    const num2 = `${n2}`;

    const arr1 = num1.split('');
    const arr2 = num2.split('');

    if (!isVal(num1) || !isVal(num2)) return '';

    // 负数
    if (
        arr1.length < arr2.length
        || (arr1.length === arr2.length && n1 < n2)
    ) return `-${sub(n2, n1)}`;

    let result = '';
    let flag = 0;

    // n1肯定比n2大，所以以n1长度为准
    while (arr1.length) {
        // 不管够不够，都从前一位借1
        flag = 10 + ~~arr1.pop() - ~~arr2.pop() + flag;
        result = `${flag % 10}${result}`;
        flag = Math.floor(flag / 10) - 1;
    }

    return result.replace(/^0+/, '');
};

/** @desc 大数幂运算 */
const pow = (n, m) => {
    const num1 = `${n}`;
    let num2 = `${m}`;

    if (+m === 0) return '1';

    if (!isVal(num1) || !isVal(num2)) return '';

    let result = num1;

    while (num2 > 1) {
        result = mul(result, num1);
        num2 = sub(num2, 1);
    }

    return result;
}
