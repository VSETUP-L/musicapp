<template>
  <div class='search'>
    <el-tabs v-model="SearchactiveName" >
      <el-tab-pane label="单曲" name="first"
        >
        <app-searchdanqu></app-searchdanqu>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="second"
        >
        <app-searchsinger v-show="SearchactiveName=='second'"></app-searchsinger>
    </el-tab-pane>
      <el-tab-pane label="视频" name="third"
        >
        <app-searchmv v-show="SearchactiveName=='third'"></app-searchmv>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="fourth"
        >
        <app-searchGD v-show="SearchactiveName=='fourth'"></app-searchGD>
    </el-tab-pane>
      <el-tab-pane label="用户" name="five"
        >
        <app-searchUser v-show="SearchactiveName=='five'"></app-searchUser>
    </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import searchdanqu from './searchdanqu.vue';
import searchsinger from './searchsinger.vue';
import searchmv from './searchmv.vue';
import searchGD from './searchGD.vue';
import searchUser from './searchUser.vue';
export default {
    
  data () {
    return {
        SearchactiveName:'',
        show:false
    }
  },

  components: {
    'app-searchdanqu':searchdanqu,
    'app-searchsinger':searchsinger,
    'app-searchmv':searchmv,
    'app-searchGD':searchGD,
    'app-searchUser':searchUser,
  },
  computed:{

      ...mapState(['searchactiveName']),
      
  },
  methods: {
    ...mapMutations(['updatasearchactiveName']),

    
  },
  created() {
    this.SearchactiveName = this.searchactiveName; //vuex里面的数据
    // let url='/cloudsearch/type=1?keywords='+this.$route.query.input
    //   request.get(url).then(res=>{
    //     this.list=res.data.result.songs
    //     console.log(this.list)
    //   }).catch(e=>{
    //     console.error(e);
    //   })
    //   this.updataplaylistsong(this.list);

  },
  watch:{
    SearchactiveName(newvalue){
        this.updatasearchactiveName(newvalue)
        this.show=true
    },
   searchactiveName(newvalue) {
      //监听state的activeName数据
      this.SearchactiveName = newvalue;
    },
  }
  
}
</script>

<style scoped>
</style>