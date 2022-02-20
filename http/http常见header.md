### http 常用的 headers

常见的 Request Headers （客户端往服务端请求 ）

1. Accept 浏览器可接收的数据格式
2. Accept-Encoding 浏览器可接收的压缩算法，如 gzip。对于数据量大的数据需要先压缩再返回，浏览器根据设置的压缩算法自动解压服务器传过来的数据
3. Connection: keep-alive 一次 TCP 连接重复使用
4. cookie
5. Host：请求的域名是什么（访问的网址）
6. User-Agent（简称 UA）浏览器信息，能标识出是什么浏览器
7. Content-type 发送数据的格式，如 application/json
8. Accept-Language 浏览器可接收的语言，如 zh-CN

常见的 Response Headers （服务端往客户端返回）

1. Content-type 发送数据的格式，如 application/json
2. Content-length 返回数据的大小，多少字节
3. Content-Encoding 返回数据的压缩算法， 如 gzip
4. Set-Cookie 服务端修改 cookie

缓存相关的 headers：

自定义 header：

前端发送请求时也可以自定义 header，在一些场景中需要用到自定义 header。比如，一些 api 接口需要再 headers 添加秘钥或者一些特定的值才让请求通过，否则认为是非法请求。简单的一些权限验证可以通过这种方式去做，就是自定义一个 header，给一个特定的值，然后服务端去接受一下验证一下，如果加了则通过请求，没加则认定是非法请求。

```
//axios
headers: { 'X-Requested-With': 'XMLHttpRequest' }
```
