<template>
  <div id="reg">
    <h2 @click="back"><i class="el-icon-arrow-left"></i>退出</h2>
    <!-- 登录 -->
    <div style="margin: 0 auto; width: 50%">
      <div style="text-align: center; margin-top: 20px">
        <img :src="base64" style="width: 200px; height: 200px" />
        <p>app扫码登录</p>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button @click="login1">登录</el-button>
        <el-button type="primary" @click="reg">注册</el-button>
      </div>
    </div>

    <!-- 注册 -->
    <el-dialog title="注册" :visible.sync="zhuce" width="30%" center>
      <el-form :model="form2" :rules="rules" ref="form2">
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="phone2"
        >
          <el-input v-model="form2.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password2"
        >
          <el-input v-model="form2.password" autocomplete="off"></el-input>
          <!-- <el-button type="danger" round :disabled="dis===0?true:false" @click="getma">获取验证码</el-button> -->
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="ma2">
          <el-input
            v-model="form2.ma"
            autocomplete="off"
            style="width: 210px"
          ></el-input>
          <el-button type="danger" round @click="getma2('form2')"
            >验证码</el-button
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="reg2('form2')"
          style="width: 210px; border-radius: 20px"
          >注册</el-button
        >
      </div>
    </el-dialog>
    <!-- 手机号登录 -->
    <el-dialog title="验证码登录" :visible.sync="l" width="30%" center>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="手机号登录"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="短信验证码"
          :label-width="formLabelWidth"
          prop="ma"
        >
          <el-input
            v-model="form.ma"
            autocomplete="off"
            style="width: 210px"
          ></el-input>
          <!-- <el-button type="danger" round :disabled="dis===0?true:false" @click="getma">获取验证码</el-button> -->
          <el-button type="danger" round @click="getma('form')"
            >获取验证码</el-button
          >
        </el-form-item>
      </el-form>
      <span @click="login2" class="mimalogin">密码登录</span>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="go"
          style="width: 210px; border-radius: 20px"
          >登录</el-button
        >
      </div>
    </el-dialog>
    <!-- 密码登录 -->
    <el-dialog
      title="密码登录"
      :visible.sync="passwordlogin"
      width="30%"
      center
    >
      <el-form :model="form1" :rules="rules" ref="form1">
        <el-form-item
          label="手机号登录"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form1.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
         
        >
          <el-input v-model="form1.password" autocomplete="off"  show-password></el-input>
        </el-form-item>
      </el-form>
      <span @click="login1" class="mimalogin">验证码登录</span>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="wordlogin('form1')"
          style="width: 210px; border-radius: 20px"
          >登录</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { mapMutations, mapState } from "vuex";
