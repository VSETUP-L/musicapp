<template>
  <div class="footer">
    <el-drawer
      size="100%"
      title="歌曲详情"
      :append-to-body="true"
      :wrapperClosable="false"
      :modal="false"
      :visible.sync="drawer"
      :direction="direction"
      class="details"
    >
      <div
        class="box"
        :style="{ backgroundImage: 'url(' + PICURL + ')' }"
      ></div>
      <div class="songleft">
        <img
        :src="PICURL"
        alt=""
        class="pic"
        :class="{ pic1: isclickshow, pic2: !isclickshow }"
        />
        <p style=" font-size: 20px;">{{ playlistsong[playlistsongindex].name }}</p>
      </div>
      <div class="songmain" ref="musicmove">

        <!-- 歌词部分 -->
        <div class="gecibox">
          <p
            v-for="(item, index) in songlyric"
            :key="index"
            class="geci"
            :class="{ move: T * 1000 >= item.time && T * 1000 <= item.next }"
          >
            {{ item.lrc }}
          </p>
        </div>
      </div>
      <div class="newpl">
        <h3>最新评论</h3>
        <ul class="jcpl" v-for="(item, index) in newtimepl" :key="index">
          <li>
            <div style="float: left">
              <img
                :src="item.user.avatarUrl"
                alt="用户头像"
                style="border-radius: 50%; height: 50px"
              />
            </div>
            <div style="float: left; width: 90%; margin-left: 10px">
              <span style="color: #507daf">{{ item.user.nickname }}:</span>
              <span style="color: #999999">{{ item.content }}</span>
              <p style="color: #999999">{{ item.timeStr }}</p>
            </div>
          </li>
        </ul>
        <!-- </div> -->
      </div>
    </el-drawer>

    <!-- 歌曲头像 -->
    <div class="musicheader" style="height: 50px; line-height: 50px;cursor: pointer;">
      <img
        :src="PICURL"
        alt=""
        @click="getsong(playlistsong[playlistsongindex].id)"
        style="float: left; height: 50px; border-radius: 5px; margin-left: 10px"
      />
      <span style="margin-left: 10px">{{
        playlistsong[playlistsongindex].name
      }}</span>
    </div>
    <div class="musicmain">
      <div class="controls">
        <p @click="playleft(-1)"><img src="../src/assets/上一首.png" width="30px"></p>
        <p @click="play">
          <i :class="eliconvideo"></i
          ><audio
            ref="audio"
            style="height: 10px"
            :src="`https://music.163.com/song/media/outer/url?id=${playlistsong[playlistsongindex].id}.mp3`"
          ></audio>
          </p>
          <p @click="playright(+1)"><img src="../src/assets/下一首.png" width="30px"></p>
          <p @click="getlist"><img src="../src/assets/列表.png" width="30px"></p>
        </div>

      <div class="jindutiao">
        <input
          type="range"
          min="0"
          :max="duration"
          v-model="T"
          style="height: 6px; width: 100%"
        />
      </div>
    </div>
    <div class="right" >
      <div style="float: left; margin-top: 8px;margin-left: 10px;cursor: pointer;" @click="volume">
        <img src="../src/assets/音量加.png" alt="" width="25px" >
      </div>
      <div
      class="volume"
      v-show="v"
      >
      <input type="range" v-model="vol" min="0" max="100" style="width: 80%; height: 6px;">
      <span style="font-size: 12px;">{{ this.vol }}</span>
    </div>
  </div>
  <app-getplaylist v-if="show"></app-getplaylist>
</div>
</template>

