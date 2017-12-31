# 技术栈

```
react + redux + react-router4 + webapck3 + axios + antd-mobile + express + MongoDB + socket.io
```

# 项目介绍

本项目学习于慕课网，是一个仿制的带实时聊天的招聘APP,利用express实现了登陆、注册、注销的功能，利用MongoDB存储数据,ui组件用到了antd-mobile，全局共享状态用到了redux，路由切换则是用到了最新的react-router v4，向后端发送请求则用到了axios，即时聊天用到了`socket.io`,项目的搭建用到了webpack3，整个APP则用到了react这个框架，通过这个项目我理解了前后端交互，并且理解了redux，可谓收货颇丰。

# 项目运行

注意：由于本项目用到了MongoDB，所以需要本地安装了MongoDB才能正常运行

```
git clone
cd react-chat
cnpm i

npm start

先打开MongoDB,另起一个命令窗口

启动后端服务
cd server 
node server.js
```

# 项目本地运行截图

![首页](./screenshots/首页.png)

![注册](./screenshots/注册.png)

![注册信息完善页](./screenshots/注册信息完善页.png)

![boss列表](./screenshots/boss列表.png)

![消息列表](./screenshots/消息列表.png)

![用户信息](./screenshots/用户信息.png)

![用户注销](./screenshots/用户注销.png)

![聊天页面](./screenshots/聊天页面.png)

![发送信息页](./screenshots/发送信息页.png)







