 /* jshint esversion: 6 */
 import Vue from 'vue';
 import App from './App';
 import router from './router';
 import store from './store'; //状态管理器

 import "./utils/network";

 import 'normalize.css'; // 重置样式
 import ElementUI from 'element-ui'; //UI框架
 import 'element-ui/lib/theme-chalk/index.css'; //UI依赖
 // import '@/theme/element-variables.scss'; //UI依赖
 import 'hover.css'; //动画库
 import '@/assets/css/global.css'; //自定义样式

 import './icons' ;// 字体图标

 import 'babel-polyfill'; //低版本兼容组件

 Vue.use(ElementUI);
 Vue.config.productionTip = false;

 new Vue({ //挂载
   router,
   store,
   render: h => h(App)
 }).$mount('#app');
