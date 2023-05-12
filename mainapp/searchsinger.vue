<template>
  <div class="singer">

    <div ref="list" @scroll="scrollmove" class="boxmove">
      <div v-for="(item, index) in singerlist" :key="index" class="box" @click="go(item)" >
        <img
        :src="item.img1v1Url+'?param=200y200'"
        :alt="item.name"
        style="width: 200px; border-radius: 5px"
        />
        <p class="name">{{ item.name }}</p>
    </div>
  </div>
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
      singerlist: [],
    };
  },

  components: {},

  mounted() {
    this.getsearchlist();
  },
  computed: {
    ...mapState(['artist','goartist'])
  },
  methods: {
    ...mapMutations(['upartists','upgoartist']),
    scrollmove() {
      //滚动加载音乐
      const $list = this.$refs.list;
      if (this.isLoading) return;
      // console.log($list.scrollTop)
      // console.log($list.scrollHeight)
      if ($list.scrollTop + 741 >= $list.scrollHeight) {
        if (this.offsetcount < this.singerlist.length) {
          this.offsetcount += 20;
          this.getsearchlist();
        } else if (this.offsetcount >= this.singerlist.length) {
          this.isLoading = false;
        }
      }
    },
    getsearchlist() {
      this.isLoading = true;
      // console.log(this.$route.query.input);
      let url = `/cloudsearch?type=100&limit=20&offset=${this.offsetcount}&keywords=${this.$route.query.input}`;
      musicAPI.getsearch(url).then((res) => {
        // console.log(res)
        // this.danqulist = res.result.songs;
        res.result.artists.forEach((e) => {
          this.singerlist.push(e);
        });
        this.isLoading = false;
      });
      
    },
    go(item){
      this.upgoartist(item)
        localStorage.setItem('goartist', JSON.stringify( item))
      this.$router.push({path:'artist',query:{artist:item}})
    },
  },
};
</script>

<style scoped>
.boxmove{
  height: 640px;
  overflow: auto;
}
.box {
  float: left;
  width: 250px;
  height: 300px;
  margin: 10px;
  cursor: pointer;
 
}
.name:hover {
  color: #000000;
}
.name {
  color: #595959;
}
</style>