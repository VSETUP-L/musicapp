<template>
  <div id='userFX'>
    <div v-show="FXlist.length<=0">暂无关注</div>
    <div v-show="!FXlist.length<=0">
    <h2 style="margin: 10px 0 20px  0;">{{otheruser.profile?otheruser.profile.nickname:''}}的粉丝</h2>
    <li class="box" v-for="(item, index) in FXlist" :key="index" >
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
        <!-- <div style="float: left; text-align: center; width: 100%">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="340"
          >
          </el-pagination>
        </div> -->
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import request from '../src/store/request';
export default {
  data () {
    return {
        FXlist:[]
    }
  },

  components: {},
  computed: {
    ...mapState(["userid",'otheruser']),
  },
  methods: {
    ...mapMutations(['upuserid']),
    getGZ(){
        
        let url = `/user/followeds?uid=${this.userid}`;
      request.get(url).then((res) => {
        console.log(res)
        if(res.code==400){
            this.$message.error(res.message);
            this.$router.back();
        }
        res.followeds.forEach((e) => {
    
            this.FXlist.push(e);
        
        });
    
    })
    // })
  }, gotouser(id) {
      //点击用户头像跳转到用户详情
      this.upuserid(id);
      this.$router.push({ path: "/user" });
    },
  },
  created(){
    this.getGZ()
  }
}
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
</style>