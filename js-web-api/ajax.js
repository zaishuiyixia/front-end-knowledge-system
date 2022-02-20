// const xhr = new XMLHttpRequest()
// xhr.open('GET', '/data/test.json', true)
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//             // console.log(
//             //     JSON.parse(xhr.responseText)
//             // )
//             alert(xhr.responseText)
//         } else if (xhr.status === 404) {
//             console.log('404 not found')
//         }
//     }
// }
// xhr.send(null)

function ajax(url) {
    const p = new Promise((resolve, reject) => {
        // XMLHttpRequest 对象的 open() 方法可以建立一个 HTTP 请求
        // 参数 body 表示将通过该请求发送的数据，如果不传递信息，可以设置为 null 或者省略。
        /**
         * 其中 xhr 表示 XMLHttpRequest 对象，open() 方法包含 5 个参数，说明如下：
            method：HTTP 请求方法，必须参数，值包括 POST、GET 和 HEAD，大小写不敏感。
            url：请求的 URL 字符串，必须参数，大部分浏览器仅支持同源请求。
            async：指定请求是否为异步方式，默认为 true。如果为 false，则是同步响应，当状态改变时会立即调用 onreadystatechange 属性指定的回调函数。
            username：可选参数，如果服务器需要验证，该参数指定用户名，如果未指定，当服务器需要验证时，会弹出验证窗口。
            password：可选参数，验证信息中的密码部分，如果用户名为空，则该值将被忽略。
         */
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(
                        JSON.parse(xhr.responseText)
                    )
                } else if (xhr.status === 404 || xhr.status === 500) {
                    reject(new Error('404 not found'))
                }
            }
        }
        // 建立连接后，可以使用 send() 方法发送请求。用法如下: xhr.send(body)
        // 参数 body 表示将通过该请求发送的数据，如果不传递信息，可以设置为 null 或者省略。
        xhr.send(null)
    })
    return p
}

const url = '/data/test.json'
ajax(url)
.then(res => console.log(res))
.catch(err => console.error(err))
