# async/await

- 语法介绍
- 和 Promise 的关系
- 异步本质
- for...of

**有很多 async 的面试题，例如** 
- async 直接返回，是什么
- async 直接返回 promise
- await 后面不加 promise
- 等等，需要找出一个规律

## 语法介绍

用同步的方式，编写异步。

异步回调callback hell（回调地狱），基于回调函数

Promise then catch 链式调用，但也是基于回调函数

async/await（只是在语法层面用同步语法编写异步代码，赢不能改变JS还是单线程，还是得有异步，回调还是得基于event loop，async/await只是一个语法题）是同步语法写异步，彻底消灭回调函数来写异步

```js
function loadImg(src) {
    const promise = new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            reject(new Error(`图片加载失败 ${src}`))
        }
        img.src = src
    })
    return promise
}

async function loadImg1() {
    const src1 = 'http://www.imooc.com/static/img/index/logo_new.png'
    const img1 = await loadImg(src1)
    return img1
}

async function loadImg2() {
    const src2 = 'https://avatars3.githubusercontent.com/u/9583120'
    const img2 = await loadImg(src2)
    return img2
}

(async function () {
    // 注意：await 必须放在 async 函数中，否则会报错
    try {
        // 加载第一张图片
        const img1 = await loadImg1()
        console.log(img1)
        // 加载第二张图片
        const img2 = await loadImg2()
        console.log(img2)
    } catch (ex) {
        console.error(ex)
    }
})()
```

## 和 Promise 的关系

- 执行 async 函数返回结果都是 Promise 对象（如果函数内没返回 Promise ，则会封装成一个Promise对象去返回）
- await相当于Promise的then
- try...catch可捕获异常，代替了Promise的catch

```js
async function fn2() {
    return new Promise(() => {})
}
console.log( fn2() ) // Promise {<pending>}

async function fn1() {
    return 100 //相当于return Promise.resolve(100)
}
const result = fn1() // 执行async函数，返回的是一个Promise对象
console.log( result ) // Promise {<fulfilled>: 100} 相当于 Promise.resolve(100)
result.then(data => {
    console.log('data', data) // 100
})
```

- await 后面跟 Promise 对象：会阻断后续代码，等待状态变为 resolved ，才获取结果并继续执行
- await 后续跟非 Promise 对象：会直接返回

```
async function fn() {
    return 100
}
(async function () {
    const a = fn() // ??
    console.log('a', a)
    const b = await fn() // ??
    console.log('b', b)
})()

// a是一个Promise对象：Promise {<fulfilled>: 100}
// b是100
```

```js
(async function () {
    const p1 = new Promise(() => {})
    await p1
    console.log('p1') // 不会执行
})()

(async function () {
    const p2 = Promise.resolve(100)
    const res = await p2
    console.log(res) // 100
})()

(async function () {
    const res = await 100 //相当于await Promise.resolve(100)
    console.log(res) // 100
})()

(async function () {
    const p3 = Promise.reject('some err')
    const res = await p3 //await相当于Promise的then只能处理成功的情况，不能处理失败的情况，所以代码到这里就停止了不会向下执行
    console.log(res) // 不会执行
})()
```

- async/await 使用 try...catch 捕获 rejected 状态，代替了Promise的catch

```js
(async function () {
    const p4 = Promise.reject('some err')
    try {
        const res = await p4
        console.log(res) //不会执行
    } catch (ex) {
        console.error(ex) // some err
    }
})()
```

总结来看：

- async 封装 Promise
- await 处理 Promise 成功
- try...catch 处理 Promise 失败

## 异步本质

await 是同步写法，但本质还是异步调用。

```js
async function async1 () {
  console.log('async1 start')
  await async2()
  // await后面的内容都作为回调内容——微任务回调，所以不会立即执行而是放到调用队列中等待执行
  console.log('async2 end') // 关键在这一步，它相当于放在 callback 中，最后执行
  await async3()
  console.log('async1 end')
}

async function async2 () {
  console.log('async2')
}

async function async3 () {
  console.log('async3')
}

setTimeout(() => {
    console.log('timer')
}, 0)

console.log('script start')
async1()
Promise.resolve().then(() => {
    console.log(123)
})
console.log('script end')

// 打印结果
// script start
// async1 start
// async2
// script end
// async2 end
// async3
// 123
// async1 end
// timer
```

即，只要遇到了 `await` ，后面的代码都相当于放在 callback 里。

## for...of在异步场景中的应用

```js
// 定时算乘法
function multi(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * num)
        }, 1000)
    })
}

// // 使用 forEach 或者for...in（是常规的同步遍历，一次性的把所有的遍历完），是 1s 之后打印出所有结果，即 3 个值是一起被计算出来的
// function test1 () {
//     const nums = [1, 2, 3];
//     nums.forEach(async x => {
//         const res = await multi(x);
//         console.log(res);
//     })
// }
// test1();

// 使用 for...of 常用于异步遍历，可以让计算挨个串行执行
async function test2 () {
    const nums = [1, 2, 3];
    for (let x of nums) {
        // 在 for...of 循环体的内部，遇到 await 会挨个串行计算，等到第一个有结果了才回去遍历执行第二个，而forEach和for in是一次性的把所有的遍历完
        const res = await multi(x)
        console.log(res)
    }
}
test2()
```