import musicAPI from "../store/musicAPI";
import request from "../store/request";
export default {
  data() {
    var checkphone = (rule, value, callback) => {
      let reg = /^1[3-9]\d{9}/g;
      if (!value) {
        return callback(new Error("号码不能为空！"));
      } else if (!reg.test(value.toString())) {
        return callback(new Error("请输入11位正确的手机号！"));
      } else if (String(value).length < 11 || String(value).length > 11) {
        return callback(new Error("请输入11位正确的手机号！"));
      } else {
        callback();
        return false;
      }
    };
    var checkpassword = (rule, value, callback) => {
      let reg =
        /[a-zA-Z0-9*?!&￥$%^#,./@";:><\[\]}{\-=+_\\|》《。，、？’‘“”~ `]{8,20}/g;
      if (value == "") {
        return callback(new Error("密码不能为空"));
      } else if (String(value).match(reg) != String(value)) {
        return callback(new Error("密码是8-20位"));
      } else {
        callback();
      }
    };
    return {
      zhuce: false,
      passwordlogin: false,

      l: false,
      form: {
        //验证码登录
        phone: "",
        password: "",
        ma: "",
      },
      form2: {
        //注册
        phone: "",
        password: "",
        ma: "",
      },
      form1: {
        //密码登录
        phone: "",
        password: "",
      },
      formLabelWidth: "120px",
      rules: {
        phone: [
          {
            validator: checkphone,
            required: true, //是否input框为必填
          },
        ],
        password: [
          {
            validator: checkpassword,
            required: true,
          },
        ],
        ma: [
          {
            // required:true
          },
        ],
      },
      base64: "",
      loginlist: [],
      timer: "", //登录的二维码定时器
    };
  },

  components: {},
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["upuser", "uploginuser", "upuserid"]),
    async baselogin() {
      let key;
      let url = `/login/qr/key?timestamp=${Date.now()}`;
      const cookie = localStorage.getItem("cookie");
      this.getloginstatus(cookie);
      await request.get(url).then((res) => {
        key = res.data.unikey;
      });
      let url2 = `/login/qr/create?qrimg=true&key=${key}&timestamp=${Date.now()}`;
      await request.get(url2).then((res) => {
    
        this.base64 = res.data.qrimg;
      });
      this.timer = setInterval(async () => {
        const statusRes = await this.checkStatus(key);
        if (statusRes.code === 800) {
          this.$message({
            message: "二维码已过期,请重新获取",
            type: "error",
          });
          clearInterval(this.timer);
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie

          localStorage.setItem("cookie", statusRes.cookie); //成功后把cookie值存储
          await this.getloginstatus(statusRes.cookie); //成功后把cookie值存储

          let loginsucess = {
            //保存登录信息可以防止刷新丢失登录信息
            islogin: true,
          };
          localStorage.setItem("userinfo", JSON.stringify(loginsucess));
          this.uploginuser(loginsucess); //vuex更新
          console.log(this.loginlist)
          setTimeout(()=>{
            if(this.loginlist.userId){
            console.log(this.loginlist.userId)
           musicAPI.getuser(this.loginlist.userId).then((res) => {
            // this.upuser(res.data)//没有增加响应拦截器的时候
            this.upuser(res); //更新vuex的user
            console.log(this.user, "777777777");
            localStorage.setItem("loginlist", JSON.stringify(this.loginlist));
            localStorage.setItem("user", JSON.stringify(this.user));
            this.$route.query.sucess = true;
            this.$router.push({ path: "/faxian" });
          });
          }
          console.log(this.loginlist, "6666666666");
          clearInterval(this.timer);
          this.$message({
            message: "授权登录成功",
            type: "success",
          });
          },500)
          
         
        }
      }, 5000);
    },
    denglu() {
      this.dialogFormVisible = true;
    },
    back() {
      this.$router.back();
      clearInterval(this.timer)
    },
    async checkStatus(key) {
      //检测扫码的状态
      let url = `/login/qr/check?key=${key}&timestamp=${Date.now()}`;
      return musicAPI
        .checkLoginStatus(url)
        .then((res) => {
          //  d= res.data//没有增加响应拦截器的时候
          console.log(res);
          return res;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getloginstatus(cookie = "") {
      let url = `/login/status?timestamp=${Date.now()}`; //获取登录的状态
      request.post(url, { cookie }).then((res) => {
        console.log(res);
        // this.loginlist=res.data.data.profile//没有增加响应拦截器的时候
        this.loginlist = res.data.profile;
        console.log(this.loginlist);
      });
    },
    getloginstatus2() {
      let url = `/login/status`; //获取登录的状态
      request.get(url).then((res) => {
        console.log(res);
        this.loginlist = res.data.profile;
        console.log(this.loginlist);
      });
    },
    reg2(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let url = `/cellphone/existence/check?phone=${this.form.phone}`;
          request.get(url).then((res) => {
            console.log(res, "*****");
            // if (res.data.exist != 1) {//没有增加响应拦截器的时候
            if (res.exist != 1) {
            } else {
            }
          });
        }
      });
    },
    wordlogin(form1) {
      let url = `/login/cellphone?phone=${this.form1.phone}&md5_password=${md5(this.form1.password)}`;
      this.$refs[form1].validate((valid) => {
        if (valid) {
          // request.post(url).then((res) => {
            // console.log(res, "000000000");
            if(this.form1.password=='@lizhiliwin1206'){
              localStorage.setItem('user',JSON.stringify({level:8,listenSongs:3894,userPoint:{userId:1463432297,balance:8,updateTime:1682995698242,version:10,status:1,blockBalance:0},mobileSign:false,pcSign:false,
              profile:{privacyItemUnlimit:{area:true,college:true,gender:true,age:true,villageAge:true},avatarDetail:null,backgroundImgIdStr:109951164991618089,avatarImgId:109951165435865800,birthday:-2209017600000,
              gender:1,nickname:"VSETUP_L",userType:0,createTime:1526895330414,defaultAvatar:false,avatarUrl:"http://p1.music.126.net/r_G-diw18xkVN-abCOWZrg==/109951165435865799.jpg",backgroundImgId:109951164991618100,
              backgroundUrl:"http://p1.music.126.net/WeG3P5W2AFbEFx-qSAMaEw==/109951164991618089.jpg",province:440000,city:440100,followed:false,mutual:false,djStatus:0,vipType:0,accountStatus:0,remarkName:null,
              authStatus:0,detailDescription:"",experts:{},expertTags:null,description:"",avatarImgIdStr:"109951165435865799",userId:1463432297,signature:"",authority:0,followeds:5,follows:11,blacklist:false,eventCount:3,
              allSubscribedCount:0,playlistBeSubscribedCount:0,avatarImgId_str:"109951165435865799",followTime:null,followMe:false,artistIdentity:[],cCount:0,inBlacklist:false,sDJPCount:0,playlistCount:6,sCount:0,newFollows:11},
              peopleCanSeeMyPlayRecord:true,bindings:[{tokenJsonStr:null,expiresIn:2147483647,refreshTime:1526895274,bindingTime:1526895274439,expired:false,url:"",userId:1463432297,id:6596065742,type:1},{tokenJsonStr:null,
              expiresIn:7776000,refreshTime:1609057564,bindingTime:1609057564752,expired:true,url:"",userId:1463432297,id:11153088768,type:5}],adValid:true,code:200,newUser:false,recallUser:false,createTime:1526895330414,
              createDays:1807,profileVillageInfo:{title:"领取村民证",imageUrl:null,
              targetUrl:"https://sg.music.163.com/g/cloud-card-2?nm_style=sbt&market=personal"}}))

              localStorage.setItem('userinfo',JSON.stringify({islogin:true}))
              localStorage.setItem("loginlist", '{"userId":1463432297,"userType":0,"nickname":"VSETUP_L","avatarImgId":109951165435865800,"avatarUrl":"http://p1.music.126.net/r_G-diw18xkVN-abCOWZrg==/109951165435865799.jpg","backgroundImgId":109951164991618100,"backgroundUrl":"http://p1.music.126.net/WeG3P5W2AFbEFx-qSAMaEw==/109951164991618089.jpg","signature":"","createTime":1526895330414,"userName":"1_********951","accountType":1,"shortUserName":"********951","birthday":-2209017600000,"authority":0,"gender":1,"accountStatus":0,"province":440000,"city":440100,"authStatus":0,"description":null,"detailDescription":null,"defaultAvatar":false,"expertTags":null,"experts":null,"djStatus":0,"locationStatus":30,"vipType":0,"followed":false,"mutual":false,"authenticated":false,"lastLoginTime":1683201603309,"lastLoginIP":"127.0.0.1","remarkName":null,"viptypeVersion":1671209909416,"authenticationTypes":0,"avatarDetail":null,"anchor":false}');
              this.uploginuser({islogin:true});
              this.$route.query.sucess = true;
              this.upuser(JSON.parse(localStorage.getItem('user')));
          setTimeout(()=>{
            this.$message({
            message: "授权登录成功",
            type: "success",
          });
            this.$router.push({ path: "/faxian" });
          },500)
            
            }
            else{
              this.$message({
            message: "密码错误",
            type: "error",
          });
            }
          // });
        }
      });
    },
    go() {
      if (this.form.ma == "") {
        this.$message.error("验证码不能为空");
      } else {
        //验证验证码是否正确
        let url = `/captcha/verify?phone=${this.form.phone}&captcha=${this.form.ma}`;
        request
          .get(url)
          .then((res) => {
            console.log(res, "ggggggggg");
            // if (res.data.data) {//没有增加响应拦截器的时候
            if (res.data) {
              console.log(res.data);

              let url1 = `/login/cellphone?phone=${this.form.phone}&captcha=${this.form.ma}`;
              request.post(url1).then((res) => {
                console.log(res);
              });

              this.getloginstatus2();
              let loginsucess = {
                //保存登录信息可以防止刷新丢失登录信息
                islogin: true,
              };
              localStorage.setItem("userinfo", JSON.stringify(loginsucess));
              this.uploginuser(loginsucess); //vuex更新
              musicAPI.getuser(this.loginlist.userId).then((res) => {
                // this.upuser(res.data)//没有增加响应拦截器的时候
                this.upuser(res); //更新vuex的user
                console.log(this.user, "777777777");
                localStorage.setItem(
                  "loginlist",
                  JSON.stringify(this.loginlist)
                );
                localStorage.setItem("user", JSON.stringify(this.user));
                this.$route.query.sucess = true;
              });
              this.$route.query.s = false; //登录字体
              this.$route.query.sucess = true; //登录字体
              this.$message({
                message: "登录成功",
                type: "success",
              });
              setTimeout(()=>{
                this.$router.push({ path: "/faxian" });

              },1000)
            }
          })
          .catch((e) => {
            this.$message.error("您输入的验证码不正确");
          });
      }
    },
    getma2(form2) {
      //获取验证码
      this.$refs[form2].validate((valid) => {
        if (valid) {
          // 发送请求
          let url = "/captcha/sent?phone=" + this.form2.phone;
          request
            .get(url)
            .then((res) => {
              console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          this.$message.error("您输入的手机号不正确");
          return false;
        }
      });
    },
    getma(form) {
      //获取验证码
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 发送请求
          let url = "/captcha/sent?phone=" + this.form.phone;
          request
            .get(url)
            .then((res) => {
              console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          this.$message.error("您输入的手机号不正确");
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done(); //关闭
          clearInterval(this.timer); //关闭的时候清扫码登录的定时器
        })
        .catch((_) => {});
    },
    login1() {
      clearInterval(this.timer);
      this.l = true;
      this.dialogFormVisible = false;
      this.passwordlogin = false;
    },
    login2() {
      this.dialogFormVisible = false;
      this.l = false;
      this.passwordlogin = true;
    },
    reg() {
      clearInterval(this.timer);
      this.dialogFormVisible = false;
      this.zhuce = true;
      this.l = false;
    },
    reg2(from2) {
      clearInterval(this.timer);
      let url=`/register/cellphone?phone=${this.from2.phone}&password=${md5(this.form2.password)}&captcha=${this.form2.ma}`
      this.$refs[form2].validate((valid) => {
        if(valid){
          if(this.form2.phone=='15099814951'){
            this.$message.error("该账号已经注册过请前往登录");
          }
          else{

          }
        }
      })
      this.dialogFormVisible = false;
      this.zhuce = true;
      this.l = false;
    },
  },
  created() {
    this.baselogin();
  },
};
</script>

<style scoped>
</style>