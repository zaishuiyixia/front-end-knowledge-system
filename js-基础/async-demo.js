// // 异步 （callback 回调函数）
// console.log(100)
// setTimeout(() => {
//     console.log(200)
// }, 1000)
// console.log(300)
// console.log(400)

// 同步
console.log(100)
alert(200) // 由于js单线程，同一时间只能干一件事，在浏览器执行的时候alert会弹出弹框如果不点关闭，则下面的代码不会执行300不会再控制台打印出来
console.log(300)
