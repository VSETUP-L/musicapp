<template>
  <div id="mv">
    <h1 @click="back"><i class="el-icon-arrow-left"></i>视频详情</h1>
    <div class="mv">
      <video :src="url" controls="controls"></video>
    </div>
    <div class="artists" v-for="(item,index) in mvdata.artists" :key="index">
      <img :src="item.img1v1Url" />
    
      <span  >{{ item.name }}</span>
    </div>
    <div>
      <span style="margin-top: 20px; font-weight: 1000; font-size: 25px">
        {{ mvdata.name }}
      </span>
      <span
        @click="kai"
        style="margin-top: 20px; font-weight: 1000; font-size: 25px"
      >
        <span v-show="kai1"><i class="el-icon-caret-bottom"></i></span>
        <span v-show="kai2"><i class="el-icon-caret-top"></i></span>
      </span>
    </div>
    <span style="color: gainsboro">发布：{{ mvdata.publishTime }}</span
    ><span style="color: gainsboro; margin-left: 10px"
      >播放：{{ change(mvdata.playCount) }}</span
    >
    <p style="margin-top: 20px" v-show="kai2">{{ mvdata.desc }}</p>
    <!-- <div class="bt">
      
      <button round>
        <i class="el-icon-folder-add"></i>收藏({{ mvdata.subCount }})
      </button>
      <button round>
        <i class="el-icon-share"></i>分享({{ mvdata.shareCount }})
      </button>
     
    </div> -->
    <div style="margin-top: 20px">
      <h2>评论({{ mvdata.commentCount }})</h2>
      <div style="margin: 20px 0"></div>
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
    <div style="margin-top: 20px" v-show="hotComments.length!=0">
      <h3>精彩评论</h3>
      <ul class="jcpl" v-for="(item, index) in hotComments" :key="index">
        <li>
          <div style="float: left">
            <img
              :src="item.user.avatarUrl"
              alt="用户头像"
              style="border-radius: 50%; height: 50px;cursor: pointer;"
              @click="gotouser(item.user.userId)"
            />
          </div>
          <div style="float: left; width: 90%; margin-left: 10px">
            <span style="color: #507daf">{{ item.user.nickname }}:</span>
            <span style="color: #999999">{{ item.content }}</span>
            <p style="color: #999999">{{ item.timeStr }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div style="margin-top: 20px">
      <h3>最新评论</h3>
      <ul class="jcpl" v-for="(item, index) in newtimepl" :key="index">
        <li>
          <div style="float: left">
            <img
              :src="item.user.avatarUrl"
              alt="用户头像"
              style="border-radius: 50%; height: 50px;cursor: pointer;"
              @click="gotouser(item.user.userId)"
            />
          </div>
          <div style="float: left; width: 90%; margin-left: 10px">
            <span style="color: #507daf">{{ item.user.nickname }}:</span>
            <span style="color: #999999">{{ item.content }}</span>
            <p style="color: #999999">{{ item.timeStr }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations ,mapState} from 'vuex';
import func from "../src/store/func";
import musicAPI from "../src/store/musicAPI";

export default {
  data() {
    return {
      textarea: "",
      url: "",
      mvdata: {},
      kai1: true,
      kai2: false,
      hotComments: [],
      newtimepl:[]
    };
  },

  components: {},
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['upuserid']),
    back() {
      this.$router.back();
    },
    kai() {
     
      if (this.kai1) {
        this.kai1 = false;
        this.kai2 = true;
      } else if (this.kai2) {
        this.kai1 = true;
        this.kai2 = false;
      }
    },
    mv() {
      
      musicAPI.getmv(this.$route.query.mvid).then((res) => {
        // console.log(res.data);
        this.mvdata = res.data;
        if(this.mvdata.desc==''){
          this.kai1 = false;
          this.kai2 = false;
        }
      });
      musicAPI.getmvurl(this.$route.query.mvid).then((res) => {
        // console.log(res)
        this.url = res.data.url;
      });
      musicAPI.gethotpl(this.$route.query.mvid, 1).then((res) => {
        this.hotComments = res.hotComments;
        // console.log(this.hotComments);
      });

      musicAPI.getpl(1,this.$route.query.mvid,3,1,0).then((res) => {
        // console.log(res);
        res.data.comments.forEach(e => {
          this.newtimepl.push(e)
          
        });
      });
    },
    change(num) {
      return func.changePlaycount(num);
    },
    send(){
      if(this.user.userPoint==undefined){//登录用户id
        this.$message({
          message: '您账号还未登录，请先登录再评论',
          type: 'warning'
        });
      }
     else{ musicAPI.sendpl(1,1,this.$route.query.mvid,this.textarea).then(res=>{
        // console.log(res)
        if(res.code==302){
          this.$message({
          message: '您账号还未登录，请先登录再评论',
          type: 'warning'
        });
        }
      })
      this.newtimepl.unshift(
        {
          user:JSON.parse(localStorage.getItem('loginlist')),
        content:this.textarea,
        timeStr:'刚刚'})
      setTimeout(()=>{
        this.newtimepl=[]
        // this.time=0
        // this.pageNo=1
        this.mv()
      },120000)
      this.textarea=''
      // this.mv()
    }
    },
    gotouser(id) {
      //点击用户头像跳转到用户详情
      this.upuserid(id);
      this.$router.push({ path: "/user" });
    },
  },
  mounted() {
    // console.log(this.$route)
    this.mv();
    
  },
};
</script>

<style scoped>
h1 {
  cursor: pointer;
}
#mv {
  width: 70%;
  height: 100%;
  margin: 0 auto;
}
.mv video {
  /* width: 50%; */
  height: 500px;
  margin: 0 auto;
}
.artists {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.artists img {
  height: 50px;
  border-radius: 50%;
}
.artists span {
  cursor: pointer;
  margin-left: 10px;
  color: gainsboro;
}
.artists span:hover {
  color: black;
}
.bt {
  height: 30px;
  margin-top: 20px;
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
.jcpl::after{
content: '';
display: block;
clear: both;

}
.jcpl{
  border-bottom: 1px solid #f2f2f2;
  margin-top: 10px; 
  height: auto; 
  list-style: none;
}
</style>