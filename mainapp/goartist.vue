<template>
  <div id='goartist'>
    <h2 @click="back"> <i class="el-icon-arrow-left"></i>返回</h2>
    <div class="goartisthead" >
      <div class="pic" >
        <img :src="goartist1.img1v1Url+'?param=200y200'" alt="" />
      </div>
      <h2 style="margin-left: 200px;">{{ goartist1.name }}</h2>
      <p><span v-for="(item,index) in goartist1.alias" :key="index">{{ item }}</span></p>
      <div class="bt">
        <button round><i class="el-icon-folder-add"></i>收藏</button>
      </div>
      <div class="gb">
       
        <p v-show=" goartist1.musicSize? goartist1.musicSize:''">单曲数： {{ goartist1.musicSize}}</p>
        <p v-show=" goartist1.albumSize? goartist1.albumSize:''">专辑数：{{ goartist1.albumSize}}</p>
      </div>
    </div>
    <app-goartistmain></app-goartistmain>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import goartistmain from './goartistmain.vue'
export default {
  data () {
    return {
        goartist1: {},
    }
  },
computed:{
...mapState(['goartist'])
},
  components: {
    "app-goartistmain": goartistmain,
  },

  methods: {
    async getlist() {
        this.goartist1=this.goartist
    },
    back(){
      this.$router.back();
    }
  },
  mounted() {
    this.getlist(); 
    this.goartist1=JSON.parse(localStorage.getItem('goartist'))
  },
}
</script>

<style scoped>
.goartisthead{
    margin-top: 10px;
    margin-bottom: 10px;
    height: 200px;
}
.pic img {
    width: 200px;
    border-radius: 5px;
    float: left;
    margin-right: 20px;
  }
  .gd {
    margin: 0 10px;
    float: left;
    align-items: center;
    line-height: 35px;
    color: rgb(189, 151, 224);
    font-size: 20px;
  }
  .creatorimg{
      height: 20px;
      line-height: 20px;
      margin: 10px 0 10px 220px;
     
  }
  .bt {
      height: 30px;
      margin: 10px 0 10px 220px;
  }
  button {
    width: 180px;
    height: 30px;
    border-radius: 25px;
    margin-right: 10px;
    border: 1px solid #d9d9d9;
    background-color: white;
  }
  button:hover {
    background-color: #f2f2f2;
  }
  .c {
    background-color: rgb(189, 151, 224);
    color: white;
  }
  .c:hover {
    background-color: rgb(184, 126, 238);
  }
  .gb {
    margin: 10px 0 10px 220px;
  }
</style>