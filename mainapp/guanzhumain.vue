<template>
  <div class="guanzhumain">
    <el-dialog title="分享" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分享的内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.name"
            maxlength="140"
            show-word-limit
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <span @click="getuser">@</span>
          <div v-show="User">
            <p
              v-for="(item, index) in follow"
              :key="index"
              @click="puttext(item)"
            >
              {{ item }}
            </p>
          </div>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="getmusic"
            ><i class="el-icon-paperclip"></i>给动态添加音乐</el-button
          >

          <div v-if="searchmusicindex" style="background-color: gainsboro;">
            <img v-if="searchmusicindex.al" :src="searchmusicindex.al.picUrl" style="width: 80px;height: 80px;">
            {{ searchmusicindex.name }}
          </div>

          <div v-if="searchmusic">
            <el-input @keyup.enter.native="search(input)" v-model="input" placeholder="请输入需要搜索的内容"></el-input>
          <div v-for="(i,ind) in music" :key="ind" @click="putmusic(i.id,i)">
            <img :src="i.al.picUrl" style="width: 80px;height: 80px;">
            {{ i.name }}
          </div>
          </div>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Send"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <div style="float: left">
      <div class="header">
        <h2>
          动态
          <button class="btn" @click="sendDT">
            <i class="el-icon-edit-outline"></i>写动态
          </button>
        </h2>
        <div v-show="stop">暂无动态</div>
      </div>
      <div class="mainer" ref="list" @scroll="scrollmove" v-if="dt.length > 0">
        <div v-for="(item, index) in dt" :key="index" class="list">
          <div style="float: left">
            <img
              :src="item.user.avatarUrl"
              alt="avatarUrl"
              style="width: 50px; border-radius: 50%; cursor: pointer"
              @click="gotouser(item.user.userId)"
            />
          </div>
          <div style="float: left; width: 600px; margin-left: 10px">
            <div style="color: rgb(11, 88, 176)">
              {{ item.user.nickname }}
             
              <p style="color: #929293">{{ changetime(item.showTime) }}</p>
            </div>
            <div style="margin-top: 10px; white-space: pre-wrap">
              {{ JSON.parse(item.json).msg }}
            </div>
            <div
              v-for="(E, I) in JSON.parse(item.json)"
              :key="I"
              style="
                margin: 10px 0;
                height: 80px;
                cursor: pointer;
                background-color: #f4f4f5;
              "
              @click="playmusic(E)"
              v-if="E ? E.album : false"
            >
              <img
                v-if="E.album.picUrl"
                :src="
                  E.img80x80
                    ? E.img80x80
                    : E.album.picUrl
                    ? E.album.picUrl
                    : E.album.img80x80
                "
                style="
                  width: 80px;
                  height: 80px;
                  float: left;
                  border-radius: 10px;
                  margin-right: 10px;
                "
              />
              <p style="padding-top: 10px">{{ E.name }}</p>
              <div
                v-for="(e, i) in E.artists"
                :key="i"
                style="color: #929293; font-size: 14px"
              >
                {{ e.name }}
              </div>
            </div>

            <div v-for="(it, i) in item.pics" :key="i" style="float: left">
              <img
                :src="it.originUrl"
                style="height: 200px; width: 200px; border-radius: 5px"
              />
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import func from "../src/store/func";

