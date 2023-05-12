<template>
  <div class="top">
    <div v-if="musiclist3.length==0">
      加载中。。。
    </div>
    <div  v-if="musiclist3.length>0">
    <div class="gf">
      <h2>官方榜</h2>
      <div
        @click="Topmusiclist(toplist[0].id)"
        
      >
        <div class="coverImgUrl"  :style="{ backgroundImage: 'url(' + musiclist0[0].al.picUrl + ')'}">
          <img :src="toplist[0].coverImgUrl+'?param=200y200'" style="opacity:0.5; "  />
        </div>
        <p class="trackUpdateTime1">
          {{ changetime(toplist[0].trackUpdateTime) }}
        </p>
        <div v-for="(e, i) in musiclist0" :key="i" style="margin-left: 250px; font-size: 14px;">
            <li style="margin-bottom: 10px;height: 20px;line-height: 20px;background-color: #fafafa;">
              <span style="margin-right: 10px;">{{ i+1 }}</span>
              <span>{{ e.name}}</span>
              <span style="float: right;" v-for="(it, a) in e.ar" :key="a"> {{ it.name+'\u00a0'+'\u00a0' }}</span>
            </li>
        </div>
        <div class="ckqb"  @click="Topmusiclist(toplist[0].id)">
          查看全部>
        </div>
      </div>
      <div
        @click="Topmusiclist(toplist[1].id)"
        class="gf"
      >
        <div class="coverImgUrl"  :style="{ backgroundImage: 'url(' + musiclist0[1].al.picUrl + ')'}">
          <img :src="toplist[1].coverImgUrl+'?param=200y200'" style="opacity:0.5;" />
        </div>
        <p class="trackUpdateTime">
          {{ changetime(toplist[1].trackUpdateTime) }}
        </p>
        <div v-for="(e, i) in musiclist1" :key="i" style="margin-left: 250px; font-size: 14px;">
            <li style="margin-bottom: 10px;height: 20px;line-height: 20px;background-color: #fafafa;">
              <span style="margin-right: 10px;">{{ i+1 }}</span>
              <span>{{ e.name}}</span>
              <span style="float: right;" v-for="(it, a) in e.ar" :key="a"> {{ it.name+'\u00a0'+'\u00a0' }}</span>
            </li>
        </div>
        <div class="ckqb"  @click="Topmusiclist(toplist[1].id)">
          查看全部>
        </div>
      </div>
      <div
        @click="Topmusiclist(toplist[2].id)"
        class="gf"
      >
        <div class="coverImgUrl"  :style="{ backgroundImage: 'url(' + musiclist0[2].al.picUrl + ')'}">
          <img :src="toplist[2].coverImgUrl+'?param=200y200'" style="opacity:0.5;" />
        </div>
        <p class="trackUpdateTime">
          {{ changetime(toplist[2].trackUpdateTime) }}
        </p>
        <div v-for="(e, i) in musiclist2" :key="i" style="margin-left: 250px; font-size: 14px;">
            <li  style="margin-bottom: 10px;height: 20px;background-color: #fafafa;line-height: 20px;">
              <span style="margin-right: 10px;">{{ i+1 }}</span>
              <span>{{ e.name}}</span>
              <span style="float: right;" v-for="(it, a) in e.ar" :key="a"> {{ it.name+'\u00a0'+'\u00a0' }}</span>
            </li>
        </div>
        <div class="ckqb"  @click="Topmusiclist(toplist[2].id)">
          查看全部>
        </div>
      </div>
      <div
        @click="Topmusiclist(toplist[3].id)"
        class="gf"
      >
        <div class="coverImgUrl"  :style="{ backgroundImage: 'url(' + musiclist0[3].al.picUrl + ')'}">
          <img :src="toplist[3].coverImgUrl+'?param=200y200'" style="opacity:0.5;" />
        </div>
        <p class="trackUpdateTime">
          {{ changetime(toplist[3].trackUpdateTime) }}
        </p>
        <div v-for="(e, i) in musiclist3" :key="i" style="margin-left: 250px; font-size: 14px;">
            <li style="margin-bottom: 10px;height: 20px;line-height: 20px;background-color: #fafafa;">
              <span style="margin-right: 10px;">{{ i+1 }}</span>
              <span>{{ e.name}}</span>
              <span style="float: right;" v-for="(it, a) in e.ar" :key="a"> {{ it.name+'\u00a0'+'\u00a0' }}</span>
            </li>
        </div>
        <div class="ckqb"  @click="Topmusiclist(toplist[3].id)">
          查看全部>
        </div>
      </div>
    </div>
   

    <div class="QQ">
      <h2>全球榜</h2>
      <div
        v-for="(item, index) in toplist2"
        :key="index"
        @click="Topmusiclist(item.id)"
        class="qq"
      >
        <div class="coverImgUrl1">
          <img :src="item.coverImgUrl+'?param=200y200'"  />
        </div>
        <p class="playCount">
          <i class="el-icon-caret-right"></i
          >{{ changePlaycount(item.playCount) }}
        </p>
        <p>{{ item.name }}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import request from "../src/store/request";
