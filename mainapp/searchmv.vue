<template>
  <div id='searchmv'>
    <div ref="mvlist" @scroll="mvscrollmove" class="mvmove">
         <div v-for="(item ,index) in mvlist" :key="index" class="mvlist" @click="MV(item.vid)">
          <div class="mv" >
            <img :src="item.coverUrl+'?param=420y300'" style="width: 420px; height: 300px;">
          </div>
          <!-- <p class="playCount">
          <i class="el-icon-caret-right"></i
          >{{ changePlaycount(item.playCount) }}
        </p> -->
        <p class="duration">{{ changesongtime(item.durationms) }}</p>
          <p style="width: 420px;">{{ item.title }}</p>
         </div>
         </div>
  </div>
</template>

<script>
import request from '../src/store/request';
export default {
  data () {
    return {
        mvisLoading: false,
      offsetcount: 0,
      mvlist: [],
     
    }
  },

  components: {},

  methods: {
    mvscrollmove() {
      //滚动加载mv
      const $mvlist = this.$refs.mvlist;
      if (this.mvisLoading) return;
    //   console.log($mvlist.scrollTop)
    //   console.log($mvlist.scrollHeight)
      if ($mvlist.scrollTop + 740 >= $mvlist.scrollHeight) {
        if (this.offsetcount  <= this.mvlist.length) {
          this.offsetcount  += 21;
         
          this.getmvlist();
        } else if (this.offsetcount  >= this.mvlist.length) {
          this.mvisLoading = false;
        }
      }
    },
    getmvlist(){
        let url = `/cloudsearch?type=1014&limit=21&offset=${this.offsetcount}&keywords=${this.$route.query.input}`;
        request.get(url).then((res) => {
            //   console.log(res)
              res.result.videos.forEach(e=>{
                this.mvlist.push(e)
              })
            })
            .catch((error) => {
              console.log(error);
            });
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
    MV(id){
      this.$router.push({ path: "/shipin", query: { mvid: id } });
    },
  },
  created(){
    this.getmvlist()
  }
}
</script>

<style scoped>
.mvmove{
  
  height: 740px;
  overflow: auto;
}
.mvlist{
    height: 350px;
    cursor: pointer;
    float: left;
    margin-bottom: 30px;
    margin-right: 30px;
    position: relative;
  }

  .mv img{
     border-radius: 10px;
  }
  .playCount {
  color: white;
  position: absolute;
  top: 0px;
  right: 10px;
}
.duration{
  color: white;
  position: absolute;
  bottom: 60px;
  right: 10px;
  font-size: 13px;
}
</style>