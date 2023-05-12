<template>
  <div class='home'>
    <app-login></app-login>
   <app-daohan></app-daohan>
   <app-main></app-main>
   <app-footer></app-footer>
  </div>
</template>

<script>
import login from './login.vue'
import daohan from '../components/daohan.vue'
import main from '../components/main.vue'
import footer from '../../homeAPP/footer.vue'
export default {
  data () {
    return {
    }
  },

  components: {
    'app-login':login,
    'app-daohan':daohan,
    'app-main':main,
    'app-footer':footer
  },

  methods: {
     
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.login {
     position: absolute;
     
     padding: 0px;
     top: 0px;
     left: 0px;
     right: 0px;
     background-color: rgb(189, 151, 224);
    color: #ffffff;
}
.navbar {
     position: absolute;
     width: 300px;
     top: 70px;
     left: 0px;
     bottom: 0px;
     /* overflow-y: auto; */
     background-color:#545c64;
}
.main {
     position: absolute;
     top: 70px;
     left: 300px;
     right: 0px;
     bottom: 0px;
     overflow-y: auto;
     width: 1407.33px;
}
.footer{
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background-color: white;
}

</style>