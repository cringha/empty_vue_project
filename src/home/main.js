
// import '@babel/polyfill';

import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from 'vue';
import vuexI18n from 'vuex-i18n'; 

/**
 * Global Event Bus  事件总线
 */
Vue.prototype.$bus = new Vue();

 
// vue router 
import router from '@/store/router.js';
// vuex,
import store from '@/store/store.js';


import './layouts';

import main from './layouts/main.vue';

// import "@/assets/icons/icons.css"
import "@/assets/icons/4/style.css";

 

// performance test, 性能测试
Vue.config.performance = true;

// i18n,   语言国际化
Vue.use(vuexI18n.plugin, store);

import translationsEn from '@/locales/language-en' ;
import translationsZhCN from '@/locales/language-zhCN' ;

Vue.i18n.add('en', translationsEn);
Vue.i18n.add('zh-CN', translationsZhCN);
Vue.i18n.set('zh-CN');



export const  bus = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(main)
});



// export default main;