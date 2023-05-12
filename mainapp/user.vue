<template>
  <div id="user">
    <h2 @click="back"><i class="el-icon-arrow-left"></i>返回</h2>
    <div v-show="!this.userid" style="margin: 20px auto">
      暂时无法获取用户信息
    </div>
    <div v-show="this.userid && this.userlist <= 0" style="margin: 20px auto">
      加载中....
    </div>
    <div v-if="this.userid && this.userlist != []">
      <div class="head">
        <div
          style="
            float: left;
            margin: 20px;
            border: 2px solid gainsboro;
            border-radius: 50%;
          "
        >
          <img
            :src="otheruser.profile ? otheruser.profile.avatarUrl : ''"
            style="width: 200px; border-radius: 50%"
          />
        </div>
        <div style="float: left; margin-top: 20px">
          <div>
            <h2>
              {{ otheruser.profile ? otheruser.profile.nickname : "" }}
              <span
                style="
                  background-color: #f0f0f0;
                  border-radius: 50%;
                  font-size: 14px;
                "
              >
                Lv{{ otheruser.level }}
              </span>
              <span
                ><i
                  class="el-icon-male"
                  v-if="
                    (otheruser.profile ? otheruser.profile.gender : '') == 1
                  "
                  style="
                    border-radius: 10px;
                    background-color: aqua;
                    font-size: 14px;
                  "
                ></i
              ></span>
              <span
                ><i
                  class="el-icon-female"
                  v-if="
                    (otheruser.profile ? otheruser.profile.gender : '') == 2
                  "
                  style="
                    border-radius: 10px;
                    background-color: pink;
                    font-size: 14px;
                  "
                ></i
              ></span>
            </h2>
            <div
              v-if="this.userid == (user.userPoint?user.userPoint.userId:'')"
              style="margin-top: 10px"
            >
              <button
                @click="changeUser()"
                style="
                  width: 100px;
                  height: 50px;
                  border-radius: 50px;
                  background-color: azure;
                  border: 1px solid;
                "
              >
                编辑信息
              </button>
            </div>
          </div>
          <div class="userlogin">
            <p @click="gotouser(userid, '/userdt')">
              {{ otheruser.profile ? otheruser.profile.eventCount : "" }}
              <span> 动态</span>
            </p>
            <p @click="gotouser(userid, '/userGZ')">
              {{ otheruser.profile ? otheruser.profile.follows : ""
              }}<span>关注</span>
            </p>
            <p @click="gotouser(userid, '/userFX')">
              {{ otheruser.profile ? otheruser.profile.followeds : ""
              }}<span>粉丝</span>
            </p>
          </div>
          <div style="width: 1000px; white-space: pre-wrap">
            <p>
              个人介绍：{{
                otheruser.profile ? otheruser.profile.signature : ""
              }}
              <span
                v-show="!(otheruser.profile ? otheruser.profile.signature : '')"
                >暂无介绍</span
              >
            </p>
          </div>
        </div>
      </div>
      <el-tabs style="height: 520px" v-model="activeName">
        <el-tab-pane label="创建的歌单" name="first">
          <div v-if="musiclist.length <= 0">暂无歌单</div>
          <div v-for="(item, index) in musiclist" :key="index" class="imgbox">
            <el-col :span="8" style="width: 200px">
              <el-card shadow="hover">
                <router-link
                  :to="{ path: '/TJmusiclist', query: { id: item.id } }"
                  tag="div"
                >
                  <img
                    :src="item.coverImgUrl"
                    :alt="item.name"
                    style="width: 200px"
                  />
                  <span class="playcount"
                    ><i class="el-icon-caret-right"></i
                    >{{ changePlaycount(item.playCount) }}</span
                  >
                  <p>{{ item.name }}</p>
                </router-link>
              </el-card>
            </el-col>
          </div>
        </el-tab-pane>

        <el-tab-pane label="收藏的歌单" name="third" class="el3">
          <div v-if="submusiclist.length <= 0">暂无歌单</div>
          <div
            v-for="(item, index) in submusiclist"
            :key="index"
            class="imgbox"
          >
            <el-col :span="8" style="width: 200px">
              <el-card shadow="hover">
                <router-link
                  :to="{ path: '/TJmusiclist', query: { id: item.id } }"
                  tag="div"
                >
                  <img
                    :src="item.coverImgUrl"
                    :alt="item.name"
                    style="width: 200px"
                  />
                  <span class="playcount"
                    ><i class="el-icon-caret-right"></i
                    >{{ changePlaycount(item.playCount) }}</span
                  >
                  <p>{{ item.name }}</p>
                </router-link>
              </el-card>
            </el-col>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="昵称:" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="介绍:" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.text"
              maxlength="300"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="性别:" :label-width="formLabelWidth">
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
          </el-form-item>
          <!-- <el-form-item :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon">添加头像</i>
            </el-upload>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="senduser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import musicAPI from '../src/store/musicAPI';
