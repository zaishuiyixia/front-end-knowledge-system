### 实际项目中 ajax 的常用插件

1. jQuery：对 XMLHTTPRequest 的封装
2. fetch: 不同于 XMLHTTPRequest，浏览器有可能不兼容，默认返回的就是 promise。fetch 返回的 promise 不会被标记为 reject，即使该 http 响应的状态码是 404 或 500。只有网络故障或请求被阻止时才会标记为 reject
3. axios：对 XMLHTTPRequest 的封装
