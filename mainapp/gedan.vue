<template>
  <div class="tuijiangedan">
    <div>精品歌单</div>
    <div style="margin: 20px  20px; width: 50%;">
      <span class="cat" @click="getTJlist">全部</span>
      <span
     class="cat"
        v-for="item in tags"
        :key="item.id"
        
        @click="gedancat(item.name)"
        >{{ item.name }}</span
      >
    </div>
    <div
      v-for="(item, index) in TJlist"
      :key="index"
      class="imgbox"
      @click="to"
    >
    <el-col :span="8" style="padding:0; width: 200px;height: 300px;">
    <el-card shadow="hover">
      <router-link
        :to="{ path: '/TJmusiclist', query: { id: item.id } }"
        tag="div"
      >
        <img :src="item.coverImgUrl+'?param=200y200'" :alt="item.name" />
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
</template>

<script>
import request from "../src/store/request";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      tags: [{ name: "全部" }],
      TJlist: [],
    };
  },

  components: {},
  methods: {
    ...mapMutations(["updataactiveName"]), //vuex里面的数据处理
    async getTJlisttag() {
      let url = "/playlist/highquality/tags";
      await request.get(url).then((res) => {
        // this.tags = res.data.tags;//没有增加响应拦截器的时候
        this.tags = res.tags;//增加响应拦截器的时候
        // console.log(this.tags);
      });
    },
    async getTJlist() {
      // console.log(this.tags[0].name, "###");
      let url = "/top/playlist/highquality?cat=" + this.tags[0].name+'&limit=24';
      await request.get(url).then((res) => {
        //获取推荐歌单数据
        // console.log(res.data.playlists);
        // this.TJlist = res.data.playlists;//没有增加响应拦截器的时候
        this.TJlist = res.playlists;
      });
    },
    async gedancat(name) {
      let url = "/top/playlist/highquality?cat=" + name;
      await request.get(url).then((res) => {
        // console.log(res.data.playlists);
        // this.TJlist = res.data.playlists;//没有增加响应拦截器的时候
        this.TJlist = res.playlists;
      });
    },
    to() {},
    changePlaycount(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
    gotoTJmusiclist(index) {
      // this.$router.push()//编程式导航：跳转路由
      this.updataactiveName(index); //跳转
    },
  },
  created() {
    this.getTJlisttag();
    this.getTJlist();
  },
};
</script>

<style scoped>
.cat{
  margin: 10px 13px;
}
.cat:hover{
color: rgb(189, 151, 224);
cursor: pointer;

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