<script>
import getplaylist from "./getplaylist.vue";
import { mapMutations, mapState } from "vuex";
import musicAPI from "../src/store/musicAPI";
export default {
  data() {
    return {
      duration: 0,
      eliconvideo: "el-icon-video-play",
      drawer: false, //控制歌曲详情打开关闭
      direction: "btt", //ui的从下往上打开
      song: [],
      songlyric: [], //歌词
      newtimepl: [],
      T: 0,
      interval: "",
      v: false,
      isclickshow: false,
      vol:100
    };
  },
  components:{
    'app-getplaylist':getplaylist
  },
  computed: {
    ...mapState(["playlistsong", "playlistsongindex", "PICURL",'show']),
  },
  methods: {
    ...mapMutations([
      "updataplaylistsongindex",
      "updataplaylistsongPICURL",
      "updataplaylistsong",
      'upshow'
    ]),
    getlist(){
      if(this.show){
        this.upshow(false)
        console.log(this.show)
      }else{
        this.upshow(
          true
          )
          console.log(this.show)

      }
    },
    playleft(num) {
      let index = this.playlistsongindex + num;
      if (index < 0) {
        index = this.playlistsong.length - 1;
      }
      if (
        this.eliconvideo == "el-icon-video-pause" &&
        this.$refs.audio.paused == false &&
        this.playlistsong[this.playlistsongindex].fee != 1 &&
        this.playlistsong[this.playlistsongindex].fee != 4
      ) {
        this.play();
      }
      this.updataplaylistsongindex(index);
      let id = this.playlistsong[this.playlistsongindex].id;
      musicAPI.getsong(id).then((res) => {
        // this.song = res.data.songs;//没有增加响应拦截器的时候
        this.song = res.songs; //获取歌曲的全部信息
        //歌词部分
        musicAPI.getsonglyric(id).then((res) => {
          // this.songlyric = res.data.lrc.lyric;//没有增加响应拦截器的时候
          this.songlyric = res.lrc.lyric;
          //处理歌词
          let arr = musicAPI.getarr(this.songlyric);
          this.songlyric = arr;
        });
      });
      musicAPI.getpl(0, id, 3).then((res) => {
        console.log(res.data.comments);
        this.newtimepl = res.data.comments;
      });
    },
    play() {
      if (
        this.eliconvideo == "el-icon-video-play" &&
        this.$refs.audio.paused == true &&
        this.playlistsong[this.playlistsongindex].fee != 1 &&
        this.playlistsong[this.playlistsongindex].fee != 4
      ) {
        this.eliconvideo = "el-icon-video-pause";
        this.$refs.audio.play(console.log("play")); //播放
        this.$refs.audio.autoplay = true;
        this.upcurrentTime();
        this.isclickshow = true;
      } else if (
        this.eliconvideo == "el-icon-video-pause" &&
        this.$refs.audio.paused == false
      ) {
        this.eliconvideo = "el-icon-video-play";
        this.$refs.audio.pause(); //暂停
        this.isclickshow = false;
        clearInterval(this.interval, console.log("pause"));
      }
    },
    playright(num) {
      let index = this.playlistsongindex + num;
      if (index >= this.playlistsong.length) {
        index = 0;
      }
      if (
        this.eliconvideo == "el-icon-video-pause" &&
        this.$refs.audio.paused == false &&
        this.playlistsong[this.playlistsongindex].fee != 1 &&
        this.playlistsong[this.playlistsongindex].fee != 4
      ) {
        this.play();
      }
      this.updataplaylistsongindex(index);
      let id = this.playlistsong[this.playlistsongindex].id;
      musicAPI.getsong(id).then((res) => {
        // this.song = res.data.songs;//没有增加响应拦截器的时候
        this.song = res.songs; //获取歌曲的全部信息
        //歌词部分
        musicAPI.getsonglyric(id).then((res) => {
          // this.songlyric = res.data.lrc.lyric;//没有增加响应拦截器的时候
          this.songlyric = res.lrc.lyric;
          //处理歌词
          let arr = musicAPI.getarr(this.songlyric);
          this.songlyric = arr;
        });
      });
      // this.upcurrentTime()
      musicAPI.getpl(0, id, 3).then((res) => {
        console.log(res.data.comments);
        this.newtimepl = res.data.comments;
      });
    },
    getsong(id) {
      this.drawer = true; //控制点击头像打开歌曲详情
      musicAPI.getsong(id).then((res) => {
        // this.song = res.data.songs;//没有增加响应拦截器的时候
        this.song = res.songs; //获取歌曲的全部信息
        //歌词部分
        musicAPI.getsonglyric(id).then((res) => {
          // this.songlyric = res.data.lrc.lyric;//没有增加响应拦截器的时候
          this.songlyric = res.lrc.lyric;
          //处理歌词
          let arr = musicAPI.getarr(this.songlyric);
          this.songlyric = arr;
        });
      });
      musicAPI.getpl(0, id, 3).then((res) => {
        console.log(res.data.comments);
        this.newtimepl = res.data.comments;
      });
    },
    upcurrentTime() {
      //将歌词时间同步
      this.interval = setInterval(() => {
        this.duration = this.$refs.audio.duration;//进度条时间
        this.T = this.$refs.audio.currentTime;
        // console.log(111);
        // console.log(this.$refs.audio.ended, "////////");
        if (this.$refs.audio.ended) {
          this.eliconvideo = "el-icon-video-play";
          // clearInterval(this.interval);
          if (this.playlistsong.length > 1) {
            this.playright(+1);
          }
        }
      }, 500);
    },
    volume() {
      
      if(!this.v){
        
        this.v = true;
      }else{
        this.v = false;
      }
    },
  },

  watch: {
    vol(){
      this.$refs.audio.volume=this.vol/100
    },
    playlistsongindex() {
      //监听音乐下标是否改变，改变就播放音乐
      if (
        this.eliconvideo == "el-icon-video-play" &&
        this.$refs.audio.paused == true &&
        this.playlistsong[this.playlistsongindex].fee != 1 &&
        this.playlistsong[this.playlistsongindex].fee != 4
      ) {
        this.play();
      }
       if (!this.playlistsong[this.playlistsongindex].al) {
        this.updataplaylistsongPICURL(
          this.playlistsong[this.playlistsongindex].album.picUrl
        );
      }
      else if (!this.playlistsong[this.playlistsongindex].album) {
        this.updataplaylistsongPICURL(
          this.playlistsong[this.playlistsongindex].al.picUrl
        );
      }
      // this.updataplaylistsongPICURL(
      //   this.playlistsong[this.playlistsongindex].al.picUrl
      // );
      // this.updataplaylistsongPICURL(
      //   this.playlistsong[this.playlistsongindex].album.picUrl
      // );
      // if (this.playlistsong[this.playlistsongindex].album.picUrl) {
      // }else{
      // }
    },
    playlistsong() {
      //监听音乐是否改变，改变就播放音乐
      if (
        this.eliconvideo == "el-icon-video-play" &&
        this.$refs.audio.paused == true &&
        this.playlistsong[this.playlistsongindex].fee != 1 &&
        this.playlistsong[this.playlistsongindex].fee != 4
      ) {
        this.play();
      }
      if (!this.playlistsong[this.playlistsongindex].album) {
        this.updataplaylistsongPICURL(
          this.playlistsong[this.playlistsongindex].al.picUrl
        );
      }
      else if (!this.playlistsong[this.playlistsongindex].al) {
        this.updataplaylistsongPICURL(
          this.playlistsong[this.playlistsongindex].album.picUrl
        );
      }
    },
    T(newvalue) {
      //监听歌词时间变化 T是在点击歌曲详情时触发更新
      let d = document.querySelector("p.move");
      if (!d) {
        return; //防止拿不到歌词报错
      }
      console.log(d.offsetTop)
      console.log(this.$refs.musicmove.scrollTop)
      if (d.offsetTop > 400) {
        this.$refs.musicmove.scrollTop = d.offsetTop-100;
      }
    },
  },
  created() {
    // console.log(this.playlistsong);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.gecibox {
  /* margin-top: 100%; */
}
.geci {
  color: gray;
  margin: 20px 0 0 0;
}
.move {
  color: black;
  font-size: 20px;
}
.songleft img {
  /* width: 100%; */
  height: 341.46px;
  border-radius: 50%;
}
.pic {
  animation: rotate-activ 10s linear infinite;
}
.pic1 {
  animation-play-state: running;
}
.pic2 {
  animation-play-state: paused;
}
@keyframes rotate-activ {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.songleft {
  width: 30%;
  height: 50%;
  float: left;
 
}
.songmain {
  float: left;
  height: 50%;
  overflow-y: scroll;
  display: flex;
  text-align: center;
 
}
/* .songmain::-webkit-scrollbar {
  display: none;
} */
.footer {
  /* background-color: rgb(189, 151, 224); */
  z-index: 9999;
  width: 100%;
  /* display: flex; */
}
.footer::after{
  content: '';
  display: block;
  clear: both;
}
.musicheader {
  float: left;
  width: 20%;
}
.musicmain {
  float: left;
  width:60%;
  text-align: center;
}

.controls {
  margin: 0 auto;
  width: 50%;
}
.controls::after {
  content: "";
  display: block;
  clear: both;
}
.controls p:nth-child(1) {
  /* font-size: 25px; */
  margin-top: 5px;
  position: absolute;
  left: 30%;
  cursor: pointer;
}
.controls p:nth-child(2) {
  font-size: 25px;
  margin-top: 2px;
  position: absolute;
  left: 40%;
  cursor: pointer;
}
.controls p:nth-child(3) {
  /* font-size: 25px; */
  margin-top: 5px;
  position: absolute;
  left: 50%;
  cursor: pointer;
}
.controls p:nth-child(4) {
  /* font-size: 25px; */
  margin-top: 5px;
  position: absolute;
  left: 60%;
  cursor: pointer;
}
/* .controls p:hover {
  color: wheat;
} */
.jindutiao{
  position: absolute;
  bottom: 0;
  width: 60%;
}
.right {
  /* float: left; */
  width: 20%;
  position: absolute;
  right: 0;
  height: 50px;
  line-height: 50px;
}
.volume{
  width: 80%;
  float: left;
  
}
.jcpl::after {
  content: "";
  display: block;
  clear: both;
}
.jcpl {
  border-bottom: 1px solid #f2f2f2;
  margin-top: 10px;
  height: auto;
  list-style: none;
}
.newpl {
  width: 43%;
  float: left;
  overflow: auto;
  height: 50%;
  margin-left:400px ;
}
.newpl::-webkit-scrollbar {
  display: none;
}
.details {
  /* position:relative; */
  height: 94.6%;
  margin-right: 0px;
}
.el-drawer__container {
  width: 100%;
  /* float: right; */
}
.box {
  width: 100%;
  height: 94.6%;
  filter: blur(500px);
  position: absolute;
  top: -94.6%;
 
}
input{
  width: 100%;
  /* height: 10px; */
  -webkit-appearance: none; 
  /* 不显示原本的样式 */
  background-color: white;
  outline: none;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: inset 0 0 5px rgb(207, 203, 203);
}
input::-webkit-slider-thumb{
  -webkit-appearance: none;
  color: black;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: 4px solid #333; 
  /* 通过巨大的box-shadow 来展示已经滑过的滑条颜色
  要配合上面的overflow*/
  box-shadow: -707px 0 0 700px ;
}

</style>