<template>
  <div class='main'>
    <!-- <keep-alive> -->
      <!-- 缓存 -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {},

  methods: {},
  
}
</script>

<style scoped>
.main {
     position: absolute;
     top: 70px;
     left: 300px;
     right: 0px;
     bottom: 50px;
     overflow-y: auto;
     margin-bottom:50px ;
}
</style>