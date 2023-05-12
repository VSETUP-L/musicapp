<template>
  <keep-alive>
  <div class="list">
    <el-tabs v-model="myactiveName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="first"
        >
        <keep-alive>
        <app-lunbotu></app-lunbotu>
        </keep-alive>
        <keep-alive>
        <app-TJmusic></app-TJmusic>
      </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="second"
        >
        <keep-alive>
        <app-top v-if="myactiveName=='second'"></app-top
      >
    </keep-alive>
    </el-tab-pane>
      <el-tab-pane label="歌单" name="third"
        >
        <keep-alive>

          <app-gedan v-if="myactiveName=='third'"></app-gedan>
        </keep-alive>
    </el-tab-pane>
      <el-tab-pane label="歌手" name="fourth"
        >
        <keep-alive>

          <app-artist  v-if="myactiveName=='fourth'"></app-artist>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="最新音乐" name="five"
        >
        <keep-alive>
        <app-Newmusic v-if="myactiveName=='five'"></app-Newmusic
      >
    </keep-alive>
    </el-tab-pane>
    </el-tabs>
    
  </div>
</keep-alive>
</template>

<script>
import lunbotu from "../views/lunbotu.vue";
import TJmusic from "./TJmusic.vue";
import top from "../../mainapp/top.vue";
import artist from "../../mainapp/artist.vue";
import gedan from "../../mainapp/gedan.vue";

import { mapState, mapMutations } from "vuex";
import Newmusic from "../../mainapp/newmusic.vue";

export default {
  data() {
    return {
      // activeName: "first", //默认显示的
      myactiveName: "",
    };
  },

  components: {
    "app-lunbotu": lunbotu,
    "app-TJmusic": TJmusic,
    "app-gedan": gedan,
    "app-top": top,
    "app-artist": artist,
    "app-Newmusic": Newmusic,

  },
  computed: {
    ...mapState(["activeName"]), //vuex里面的数据
  },
  methods: {
    ...mapMutations(["updataactiveName"]), //vuex里面的数据处理
    handleClick(tab, event) {
      // console.log(this.activeName);
    },
  },
  created() {
    this.myactiveName = this.activeName; //vuex里面的数据
  },
  watch: {
    myactiveName(newvalue) {
      this.updataactiveName(newvalue);
    },
    activeName(newvalue) {
      //监听state的activeName数据
      this.myactiveName = newvalue;
    },
  },
};
</script>

<style scoped>
</style>