<template>
  <div class="newmusic">
    <!-- <div class="btn">
      <button>新歌速递</button>
      <button>新碟上架</button>
    </div> -->
    <div class="name">
      <li style="width: 430px; float: left">歌名</li>
      <li style="width: 400px; float: left">歌手</li>
      <li style="width: 400px; float: left">专辑</li>
    </div>
    <div
      v-for="(item, index) in newsonglist"
      :key="index"
      class="songlist"
      :class="{ songlistactive: playlistsongindex == index }"
      @click="musiclist(index)"
    >
      <li style="width: 430px; height: auto; line-height: 50px">
        <p style="width: 30px; float: left; color: #c2c2c2">
          {{ index + 1 }}
        </p>
        <div style="width: 400px; float: left">
          <span @click="kai(item.id, index, item.t)" style="font-size: 25px">
            <span v-show="item.t == 0"><i class="el-icon-star-off"></i></span>
            <span v-show="item.t == 1"><i class="el-icon-star-on"></i></span>
          </span>
          {{ item.name }}
          <span
            v-show="item.fee == 1"
            style="
              font-size: 12px;
              border: 1px solid red;
              border-radius: 5px;
              color: red;
            "
            >vip</span
          >
          <span
            v-show="item.mvid"
            style="
              cursor: pointer;
              margin-left: 10px;
              font-size: 12px;
              border: 1px solid rgb(189, 151, 224);
              border-radius: 5px;
              color: rgb(189, 151, 224);
            "
            @click="mv(item.mvid)"
            >mv</span
          >
        </div>
      </li>
      <li style="width: 400px">
        <span v-for="(e, i) in item.artists" :key="i">
          {{ e.name }}
          <span v-if="item.artists[1]">/</span>
        </span>
      </li>
      <li>
        {{ item.album.name }}
      </li>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import request from "../src/store/request";

export default {
  data() {
    return {
      newsonglist: [],
    };
  },

  components: {},
  mounted() {
    this.getnewsong();
  },
  computed: {
    ...mapState(["playlistsong", "playlistsongindex"]),
  },
  methods: {
    ...mapMutations([
      "updataplaylistsongindex",
      "updataplaylistsong",
      "updataplaylistsongPICURL",
    ]),
    kai(musicid, index, t) {
      if (JSON.parse(localStorage.getItem("userinfo")).islogin) {
        if (t == 1) {
          this.newsonglist[index].t = 0;
          let url = `/like?id=${musicid}&like=false`;
          request
            .get(url)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: "取消收藏成功",
                  type: "sucess",
                });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (t == 0) {
          this.newsonglist[index].t = 1;
          let url = `/like?id=${musicid}&like=true`;
          request
            .get(url)
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "收藏成功",
                  type: "sucess",
                });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } else {
        this.$message({
          message: "您账号还未登录，请先登录再收藏歌曲",
          type: "warning",
        });
      }
    },
    getnewsong() {
      request.get("/top/song").then((res) => {
        // this.newsonglist=res.data.data;//没有增加响应拦截器的时候
        this.newsonglist = res.data;
        this.newsonglist.forEach((e) => {
          e.t = 0;
        });
        console.log(this.newsonglist, "new");
      });
    },
    musiclist(index) {
      if (
        this.newsonglist[index].fee == 1 ||
        this.newsonglist[index].fee == 4
      ) {
        this.$message.error("您暂时还没有版权播放该音乐");
      } else {
        this.updataplaylistsongPICURL(this.newsonglist[index].album.picUrl);
        this.updataplaylistsong(this.newsonglist);
        this.updataplaylistsongindex(index);
      }
    },
    mv(id) {
      this.$router.push({ path: "/shipin", query: { mvid: id } });
    },
  },
};
</script>

<style scoped>
.name {
  list-style: none;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #9e9e9e;
  display: flex;
}
.name::after {
  content: "";
  display: block;
  clear: both;
}
.name li {
  border-right: 1px solid #c2c2c2;
}
.songlist {
  font-size: 14px;
  overflow: hidden;
  list-style: none;
  width: 100%;
  height: auto;
  line-height: 50px;
  border-top: 1px solid #c2c2c2;
}
.songlist:hover {
  background-color: rgb(235, 232, 232);
}
.songlistactive {
  color: rgb(240, 143, 240);
  /* background: rgb(218, 211, 218);   */
}
.songlist::after {
  content: "";
  display: block;
  clear: both;
}
.songlist li {
  float: left;
}
</style>