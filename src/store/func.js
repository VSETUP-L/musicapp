
export default {
    changetime(num) {
      var time = new Date(num);
      var y = time.getFullYear();
      var m = (time.getMonth() + 1 < 10
      ? "0" + (time.getMonth() + 1)
      : time.getMonth() + 1);
      var d = (time.getDate() < 10 ? "0" + time.getDate() : time.getDate());
      
        return y + "年" + m + "月" + d + "日";
    },
    changetime2(num) {
        var time = new Date(num);
        var y = time.getFullYear();
        var m = (time.getMonth() + 1 < 10
        ? "0" + (time.getMonth() + 1)
        : time.getMonth() + 1);
        var d = (time.getDate() < 10 ? "0" + time.getDate() : time.getDate());
        let h=time.getHours()
        let min=time.getMinutes()
        if(min<10){
          min='0'+min
        }
        return y + "年" + m + "月" + d + "日"+h+":"+min;
    },
    changesongtime(num) {
      let m, s;
      m = String(parseFloat(num) / (1000*60)).slice(0,1);
   
      s = String(num / 1000-parseInt(m)*60).slice(0,2);
      // console.log(parseInt(s),'@@@')
      if(parseInt(m)<10){
        m='0'+m.slice(0,1)
      }
      if(parseInt(s)<10){
        s='0'+s.slice(0,1)
      }
      return m + ":" + s;
    },
    changePlaycount(num) {
        if (num > 100000000) {
          return (num / 100000000).toFixed(1) + "亿";
        } else if (num > 10000) {
          return (num / 10000).toFixed(1) + "万";
        }
      },
      scrollmove(){//滚动加载音乐
        const $list=this.$refs.list
        if(this.isLoading)return;
        if($list.scrollTop+502>=$list.scrollHeight){
          this.offsetcount +=10
          this.getlistmain()
        }
      },
      
      
}