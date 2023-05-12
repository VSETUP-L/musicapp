<template>
  <div class="TJmusiclist" >
    <app-TJmusichead :TJmusiclist="TJmusiclist"></app-TJmusichead>
    <app-TJmusicmain
      :TJmusiclist="TJmusiclist"
      :pl="pl"
      :subscribers="subscribers"
      :getpl="getpl"
      :getlist="getlist"
    ></app-TJmusicmain>
  </div>
</template>

<script>
import musicAPI from "../src/store/musicAPI";
import request from "../src/store/request";
import TJmusiclisthead from "./TJmusiclisthead.vue";
import TJmusiclistmain from "./TJmusiclistmain.vue";
export default {
  data() {
    return {
      TJmusiclist: {},
      
      pl:[],
      subscribers:[]
    };
  },

  components: {
    "app-TJmusichead": TJmusiclisthead,
    "app-TJmusicmain": TJmusiclistmain,
  },

  methods: {
    async getlist() {
      let url = "/playlist/detail?id=" + this.$route.query.id;//根据歌单id获取歌单的描述信息
      await musicAPI.getTJmusiclist(url).then((res) => {
        // this.TJmusiclist = res.data.playlist;//没有增加响应拦截器的时候
        this.TJmusiclist = res.playlist;
      });
    },
    


    //子组件
    async getpl() {//获取歌单评论信息
      await request
        .get("/comment/playlist?id=" + this.$route.query.id)
        .then((res) => {
          // this.pl = res.data.comments;//没有增加响应拦截器的时候
          this.pl = res.comments;
        //   console.log(res.data,'dkskdksdk')
        })
        .catch((e) => {
          console.error(e);
        });
    },
    async getsubscribers() {//获取歌单收藏者信息
      await request
        .get("/playlist/subscribers?id=" + this.$route.query.id+'&limit=60'+'&offset=0')
        .then((res) => {
          this.subscribers = res.subscribers;
          // this.subscribers = res.data.subscribers;//没有增加响应拦截器的时候
          // console.log(this.subscribers,'%%%%%')
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  mounted() {
    this.getlist();
    this.getpl()
    this.getsubscribers()
    
  },
};
</script>

<style scoped>
.TJmusiclisthead {
  margin-top: 10px;
  /* height: 300px; */
  width: 100%;
  overflow: auto;
  /* background-color: aqua; */
}
.musiclistmain {
  height: 70%;
  width: 100%;
}
</style>