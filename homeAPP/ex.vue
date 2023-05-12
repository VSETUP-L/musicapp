<template>
  <ul
    class="infinite-list"
    ref="list"
    @scroll="handleScroll"
    style="height: 100px; overflow: auto"
  >
    <li
     
      v-for="(e,i) in TJmusiclistmain"
      class="infinite-list-item"
      :key="i"
    >
      {{ e.name }}
    </li>
  </ul>
</template>
  
  <script>
import musicAPI from "../src/store/musicAPI";
export default {
  data() {
    return {
      // count: []
      isLoading: false,
      offsetcount: 0,
      TJmusiclistmain: [],
    };
  },
  methods: {
    getRecommendList() {
      //表示正在加载数据
      this.isLoading = true;
      let url = `/playlist/track/all?id=626186882&limit=10&offset=${this.offsetcount}`;
      // console.log(this.offsetcount)
      musicAPI
        .getTJmusiclistmain(url)
        .then((res) => {
          res.data.songs.forEach((e) => {
            this.TJmusiclistmain.push(e);
          });
          this.isLoading = false;
          //数据请求完成
          // console.log(this.TJmusiclistmain)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleScroll() {
      const $list = this.$refs.list;
      //如果数据有在加载中则这次请求退出
      if (this.isLoading) return;
      //已经滚动的距离加页面的高度等于整个内容区高度时,视为接触到底部
      //scrollTop 获取到顶部的滚动距离
      // clientHeight 表示页面视口高度
      // scrollHeight 页面内容的高度
        console.log($list.scrollTop,'1'); 
        console.log($list.scrollHeight,'2'); 
      if ($list.scrollTop +101>= $list.scrollHeight) {
        this.offsetcount += 10;
        this.getRecommendList();
      }
    },
  },
  mounted() {
    this.getRecommendList();
  },
};
</script>