### 如何阻止事件冒泡和默认行为
e.stopPropagation(); 
e.preventDefalut();

### 创建、查找、添加、删除、插入、替换DOM节点
- 查找：getElementById、getElements是、BytagName、getElementsByClassName、querySelectorAll
- 添加：appendChild、
- 删除：removeChild
- 插入：insertBefore
- 替换：replaceChild
- 创建新节点：
1. createDocumentFragment() //创建一个DOM片段
2. createElement() //创建一个具体的元素
3. createTextNode() //创建一个文本节点

### 如何减少DOM操作：文档片段
```
const list = document.getElementById('list')

// 创建一个文档片段，此时还没有插入到 DOM 结构中
const frag = document.createDocumentFragment()

for (let i  = 0; i < 20; i++) {
    const li = document.createElement('li')
    li.innerHTML = `List item ${i}`

    // 先插入文档片段中
    frag.appendChild(li)
}

// 都完成之后，再统一插入到 DOM 结构中
list.appendChild(frag)

console.log(list)
```