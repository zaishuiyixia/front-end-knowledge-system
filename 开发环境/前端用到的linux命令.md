### 常用命令
ls 查看文件列表（平铺，文件从左到右排列展示）
ls -a 查看所有文件列表，包括隐藏文件（在linux系统下已.开头的文件都是隐藏文件）
ll 查看列表的文件列表（内容以列表形式重上到下展示）
clear 清屏 
mkdir abc 创建abc文件夹
ll abc 查看abc文件夹下面的文件
rm -rf abc 删除abc文件夹（删文件夹时最好加上-rf，否则删除时可能会出问题，-r 递归删除 -f 强制删除）
cd dist 进入到dist目录      
mv index.html index1.html 修改文件名将index.html修改为index1.html
mv bundle.c2586582cad228ffc37d.js ../ 移动js文件到上级目录      
cp a.js a1.js 拷贝a.js文件到a1.js
rm a1.js 删除文件
touch d.js 新建文件      
vi（或vim） d.js 新建一个文件并且以vim编辑器模式打开，输入i进入可编辑insert模式，点击esc可以退出insert模式。:wq 保存并退出，:q! 强制退出     
vim d.js 以vim编辑器模式打开查看已存在的文件内容
cat package.json 查看文件所有内容，会打印在控制台里
head package.json 查看文件首部
tail package.json 查看文件尾部
grep "babel" package.json  在package.json文件中查找babel关键字  

vimtutor，vim自带的学习vim教程的命令

关于是否学习并使用vim编写代码：
- 完全用vim来写代码学习成本比较高
- 从成本收益来看，性价比比较低，推荐vscode
- 我就是用了vim+插件，玩了好久，发现学习成本确实高，当项目赶时间的时候，就不得回到之前的编辑器
- 装逼好累。还没有极客的水平
- 对于vim只需要掌握基本的保存退出编写输入这些基本的命令即可