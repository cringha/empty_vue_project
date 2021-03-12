const Routes = [
    {
                
        path: '/comp1',
        component: (resolve) => require(['./comp1/comp1.vue'], resolve)
    } ,
    {
                
        path: '/comp2',
        component: (resolve) => require(['./comp2/comp.vue'], resolve)
    } ,
     
] ;
const RouteMenus = [{
        icon: "ant-design" ,
        title : 'MenuA' , 
        children: [
            {
                icon: "container",
                title : 'MenuA-comp1' , 
                path: '/comp1' ,
            } , 
            {
                icon: "file-add",
                title : 'MenuA-2' , 
                path: '/comp2' , 
            } , 
            {
                icon: "file-excel",
                title : 'MenuA-3' , 
                path: '' , 
            } , 
        ] 
    } ,

    {
        icon: "ant-design" ,
        title : 'MenuB' , 
        children: [
            {
                icon: "container",
                title : 'MenuB-1' , 
                path: '' , 
            } , 
            {
                icon: "file-add",
                title : 'MenuB-2' , 
                path: '' , 
            } , 
            {
                icon: "file-excel",
                title : 'MenuB-3' , 
                path: '' , 
            } , 
        ] 
    } 
];
 
export {
    Routes, RouteMenus
};
