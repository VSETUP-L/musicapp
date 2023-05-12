<template>
  <div class="TJmusiclisthead">
    <div class="pic">
      <img :src="TJmusiclist.coverImgUrl+'?param=200y200'" alt="" />
    </div>
    <p class="gd">歌单</p>
    <h2>{{ TJmusiclist.name }}</h2>

    <div class="creatorimg">
      <img
        :src="(TJmusiclist.creator ? TJmusiclist.creator.avatarUrl : '')+'?param=200y200'"
        style="
          width: 20px;
          float: left;
          margin-right: 5px;
          border-radius: 20px;
          cursor: pointer;
        "
        @click="gotouser(TJmusiclist.creator.userId)"
      />
      <p style="float: left; margin-right: 10px">
        {{ TJmusiclist.creator ? TJmusiclist.creator.nickname : "" }}
      </p>
      <div class="createtime">
        {{ changecreatetime(TJmusiclist.createTime) }}创建
      </div>
    </div>

    <div class="bt">
      <button round class="c" @click="playAll">
        <i class="el-icon-caret-right"></i>播放全部
      </button>
      <!-- <button round> -->
        <i class="el-icon-folder-add"></i>收藏{{
          changePlaycount(TJmusiclist.subscribedCount)
        }}
      <!-- </button> -->
      <!-- <button round> -->
        <i class="el-icon-share"></i>分享{{ TJmusiclist.shareCount }}
      <!-- </button> -->
    </div>

    <!-- <span>标签：{{ TJmusiclist.tags }}</span> -->
    <div class="gb">
      <p>歌曲：{{ TJmusiclist.trackCount }}</p>
      <p>播放：{{ changePlaycount(TJmusiclist.playCount) }}</p>
    </div>
    <div class="jj">
      <div>
        <p class="length1"  :class="{length:kai2}">
          简介：
          <span > {{ TJmusiclist.description }}</span>
        </p>
        <span
        @click="kai"
        style="float: left; font-weight: 1000; font-size: 25px"
      >
        <span v-show="kai1"><i class="el-icon-caret-bottom"></i></span>
        <span v-show="kai2"><i class="el-icon-caret-top"></i></span>
      </span>
        <span v-show="!TJmusiclist.description">暂无</span>
    </div>
    </div>

    <!-- <span>{{ TJmusiclist.playCount }}</span> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import request from "../src/store/request";

export default {
  data() {
    return {
      user: [],
      kai1: true,
      kai2: false,
    };
  },
  props: ["TJmusiclist"],
  created() {
    this.getuser();
  },
  components: {},

  methods: {
    ...mapMutations([
      "updataplaylistsong",
      "updataplaylistsongindex",
      "upuserid",
    ]),
    kai() {
     
     if (this.kai1) {
       this.kai1 = false;
       this.kai2 = true;
     } else if (this.kai2) {
       this.kai1 = true;
       this.kai2 = false;
     }
   },
    playAll() {
      let url = `/playlist/track/all?id=${this.TJmusiclist.id}`;
      request.get(url).then((res) => {
        this.updataplaylistsong(res.songs);
        this.updataplaylistsongindex(0);
        console.log(this.$store.state.playlistsong);
      });
    },
    changecreatetime(num) {
      var time = new Date(num);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDay();
      // console.log(this.TJmusiclist, "11111111111");
      return y + "/" + m + "/" + d;
    },
    changePlaycount(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else {
        return num;
      }
    },
    async getuser() {
      await request
        .get("/user/detail?uid=" + this.TJmusiclist.userId)
        .then((res) => {
          // this.user = res.data;//没有增加响应拦截器的时候
          this.user = res;
          // console.log(res.data, "1111111");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    gotouser(id) {
      //点击用户头像跳转到用户详情
      this.upuserid(id);
      this.$router.push({ path: "/user" });
    },
  },
};
</script>

<style scoped>
.pic img {
  width: 200px;
  border-radius: 5px;
  float: left;
}
.gd {
  margin: 0 10px;
  float: left;
  align-items: center;
  line-height: 35px;
  color: rgb(189, 151, 224);

  font-size: 20px;
}
.creatorimg {
  height: 20px;
  line-height: 20px;
  margin: 10px 0 10px 220px;
}
.bt {
  height: 30px;
  margin: 10px 0 10px 220px;
}
button {
  width: 180px;
  height: 30px;
  border-radius: 25px;
  margin-right: 10px;
  border: 1px solid #d9d9d9;
  background-color: white;
}
button:hover {
  background-color: #f2f2f2;
}
.c {
  background-color: rgb(189, 151, 224);
  color: white;
}
.c:hover {
  background-color: rgb(184, 126, 238);
}
.gb {
  margin: 10px 0 10px 220px;
}
.jj {
  margin: 10px 0 10px 220px;
  overflow: auto;
  white-space: pre-wrap;
}
.length1{
width: 300px;
height: 30px;
line-height: 30px;
overflow: hidden;
float: left;
}
.length{
  /* 简介 */
  width: auto;
  height: auto;
  overflow: auto;
}
</style>