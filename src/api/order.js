import {getRequest, postRequest} from './index'

const order = {
  commonUrl: 'api/order/',
  orderList: function (type, callback) {
    //获取订单列表
    var opt = {
      url: order.commonUrl + 'query/status',
      params: {
        type: type
      }
    }
    return getRequest(opt, callback)
  },
  orderSave: function (saveList, paymentModelId, callback) {
    //提交订单
    var opt = {
      url: order.commonUrl + 'save',
      params: {
        saveList: saveList,
        paymentModelId: paymentModelId
      }
    }
    return postRequest(opt, callback)
  },
  orderDetails: function (orderNo, callback) {
    //获取订单详情
    var opt = {
      url: order.commonUrl + 'details/' + orderNo,
    }
    return getRequest(opt, callback)
  },
  orderLogistics: function (id, callback) {
    //获取订单物流信息
    var opt = {
      url: order.commonUrl + 'logistics/query/' + id,
    }
    return getRequest(opt, callback)
  },
  orderDel: function (orderNo, callback) {
    //取消订单
    var opt = {
      url: order.commonUrl + 'delete/' + orderNo,
    }
    return getRequest(opt, callback)
  },
  orderMetal: function (callback) {
    //获取订单采购统计
    var opt = {
      url: order.commonUrl + 'company/metal/total',
    }
    return getRequest(opt, callback)
  },
}

export default order;
