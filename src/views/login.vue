<template>
  <div class="login">
    <span class="span">有悦音乐</span>
   
    <div class="nav">
      <div class="block">
        <!-- <el-avatar :size="70" :src="circleUrl">music</el-avatar> -->
      </div>
      
    <p class="denglu" @click="denglu" v-if="!user.profile">登录</p>
      <el-dropdown v-if="user.profile">
        <div style="display: flex; align-items: center; color: white">
          <img
            :src="user.profile?user.profile.avatarUrl:''"
            alt=""
            height="70px"
            style="border-radius: 50%"
            @click="gotouser(user.profile.userId)"
          />
          <span>{{ user.profile?user.profile.nickname:'' }}</span>
        </div>
        <el-dropdown-menu slot="dropdown" style="width: 200px">
          <div class="userlogin">
            <p @click="get(user.profile.userId, '/userdt')">{{ user.profile?user.profile.eventCount:'' }}<span> 动态</span></p>
            <p @click="get(user.profile.userId, '/userGZ')">{{ user.profile?user.profile.follows:'' }}<span>关注</span></p>
            <p @click="get(user.profile.userId, '/userFX')">{{ user.profile?user.profile.followeds:'' }}<span>粉丝</span></p>
          </div>
          <el-dropdown-item divided disabled
            ><i class="el-icon-medal"></i>等级{{ user?user.level:'' }}</el-dropdown-item
          >
          <el-dropdown-item divided @click.native="logout"
            ><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
   
      <!-- 搜索音乐 -->
      <el-input
        @keyup.enter.native="search(input)"
        placeholder="请输入搜索的歌曲"
        v-model="input"
        class="el-input-search"
        clearable
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import musicAPI from "../store/musicAPI";
import request from "../store/request";
export default {
  inject: ["reload"], //刷新页面
  data() {
    // var dis=true
    return {
      dis: 0,
      input: "",  
      searchlist: [],
      s: true, //登录字体显示
      sucess: false,
      loginlist:[]
    };
  },

  components: {},
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["upuser", "uploginuser",'upuserid','upotheruser']),
    search(input) {
      this.input = "";
      this.$router.push({ path: "Search", query: { input: input } });
      this.reload(); //刷新页面
    },
    async denglu() {
      this.$router.push({path:'/reg',query:{s:this.s,sucess:this.sucess}})
    },
    logout() {
      //退出登录

      this.$confirm("确定退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let url = `/logout`;
          request.get(url).then((res) => {
            if (res.code == 200) {
              let loginsucess = {
                //保存登录信息可以防止刷新丢失登录信息
                islogin: false,
              };
              this.uploginuser(loginsucess);
              // this.sucess = false;
              localStorage.setItem("userinfo",JSON.stringify(loginsucess));
              localStorage.removeItem("user");
              localStorage.removeItem("loginlist");
              localStorage.removeItem("cookie");
              // this.s = true;
              this.upuser([])
            }
          });
          this.$message({
            type: "success",
            message: "退出登录成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录",
          });
        });
    },
    
    get(id, Path) {
      this.upuserid(id);
      this.upotheruser(this.user);
      this.$router.push({ path: Path });
    },
    gotouser(id) {
      //点击用户头像跳转到用户详情
      this.upuserid(id);
      localStorage.setItem('otheruserid', JSON.stringify( id))
      this.$router.push({ path: "/user" });
    },
  },
  mounted() {
    // let cookie=JSON.parse(localStorage.getItem("cookie"));
    // console.log(cookie)
    let userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (userinfo === null) return; //刷新的时候判断是否已经登录
    if (userinfo.islogin) {
      // this.dialogFormVisible = false;
      this.s = false;
      this.upuser(JSON.parse(localStorage.getItem("user"))); //拿到localstorage的用户信息更新vuex里面的user
      console.log(this.user)
      this.loginlist = JSON.parse(localStorage.getItem("loginlist")); //拿到localstorage的用户信息赋值给渲染的数组
      this.sucess = true; //展示信息
     
    }else{
      this.s=true
      this.sucess=false
    }
  },
  watch:{
    // s(){
    //   this.s=this.$route.query.s=false
    // },
    // sucess(){
    //   this.sucess= this.$route.query.sucess = true;
    // }
  }
};
</script>

<style scoped >
.userlogin::after {
  display: block;
  content: "";
  clear: both;
}
.userlogin {
  cursor: pointer;
  text-align: center;
  align-items: center;
}
.userlogin p {
  float: left;
  width: 33%;
  height: 50px;
  line-height: 50px;
}
.userlogin p span {
  font-size: 12px;
}
.mimalogin:hover {
  color: red;
}
.login {
  background-color: rgb(189, 151, 224);
  color: #ffffff;
}
.span {
  float: left;
  font-size: 25px;
  font-weight: 1000;
  margin: 10px 0 0 20px;
  line-height: 50px;
}
.nav {
  width: 1100px;
  margin: 0 auto;
  height: 70px;
}
.block {
  float: left;
  width: 50px;
  height: 70px;
}
.el-input-search {
  float: right;
  width: 200px;
  line-height: 70px;
}
.denglu {
  float: right;
  line-height: 70px;
}
</style>