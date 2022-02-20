### 传统的 methods

- GET 获取服务器数据
- POST 向服务器提交数据

简单的网页功能，就这两个操作

### 现在的 methods（增删改查）

- GET 获取数据

- POST 新建数据（如创建新的留言、创建新的博客）

- patch/put 更新数据（更新博客、更新留言）

- delete 删除数据

### Restful API（重要）

一种新的 API 设计方法（早已推广使用）

传统 API 设计：把每个 url 当做一个功能

Restful API 设计：把每个 url 当做一个唯一的资源

如何设计成一个资源？

**1.尽量不用 url 参数**

不使用 url 参数:

- 传统 API 设计：/api/list?pageIndex=2
- Restful API 设计：/api/list/2

**2. 用 method 表示操作类型**

- GET 获取数据
- POST 新建数据（如创建新的留言、创建新的博客）
- patch/put 更新数据（更新博客、更新留言）
- delete 删除数据
