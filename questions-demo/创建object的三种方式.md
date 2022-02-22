### 创建对象的几种方式

1. 直接字面量方法创建：var obj = {}
2. new关键字创建：var obj = new Object()
3. Object.create创建

**new关键字创建**：
```
var objB = new Object();
// var objB = Object();
objB.name = 'b';
objB.sayName = function() {
    console.log(`My name is ${this.name} !`);
}
objB.sayName();
console.log(objB.__proto__ === Object.prototype); // true
console.log(objB instanceof Object); // true
```

new操作符其实做了以下几步：
1. 创建一个新的空对象
2. 将新对象的__proto__指向构造函数的prototype
3. 将构造函数的this设置为新对象，执行构造函数的代码为新对象赋值
4. 如果构造函数没有return，则将新对象返回。如果有return且返回的值是对象，则将这个对象返回，如果return的值是原始值则忽略返回新创建的对象
```
function Test(name) {
  this.name = name
  return 1
}
const t = new Test('xxx')
console.log(t.name) // 'xxx'

function Test(name) {
  this.name = name
  console.log(this) // Test { name: 'xxx' }
  return { age: 26 }
}
const t = new Test('xxx')
console.log(t) // { age: 26 }
console.log(t.name) // 'undefined'
```

**Object.create(proto, properties)方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__**

proto必填参数，是新对象的原型对象，如上面代码里新对象me的__proto__指向person。注意，如果这个参数是null，那新对象就彻彻底底是个空对象，没有继承Object.prototype上的任何属性和方法，如hasOwnProperty()、toString()等

```
var a = Object.create(null);
console.dir(a); // {}
console.log(a.__proto__); // undefined
console.log(a.__proto__ === Object.prototype); // false
console.log(a instanceof Object); // false 没有继承`Object.prototype`上的任何属性和方法，所以原型链上不会出现Object
```

properties是可选参数，指定要添加到新对象上的可枚举的属性（即其自定义的属性和方法，可用hasOwnProperty()获取的，而不是原型对象上的）的描述符及相应的属性名称。

```
var bb = Object.create(null, {
    a: {
        value: 2,
        writable: true,
        configurable: true
    }
});
console.dir(bb); // {a: 2}
console.log(bb.__proto__); // undefined
console.log(bb.__proto__ === Object.prototype); // false
console.log(bb instanceof Object); // false 没有继承`Object.prototype`上的任何属性和方法，所以原型链上不会出现Object

// ----------------------------------------------------------

var cc = Object.create({b: 1}, {
    a: {
        value: 3,
        writable: true,
        configurable: true
    }
});
console.log(cc); // {a: 3}
console.log(cc.hasOwnProperty('a'), cc.hasOwnProperty('b')); // true false 说明第二个参数设置的是新对象自身可枚举的属性
console.log(cc.__proto__); // {b: 1} 新对象cc的__proto__指向{b: 1}
console.log(cc.__proto__ === Object.protorype); // false
console.log(cc instanceof Object); // true cc是对象，原型链上肯定会出现Object
```

Object.create()创建的对象的原型指向传入的对象。跟字面量和new关键字创建有区别

### 总结

- 字面量和new关键字创建的对象是Object的实例，原型指向Object.prototype，继承内置对象Object
- Object.create(arg, pro)创建的对象的原型取决于arg，arg为null，新对象是空对象，没有原型，不继承任何对象；arg为指定对象，新对象的原型指向指定对象，继承指定对象

