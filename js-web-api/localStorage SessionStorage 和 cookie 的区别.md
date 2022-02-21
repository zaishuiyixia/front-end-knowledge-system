### cookie

- 本身用于浏览器和 server 通讯
- 早期没有 localStorage 和 SessionStorage 时被“借用”做本地存储。localStorage 和 SessionStorage 是 HTML5 的特性，cookie 是在 HTML4 中使用的给客户端保存数据的
- 可用 document.cookie = '...'来修改

缺点：

存储大小，最大 4kb
每次都会携带在 HTTP 头中发送到服务端，增加请求数据量，如果使用 cookie 保存过多数据会带来性能问题
只能用 document.cookie = '...'来修改，太过简陋

### localStorage 和 sessionStorage

- HTML5 专门为存储而设计，最大可存 5M
- API 简单易用 setItem getItem
- 不会随着 http 请求被发送出去

sessionStorage 与 localStorage 类似，但保存数据的生命周期与 localStorage 不同。localStorage 会永久存储，除非代码或手动删除。sessionStorage 数据只存在于当前会话，浏览器关闭则清空。一般用 localStorage 会更多一些

### Cookie, LocalStorage 与 SessionStorage 三者的异同

| 特性 | Cookie | LocalStorage | SessionStorage |
| ------ | ------ | ------ | ------ |
| 数据的生命期 | 一般由服务器生成，可设置失效时间。如果在浏览器端生成 Cookie，默认是关闭浏览器后失效 | 除非被清除，否则永久保存 | 仅在当前会话下有效，关闭页面或浏览器后被清除 |
| 存放数据大小| 4K 左右 | 一般为 5MB | 一般为 5MB |
| 与服务器端通信 | 每次都会携带在 HTTP 头中，如果使用 cookie 保存过多数据会带来性能问题 | 仅在客户端（即浏览器）中保存，不参与和服务器的通信 | 仅在客户端（即浏览器）中保存，不参与和服务器的通信 |
| 易用性 | 需要程序员自己封装，源生的 Cookie 接口不友好 | 源生接口可以接受，亦可再次封装来对 Object 和 Array 有更好的支持 | 源生接口可以接受，亦可再次封装来对 Object 和 Array 有更好的支持 |

### 应用场景

因为考虑到每个 HTTP 请求都会带着 Cookie 的信息，所以 Cookie 当然是能精简就精简啦，比较常用的一个应用场景就是判断用户是否登录。针对登录过的用户，服务器端会在他登录时往 Cookie 中插入一段加密过的唯一辨识单一用户的辨识码，下次只要读取这个值就可以判断当前用户是否登录。曾经还使用 Cookie 来保存用户在电商网站的购物车信息，如今有了 localStorage，似乎在这个方面也可以给 Cookie 放个假了~

而另一方面 localStorage 接替了 Cookie 管理购物车的工作，同时也能胜任其他一些工作。比如 HTML5 游戏通常会产生一些本地数据，localStorage 也是非常适用的。如果遇到一些内容特别多的表单，为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写。这时候 sessionStorage 的作用就发挥出来了。

### 安全性的考虑

需要注意的是，不是什么数据都适合放在 Cookie、localStorage 和 sessionStorage 中的。使用它们的时候，需要时刻注意是否有代码存在 XSS 注入的风险。因为只要打开控制台，你就随意修改它们的值，也就是说如果你的网站中有 XSS 的风险，它们就能对你的 localStorage 肆意妄为。所以千万不要用它们存储你系统中的敏感数据。
