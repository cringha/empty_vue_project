// 常量， 登录页面名称
import * as Settings from './conf.js';

import { Routes , RouteMenus } from '@/components';
 


function mergeRoutes( routes ) {
    let output = [
        {
            path: '/',
            redirect: '/index'
        },
        {
                
            path: '/index',
            component: (resolve) => require(['@/home/sys.pages/index.vue'], resolve)
        }  
    ];

    for( let i = 0 ;i < routes.length ;i++){
        let one = routes[i];
        console.assert( one.path , "input routes path is empty ", i, one, routes );
        console.assert( one.component , "input routes component is empty ", i, one, routes );
        output.push( one );
    }

    output.push({
        path: '*',
        component: (resolve) => require(['@/home/sys.pages/404.vue'], resolve)
    });
    return output;
}
 

const RoutePaths = mergeRoutes(Routes);

export {
    RoutePaths, RouteMenus
};
