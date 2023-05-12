import Vue from "vue";
import VueRouter from "vue-router";
import home from '../views/home.vue'
import faxianlist from '../views/faxianlist.vue'

import shipin from '../components/shipin.vue'
import guanzhu from '../components/guanzhu.vue'
import FM from '../components/FM.vue'
import mysub from '../components/mysub.vue'
import TJmusiclist from '../../mainapp/TJmusiclist.vue'
import search from '../../mainapp/search.vue'
import goartist from '../../mainapp/goartist.vue'
import user from '../../mainapp/user.vue'
import userdt from '../../mainapp/userdt.vue'
import userGZ from '../../mainapp/userGZ.vue'
import userFX from '../../mainapp/userFX.vue'
import reg from '../views/reg.vue'
Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    component:home,
    redirect: "/faxian",
    meta:{},
    children:[
      {
        path:'faxian',
        component:faxianlist,
        
      },
      {
        path:'shipin',
        component:shipin
      },
      {
        path:'guanzhu',
        component:guanzhu,
        meta:{isguanzhu:true},
        beforeEnter(to,from,next){
          if(to.meta.isguanzhu){
              if(JSON.parse( localStorage.getItem('userinfo')).islogin) {
                  next()
              } else {
                // window.error('您还没登录，请先登录');
                alert('您还没登录，请先登录')
                next({path:'reg'})
              }
          }
      }
      },
      {
        path:'FM',
        component:FM
      },
      {
        path:'mysub',
        component:mysub,
        meta:{isguanzhu:true},
        beforeEnter(to,from,next){
          if(to.meta.isguanzhu){
              if(JSON.parse( localStorage.getItem('userinfo')).islogin) {
                  next()
              } else {
                // window.error('您还没登录，请先登录');
                alert('您还没登录，请先登录')
                next({path:'reg'})
              }
          }
      }
      },
        {
          path:'TJmusiclist',
          component:TJmusiclist
        },
        {
          path:'Search',
          component:search
        },
     
          {
            path:'artist',
            component:goartist,
          },
          {
            path:'user',
            component:user,
           
          },
          {
            path:'userdt',
            component:userdt,
            
          },
          {
            path:'userGZ',
            component:userGZ,
            
          },
          {
            path:'userFX',
            component:userFX,
            
          },
          {
            path:'reg',
            component:reg,
            
          },
        
    ]
  },
 
  
];

const router = new VueRouter({
  routes,
});

export default router;
