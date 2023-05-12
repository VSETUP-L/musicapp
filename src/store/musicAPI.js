
import request from './request'
export default {
  //防抖函数
  fangdo(fn, wait) {
    let time = null
    return function () {
      if (time) {
        clearTimeout(time);
    }
      let firstclick = !time
      if (firstclick) {
        fn.apply(this, arguments);
        
      }
      if (time != null) {
        clearTimeout(time)
      }
      time = setTimeout(() => {
        time = null
      }, wait)
    }
  },
  checkLoginStatus(url) {
    // 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
    return request.get(url)

  },
  getuser(uid) {//获取登录用户的信息
    let url = `/user/detail?uid=${uid}`
    return request.get(url)
  },
  getsearch(url) {//获取搜索音乐单曲

    return request.get(url)
  },
  getmv(id) {//获取mv信息
    let url = `/mv/detail?mvid=${id}`
    return request.get(url)
  },
  getmvurl(id) {//获取mv播放地址
    let url = `/mv/url?id=${id}&r=1080`
    return request.get(url)
  },
  gethotpl(id, type) {//获取热门评论
    let url = `/comment/hot?id=${id}&type=${type}`//type=0(歌曲)1(mv)2(歌单)3(专辑)4(电台节目)5: 视频6: 动态7: 电台
    return request.get(url)
  },
  getmvpl(id) {
    let url = `/mv/detail/info?mvid=${id}`
    return request.get(url)
  },
  getpl(type, id, sortType,i,time) {
    let url = `/comment/new?type=${type}&id=${id}&cursor=${time}&pageSize=20&pageNo=${i}&sortType=${sortType}`
    // type: 数字, 资源类型, 对应歌曲, mv, 专辑, 歌单, 电台, 视频对应以下类型
    // 0: 歌曲
    // 1: mv
    // 2: 歌单
    // 3: 专辑
    // 4: 电台节目
    // 5: 视频
    // 6: 动态7: 电台
    // sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
//     pageNo:分页参数,第 N 页,默认为 1
// pageSize:分页参数,每页多少条数据,默认 20
// sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
// cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
    return request.get(url)
  },
  sendpl(t,type,id, text) {
    let url = `/comment?t=${t}&type=${type}&id=${id}&content=${text}`
    // t:1 发送, 2 回复
    // type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
    // 0: 歌曲
    // 1: mv
    // 2: 歌单
    // 3: 专辑
    // 4: 电台
    // 5: 视频
    // 6: 动态
    // id:对应资源 id
    // content :要发送的内容
    // commentId :回复的评论 id (回复评论时必填)
    return request.post(url)
  },
  getmusicvVip(id) {//获取音乐版权是否可用
    let url = `/check/music?id=${id}`
    return request.get(url)
  },
  getlunbotu() {//lunbotu.vue
    let url = "/banner?type=0"; //获取接口轮播图type是轮播图类型0是pc端
    return request.get(url)
  },
  getTJlist() {//TJmusic.vue
    let url = "/personalized?limit=12";
    return request.get(url)
  },
  getTJmusiclist(url) {
    return request.get(url)
  },
  getTJmusiclistmain(url) {//获取歌曲详情

    return request.get(url)
  },
  getsong(id) {
    let url = "/song/detail?ids=" + id;
    return request.get(url)
  },
  getsonglyric(id) {//获取歌词
    let url = "/lyric?id=" + id;
    return request.get(url)
  },
  getmusiclist(id) {//获取歌单歌曲
    let url = `/playlist/track/all?id=${id}&limit=6`
   return request.get(url)
  },
  getlikemusic(ids) {//获取喜欢的歌曲
    var a=''
    for(let i=0;i<ids.length;i++){
      a +=ids[i]+','
      if(i==ids.length-1){
        a +=ids[i]
      }
    }
      let url = `/song/detail?ids=${a}`
    return  request.get(url)

  },
  getarr(songlyric) {
    //处理歌词
    let arr = songlyric.split(/[(\r\n)\r\n]+/).map((e, i) => {
      let m = e.slice(1, 3);//分钟
      let s = e.slice(4, 6);//秒
      let ms = e.slice(7, 10);//毫秒
      let lrc = e.slice(11, e.length);//歌词
      let time = parseInt(m) * 60 * 1000 + parseInt(s) * 1000 + parseInt(ms)//时间
      if (isNaN(Number(ms))) {
        ms = e.slice(7, 9);
        lrc = e.slice(10, e.length);
        time = parseInt(m) * 60 * 1000 + parseInt(s) * 1000 + parseInt(ms)
      }
      return { m, s, ms, lrc, time };
    });
    arr.forEach((e, i) => {//e是数组元素，i是元素下标
      if (i === arr.length - 1) {
        e.next = 0
      } else {
        e.next = arr[i + 1].time
      }
    });
    return arr

  },
 
}