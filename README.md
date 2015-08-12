# loopback-angular-login-demo

loopback加angular实现基本的注册登录功能，只提供loopback默认生成的RESTful API的基本操作，比较简陋，使用内存，也可以相应使用loopback支持的数据库，如何配置可参考[StrongLoop学习笔记](http://blog.csdn.net/sanpo/article/category/3111671),因本人偏后台开发，前端页面只是随便弄弄。
##run
```bash
node .
```
RESTful API:http://localhost:3000/explorer

##loopback与angular无缝结合
loopback提供[loopback-sdk-angular](https://github.com/strongloop/loopback-sdk-angular)生成lb-services供angular注入调用。
生成命令：
```bash
lb-ng server/server.js client/js/lb-services.js
```
会根据models下的模型建立相应RESTful API，如新建model重新执行命令可更新lb-services.js.

