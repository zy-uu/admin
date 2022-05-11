// 平台属性模块
import request from '@/utils/request';

//获取一级分类数据接口
export const reqCategory1List = () => request({
    url:'/admin/product/getCategory1',
    method: 'get'
})

//获取二级分类数据接口
export const reqCategory2List = () => request({
    url:'/admin/product/getCategory2',
    method: 'get'
})

//获取三级分类数据接口
export const reqCategory3List = () => request({
    url:'/admin/product/getCategory3',
    method: 'get'
})