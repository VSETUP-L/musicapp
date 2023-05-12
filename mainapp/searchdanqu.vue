<template>
  <div
    class="searchdanqu"
    ref="list"
    @scroll="scrollmove"
    style="height: 740px; overflow: auto"
  >
    <div class="name">
      <li style="width: 430px; float: left">歌名</li>
      <li style="width: 400px; float: left">歌手</li>
      <li style="width: 400px; float: left">专辑</li>
      <p style="font-size: 12px">找到{{ this.danqulist.length }}单曲</p>
    </div>
    <div
      v-for="(item, index) in danqulist"
      :key="index"
      class="songlist"
      :class="{songlistactive:playlistsongindex==index}"
      @click="musiclist(index)"
    >
      <li style="width: 430px; height: 50px; line-height: 50px">
        <p style="width: 30px; float: left; color: #c2c2c2">
          {{ index + 1 }}
        </p>

        <div style="width: 400px; float: left">
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
            v-show= "item.mv"
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
      <li style="width: 400px">
        <span v-for="(e, i) in item.ar" :key="i"> {{ e.name+'\u00a0'+'\u00a0' }} </span>
      </li>
      <li>
        {{ item.al.name }}
      </li>
    </div>
    <p v-show="isLoading"><i class="el-icon-loading"></i>加载中...</p>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import musicAPI from "../src/store/musicAPI";

export default {
  data() {
    return {
      isLoading: false,
      offsetcount: 0,
      danqulist: [],
    };
  },

  components: {},

  mounted() {
    this.getsearchlist();
  },
  computed: {
    ...mapState(["playlistsong", "playlistsongindex"]),
  },
  methods: {
    scrollmove() {
      //滚动加载音乐
      const $list = this.$refs.list;
      if (this.isLoading) return;
      // console.log($list.scrollTop)
      // console.log($list.scrollHeight)
      if ($list.scrollTop + 741 >= $list.scrollHeight) {
        if (this.offsetcount < this.danqulist.length) {
          this.offsetcount += 20;
          this.getsearchlist();
        } else if (this.offsetcount >= this.danqulist.length) {
          this.isLoading = false;
        }
      }
    },
    ...mapMutations([
      "updataplaylistsongindex",
      "updataplaylistsong",
      "updataplaylistsongPICURL",
    ]),
    musiclist(index) {
      // console.log(this.danqulist[index].id)
      // musicAPI.getmusicvVip(this.danqulist[index].id).then((res) => {
      //   console.log(res,'@@@@@')
      if (this.danqulist[index].fee == 1 || this.danqulist[index].fee == 4) {
        this.$message.error("您暂时还没有版权播放该音乐");
      } else {
        this.updataplaylistsongPICURL(this.danqulist[index].al.picUrl);
        this.updataplaylistsong(this.danqulist);
        this.updataplaylistsongindex(index);
      }
      // });
    },
    getsearchlist() {
      this.isLoading = true;
      console.log(this.$route.query.input);
      let url = `/cloudsearch?type=1&limit=20&offset=${this.offsetcount}&keywords=${this.$route.query.input}`;
      musicAPI.getsearch(url).then((res) => {
        // this.danqulist = res.result.songs;
        res.result.songs.forEach((e) => {
          this.danqulist.push(e);
        });
        this.isLoading = false;
      });
      this.updataplaylistsong(this.danqulist);
    },
    mv(id){
      this.$router.push({path:'/shipin',query:{mvid:id}})
    }
  },
};
</script>

<style scoped>
.name {
  list-style: none;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #9e9e9e;
  display: flex;
  border-top: 1px solid #c2c2c2;
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
  overflow: hidden;
  list-style: none;
  width: 100%;
  height: 50px;
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