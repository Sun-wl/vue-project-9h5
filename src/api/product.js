import {getRequest, postRequest} from './index'

const product = {
  commonUrl: 'api/product/',
  productList: function (type, callback) {
    //获取产品
    var opt = {
      url: product.commonUrl + 'list/' + type
    }
    return getRequest(opt, callback)
  },
  packingAndDate: function (data, callback) {
    var opt = {
      url: product.commonUrl + 'packingAndDate/' + data.id,
      params: {
        downPayment: data.downPayment
      }
    }
    return getRequest(opt, callback)
  }
}

export default product;
