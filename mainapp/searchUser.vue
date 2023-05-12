<template>
  <div id='searchUser'>
    
    <div v-show="searchUserlist.length<=0">暂无用户</div>
    <div v-show="!searchUserlist.length<=0" class="move"  ref="list" @scroll="scrollmove">
    <li class="box" v-for="(item, index) in searchUserlist" :key="index" >
          <img
            :src="item.avatarUrl+'?param=200y200'"
            alt=""
            style="
            cursor: pointer;
              float: left;
              height: 100px;
              border-radius: 50%;
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
    
    </div>
  </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex';
import request from '../src/store/request';
export default {
  data () {
    return {
        isLoading: false,
      offsetcount: 0,
        searchUserlist:[]
    }
  },

  components: {},

  methods: {
    ...mapMutations(['upuserid']),
    scrollmove() {
      //滚动加载mv
      const $list = this.$refs.list;
      if (this.isLoading) return;
    //   console.log($mvlist.scrollTop)
    //   console.log($mvlist.scrollHeight)
      if ($list.scrollTop + 740 >= $list.scrollHeight) {
        if (this.offsetcount  <= this.searchUserlist.length) {
          this.offsetcount  += 21;
         
          this.getsearchUserlist();
        } else if (this.offsetcount  >= this.searchUserlist.length) {
          this.isLoading = false;
        }
      }
    },
    getsearchUserlist(){
        let url = `/cloudsearch?type=1002&limit=18&offset=${this.offsetcount}&keywords=${this.$route.query.input}`;
      request.get(url).then((res) => {
        console.log(res)
        res.result.userprofiles.forEach((e) => {

            this.searchUserlist.push(e);
          
        });

       
      });
    },
    gotouser(id) {
      //点击用户头像跳转到用户详情
      this.upuserid(id);
      this.$router.push({ path: "/user" });
    },
  },
  created(){
    this.getsearchUserlist()
  }
}
</script>

<style scoped>
.move{
  height: 740px;
  overflow: auto;
}
.box {
  list-style: none;
  float: left;
  width: 50%;
  margin-bottom: 20px;
  height: 100px;
  line-height: 100px;
  /* border: 1px solid gainsboro; */
}
.box::after {
  content: "";
  display: block;
  clear: both;
}
</style>