import request from "../src/store/request";
export default {
  data() {
    return {
      activeName: "first", //默认显示的
      userlist: [],
      musiclist: [],
      submusiclist: [],
      imageUrl: "", //用户头像
      dialogFormVisible: false,
      form: {
        name: "",
        text: "",
      },
      formLabelWidth: "120px",
      radio: "1",
      loginlist:[]
    };
  },

  components: {},
  computed: {
    ...mapState(["userid", "otheruser", "user"]),
    
  },
  methods: {
    ...mapMutations(["upotheruser", "upuserid"]),
    getuser() {
      // console.log(this.userid);
      if(this.userid){
        let url = `/user/detail?uid=${this.userid}`;
      request.get(url).then((res) => {
        this.upotheruser(res);
        this.userlist = this.otheruser;
      });
      }
      else if(JSON.parse(localStorage.getItem('otheruserid'))){
        let url = `/user/detail?uid=${JSON.parse(localStorage.getItem('otheruserid'))}`;
      request.get(url).then((res) => {
        this.upotheruser(res);
        this.userlist = this.otheruser;
      });
      }
      
    
    },
    
    getusermusiclist() {
      if(this.userid){
        let url = `/user/playlist?uid=${this.userid}`;
      request.get(url).then((res) => {
        res.playlist.forEach((e) => {
          if (e.creator.userId == this.userid) {
            this.musiclist.push(e);
          } else {
            this.submusiclist.push(e);
          }
        });

        // this.upotheruser(res);
      });
      }
      else if(JSON.parse(localStorage.getItem('otheruserid'))){
        let url = `/user/playlist?uid=${JSON.parse(localStorage.getItem('otheruserid'))}`;
      request.get(url).then((res) => {
        res.playlist.forEach((e) => {
          if (e.creator.userId == JSON.parse(localStorage.getItem('otheruserid'))) {
            this.musiclist.push(e);
          } else {
            this.submusiclist.push(e);
          }
        });

        // this.upotheruser(res);
      });
      }
    },
    changePlaycount(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else {
        return num;
      }
    },
    back() {
      this.$router.back();
    },
    gotouser(id, Path) {
      this.upuserid(id);
      this.$router.push({ path: Path });
    },

    changeUser() {
      this.dialogFormVisible = true;
    },
    senduser() {
      let url = `/user/update?gender=${this.radio}&signature=${this.form.text}&nickname=${this.form.name}`;
      request.post(url).then((res) => {
        console.log(res);
        if(res.code==200){
          musicAPI.getuser(this.user.userPoint.userId).then((res) => {
        // this.upuser(res.data)//没有增加响应拦截器的时候
        this.upuser(res); //更新vuex的user
        localStorage.setItem("user", JSON.stringify(this.user));
      });

      let url1 = `/login/status?timestamp=${Date.now()}`; //获取登录的状态
      request.post(url1,).then((res) => {
        this.loginlist = res.data.profile;
      });
      localStorage.setItem("loginlist", JSON.stringify(this.loginlist));
        }else{
          alert(res.message)
        }
      });
      
      this.dialogFormVisible = false;
    },
    // handleAvatarSuccess(res, file) {
    //   //用户头像
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
  },
  created() {
    this.getuser();
    this.getusermusiclist();
  },

  watch: {
    userid() {
      this.getuser();
      this.musiclist = [];
      this.submusiclist = [];
      this.getusermusiclist();
    },
    
  },
};
</script>

<style scoped>
.head::after {
  content: "";
  display: block;
  clear: both;
}
.userlogin {
  margin-top: 20px;
  width: 1000px;
  border-top: 2px solid #e5e5e5;
}
.userlogin::after {
  content: "";
  display: block;
  clear: both;
}
.userlogin p {
  float: left;
  cursor: pointer;
  height: 80px;
  margin-right: 20px;
  line-height: 80px;
  font-size: 18px;
  text-align: center;
}
.userlogin p:nth-child(2) {
  border-left: 1px solid #e5e5e5;
}
.userlogin p:nth-child(3) {
  border-left: 1px solid #e5e5e5;
}

.userlogin p span {
  font-size: 14px;
}
/deep/ .el-card__body,
.el-main {
  padding: 0;
  height: 250px;
  border-radius: 10px;
}
.imgbox {
  width: 200px;
  float: left;
  margin-left: 20px;
  position: relative;
}
.imgbox:hover {
  cursor: pointer;
}
.playcount {
  background-color: rgb(229, 229, 229, 0.5);
  position: absolute;
  /* color: rgb(189, 151, 224); */
  color: white;
  top: 0px;
  float: right;
  right: 10px;
  border-radius: 8px;
}
/* 用户头像 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>