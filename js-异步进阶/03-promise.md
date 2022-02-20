# Promise

- 三种状态
- 状态和 then catch
- 常用 API

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。
Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部，内部抛出的错误不会阻碍外部代码的继续执行。
第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

Promise 的基本使用

```js
// 加载图片
function loadImg(src) {
    const p = new Promise(
        (resolve, reject) => {
            const img = document.createElement('img')
            img.onload = () => {
                resolve(img)
            }
            img.onerror = () => {
                const err = new Error(`图片加载失败 ${src}`)
                reject(err)
            }
            img.src = src
        }
    )
    return p
}
const url = 'https://img.mukewang.com/5a9fc8070001a82402060220-140-140.jpg'
loadImg(url).then(img => {
    console.log(img.width)
    return img
}).then(img => {
    console.log(img.height)
}).catch(ex => console.error(ex))
```

## 三种状态

三种状态 pending（进行中）、fulfilled（已成功）和rejected（已失败）
1. pending 状态,不会触发then和catcht
2. fulfilled 状态,会触发后续的then回调函数
3. rejected 状态,会触发后续的catch回调函数

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。

```js
// 刚定义时，状态默认为 pending
const p1 = new Promise((resolve, reject) => {

})

// 执行 resolve() 后，状态变成 resolved
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    })
})

// 执行 reject() 后，状态变成 rejected
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject()
    })
})

```

```js
// 直接返回一个 resolved 状态
Promise.resolve(100)
// 直接返回一个 rejected 状态
Promise.reject('some error')
```

**注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。**
```
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```
上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。
这是因为立即 resolved (reject同理)的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

```
Promise.resolve(123).then(res => {
    console.log('res1', res)
}).then(res => {
    console.log('res2', res)
})
Promise.resolve(234).then(res => {
    console.log('res3', res)
    return 456
}).then(res => {
    console.log('res4', res)
})

// 打印结果：
// res1 123
// res3 234
// res2 undefined
// res4 456
```

## 状态和 then catch

状态变化会触发 then catch，**then和catch方法会返回新的promise**

- pending 不会触发任何 then catch 回调
- 状态变为 fulfilled 会触发后续的 then 回调
- 状态变为 rejected 会触发后续的 catch 回调

-----

then catch 方法会继续返回新的Promise ，**此时可能会发生状态变化！！！**。新的Promise的状态要看then和catch的返回值决定

总的来说，就是分为：
1. return 非promise或者error错误的正常值，返回的Promise会成为Fulfilled状态。return的值会作为Promise对象下一个then的回调函数的参数值
2. 无return的情况下即返回undefined，也是返回值，此时新的promise状态为Fulfilled状态
3. throw error，新的promise状态为rejected状态
4. return Promise，这种情况then和catch返回的新的promise的状态，取决于return的promise的状态

```
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result)) // 不会执行
  .catch(error => console.log(error)) // Error: fail
```
上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，
导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。

```js
// then() 一般正常返回 resolved 状态的 promise
Promise.resolve().then(() => {
    return 100
})

// then() 里抛出错误，会返回 rejected 状态的 promise
Promise.resolve().then(() => {
    throw new Error('err')
})

// catch() 不抛出错误，会返回 resolved 状态的 promise
Promise.reject().catch(() => {
    console.error('catch some error')
})

// catch() 抛出错误，会返回 rejected 状态的 promise
Promise.reject().catch(() => {
    console.error('catch some error')
    throw new Error('err')
})
```

看一个综合的例子，即那几个面试题

```js
// 第一题
Promise.resolve().then(() => {
    console.log(1)
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})
// 执行结果：
//1
//3

// 第二题
Promise.resolve().then(() => { // 返回 rejected 状态的 promise
    console.log(1)
    throw new Error('erro1')
}).catch(() => { // catch方法 返回 resolved 状态的 promise
    console.log(2)
}).then(() => {
    console.log(3)
})
// 执行结果：
//1
//2
//3

// 第三题
Promise.resolve().then(() => { // 返回 rejected 状态的 promise
    console.log(1)
    throw new Error('erro1')
}).catch(() => { // 返回 resolved 状态的 promise
    console.log(2)
}).catch(() => { // 不会执行
    console.log(3)
})
// 执行结果：
//1
//2

```
