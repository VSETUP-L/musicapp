<template>
    <div class="musiclistmain">
      <el-tabs
        style="height: 560px"
        v-model="activeName"
      >
        <el-tab-pane label="歌曲" name="first">
          <div v-show="list.length<=0">暂无歌曲</div>
          <div class="songbox" ref="list" @scroll="scrollmove">
          <ul
            class="songlist"
            v-for="(item, index) in list"
            :key="index"
            @click="musiclist(index)"
          >
            <li style="width: 33.33%">
              <p style="width: 6%; float: left; color: #c2c2c2">
                {{ index + 1 }}
              </p>
              <div style="float: left; width: 94%">
                <span
                  @click="kai(item.id, index, item.t)"
                  style="font-size: 25px"
                >
                  <span v-show="item.t == 0"
                    ><i class="el-icon-star-off"></i
                  ></span>
                  <span v-show="item.t == 1"
                    ><i class="el-icon-star-on"></i
                  ></span>
                </span>
                <span>{{ item.name }}</span>
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
                  v-show="item.mv"
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
            <li style="width: 33.33%; height: 50px">
              <span v-for="(e, i) in item.ar" :key="i"> ({{ e.name }}) </span>
            </li>
            <li style="width: 33.33%">
              <!-- {{ item.song.album.name }} -->
              {{ item.al.name }}
              <span>{{ changesongtime(item.dt) }}</span>
            </li>
          </ul>
          <p v-show="isLoading"><i class="el-icon-loading"></i>加载中...</p>
        </div>
        </el-tab-pane>
        <el-tab-pane
          label="歌手详情"
          name="second"
        >
        <div style="width: 100%;">
          <h3>{{goartist1.name}}简介</h3>
         <p style="margin-bottom: 20px; white-space:pre-wrap;color: #828282;">{{ briefDesc.briefDesc }}</p> 
          <!-- {{ briefDesc.introduction }} -->
          <div style="margin-bottom: 20px; white-space:pre-wrap;" v-for="(item,index) in briefDesc.introduction" :key="index">
          <h3>{{ item.ti }}</h3>
          <p style="color: #828282; line-height: 40px;">{{  item.txt }}</p>
          </div>
        </div>
        </el-tab-pane>
  
        <el-tab-pane label="MV" name="third" class="el3">
          <div v-show="mvlist.length<=0">暂无MV</div>
          <div ref="mvlist" @scroll="mvscrollmove" class="mvmove">
         <div v-for="(item ,index) in mvlist" :key="index" class="mvlist" @click="MV(item.id)">
          <div class="mv" >
            <img :src="item.resource.mlogBaseData.coverUrl+'?param=420y300'" style="width: 420px; height: 300px;">
          </div>
          <!-- <p class="playCount">
          <i class="el-icon-caret-right"></i
          >{{ changePlaycount(item.playCount) }}
        </p> -->
        <p class="duration">{{ changesongtime(item.resource.mlogBaseData.duration) }}</p>
          <p style="width: 420px;">{{ item.resource.mlogBaseData.text }}</p>
         </div>
         </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
  <script>
  import request from "../src/store/request";
  import musicAPI from "../src/store/musicAPI";
  import { mapMutations } from "vuex";
  import func from "../src/store/func";
  export default {
    data() {
      return {
        offsetcount: 0,
        size:12,
        mvisLoading: false,
        isLoading: false,
        activeName: "first", //默认显示的
        goartist1:[],
        list:[],
        briefDesc:{},
        mvlist:[]
      };
    },
    created(){
      this.goartist1=JSON.parse(localStorage.getItem('goartist'))
      this.getlistmain()
    },
     methods:{
      ...mapMutations(['updataplaylistsong','updataplaylistsongindex']),
      kai(musicid, index, t) {
      if (JSON.parse(localStorage.getItem("userinfo")).islogin) {
        if (t == 1) {
          this.list[index].t = 0;
          let url = `/like?id=${musicid}&like=false`;
          request
            .get(url)
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "取消收藏成功",
                  type: "sucess",
                });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (t == 0) {
          this.list[index].t = 1;
          let url = `/like?id=${musicid}&like=true`;
          request
            .get(url)
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "收藏成功",
                  type: "sucess",
                });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } else {
        this.$message({
          message: "您账号还未登录，请先登录再收藏歌曲",
          type: "warning",
        });
      }
    },
      changePlaycount(num) {
      return func.changePlaycount(num);
    },
      scrollmove() {
      //滚动加载音乐
      const $list = this.$refs.list;
      if (this.isLoading) return;
      // console.log($list.scrollTop)
      // console.log($list.scrollHeight)
      if ($list.scrollTop + 530 >= $list.scrollHeight) {
        if (this.offsetcount < this.list.length) {
          this.offsetcount += 12;
          this.getlistmain();
        } else if (this.offsetcount >= this.list.length) {
          this.isLoading = false;
        }
      }
    },
      mvscrollmove() {
      //滚动加载mv
      const $mvlist = this.$refs.mvlist;
      if (this.mvisLoading) return;
      // console.log($list.scrollTop)
      // console.log($list.scrollHeight)
      if ($mvlist.scrollTop + 533 >= $mvlist.scrollHeight) {
        if (this.size  <= this.mvlist.length) {
          this.size  += 12;
         
          this.getlistmain();
        } else if (this.size  >= this.mvlist.length) {
          this.mvisLoading = false;
        }
      }
    },

    async getlistmain() {
      this.isLoading = true;
      //获取歌单歌曲
      let url = `/artist/songs?id=${this.goartist1.id}&limit=12&offset=${this.offsetcount}`;
      await musicAPI
        .getTJmusiclistmain(url)
        .then((res) => {
          // console.log(res)
          // res.data.songs.forEach((e) => {//没有增加响应拦截器的时候
          res.songs.forEach((e) => {
            musicAPI.getsong(e.id).then(res=>{
              // console.log(res)
              res.songs.forEach((e)=>{
                this.list.push(e);

              })
            })
          });
          this.isLoading = false;
          console.log(this.list);  
        })
        .catch((error) => {
          console.log(error);
        });
        request.get(`/artist/desc?id=${this.goartist1.id}`).then((res) => {
          // console.log(res)
          this.briefDesc=res
        })
        .catch((error) => {
          console.log(error);
        });
        request.get(`/artist/video?size=${this.size}&id=${this.goartist1.id}`).then((res) => {
          // console.log(res.data.records)
          this.mvlist=[]
          res.data.records.forEach(e=>{
            this.mvlist.push(e)
          })
        })
        .catch((error) => {
          console.log(error);
        });
      },
    musiclist(index) {
      
      if (
        this.list[index].fee == 1 ||
        this.list[index].fee == 4
      ) {
        this.$message.error("您暂时还没有版权播放该音乐");
      } else {
        this.updataplaylistsong(this.list);
        this.updataplaylistsongindex(index);
      }
    },
    mv(id) {
      this.$router.push({ path: "/shipin", query: { mvid: id } });
    },
    MV(id){
      this.$router.push({ path: "/shipin", query: { mvid: id } });
    },
    changetime(num) {
      var time = new Date(num);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDay();

      return y + "年" + m + "月" + d + "日";
    },
    changesongtime(num) {
      let m, s;
      m = String(parseFloat(num) / (1000*60)).slice(0,1);
   
      s = String(num / 1000-parseInt(m)*60).slice(0,2);
      // console.log(parseInt(s),'@@@')
      if(parseInt(m)<10){
        m='0'+m.slice(0,1)
      }
      if(parseInt(s)<10){
        s='0'+s.slice(0,1)
      }
      return m + ":" + s;
    },
     }
  };
  </script>
  
  <style scoped>
  .box {
    list-style: none;
    float: left;
    width: 50%;
    margin-bottom: 20px;
    height: 150px;
    line-height: 150px;
  }
  .box::after {
    content: "";
    display: block;
    clear: both;
  }
  .el3::after {
    content: "";
    display: block;
    clear: both;
  }
  
  .name {
    list-style: none;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: black;
    display: flex;
    background-image: url('../src/assets/音乐背景.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .name::after {
    content: "";
    display: block;
    clear: both;
  }
  .name li {
    /* border-right: 1px solid #c2c2c2; */
  }
  .songlist {
    list-style: none;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #c2c2c2;
  }
  .songbox {
    /* 滚动的盒子 */
    height: 530px;
    overflow: auto;
    font-size: 14px;
  }
  .songbox::-webkit-scrollbar {
    display: none;
  }
  .songlist li {
    float: left;
    height: 50px;
    overflow: hidden;
  }
  .songlist::after {
    content: "";
    display: block;
    clear: both;
  }
  .mvlist{
    height: 350px;
    cursor: pointer;
    float: left;
    margin-bottom: 30px;
    margin-right: 30px;
    position: relative;
  }

  .mv img{
     border-radius: 10px;
  }
  .playCount {
  color: white;
  position: absolute;
  top: 0px;
  right: 10px;
}
.duration{
  color: white;
  position: absolute;
  bottom: 60px;
  right: 10px;
  font-size: 13px;
}
.mvmove{
  
  height: 532px;
  overflow: auto;
}
  </style>