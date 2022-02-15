#### this

**this取什么值是在函数执行的时候确定的，不是在函数定义的时候确定的，this永远指向最后调用它的那个对象**

主要应用场景：

1、作为普通函数被调用
```
function fn1() {
  console.log(this);
}
fn1()  //window
```

2、使用call apply bind
```
function fn1() {
  console.log(this);
}

fn1.call({ x:100 })  //{ x:100 }

const fn2 = fn1.bind({x:200}) // bind会返回一个新的函数
fn2()  //{ x:200 }
```

3、作为对象方法被调用
this作为当前对象方法被执行时，返回当前对象
```
const zhangsan = {
  name: '张三',
  sayHi() {
    // this 即当前对象
    console.log(this)
  },
  wait() {
    // this 即当前对象
    console.log(this)
    setTimeout(function() {
      // this === window，函数的执行时setTimeout本身触发的执行并不是被zhangsan对象调用触发的执行
      console.log(this)
    })
  }
}
```

```
const zhangsan = {
  name: '张三',
  sayHi() {
    // this 即当前对象
    console.log(this)
  },
  waitAgain() {
    // this即当前对象
    console.log(this)
    setTimeout(() => {
      // this 即当前对象
      console.log(this)
    })
  }
}
```

4、在class的方法中调用
```
class People {
  constructor(name) {
    this.name = name
    this.age = 20
  },
  sayHi() {
    console.log(this)
  }
}
const zhangsan = new People('张三')
zhangsan.sayHi() //zhangsan对象
```

5、箭头函数
箭头函数没有this，它的this永远是取它上级作用域的this
```
const zhangsan = {
  name: '张三',
  sayHi() {
    // this 即当前对象
    console.log(this)
  },
  wait() {
    // this 即当前对象
    console.log(this)
    setTimeout(function() {
      // this === window，函数的执行时setTimeout本身触发的执行并不是被zhangsan对象调用触发的执行
      console.log(this)
    })
  }
}
```

