module.exports = {
  devServer: {
     port: Number(process.env.VUE_APP_POST), // 端口号，如果端口被占用，会自动提升 1
    open: true, // 启动服务自动打开浏览器
    https: false, // 协议
    // host: "localhost", // 主机名，也可以 127.0.0.1 或 做真机测试时候 0.0.0.0
    // proxy: {//解决跨域问题
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: 'http://localhost:8001/',//要代理的目标端口
    //     changOrigin: true,//是否要跨域
    //     pathRewrite: {  //重写路径
    //       //接口路径：http://localhost:8001/db/data.json

    //       //真实路径：http://192.168.2.122:8080/api/db/data.json
    //       //过程：http://localhost:8001/api/db/data.json->http://localhost:8001/db/data.json
    //       ['^' + process.env.VUE_APP_BASE_API]: '/'
    //     }
    //   },
    //   // '/api2':{

    //   // }
    // }
    proxy: {
      // 匹配 /dev-api 开头的请求，
      [process.env.VUE_APP_BASE_API]: {
       // 目标服务器, 代理访问到 https://localhost:8001
       target: process.env.VUE_APP_SERVICE_URL,
       // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
       // 并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
       changOrigin: true, //开启代理
       pathRewrite: {
        // 会将 /dev-api 替换为 '',也就是 /dev-api 会移除，
        // 如 /dev-api/db.json 代理到 https://localhost:8080/db.json
        ['^'+process.env.VUE_APP_BASE_API]: '/',
      }
     },
     '/weibo':{
      target:'https://weibo.com/',
      changOrigin:true,
      pathRewrite:{
        '^/weibo':'/'
      }
    }
    }
  },
  lintOnSave: false, // 默认 true, 警告仅仅会被输出到命令行，且不会使得编译失败。
  outputDir: "dist2", // 默认是 dist ,存放打包文件的目录,
  assetsDir: "assets", // 存放生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir) 目录
  indexPath: "out/index.html", // 默认 index.html, 指定生成的 index.html 的输出路径 (相对于 outputDir)。
  productionSourceMap: false, // 打包时, 不生成 .map 文件, 加快打包构建
   
  // configureWebpack 值为对象，会通过 webpack-merge 合并到最终的配置
//    configureWebpack: {
//     externals: {
//         // CDN 的 ViewUIPlus 依赖全局变量 Vue， 所以 Vue 也需要使用 CDN 引入
//         'vue': 'Vue',
//         // 属性名称 view-ui-plus, 表示遇到 import xxx from 'view-ui-plus' 这类引入 'view-ui-plus'的，
//         // 不去 node_modules 中找，而是去找 全局变量 ViewUIPlus
//         'view-ui-plus': 'ViewUIPlus'
//     }
// }

}