<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload, //刷新页面
    };
  },
  data() {
    return {
      isRouterAlive: true, //刷新页面
    };
  },
  methods: {
    reload() {
      //刷新页面
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  // beforeCreate(){//疑是解决localstorage可以修改的安全问题
  //   this.$store.commit(
  //     "newUser",
  //     JSON.parse(window.localStorage.getItem("list"))
  //   );
  // },
  // created() {//刷新页面时将vuex数据存储在localstorage中，但是有一种弊端就是别人可以修改local storage的值
  //   if (window.localStorage.getItem("list")) {
  //     this.$store.replaceState(
  //       Object.assign(
  //         {},
  //         this.$store.state,
  //         JSON.parse(window.localStorage.getItem("list"))
  //       )
  //     );
  //   }
  //   window.addEventListener("beforeunload", () => {
  //     window.localStorage.setItem("list", JSON.stringify(this.$store.state));
  //     // window.localStorage.removeItem("list");//疑是解决localstorage可以修改的安全问题
  //     // window.localStorage.setItem("list", JSON.stringify(this.$store.state));
  //     // return;
      
      
  //     // if(Date.now()>(this.time+600000)){//定时删除localstorage数据
  //     //   window.localStorage.removeItem("list");
  //     // }
  //   });
  //  window.addEventListener('unload',()=>{
  //   this.$store.replaceState(
  //       Object.assign(
  //         {},
  //         this.$store.state,
  //         JSON.parse(window.localStorage.getItem("list"))
  //       )
  //     );
  //  })
  // },
 
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden;
  // display: flex;
  // width: 100%;
  // height: 100%;
}
body::after{
  content: '';
  display: block;
  clear: both;
}
</style>
