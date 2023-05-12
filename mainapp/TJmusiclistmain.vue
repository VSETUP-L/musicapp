<template>
  <div class="musiclistmain">
    <el-tabs style="height: 560px" v-model="activeName">
      <el-tab-pane label="歌曲列表" name="first">
        <div class="name">
          <li style="width: 430px; float: left">歌名</li>
          <li style="width: 400px; float: left">歌手</li>
          <li style="width: 400px; float: left">专辑</li>
        </div>
        <!-- 滚动加载 -->
        <div class="songbox" ref="list" @scroll="scrollmove">
          <ul
            class="songlist"
            :class="{ songlistactive: playlistsongindex == index }"
            v-for="(item, index) in TJmusiclistmain"
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
              <span v-for="(e, i) in item.ar" :key="i">
                {{ e.name + "\u00a0" + "\u00a0" }}
              </span>
            </li>
            <li style="width: 33.33%">
              <!-- {{ item.song.album.name }} -->
              {{ item.al.name }}
              <span style="color: red; float: right">{{
                changesongtime(item.dt)
              }}</span>
            </li>
          </ul>
          <p v-show="isLoading"><i class="el-icon-loading"></i>加载中...</p>
        </div>
      </el-tab-pane>

      <el-tab-pane
        :label="'评论:(' + TJmusiclist.commentCount + ')'"
        name="second"
      >
        <div class="sendpl">
          <div style="margin: 20px 0"></div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="140"
            show-word-limit
            style="width: 50%"
          >
          </el-input>
          <div style="width: 50%">
            <button
              @click="send"
              style="width: 80px; font-size: 14px; float: right"
            >
              评论
            </button>
          </div>
        </div>
        <div class="newpl" ref="list" @scroll="scrollmove">
          <h3>最新评论</h3>
          <ul class="jcpl" v-for="(item, index) in pl" :key="index">
            <li>
              <div style="float: left; cursor: pointer">
                <img
                  :src="item.user ? item.user.avatarUrl : ''"
                  alt="用户头像"
                  style="border-radius: 50%; height: 50px"
                  @click="gotouser(item.user.userId)"
                />
              </div>
              <div style="float: left; width: 90%; margin-left: 10px">
                <span style="color: #507daf"
                  >{{ item.user ? item.user.nickname : "" }}:</span
                >
                <span style="color: #999999">{{ item.content }}</span>
                <p style="color: #999999">{{ item.timeStr }}</p>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>

      <el-tab-pane label="收藏者" name="third" class="el3">
        <li class="box" v-for="(item, index) in subscribers" :key="index">
          <img
            :src="item.avatarUrl+'?param=200y200'"
            alt=""
            style="
              cursor: pointer;
              float: left;
              height: 150px;
              border-radius: 150px;
              border: 1px solid gray;
            "
            @click="gotouser(item.userId)"
          />
          <div style="float: left; margin-left: 20px">
            <span>{{ item.nickname }}</span>
            <span
              ><i
                class="el-icon-male"
                v-if="item.gender == 1"
                style="border-radius: 10px; background-color: aqua"
              ></i
            ></span>
            <span
              ><i
                class="el-icon-female"
                v-if="item.gender == 2"
                style="border-radius: 10px; background-color: pink"
              ></i
            ></span>
          </div>
        </li>
        <!-- 分页 -->
        <div style="float: left; text-align: center; width: 100%">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="340"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from "../src/store/request";
