<template>
  <div class="tuijiangedan">
    <h3 @click="gotoTJmusiclist('third')">推荐歌单</h3>
   
    <div
      v-for="(item, index) in TJlist"
      :key="index"
      class="imgbox"
    
    >
    <el-col :span="8" style="padding:0; width: 200px;height: 300px;">
    <el-card shadow="hover">
      <router-link :to="{path:'/TJmusiclist',query:{id:item.id}}" tag="div">
      <img :src="item.picUrl+'?param=200y200'" :alt="item.name" />
      <span class="playcount"
        ><i class="el-icon-caret-right"></i>{{ changePlaycount(item.playCount) }}</span
      >
      <p>{{ item.name }}</p>
    </router-link>
    </el-card>
  </el-col>
   
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import musicAPI from "../store/musicAPI";
import func from "../store/func";
export default {
  data() {
    return {
      TJlist: [],
    };
  },

  components: {
    
  },
  methods: {
    ...mapMutations(['updataactiveName']),//vuex里面的数据处理
    changePlaycount(num) {
      return func.changePlaycount(num)
  },
  gotoTJmusiclist(index){
    // this.$router.push()//编程式导航：跳转路由
    this.updataactiveName(index)//根据elementui的跳转
  }
  },
  created() {
    musicAPI.getTJlist().then(res=>{
      // console.log(res.result,'00000')
      // this.TJlist=res.data.result//没有增加响应拦截器的时候
      this.TJlist=res.result//增加响应拦截器的时候
    })
  },
};
</script>

<style scoped>
/deep/ .el-card__body,.el-main{
  padding: 0;
  height: 250px;
  border-radius: 10px;
}
img {
  width: 200px;
  /* height: 100px; */
  /* border-radius: 10px; */
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