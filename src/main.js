import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueAxios from "vue-axios";
import ElementUI from 'element-ui'; // 组件库
import 'element-ui/lib/theme-chalk/index.css'; // 样式

Vue.use(ElementUI)
// Vue.prototype.$axios=VueAxios
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
