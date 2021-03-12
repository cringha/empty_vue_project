import Vue from 'vue'
import VueRouter from "vue-router";
import { RoutePaths } from "./routes-menu.js";

Vue.use(VueRouter);

 
 


// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    // mode: 'history',
    // base: __dirname,
    routes:RoutePaths

});

 


// router.beforeEach((to, from, next) => {

//     let that = this;
//     // debugger;
//     // 
//     console.log('in router beforeEach ', from.fullPath, to.fullPath);


//     if (!!!Settings.NO_AUTHS[to.path] && !to.path.startsWith(Settings.PATH_LOGIN)) {
//         if (checkPermission(to)) {
//             //  console.log('There is a token, resume. (' + to.path + ')');
//             next();
//         } else {
//             if (store.getters.authenticated) {

//                 next("/");
//             } else {

//                 console.log('There is no token, redirect to login. (' + to.path + ')');
//                 next(Settings.PATH_LOGIN + '?target=' + to.path );
//             }
//         }
//     } else {
//         console.log('You\'re on the login page');
//         next(); // This is where it should have been
//     }
//     // next(); - This is in the wrong place
// });


export default router;
