# GIT



## GIT是什么

Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发管理而开发的一个开源的版本控制软件，用于敏捷高效地处理任何或小或大的项目。Git采用分布式版本库的方式，不必服务器端软件的支持。



## 工作区、暂存区、版本库

![](imgs\1747724099429.jpg)

- 工作区：就是你在电脑里能看到的目录。
- 暂存区：英文叫 stage 或 index。一般存放在 .git 目录下的 index 文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
- 版本库：工作区有一个隐藏目录 .git，这个不算工作区，而是 Git 的版本库。

我们在工作区进行代码的编写



## 分支管理



## 常见的命令

| 功能     | 作用                                                         | 命令                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 分支管理 | `git branch` 管理分支                                        | git branch new-branch 创建分支<br />git branch -d old-branch 删除分支 |
| 合并     | `git merge` 管理分支                                         |                                                              |
| 摘取     | `git cherry-pick` 将一个分支的特定更改移植到另一个分支       | git cherry-pick commit                                       |
| 检出     | `git checkout`                                               |                                                              |
| 变基     | `git rebase`                                                 |                                                              |
| 暂存     | `git stash` 命令允许你临时保存当前工作目录的更改，以便你可以切换到其他分支或处理其他任务 | git stash 暂存当前工作进度<br />git stash list 查看暂存list<br />git stash apply 恢复最近一次暂存的内容<br />git stash pop |
| 回滚     |                                                              |                                                              |
|          |                                                              |                                                              |
|          |                                                              |                                                              |

## GIT与SVN的区别

![](imgs\1747799536741.jpg)

1. 版本控制方式
   
   - Git是分布式版本控制系统,每个开发者都有完整的代码仓库副本

   - SVN是集中式版本控制系统,所有代码都存储在中央服务器上
   
2. 分支管理

   - Git分支管理轻量高效,创建和切换分支的开销很小
   - SVN创建分支的成本较高,分支管理相对复杂

3. 版本号机制

   - Git使用SHA-1哈希值作为版本号
   - SVN使用递增的数字作为版本号

4. 离线工作

   - Git支持完全离线工作,可以在本地进行提交等操作
   - SVN需要与服务器保持连接才能进行大多数操作

5. 权限管理

   - Git权限管理相对简单

   - SVN具有更细粒度的权限控制系统

     

## flow工作流
Git flow是一个成熟的分支管理模型,主要包含以下分支:

1. master/main分支

   - 存放正式发布的生产环境代码
   - 只能从release分支或hotfix分支合并
   - 每个合并都应该打上版本标签

2. develop分支

   - 主要的开发分支
   - 包含下一个版本的最新开发特性
   - 从master分支创建
   - 功能开发完成后合并到release分支

3. feature分支

   - 用于开发新功能
   - 从develop分支创建
   - 功能完成后合并回develop分支
   - 命名通常为: feature/功能名

4. release分支

   - 准备发布新版本时使用
   - 从develop分支创建
   - 只进行bug修复和文档更新
   - 完成后同时合并到master和develop分支
   - 命名通常为: release/版本号

5. hotfix分支

   - 用于修复生产环境的紧急问题

   - 从master分支创建

   - 完成后同时合并到master和develop分支

   - 命名通常为: hotfix/问题描述

     

日常开发在develop分支进行新功能，开发时从develop创建feature分支，版本发布时从develop创建release分支，生产问题修复从master创建hotfix分支，始终保持master分支代码的稳定性，这种工作流程可以帮助团队更好地管理代码版本,特别适合需要维护多个版本的项目。



## GIT服务器搭建

裸存储库的搭建已经不能满足现代开发的场景了。gitlab提供了更丰富的用户管理，CI/CD，代码审查等功能。





##### Git：分布式版本管理工具

  仓库
    git clone 克隆仓库
    git init 	初始化仓库
  操作暂存区域
    git status		暂存区状态
    git add		添加变动至暂存区
    git rm		删除暂存区的变动
    git commit	提交暂存区
  操作remote
    git remote -v 			 查看远程信息
    git push origin branch -u 推送至远程分支并记住推送远程地址和分支
    git pull 				 拉取commit至本地
  分支操作
    git checkout branchname 切换分支
    git branch branchname [-d] 创建\删除分支
    git reset branchname~2  
    git revert              比起reset会留下足迹
    git merge    branchname       将branchname分支的修改拷贝一份至当前分支
    git rebase   branchname       将branchname分支的修改转移至当前分支
  flow工作流

​	main分支 线上版本分支

​	develop分支 管理待发布代码，由feature合并而来

​	release分支 由develop切出来，在该分支进行下个版本代码的测试，测试完毕后合并至main分支

​	hotfix分支 热更新分支，用以main分支的管理

​	feature分支 新特性分支





# Git





### 命令

- git init 初始化仓库，会生成一个git目录，包含资源目录
- git config
  - git config --global user.name '你的用户名'  // 配置用户名称，提交时会携带用户信息
  - git config --global user.email '你的邮箱'  // 配置用户邮箱
- 
- git checkout 切换分支
- 
- 
- git reset 回退header

