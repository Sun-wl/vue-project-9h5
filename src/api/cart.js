import {getRequest, postRequest} from './index'

const cart = {
  commonUrl: 'api/shopping/',
  cartList: function (callback) {
    //购物车列表
    var opt = {
      url: cart.commonUrl + 'list'
    }
    return getRequest(opt, callback)
  },
  cartSave: function (params, callback) {
    //添加、修改购物车
    var opt = {
      url: cart.commonUrl + 'saveOrUpdate',
      params: {
        'entity.id': params.id,                         //当前编辑的当条的id
        'entity.productId': params.productId,           //产品id
        'entity.shipmentTimeId': params.shipmentTimeId, //交货期id
        'entity.shipmentTime': params.shipmentTime,     //交货期
        'entity.unitPrice': params.unitPrice,           //单价
        'entity.deposit': params.deposit,               //定金比例（30/100）
        'purchaseDetails': params.purchaseDetails,
        'purchaseDetailsStr': params.purchaseDetailsStr //包装规格，格式：'["包装规格;数量","50;10"]'
      }
    }
    return postRequest(opt, callback)
  },
  cartDel: function (id, callback) {
    //删除购物车产品
    var opt = {
      url: cart.commonUrl + 'delete/' + id
    }
    return postRequest(opt, callback)
  }
}

export default cart;
