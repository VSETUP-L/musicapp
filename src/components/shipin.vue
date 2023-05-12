<template>
  <div class="shipin">
   <app-mv></app-mv>
  </div>
</template>

<script>
import mv from '../../mainapp/mv.vue';
export default {
  data () {
    return {
    }
  },

  components: {
    'app-mv':mv
  },

  methods: {}
}
</script>

<style scoped>
.shipin{
  height: 100%;
}
</style>