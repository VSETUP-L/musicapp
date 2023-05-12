<template>
  <div id="getplaylist">
    <el-drawer
      size="30%"
      title="当前播放"
      :append-to-body="true"
      :wrapperClosable="true"
      :modal="false"
      :visible.sync="show"
      :direction="direction"
      :before-close="handleClose"
      class="details"
    >
    <h2>切换倒序</h2>
      <div
        v-for="(item, index) in playlistsong"
        :key="index"
        class="songlist"
       
      >
        <li style="width: 430px; height: auto; line-height: 50px" :class="{songlistactive:playlistsongindex==index}" @click="musiclist(index)">
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
              v-show="item.mv || item.mvid"
              style="
                cursor: pointer;
                margin-left: 10px;
                font-size: 12px;
                border: 1px solid rgb(189, 151, 224);
                border-radius: 5px;
                color: rgb(189, 151, 224);
                z-index: 99;
              "
              @click="mv(item.mvid, item.mv)"
              >mv</span
            >
          </div>
        </li>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      direction: "rtl",
    };
  },
  created() {
    console.log(this.playlistsong);
  },
  components: {},
  computed: {
    ...mapState(["playlistsong", "playlistsongindex", "PICURL", "show"]),
  },
  methods: {
    ...mapMutations([
      "updataplaylistsongindex",
      "updataplaylistsongPICURL",
      "updataplaylistsong",
      "upshow",
    ]),
    handleClose() {
      this.upshow(false);
    },
    musiclist(index) {
      if (
        this.playlistsong[index].fee == 1 ||
        this.playlistsong[index].fee == 4
      ) {
        this.$message.error("您暂时还没有版权播放该音乐");
      }
       else {
        // this.updataplaylistsongPICURL(this.playlistsong[index].album.picUrl)
        this.updataplaylistsong(this.playlistsong);
        this.updataplaylistsongindex(index);
      }
    },
    mv(mvid, id) {
      // this.play()
      if (mvid) {
        this.$router.push({ path: "/shipin", query: { mvid: mvid } });

        console.log(mvid);
      } else if (id) {
        this.$router.push({ path: "/shipin", query: { mvid: id } });
        console.log(id);
      }
    },
  },
};
</script>

<style scoped>
.details {
  /* position:relative; */
  height: 94.6%;
  margin-right: 0px;
  /* display: flex; */
}
.el-drawer__container {
  width: 30%;
  /* float: right; */
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
.songlist::after {
  content: "";
  display: block;
  clear: both;
}
.songlist li {
  float: left;
}
.songlistactive {
  color: rgb(240, 143, 240);
  /* background: rgb(218, 211, 218);   */
}
.songlist:hover {
  background-color: rgb(235, 232, 232);
}
</style>