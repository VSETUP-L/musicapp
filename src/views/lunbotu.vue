<template>
  <!-- 轮播图 -->
  <div class="lunbotu">
    <el-carousel
      :interval="4000"
      type="card"
      height="200px"
      class="el-carousel"
    >
      <el-carousel-item v-for="(item, index) in lunbotu" :key="index">
        <img :src="item.imageUrl" :alt="item.typeTitle" />
        <span class="typeTitle">{{ item.typeTitle }}</span>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// import request from "../store/request";
import musicAPI from "../store/musicAPI";
export default {
  data() {
    return {
      lunbotu: [],
    };
  },
  mounted() {
    // let url = "/banner?type=0"; //获取接口轮播图type是轮播图类型0是pc端
    // request.get(url).then((res) => {//axios请求数据
    //   this.lunbotu = res.data.banners; //获取的数据
    //   console.log(res.data);
    // }).catch((error)=>{
    //   console.log(error)
    // });
    musicAPI.getlunbotu().then((res) => {
      //axios请求数据
            //获取的数据
            // this.lunbotu=res.data.banners//没有增加响应拦截器的时候
            this.lunbotu=res.banners//增加响应拦截器的时候
        }).catch((error) => {
            console.log(error)
        });
  },
  components: {},

  methods: {},
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
img {
  width: 695.333px;
  height: 200px;
}

.el-carousel {
  position: relative;
}
.typeTitle {
  /* z-index: 3; */
  position: absolute;
  color: white;
  bottom: 0px;
  float: right;
  right: 10px;
  background-color: tomato;
  border-radius: 8px;
}
</style>