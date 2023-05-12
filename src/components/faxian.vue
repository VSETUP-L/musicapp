<template>
  <div class='faxian'>
    <!-- <app-faxianlist></app-faxianlist> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>

// import faxianlist from '../views/faxianlist.vue'

export default {
  data () {
    return {
    }
  },

  components: {
    
    // 'app-faxianlist':faxianlist,
    
  },

  methods: {}
}
</script>

<style scoped>
</style>