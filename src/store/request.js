import axios from "axios";
//二次封装axios
let request = axios.create({
    baseURL: '/dev-api',
    timeout: 5000,
    withCredentials: true,
    retry: 3,//重复请求次数
    retryDelay: 1000,//重复请求时间间隔
})
// 为实例设置相应拦截器，在请求返回错误的时候对错误做处理。
//响应拦截器
// request.interceptors.response.use((res) => {
//     return Promise.resolve(res.data)
// },
//     (error) => {//超时处理 error.config是一个对象，包含上方create中设置的三个参数
//         var config = error.config
//         if (!config || !config.retry) {
//             return Promise.reject(error);
//         }
//         //记录重复请求的次数
//         config.retrycount = config.retrycount || 0
//         if (config.retrycount >= config.retry) {//如果重复请求次数超过设置的请求数则返回最终错误信息
//             return Promise.reject(error)
//         }
//         config.retrycount += 1
//         //设置请求间隔
//         let backoff = new Promise(function (res) {
//             setTimeout(() => {
//                 res()
//             }, config.retryDelay || 1)
//         })
//         //请求间隔再次发送请求
//         return backoff.then(function () {
//             return request(config)
//         })
//     }
// )
//响应拦截器
request.interceptors.response.use((res) => {
    return Promise.resolve(res.data);
  }, (error) => {
    //console.log(error);
    //超时处理 error.config是一个对象，包含上方create中设置的三个参数
    var config = error.config;
    if (!config || !config.retry) return Promise.reject(error);
   
    // __retryCount用来记录当前是第几次发送请求
    config.__retryCount = config.__retryCount || 0;
   
    // 如果当前发送的请求大于等于设置好的请求次数时，不再发送请求，返回最终的错误信息
    if (config.__retryCount >= config.retry) {
      return Promise.reject(error);
    }
   
    // 记录请求次数+1
    config.__retryCount += 1;
   
    // 设置请求间隔 在发送下一次请求之前停留一段时间，时间为上方设置好的请求间隔时间
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });
   
    // 再次发送请求
    return backoff.then(function () {
      return request(config);
    });
  })
export default request
