<template>
  <div id="mysub">
    <div class="songbox" ref="list" @scroll="scrollmove">
      <ul
        class="songlist"
        :class="{ songlistactive: playlistsongindex == index }"
        v-for="(item, index) in TJmusiclistmain"
        :key="index"
        @click="musiclist(index)"
      >
        <li style="width: 33.33%">
          <!-- {{ item.id }} -->
          <p style="width: 6%; float: left; color: #c2c2c2">
            {{ index + 1 }}
          </p>

          <div style="float: left; width: 94%">
            <span @click="kai(item.id, index, item.t)" style="font-size: 25px">
              <span v-show="item.t == 0"><i class="el-icon-star-off"></i></span>
              <span v-show="item.t == 1"><i class="el-icon-star-on"></i></span>
            </span>
            <span>{{ item.name }}</span>
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
              v-show="item.mv"
              style="
                cursor: pointer;
                margin-left: 10px;
                font-size: 12px;
                border: 1px solid rgb(189, 151, 224);
                border-radius: 5px;
                color: rgb(189, 151, 224);
              "
              @click="mv(item.mv)"
              >mv</span
            >
          </div>
        </li>
        <li style="width: 33.33%; height: 50px">
          <span v-for="(e, i) in item.ar" :key="i">
            {{ e.name + "\u00a0" + "\u00a0" }}
          </span>
        </li>
        <li style="width: 33.33%">
          <!-- {{ item.song.album.name }} -->
          {{ item.al.name }}
          <span style="color: red; float: right">{{
            changesongtime(item.dt)
          }}</span>
        </li>
      </ul>
      <p v-show="isLoading"><i class="el-icon-loading"></i>加载中...</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import musicAPI from "../store/musicAPI";
import request from "../store/request";
export default {
  data() {
    return {
      offsetcount: 0,
      isLoading: false,
      ids: [],
      TJmusiclistmain: [],
      musicURL: {},
    };
  },

  components: {},
  computed: {
    ...mapState(["user", "playlistsongindex"]),
  },
  methods: {
    kai(musicid, index, t) {
      if (JSON.parse(localStorage.getItem("userinfo")).islogin) {
        if (t == 1) {
          this.TJmusiclistmain[index].t = 0;
          let url = `/like?id=${musicid}&like=false`;
          request
            .get(url)
            .then((res) => {
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
          this.TJmusiclistmain[index].t = 1;
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
    changesongtime(num) {
      let m, s;
      m = String(parseFloat(num) / (1000 * 60)).slice(0, 1);

      s = String(num / 1000 - parseInt(m) * 60).slice(0, 2);
      // console.log(parseInt(s),'@@@')
      if (parseInt(m) < 10) {
        m = "0" + m.slice(0, 1);
      }
      if (parseInt(s) < 10) {
        s = "0" + s.slice(0, 1);
      }
      return m + ":" + s;
    },
    scrollmove() {
      //滚动加载音乐
      const $list = this.$refs.list;
      if (this.isLoading) return;
      if ($list.scrollTop + 502 >= $list.scrollHeight) {
        if (this.offsetcount < this.TJmusiclistmain.length) {
          this.offsetcount += 10;
          this.getlikelistmain();
        } else if (this.offsetcount >= this.TJmusiclistmain.length) {
          this.isLoading = false;
        }
      }
    },
    getlikelistmain() {
      this.isLoading = true;
      //获取歌单歌曲
      let url = `/likelist?uid=${this.user.profile.userId}&limit=10&offset=${this.offsetcount}`;
      request.get(url).then((res) => {
        this.ids = res.ids;
        musicAPI
          .getlikemusic(this.ids)
          .then((res) => {
            res.songs.forEach((e) => {
              e.t = 1;
              this.TJmusiclistmain.push(e);
            });
            this.isLoading = false;
            console.log(this.TJmusiclistmain);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    ...mapMutations([
      "updataplaylistsong",
      "updataplaylistsongindex",
      "upuserid",
    ]),
    musiclist(index) {
      //点击音乐判断是否可以播放
      // console.log(this.TJmusiclistmain);

      if (
        this.TJmusiclistmain[index].fee == 1 ||
        this.TJmusiclistmain[index].fee == 4
      ) {
        this.$message.error("您暂时还没有版权播放该音乐");
      } else {
        this.updataplaylistsong(this.TJmusiclistmain);
        this.updataplaylistsongindex(index);
      }
    },
    mv(id) {
      this.$router.push({ path: "/shipin", query: { mvid: id } });
    },
    changetime(num) {
      var time = new Date(num);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDay();

      return y + "年" + m + "月" + d + "日";
    },
  },
  mounted() {
    this.getlikelistmain();
  },
};
</script>

<style scoped>
.songlist {
  list-style: none;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #c2c2c2;
}
.songlist:hover {
  background-color: rgb(237, 233, 233);
}
.songlistactive {
  /* background: rgb(218, 211, 218); */
  color: rgb(240, 143, 240);
}
.songbox {
  /* 滚动的盒子 */
  height: 100%;
  overflow: auto;
  font-size: 14px;
}
.songbox::-webkit-scrollbar {
  display: none;
}
.songlist li {
  float: left;
  height: 50px;
  overflow: hidden;
}
.songlist::after {
  content: "";
  display: block;
  clear: both;
}
</style>