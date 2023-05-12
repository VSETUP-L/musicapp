<template>
  <div class="artist">
    <div class="head">
      <p>
        <span >语种：</span>
        <span :class="{head1:show==-1}" @click="getartist1(-1)">全部</span>
        <span @click="getartist1(7,type,item)" :class="{head1:show==7}">华语</span>
        <span @click="getartist1(96,type,item)" :class="{head1:show==96}">欧美</span>
        <span @click="getartist1(8,type,item)" :class="{head1:show==8}">日本</span>
        <span @click="getartist1(16,type,item)" :class="{head1:show==16}">韩国</span>
        <span @click="getartist1(0,type,item)" :class="{head1:show==0}">其他</span>
      </p>
    </div>
    <div class="head">
      <p>
        <span >分类：</span>
        <span :class="{head1:type==-1}" @click="getartist1(area,-1,item)">全部</span>
        <span :class="{head1:type==1}" @click="getartist1(area,1,item)">男歌手</span>
        <span :class="{head1:type==2}" @click="getartist1(area,2,item)">女歌手</span>
        <span :class="{head1:type==3}" @click="getartist1(area,3,item)">乐队</span>
        
      </p>
    </div>
    <div class="head">
      <p>
        <span >筛选：</span>
        <span :class="{head1:Item==-1}"  @click="getartist1(area,type,-1)">热门</span>
        <span v-for="item in arr" :key="item" :class="{head1:Item==item}" @click="getartist1(area,type,item)">{{ item }}</span>
      </p>
    </div>
    <div ref="list" @scroll="scrollmove" class="boxmove">
    <div v-for="(item, index) in artists" :key="index" class="box" @click="go(item)" >
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
import { mapMutations, mapState } from 'vuex';
import request from "../src/store/request";
export default {
  data() {
    return {
      show:-1,
      area:-1,
      type:-1,
      item:-1,
      Item:-1,
      arr:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'],
      artists: [],
      offset:0,
      first:1
    };
  },

  components: {},
  computed:{
    ...mapState(['artist','goartist'])
  },
  created() {
    this.getartist();
  },
  methods: {
    ...mapMutations(['upartists','upgoartist']),
    
    async getartist() {
      console.log(111)
      await request
      .get(`/artist/list?type=-1&area=${this.area}&limit=15&offset=${this.offset}`)
      .then((res) => {
        // this.artists=res.data.artists//没有增加响应拦截器的时候
        res.artists.forEach(e => {
          this.artists.push(e)
          
        });
        this.upartists ( this.artists);
        console.log(res, "artist");
        console.log(this.artists, "artist");
      })
      .catch((e) => {
        console.error(e);
      });
      
    },
    async getartist1(i,type,item) {
    
      console.log(111)
      this.show=i
      this.Item=item
      this.type=type
      this.area=i
      if(item=='#'){
        this.item=0
        
      }else if(item==-1){
        this.Item=item
        this.item=-1
      }
      else{
        this.item=item
      }
      await request
      .get(`/artist/list?type=${this.type}&area=${this.area}&limit=15&initial=${this.item}&offset=${this.offset}`)
      .then((res) => {
       
        res.artists.forEach(e => {
          this.artists.push(e)
        });
        console.log(this.artists)
        
        this.upartists ( this.artists);
      })
      .catch((e) => {
        console.error(e);
      });
    },
    go(item){
      this.upgoartist(item)
        localStorage.setItem('goartist', JSON.stringify( item))
      this.$router.push({path:'artist',query:{artist:item}})
    },
    scrollmove() {
      //滚动加载
      
      
      const $list = this.$refs.list;
      // if (!this.isLoading) return;
      // console.log($list.scrollTop)
      // console.log($list.scrollHeight)
      if ($list.scrollTop + 640 >= $list.scrollHeight) {
        if(this.type!=-1||this.item!=-1||this.area!=-1){
          this.offset += 15
          this.getartist1(this.area,this.type,this.item)
        }
        else if (this.offset >= this.artists.length) {
          return
        }
      else{
          this.offset += 15
          this.getartist()
        }
      }
    },
    
  },
  watch:{
    type(){
      this.upartists ( this.artists=[]);
    } ,
    area(){
      this.upartists ( this.artists=[]);
    },
  item(){
    this.upartists ( this.artists=[]);
  }
   }
};
</script>

<style scoped>
.head{
  margin-bottom: 10px;
}
.head p{
  color: #666666;

}
.head1{
  color: rgb(246, 68, 68);
}
.head p span:nth-child(n+2){
  border-right: 1px solid #f2f2f2;
  padding: 0 15px;
  cursor: pointer;
}
.head p span:nth-child(n+3):hover{
  color: #000000;
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
.boxmove{
  height: 640px;
  overflow: auto;
}
</style>