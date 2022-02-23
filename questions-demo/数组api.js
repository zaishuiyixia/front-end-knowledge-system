// const arr = [10, 20, 30, 40]

// // pop删除数组最后一项，返回删除的项，会改变原数组
// const popRes = arr.pop()
// console.log(popRes, arr)

// // shift删除数组第一项，返回删除的项，会改变原数组
// const shiftRes = arr.shift()
// console.log(shiftRes, arr)

// // push向数最后添加一个元素，返回值是添加后的数组长度，会改变原数组
// const pushRes = arr.push(50) // 返回 length
// console.log(pushRes, arr)

// // unshift向数组首位添加一个元素，返回值是添加后的数组长度，会改变原数组
// const unshiftRes = arr.unshift(5) // 返回 length
// console.log(unshiftRes, arr)

// // 纯函数：1. 不改变源数组（没有副作用）；2. 返回一个数组
// const arr = [10, 20, 30, 40]

// // concat合并数组，返回合并后的新数组，不会改变原数组
// const arr1 = arr.concat([50, 60, 70])
// // map 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的新数组，不会改变原数组
// const arr2 = arr.map(num => num * 10)
// // filter 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的新数组，不会改变原数组
// const arr3 = arr.filter(num => num > 25)
// // slice 剪切数组，返回剪切之后的数组，元素不会改变
// const arr4 = arr.slice()

// // 非纯函数
// // push pop shift unshift
// // forEach 对数组中的每一项运行给定函数，原数组不变，这个方法返回值是undefined
// // some every没有改变原数组，但返回的是true和false
// // reduce归并操作，每个方法接收两个参数[在每一项上调用的函数 | 作为归并基础的初始值（可选）],都会迭代数组每一项，返回一个最终的值。
// // 函数接收4个参数[前一个值 | 当前值 | 项的索引 | 数组对象本身],一般用于求数组之和

// const arr = [10, 20, 30, 40, 50]

// // slice 纯函数
// const arr1 = arr.slice()
// const arr2 = arr.slice(1, 4)
// const arr3 = arr.slice(2)
// const arr4 = arr.slice(-3)

// // splice 非纯函数，传入两个参数，第一个为位置（ 数组下标），第二个为删除的项数，可以删除任意项，返回删除元素组成的数组，原数组变了
// const spliceRes = arr.splice(1, 2, 'a', 'b', 'c')
// // const spliceRes1 = arr.splice(1, 2)
// // const spliceRes2 = arr.splice(1, 0, 'a', 'b', 'c')
// console.log(spliceRes, arr)

return parseInt(num, index);
// [10, 20, 30].map(parseInt)返回什么，考察：map和parseInt接受的参数和返回值
const res = [10, 20, 30].map(parseInt);
console.log(res);
// 拆解：[10, 20, 30].map(parseInt)相当于
[10, 20, 30].map((num, index) => {
  return parseInt(num, index);
});

// parseInt(string, radix):用于解析一个字符串并返回指定基数的十进制整数或者NaN

// string参数为被解析的值,如果该值不是一个字符串,则会隐式的使用toString()方法转化为字符串,字符串首尾的空格会被忽略,如果该值不能转化为数字或者第一个非空字符不能转化为数字则返回NaN

// radix可选参数,值为2~36之间的整数,解析的基数,例如2为二进制数,如果省略该参数或者该值为0,则会以十进制解析,如果该值小于2或者大于36,则会返回NaN。如果省略该参数,string以0x或0X开头,以16进制解析,string以0开头,以八进制或十六进制解析,以1~9开头,以10进制解析

// parseInt解析到的字符不是指定radix中的数字时,它会忽略该字符及其之后的字符,并返回已解析的十进制

// eg:

// parseInt(3.3) => 3; parseInt(3, 0) => 3;

// parseInt(3, 1) => NaN => 因为radix不能小于2

// parseInt('31', 2) => NaN => 因为在二进制中大于1的数是非法数

// parseInt('0xF', 16) => 15 => 十六进制中A=10 ~ F=15

// parseInt('F', 16) => 15; parseInt('-F', 16) => -15

// parseInt('0e0', 16) => 14*16 = 224

// parseInt('123', 5) => 38 => 1*5^2+2*5^1+3*5^1

// parseInt(021, 8) => 15 => 021.toString() = 17;相当于parseInt('17', 8)=15

// parseInt('abc') => NaN

// parseInt(4.7*1e18, 10) => 4

// parseInt(0.0000000000444, 10) => 4

// ['1', '2', '3'].map(parseInt) => [1, NaN, NaN]
// map方法的callback(currentVal, index, array)相当于
// [parseInt('1', 0), parseInt('2', 1), parseInt('3', 2)] => [1, NaN, NaN]
