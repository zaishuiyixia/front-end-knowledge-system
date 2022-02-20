### js如何执行

从前往后，一行一行执行

如果某一行执行报错，则停止下面代码的执行

先把同步代码执行完，再执行异步代码
### event loop（事件循环/事件轮询）机制

由于js是单线程运行的，所以我们需要异步来处理需要等待的任务，避免造成等待过程中阻塞下面代码的执行。

异步是基于回调来实现的，而回调又是通过event loop实现的，异步（setTimeout、ajax等）使用回调基于event loop。

DOM事件也使用回调，基于event loop，但不要把DOM事件和异步搞混，DOM事件不是异步。

### event loop 执行过程

同步代码，一行一行放在Call Stack(调用栈)执行

遇到异步，会先“记录”下，等待时机（定时、网络请求等）

时机到了（比如定时完成后），就移动到Callback Queue（调用队列）

如Call Stack为空（即同步代码执行完）Event Loop开始工作

轮询查找Callback Queue，如有则移动到Call Stack执行

然后继续轮询查找（永动机一样）

```
console.log('Hi')

setTimeout(function cb1() {
    console.log('cb1')
}, 5000)

console.log('Bye')
```

代码执行过程：
1. 将 console.log("Hi") 推入调用栈，调用栈会执行代码
2. 执行代码，控制台打印“Hi”，调用栈清空
3. 执行 setTimeout，setTimeout由浏览器定义，不是ES6的内容；将定时器暂存起来（涉及浏览器实现不细纠到底存放到哪），到时间后再将回调函数放到Callback Queue回调函数队列中
4. 执行完了setTimeout， 清空调用栈
5. console.log("Bye")进入调用栈，执行，调用栈清空
6. 同步代码被执行完,，回调栈空，浏览器内核启动时间循环机制
7. 五秒之后，定时器将cb1推到回调函数队列中
8. 事件循环将cb1放入调用栈执行