import func from "../src/store/func";
import musicAPI from "../src/store/musicAPI";
export default {
  data() {
    return {
      toplist: [],
      toplist2: [],
      musiclist0: [],
      musiclist1: [],
      musiclist2: [],
      musiclist3: [],
    };
  },

  components: {},

  methods: {
    async getmusilist(id){
      
      
     },
    async gettop() {
      let url = "/toplist";
      await request
        .get(url)
        .then((res) => {
          // let arr=res.data.list.slice(0,4)//截取不包含最后一位数字。没有增加响应拦截器的时候
          let arr = res.list.slice(0, 4); //截取不包含最后一位数字。增加响应拦截器的时候
          // let arr2=res.data.list.slice(4,)//没有增加响应拦截器的时候
          let arr2 = res.list.slice(4); //增加响应拦截器的时候
          this.toplist = arr;
          this.toplist2 = arr2;
          console.log(this.toplist);
          
        })
        .catch((e) => {
          console.log(e);
        });
        await musicAPI.getmusiclist(this.toplist[0].id).then((res) => {
           this.musiclist0=res.songs;
          console.log( this.musiclist0)
        });
        await musicAPI.getmusiclist(this.toplist[1].id).then((res) => {
           this.musiclist1=res.songs;
          
        });
        await musicAPI.getmusiclist(this.toplist[2].id).then((res) => {
           this.musiclist2=res.songs;

        });
        await musicAPI.getmusiclist(this.toplist[3].id).then((res) => {
           this.musiclist3=res.songs;

        });
    },
    changetime(num) {
      return func.changetime(num);
    },
    changePlaycount(num) {
      return func.changePlaycount(num);
    },
    Topmusiclist(id) {
      this.$router.push({
        path: "/TJmusiclist",
        query: { id: id },
      });
    },
  },
  created() {
    this.gettop();
    this.getmusilist()
    // this.gettopmusiclist();
  },
};
</script>

<style scoped>
.gf {
  margin-top: 20px;
  position: relative;
  list-style: none;
}
.ckqb{
  cursor: pointer;
  margin-left: 250px; 
  font-size: 14px;
}
.ckqb:hover{

  color: #333333;
}
.coverImgUrl{
  float: left;
  background-size: 200px;
  /* opacity:0.3; */
}
.coverImgUrl img {
  border-radius: 5px;
}
.coverImgUrl1 img {
  border-radius: 5px;
}
.trackUpdateTime1 {
  color: white;
  position: absolute;
  top: 150px;
  left: 50px;
}
.trackUpdateTime {
  color: white;
  position: absolute;
  top: 120px;
  left: 50px;
}
.playCount {
  color: white;
  position: absolute;
  top: 0px;
  right: 80px;
}
.QQ{
  content: "";
  display: block;
  clear: both;
  margin-top: 20px;
}
.qq {
  position: relative;
  height: 250px;
  float: left;
  width: 20%;
  margin-bottom: 10px;
}
.qq::after {
  content: "";
  display: block;
  clear: both;
}
div img {
  height: 200px;
}

</style>