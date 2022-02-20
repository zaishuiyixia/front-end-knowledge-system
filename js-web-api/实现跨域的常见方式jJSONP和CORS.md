### 客户端请求与服务端数据返回

服务器接收客户端请求的地址后不一定非要返回静态文件， 服务器可以任意动态拼接数据返回，只要符合对应格式要求。

比如：

1. 访问http://xxx.com/，服务端不一定返回一个html文件，服务器可以任意动态拼接数据返回，只要符合html格式要求。
2. 同理于<script src="https;//xxx.com/getData.js">服务器拿到请求的地址不一定非要返回 js 静态文件，只要服务端返回的动态拼接的数据符合 js 文件的格式，执行不报错即可。

### JSONP

- <script>可绕过跨域限制，srcipt访问跨域地址
- 服务器拿到访问的跨域地址，可以任意拼接数据返回
- 所以，<script>就可以获得跨域的数据，只要服务端愿意返回，跨域必须经过服务端的允许和配合

```
<script>
  window.abc = function (data) {
    // 这是跨域的信息
    console.log(data)
  }
</script>
<script src="http://localhost:8080/data/jsonp.js?username=xxx&callback=abc"></script>
<!-- 将返回callback({ x: 100, y: 200 }) -->
```

jsonp 解决跨域的原理:

1. 前端利用 script 标签加载文件时不需要遵守同源策略，在 script 中可以引入跨域的 js 文件。挂载一个全局函数,并把这个函数名传递给服务器

2. 服务端返回的 js 文件是一段 js 代码：返回的数据外层包裹一个客户端已经定义好的函数。这样相当于拿到后端的数据执行前端的函数

### CORS 跨域资源共享——服务器设置 http header（纯服务端去做不需要前端去做）

//第二个参数填写允许跨域的域名，不建议直接写"*"(*表明，该资源可以被 任意 外域访问)
response.setHeader("Access-Control-Allow-Origin", "http://xxx:8011");//origin 参数的值指定了允许访问该资源的外域 URI。如果该字段的值为通配符 _，则表示允许来自所有域的请求。
注意，如果服务端指定了具体的域名而非 _，那么响应头部中的 Vary 字段的值必须包含 Origin。这将告诉客户端：服务器对不同的源站返回不同的内容。

response.setHeader("Access-Control-Allow-Headers", "X-Requested-With"); // 头部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); // 头部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

**与 JSONP 的比较，CORS 与 JSONP 的使用目的相同，但是比 JSONP 更强大。JSONP 只支持 GET 请求，CORS 支持所有类型的 HTTP 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。**

跨域资源共享 CORS 详解：https://www.ruanyifeng.com/blog/2016/04/cors.html、https://rosegun.com/Access-Control-Allow-Origin%20%E4%BD%9C%E7%94%A8%E6%96%B9%E5%BC%8F
