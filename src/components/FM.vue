<template>
  <div class="FM">
    <div class="box" :style="{ backgroundImage: 'url(' + PICURL + ')' }"></div>
    <div class="header">
      {{ playlistsong[playlistsongindex].name }}--
      <span v-if="playlistsong[playlistsongindex].album">
        {{ playlistsong[playlistsongindex].album.artists[0].name }}
      </span>
    </div>
    <div class="head">{{ playlistsong[playlistsongindex].reason }}</div>
    <div class="main"><img :src="PICURL" /></div>
    {{ this.user }}
     <div style="margin: 0 auto;width: 50%;"  >
      <h2>评论({{ this.totalCount?this.totalCount:'' }})</h2>
      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="140"
        show-word-limit
      >
      </el-input>
      <button @click="send" style="width: 80px;margin-top: 10px; font-size: 14px; float: right;">评论</button>
    </div>
    <!-- </div> -->
    <div class="newpl"  ref="list" @scroll="scrollmove">
        <h3>最新评论</h3>
        <ul class="jcpl" v-for="(item, index) in newtimepl" :key="index">
          <li>
            <div style="float: left">
              <img
                :src="item.user?item.user.avatarUrl:''"
                alt="用户头像"
                style="border-radius: 50%; height: 50px;cursor: pointer;"
                @click="gotouser(item.user.userId)"
              />
            </div>
            <div style="float: left; width: 90%; margin-left: 10px">
              <span style="color: #507daf">{{  item.user?item.user.nickname:''  }}:</span>
              <span style="color: #999999">{{ item.content }}</span>
              <p style="color: #999999">{{ item.timeStr }}</p>
            </div>
          </li>
        </ul>
      
      </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import musicAPI from '../store/musicAPI';
import request from "../store/request";
export default {
  data() {
    return {
      FM: [],
      songlyric: [], //歌词
      T: 0,
      newtimepl:[],
      totalCount:0,
      textarea: "",
      pageNo:0,
      time:0
    };
  },

  components: {},
  computed: {
    ...mapState(["playlistsong", "playlistsongindex", "PICURL",'user']),
  },

  methods: {
    ...mapMutations([
      "updataplaylistsong",
      "updataplaylistsongindex",
      "updataplaylistsongPICURL",
      'upuserid'
    ]),
    scrollmove() {
      //滚动加载
      const $list = this.$refs.list;
  
      if ($list.scrollTop +501>= $list.scrollHeight) {
        if (this.pageNo*10 < this.newtimepl.length) {
          this.pageNo+=1
          this.getnewpl();
        } else if (this.pageNo*10 >= this.newtimepl.length) {
          // this.isLoading = false;
        }
        }
      
    },
    getFM() {
      request.get(`/personal_fm`).then((res) => {

        this.updataplaylistsong(res.data);
        // console.log(this.playlistsong)
        this.FM = res.data;
      });
      // this.getnewpl()
    },
    getnewpl(){

      musicAPI.getpl(0, this.playlistsong[this.playlistsongindex].id, 3,this.pageNo,this.time).then((res) => {

        console.log(res.data.totalCount)
        this.totalCount=res.data.totalCount
        res.data.comments.forEach(e=> {
          this.newtimepl.push(e);
        });

        this.time=parseInt( res.data.cursor)
      });
    },
    send(){
      // console.log(this.user.userPoint)
      if(this.user.userPoint==undefined){//登录用户id
        this.$message({
          message: '您账号还未登录，请先登录再评论',
          type: 'warning'
        });
      }
      else{ musicAPI.sendpl(1,0,this.playlistsong[this.playlistsongindex].id,this.textarea).then(res=>{
       console.log(res)
        if(res.code==302){
          this.$message({
          message: '您账号还未登录，请先登录再评论',
          type: 'warning'
        });
        }
        else if(res.code==200){
          this.newtimepl.unshift(
        {
          user:JSON.parse(localStorage.getItem('loginlist')),
        content:this.textarea,
        timeStr:'刚刚'})
      setTimeout(()=>{
        this.newtimepl=[]
        this.time=0
        this.pageNo=1
        this.getnewpl()
      },120000)
      this.textarea=''
        }
      })
    }
    },
    gotouser(id) {
      //点击用户头像跳转到用户详情
      this.upuserid(id);
      this.$router.push({ path: "/user" });
    },
  },
  created() {
    this.getFM();
    this.getnewpl()
  //  console.log( JSON.parse('{"userId":1463432297,"userType":0,"nickname":"VSETUP_L","avatarImgId":109951165435865800,"avatarUrl":"http://p1.music.126.net/r_G-diw18xkVN-abCOWZrg==/109951165435865799.jpg","backgroundImgId":109951164991618100,"backgroundUrl":"http://p1.music.126.net/WeG3P5W2AFbEFx-qSAMaEw==/109951164991618089.jpg","signature":"","createTime":1526895330414,"userName":"1_********951","accountType":1,"shortUserName":"********951","birthday":-2209017600000,"authority":0,"gender":1,"accountStatus":0,"province":440000,"city":440100,"authStatus":0,"description":null,"detailDescription":null,"defaultAvatar":false,"expertTags":null,"experts":null,"djStatus":0,"locationStatus":30,"vipType":0,"followed":false,"mutual":false,"authenticated":false,"lastLoginTime":1682842039227,"lastLoginIP":"127.0.0.1","remarkName":null,"viptypeVersion":1671209909416,"authenticationTypes":0,"avatarDetail":null,"anchor":false}')
  //  )
  },
  watch:{
    newtimepl(){
      this.newtimepl=this.newtimepl
    },
    playlistsong(){
      this.newtimepl=[]
      this.time=0
      this.pageNo=1
      this.getnewpl()
    },
    playlistsongindex(){
      if(this.playlistsongindex==this.playlistsong.length-1){
        this.getFM();
      }
      console.log(this.playlistsong.length-1)
      console.log(this.playlistsongindex)
      this.newtimepl=[]
      this.time=0
      this.pageNo=1
      this.getnewpl()
    }
  }
};
</script>

<style scoped>
.box {
  height: 100%;
  width: 100%;

  filter: blur(1000px);
  position: absolute;
  top: -100%;

}
.header {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 20px;
  font-size: 25px;
}
.head {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}
.main {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 20px;
  border-radius: 50%;
}
.main img {
  height: 400px;
  border-radius: 10%;
}
.newpl {
  /* margin-top: 50px; */
  width: 70%;
  overflow: auto;
  height: 500px;
  margin: 0px auto;
}
/* .newpl::-webkit-scrollbar {
  display: none;
} */
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
button {
  width: 180px;
  height: 30px;
  border-radius: 25px;
  margin-right: 10px;
  border: 1px solid #d9d9d9;
  background-color: white;
  font-size: 20px;
}
button:hover {
  background-color: #f2f2f2;
}
</style>