import request from "../src/store/request";
export default {
  data() {
    return {
      input: "",
      searchmusic: false,//展示查找音乐
      offsetcount:0,
      music:[],//查找的音乐列表
      searchmusicindex:{},//选择的音乐
      ziyuanid:'',//资源id
      User: false, //@用户名是否展开
      follow: [], //@用户名

      dialogFormVisible: false,
      isLoading: false,
      dt: [],
      lasttime: -1,
      stop: true,
      form: {
        name: "",
      },
      formLabelWidth: "120px",
    };
  },
  components: {},
  computed: {
    ...mapState(["playlistsong"]),
    // filteredJson() {
    //   return this.dt.map((item) => {
    //     const parsedJson = JSON.parse(item.json);
    //     return parsedJson.song ? parsedJson : null;
    //   });
    // },
  },
  methods: {
    ...mapMutations([
      "updataplaylistsong",
      "updataplaylistsongindex",
      "upuserid",
    ]),
    async DT() {
      this.isLoading = false;
      let url = "/login/status";
      await request.get(url).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          request
            .get(`/event?pagesize=7&lasttime=${this.lasttime}`)
            .then((res) => {
console.log(res)
              res.event.forEach((e) => {
                this.dt.push(e);
              });
              this.isLoading = true;
              this.stop = false;
              this.lasttime = res.lasttime;
              // console.log(this.dt);
            });
        } else {
          this.stop = true;
        }
      });
    },
    changetime(num) {
      return func.changetime2(num);
    },
    playmusic(E) {
      // console.log(E);
      for (let i = 0; i < this.playlistsong.length; i++) {
        if (this.playlistsong.indexOf(E) == -1) {
          this.playlistsong.push(E);
          this.updataplaylistsongindex(this.playlistsong.length - 1);
        } else if (this.playlistsong.indexOf(E) != -1) {
          this.playlistsong.splice(1, i);
          this.playlistsong.push(E);
          this.updataplaylistsongindex(this.playlistsong.length - 1);
        }
      }
    },
    scrollmove() {
      //滚动加载
      const $list = this.$refs.list;
      if (!this.isLoading) return;
      // console.log($list.scrollTop)
      // console.log($list.scrollHeight)
      if ($list.scrollTop + 724 >= $list.scrollHeight) {
        this.isLoading = false;
        this.DT();
        // this.isLoading = false;
      }
    },
    gotouser(id) {
      //点击用户头像跳转到用户详情
      this.upuserid(id);
      this.$router.push({ path: "/user" });
    },
    sendDT() {
      //分享动态
      this.dialogFormVisible = true;
    },
    getuser() {
      this.follow = [];
      let id = JSON.parse(localStorage.getItem("loginlist")).userId;
      let url = `/user/follows?uid=${id}`;
      request.get(url).then((res) => {
       
        res.follow.forEach((e) => {
          this.follow.push(e.nickname);
        });
      });
      this.User = true;
    },
    puttext(item) {
      this.form.name = this.form.name + "@" + item + " ";
      this.User = false;
    },
    getmusic() {
      this.searchmusic = true;
      
    },
    search(input){
      let url = `/cloudsearch?type=1&limit=10&offset=${this.offsetcount}&keywords=${input}`;
      request.get(url).then(res=>{
        res.result.songs.forEach(e=>{
          this.music.push(e)
        })
        
      })
    },
    putmusic(id,i){
      this.searchmusicindex=i
      this.searchmusic=false
      this.ziyuanid=id
    },
    Send(){
      let url= `/share/resource?type=song&id=${this.ziyuanid}&msg=${this.form.name}`
      request.post(url).then(res=>{
        
                this.dt.unshift( res.event);
      })
      this.dialogFormVisible = false;
    }
  },
  mounted() {
    this.DT();
  },
  watch:{
    dt(){
      this.dt=this.dt
    }
  }
};
</script>

<style scoped>
/* .guanzhumain {
  width: 80%;
  margin:0 auto;
} */
.header {
  margin-top: 20px;
  margin-left: 20px;
}
.btn {
  height: 30px;
  width: 120px;
  border-radius: 50px;
  background-color: rgb(189, 151, 224);
  font-size: 18px;
  color: white;
  border: 0;
}
.mainer {
  width: 900px;
  height: 723px;
  margin-top: 20px;
  overflow: auto;
}
.mainer::after {
  content: "";
  display: block;
  clear: both;
}
.list {
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
  width: 700px;
  /* border-left: 2px solid #e0e0e0; */
}
.list::after {
  content: "";
  display: block;
  clear: both;
}
</style>