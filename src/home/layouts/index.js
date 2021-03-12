import Vue from 'vue';
import PageHeader from './pageheader.vue';


import './globals.css';



Vue.use(require('vue-shortkey'))


import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)



 
Vue.component('PageHeader', PageHeader)


