import Vue from 'vue'
import App from './App.vue';
import ElementUI from 'element-ui';
import './element-variables.scss';
import '../style/theme/index.css';
import '../util/el-components';
import store from  '../store/index';
import router from './routers/ConfigRouter';
import '../plugin/ComBindPlugin';
import '../plugin/index';
import VueDraggable from 'vue-draggable'
import VueAxiosPlugin from 'vue-axios-plugin'


Vue.use(VueDraggable);//可拖动动画
Vue.use(ElementUI);


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


//页面跳转处理
Vue.config.productionTip = false




// router.js文件
// 全局路由守卫，动态改变tille
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title || '配置管理系统';
  console.log(to.path);
  if(store.state.token ){
    if(to.path === '/'){
      //登录状态下 访问login.vue页面 会跳到index.vue
      next({path: '/index'});
     }else{
      next();
     }
  }else{
    if (to.path === '/') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
      next();
     } else { // 否则 跳转到登录页面
      next({ path: '/' });
     }
  }
})



//axios请求拦截处理
Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config =>{
    let token = store.state.token;
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = "Bearer "+token;
    }
    return config ;
  },
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
});





