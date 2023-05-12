<template>
  <div class="navbar">
    <el-col :span="12" class="el-col">
      <el-menu
      :default-active="defaultactive"
        class="el-menu-vertical-demo"
        text-color="#000000"
        active-text-color="#a679dc"
      ><router-link to="/faxian" tag="div">
        <el-menu-item index="1" class="el-menu-item"  @click="boke('1')">
          <span slot="title">发现音乐</span>
        </el-menu-item>
      </router-link>
      <router-link to="/shipin" tag="div" >
        <el-menu-item index="3" class="el-menu-item" @click="boke('3')">
          <span slot="title">视频</span>
        </el-menu-item>
      </router-link>
      <router-link to="/guanzhu" tag="div" >
        <el-menu-item index="4" class="el-menu-item" @click="boke('4')">
          <span slot="title">关注</span>
        </el-menu-item>
      </router-link>
      <router-link to="/FM" tag="div" >
        <el-menu-item index="5" class="el-menu-item" @click="boke('5')">
          <span slot="title">私人FM</span>
        </el-menu-item>
      </router-link>
      <router-link to="/mysub" tag="div" >
        <el-menu-item index="6" class="el-menu-item" @click="boke('6')">
          <span slot="title">我的收藏</span>
        </el-menu-item>
      </router-link>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      
    };
  },

  components: {},
  computed:{
    ...mapState(['defaultactive'])

  },
  methods: {
    ...mapMutations(['updatadefaultactive']),
    boke(i){
      this.updatadefaultactive(i)
     
    },
  },
};
</script>

<style scoped>
.el-col {
  position: absolute;
  width: 300px;
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
  width: 300px;
}
.el-menu-item:hover {
  background-color: #f6f6f7;
}
a{
text-decoration: none;
}
</style>