# musicapp
拿网易云接口做的网页版播放器
# 技术栈
vue2  + vue-router + vuex + Axios + elementui
## Project setup
```
下载安装依赖
npm install
```

### Compiles and hot-reloads for development
```
在文件夹中路径输入cmd进入
在命令行中输入npm run serve
```
# 界面展示和功能展示
## 首页展示banner、推荐歌单、菜单导航等
![img.png](./%E4%B8%BB%E9%A1%B5.png)
![img.png](%E6%AD%8C%E5%8D%95.png)
![img.png](%E7%A7%81%E4%BA%BAFM.png)
![img.png](%E6%AD%8C%E8%AF%8D.png)
![img.png](%E6%90%9C%E7%B4%A2%E6%AD%8C%E5%8D%95.png)
![img.png](%E6%90%9C%E7%B4%A2%E7%94%A8%E6%88%B7.png)
![img.png](%E6%90%9C%E7%B4%A2%E8%A7%86%E9%A2%91.png)
![img.png](%E7%94%A8%E6%88%B7%E6%94%B6%E8%97%8F.png)
![img.png](%E7%94%A8%E6%88%B7%E8%AF%A6%E6%83%85.png)
![img.png](%E8%A7%86%E9%A2%91mv.png)
![img.png](./%E6%AD%8C%E6%89%8B%E8%AF%A6%E6%83%85.png)
![img.png](./%E6%AD%8C%E6%89%8B%E8%AF%A6%E6%83%85.png)
![img.png](./%E5%85%B6%E4%BB%96%E7%94%A8%E6%88%B7%E5%8A%A8%E6%80%81.png)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

解决nodejs版本过高出现vue项目启动不成功问题：在vue启动的npm run serve 环境下输入命令：
set NODE_OPTIONS=--openssl-legacy-provider
## 后端部分
后端接口在https://github.com/Binaryify/NeteaseCloudMusicApi获取
后端接口操作文档可见