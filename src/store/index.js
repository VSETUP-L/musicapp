import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store=new Vuex.Store({
  state: {
    defaultactive:'1',
    searchactiveName:'first',
    activeName:"first",
    PICURL: "https://p2.music.126.net/R-q3sYC45m_baOhwTJd7-Q==/109951168492414221.jpg",
    playlistsong: [
      {
        al: {
          id: 162538162,
          name: "A&A",
          pic: 109951168492414220,
          picUrl: "https://p2.music.126.net/R-q3sYC45m_baOhwTJd7-Q==/109951168492414221.jpg",
          pic_str: "109951168492414221"
        },
        id:2033817699,
        name:'A&A',
      }
    ],
    playlistsongindex:0,
    isShow:false,//音量控制显示
    songlyric:[],//歌词
    loginuser:{},//保存登录信息可以防止刷新丢失登录信息
    user:{},//登录用户信息
    // s:true,
    // sucess:false,
    show:false,//播放列表的展示
    artist:[],//歌手
    goartist:[],
    userid:null,//其他用户id
    otheruser:[],//其他用户信息
    submusic:[]//收藏的音乐
  },
  mutations: {
    statelist(state,value){
      state=value
      // window.localStorage.setItem('list',JSON.stringify(state))
    },
    // newUser(state, value) {
    //   state = value;
    // },//疑是解决localstorage可以修改的安全问题
    updatadefaultactive(state,value){
      state.defaultactive=value
    },
    updataplaylistsong(state,value){
      state.playlistsong=value
      // console.log(state.playlistsong,'00000')
    },
    updataplaylistsongindex(state,value){
      state.playlistsongindex=value
    },
    updataactiveName(state,value){
      state.activeName=value
      // console.log(state.activeName,'@@@@')
    },
    updatasearchactiveName(state,value){
      state.searchactiveName=value
      // console.log(state.activeName,'@@@@')
    },
    updataplaylistsongPICURL(state,value){
      state.PICURL=value
    },
    upuser(state,value){
      state.user=value
    },
    upsonglyric(state,value){
      state.songlyric=value
    },
    uploginuser(state,value){
      state.loginuser=value
    },
    upisShow(state,value){
      state.isShow=value
    },
    upshow(state,value){
      state.show=value
    },
    upartists(state,value){
      state.artists=value
    },
    upgoartist(state,value){
      state.goartist=value
    },
    upuserid(state,value){
      state.userid=value
      console.log(state.userid)
    },
    upotheruser(state,value){
      state.otheruser=value
      // console.log(state.otheruser)
    }
  },
  actions: {

  },
  modules: {},
});
export default store
// import { createStore } from "vuex";
// export default createStore({
//     state: {
//       playlistsong: [
//         {
//           al: {
//             id: 162538162,
//             name: "A&A",
//             pic: 109951168492414220,
//             picUrl: "https://p2.music.126.net/R-q3sYC45m_baOhwTJd7-Q==/109951168492414221.jpg",
//             pic_str: "109951168492414221"
//           },
//           id:2033817699
//         }
//       ],
//       playlistsongindex:0
//     },
//     mutations: {},
//     actions: {},
//     modules: {},
//   })