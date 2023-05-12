<template>
  <div id='searchGD'>
    <div v-if="GDlist.length <= 0">暂无歌单</div>
    <div ref="list" @scroll="scrollmove" class="move">

        <div v-for="(item, index) in GDlist" :key="index" class="imgbox">
            <el-col :span="8" style="width: 200px">
                <el-card shadow="hover">
                <router-link
                :to="{ path: '/TJmusiclist', query: { id: item.id } }"
                tag="div"
                >
                  <img
                    :src="item.coverImgUrl+'?param=200y200'"
                    :alt="item.name"
                    style="width: 200px"
                    />
                    <span class="playcount"
                    ><i class="el-icon-caret-right"></i
                        >{{ changePlaycount(item.playCount) }}</span
                  >
                  <p>{{ item.name }}</p>
                </router-link>
            </el-card>
        </el-col>
    </div>
</div>
  </div>
</template>

<script>
import request from '../src/store/request';
export default {
  data () {
    return {
        isLoading: false,
      offsetcount: 0,
      GDlist: [],
    }
  },

  components: {},

  methods: {
    scrollmove() {
      //滚动加载mv
      const $list = this.$refs.list;
      if (this.isLoading) return;
    //   console.log($mvlist.scrollTop)
    //   console.log($mvlist.scrollHeight)
      if ($list.scrollTop + 740 >= $list.scrollHeight) {
        if (this.offsetcount  <= this.GDlist.length) {
          this.offsetcount  += 21;
         
          this.getGDlist();
        } else if (this.offsetcount  >= this.GDlist.length) {
          this.isLoading = false;
        }
      }
    },
    changePlaycount(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
      else{
        return num 
      }
    },
    getGDlist() {
        let url = `/cloudsearch?type=1000&limit=18&offset=${this.offsetcount}&keywords=${this.$route.query.input}`;
      request.get(url).then((res) => {
        console.log(res)
        res.result.playlists.forEach((e) => {

            this.GDlist.push(e);
          
        });

        
      });
    },
  },
  created(){
    this.getGDlist()
  }
}
</script>

<style scoped>
.move{
  height: 740px;
  overflow: auto;
}
 /deep/ .el-card__body,.el-main{
  padding: 0;
  height: 250px;
  border-radius: 10px;
}
img {
  width: 200px;
  /* height: 100px; */
  border-radius: 10px;
}
.imgbox {
  width: 200px;
  height: 300px;
  float: left;
  margin-left: 20px;
  position: relative;
}
.imgbox:hover{
  cursor: pointer;
}
.playcount {
  position: absolute;
  color: rgb(189, 151, 224);
  top: 0px;
  float: right;
  right: 10px;
  border-radius: 8px;
}
</style>