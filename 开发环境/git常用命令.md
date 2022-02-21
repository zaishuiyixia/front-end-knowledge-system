### git

- 最常用的代码管理工具
- Mac OS 自带 git 命令，windows 可去官网下载安装
- git 服务端常见的有 github、codeing.net
- 大公司会搭建自己的内网 git 服务（一般用 gitlab 搭建）
- cat ~/.ssh/id_rsa.pub 查看公钥命令

### git 常用命令

git diff 查看全部更改的内容(新增的文件不在内 因为是新增的不是修改的)
git diff + 具体文件名 查看某个文件的内容
git status 查看文件状态（改动、新增、删除...）
git add + 文件名 将修改后的某个文件添加到本地
git add . 把所有修改后的文件添加到本地
git commit -m "xxx" 提交一行记录
git push orign + 分支名 把提交的分支推送到远程服务端
git log 查看提交记录（Initial commit 是最开始创建项目时提交的）
git pull origin + 分支名 从远程服务端拉取最新分支代码并合并到当前chekout所在分支
git pull 默认是从和当前工作区的分支一样的远程分支拉取最新代码并合并（如果你本地checkout的分支和从远程服务端要拉取最新代码的分支一致，这时git pull = git pull origin + 分支名）
git fetch 拉取服务端所有分支
git merge xxx 把 xxx 分支合并到当前分支分支
git config user.name 查看用户名
git config user.email 查看邮箱
git config user.name + 用户名 设置提交的用户名
git config user.email + 邮箱 设置提交的用户邮箱
git show id(这个 id 是 git log 查看提交记录 commit 后面显示的长串的 ID,要看哪个就在 show 后贴哪个) 查看提交内容
git branch 查看本地分支 master 分支为主分支,默认分支
git branch -r 查看远程分支
git branch + 分支名 创建分支
git checkout + 分支名 切换分支
git checkout -b + 分支名 创建并切换分支
git checkout + 文件名(如果文件名再根目录下的某一文件夹下，要把路径补全，比如：src/文件名) 撤销某个文件的修改，要在 commit 之前才能撤销
git checkout . 撤销所有文件修改，要在 commit 之前才能撤销
