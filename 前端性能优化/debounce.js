const input1 = document.getElementById("input1");

// let timer = null
// input1.addEventListener('keyup', function (event) {
//     if (timer) {
//         clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//         // 模拟触发 change 事件
//         console.log(input1.value)

//         // 清空定时器
//         timer = null
//     }, 500)
// })

// 防抖
function debounce(fn, delay = 500) {
  // timer 是闭包中的
  let timer = null;
  console.log("this", this); //window
  return function () {
    //接收keyup事件触发时传过来的事件对象event
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log("this", this); //input1
      console.log("arguments", arguments); //事件对象event
      fn.apply(this, arguments); //绑定this
      timer = null;
    }, delay);
  };
}

input1.addEventListener(
  "keyup",
  debounce(function (e) {
    console.log(e.target);
    console.log(input1.value);
  }, 600)
);

/**
 * 箭头函数的this、arguments详解
    1、箭头函数没有自己的this，arguments，super或new.target。
    2、它的this、arguments都是在定义函数时绑定外层的this和arguments，而不是在执行过程中绑定的，所以不会因为调用者不同而发生变化。
    3、箭头函数若想得到自身的入参列表arguments，必须使用剩余参数表示法。
    4、箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。
 */
// var obj = {};
// obj.fn = function(){
//     let arrow = (...args) =>{
//     console.log('入参列表 : ', arguments); //外层的入参列表
//     console.log('剩余参数 : ', args); //使用剩余参数表示法获得的自身入参列表
//     }
//     arrow(4,5,6)
// }

// obj.fn(1,2,3)

// 以下是输出结果

// 入参列表 : Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// 剩余参数 : [4, 5, 6]