import musicAPI from "../src/store/musicAPI";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      textarea: "", //评论区输入
      offsetcount: 0,
      isLoading: false,
      activeName: "first", //默认显示的
      // pl:[],
      // subscribers:[]
      TJmusiclistmain: [],
      musicURL: {},
      page: 1,
    };
  },

  props: ["TJmusiclist", "pl", "subscribers", "getpl"],
  components: {},
  computed: {
    ...mapState(["playlistsongindex", "user"]),
  },
  methods: {
    kai(musicid, index, t) {
      if (JSON.parse(localStorage.getItem("userinfo")).islogin) {
        if (t == 1) {
          this.TJmusiclistmain[index].t = 0;
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
          this.TJmusiclistmain[index].t = 1;
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
    send() {
      //发送评论
      if (this.user.userPoint==undefined) {
        //登录用户id
        this.$message({
          message: "您账号还未登录，请先登录再评论",
          type: "warning",
        });
      } else {
        musicAPI
          .sendpl(1, 2, this.$route.query.id, this.textarea)
          .then((res) => {
            if (res.code == 302) {
              this.$message({
                message: "您账号还未登录，请先登录再评论",
                type: "warning",
              });
            } else {
              this.pl.unshift({
                user: JSON.parse(localStorage.getItem("loginlist")),
                content: this.textarea,
                timeStr: "刚刚",
              });
              setTimeout(() => {
                // this.pl=[]
                // this.time=0
                // this.pageNo=1
                this.getpl();
                this.getlist();
              }, 120000);
              this.textarea = "";
            }
          });
      }
    },
    changesongtime(num) {
      let m, s;
      m = String(parseFloat(num) / (1000 * 60)).slice(0, 1);

      s = String(num / 1000 - parseInt(m) * 60).slice(0, 2);
      // console.log(parseInt(s),'@@@')
      if (parseInt(m) < 10) {
        m = "0" + m.slice(0, 1);
      }
      if (parseInt(s) < 10) {
        s = "0" + s.slice(0, 1);
      }
      return m + ":" + s;
    },
    scrollmove() {
      //滚动加载音乐
      const $list = this.$refs.list;
      if (this.isLoading) return;
      if ($list.scrollTop + 502 >= $list.scrollHeight) {
        if (this.offsetcount < this.TJmusiclistmain.length) {
          this.offsetcount += 10;
          this.getlistmain();
        } else if (this.offsetcount >= this.TJmusiclistmain.length) {
          this.isLoading = false;
        }
      }
    },
    async getlistmain() {
      this.isLoading = true;
      //获取歌单歌曲
      let url = `/playlist/track/all?id=${this.$route.query.id}&limit=10&offset=${this.offsetcount}`;
      // console.log(this.offsetcount)
      await musicAPI
        .getTJmusiclistmain(url)
        .then((res) => {
          // res.data.songs.forEach((e) => {//没有增加响应拦截器的时候
          res.songs.forEach((e) => {
            this.TJmusiclistmain.push(e);
          });
          this.isLoading = false;
          // console.log(this.TJmusiclistmain);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ...mapMutations([
      "updataplaylistsong",
      "updataplaylistsongindex",
      "upuserid",
    ]),
    musiclist(index) {
      //点击音乐判断是否可以播放
      // console.log(this.TJmusiclistmain);

      if (
        this.TJmusiclistmain[index].fee == 1 ||
        this.TJmusiclistmain[index].fee == 4
      ) {
        this.$message.error("您暂时还没有版权播放该音乐");
      } else {
        this.updataplaylistsong(this.TJmusiclistmain);
        this.updataplaylistsongindex(index);
      }
    },
    mv(id) {
      this.$router.push({ path: "/shipin", query: { mvid: id } });
    },
    changetime(num) {
      var time = new Date(num);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDay();

      return y + "年" + m + "月" + d + "日";
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      //获取歌单收藏者
      request
        .get(
          "/playlist/subscribers?id=" +
            this.$route.query.id +
            "&limit=60" +
            "&offset=" +
            (val - 1) * 60
        )
        .then((res) => {
          // this.subscribers = res.data.subscribers;//没有增加响应拦截器的时候
          this.subscribers = res.subscribers;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    gotouser(id) {
      //点击用户头像跳转到用户详情
      this.upuserid(id);
      this.$router.push({ path: "/user" });
    },
  },
  created() {
    this.getlistmain();
  },
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
  background-image: url("../src/assets/音乐背景.jpg");
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
.songlist:hover {
  background-color: rgb(237, 233, 233);
}
.songlistactive {
  /* background: rgb(218, 211, 218); */
  color: rgb(240, 143, 240);
}
.songbox {
  /* 滚动的盒子 */
  height: 418px;
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

/* 评论 */
.newpl {
  /* margin-top: 50px; */
  /* width: 70%; */
  overflow: auto;
  height: 530px;
  /* margin: 0px auto; */
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
.sendpl {
  width: 100%;
}
.sendpl::after {
  content: "";
  display: block;
  clear: both;
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