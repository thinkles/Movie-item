﻿<!--
 * @Author: yangsir
 * @Date: 2021-02-21 11:06:41
 * @LastEditTime: 2021-02-21 11:09:17
-->
 

### 基于Vue2.0 Node 开发的电影SPA网站

### 前端

#### 路由信息

> `/login`  登录界面
>
> `/movie`  首页
>
> `/publish` 影评列表页
>
> `/setting` 个人中心
>
> `/article`   影评发布页
>
> `/findmovie` 电影查找页
>
> `/articleview `  影评查看



#### 项目结构

> `SRC: `
>
> ├─api  后端请求接口
>
> ├─assets  静态资源
>
> ├─components 组件
>
> ├─router  路由信息
>
> ├─utils   后端请求封装
>
> └─views
>
>   ├─article
>
>   ├─articleview
>
>   ├─filmdail
>
>   ├─findmovie
>
>   ├─layoute
>
>   ├─Login
>
>   ├─movie
>
>   ├─moviecomment
>
>   ├─publish
>
>   └─setting

#### 第三方库

> UI 库 element ui
>
> HTTP 库 axios

#### 第三方插件

> ElementTiptap   富文本
>
> cropperjs 图片剪裁器



### 后端

#### 项目结构

> Node:
>
> ├─app.js
> 
> ├─package-lock.json
> 
> ├─package.json
> 
> ├─setting.js token配置文件
> 
> ├─verify.js  设置token
> 
> ├─route  后端路由
> 
> ├─public  静态资源(上传图片..)
> 
> ├─model  数据库操作文件

#### 第三方包

> mongoose  mongoose-sex-page   数据库相关
>
> express  node框架
>
> expressJWT  JWT验证插件
