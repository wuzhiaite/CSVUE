import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    routes :[
        {
            path : '/',
            name : '',
            component : () => import('../components/Login'), 
            hidden:true,
            meta:{
                title:'通用配置系统'
            },   
        },
        {
            path : '/home',
            name : '',
            component : () => import('../components/Home'), 
            hidden:true,
            meta:{
                title:'通用配置系统'
            },
            children:[
                {
                    path : '/index',
                    name : '首页',
                    component : () => import('../components/Index'),
                    hidden:true, 
                    meta:{
                        title:'首页'
                    }
                }
            ]
        },
    ]
}); 






















