import request from "@/utils/request";

//! ERROR ADDRESS SENT 404
export const reqTradeMark = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
});

// 新增品牌和修改品牌
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    if (tradeMark.id) {
        return request({
            url: '/dev-api/admin/product/baseTrademark/update',
            method: 'put',
            data: tradeMark
        })
    }
    else {
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data: tradeMark
        })
    }

}

//删除品牌

export const reqDeleteTrandeMark = (id) => request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
})