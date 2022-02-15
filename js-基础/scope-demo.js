// 创建 10 个 a 标签，点击的时候弹出来相应的序号
// 考察闭包
let a
for (let i = 0; i < 10; i++) {
    a = document.createElement('a')
    a.innerHTML = i + '<br>'
    a.addEventListener('click', function (e) {
        // 如果事件是可取消的，则 preventDefault() 方法会取消该事件，这意味着属于该事件的默认操作将不会发生。
        // 举例，在以下情况下有用：1、单击“提交”按钮，阻止其提交表单 2、单击链接，防止链接跟随 URL
        e.preventDefault()
        alert(i)
    })
    document.body.appendChild(a)
}
