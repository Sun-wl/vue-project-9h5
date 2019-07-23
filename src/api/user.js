import router from '../router'
import {getRequest, postRequest} from './index'

const user = {
  commonUrl: 'api/member/',
  login: function (mobile, passWord) {
    if (!mobile) {
      alert("请输入手机号")
      return
    }
    if (!/^1[345678]\d{9}$/.test(mobile)) {
      alert("请输入正确的手机号")
      return
    }
    if (!passWord) {
      alert("请输入密码")
      return
    }
    var opt = {
      url: user.commonUrl + 'login',
      params: {
        mobile: mobile,
        passWord: passWord
      },
      noTicket: true
    }
    return postRequest(opt, function (res) {
      if (res.statusCode == 200) {
        localStorage.setItem('ticket', res.data.ticket)
        router.replace(sessionStorage.getItem('backUrl'))
      } else {
        alert(res.message)
      }
    })
  },
  register: function (params) {
    if (!params.mobile) {
      alert("请输入手机号")
      return
    }
    if (!/^1[345678]\d{9}$/.test(params.mobile)) {
      alert("请输入正确的手机号")
      return
    }
    if (!params.password) {
      alert("请输入密码")
      return
    }
    if (params.password.length < 6) {
      alert("密码至少六位")
      return
    }
    if (!params.captcheCode) {
      alert("请输入验证码")
      return
    }
    if (!params.companyName) {
      alert("请输入企业名称")
      return
    }
    if (!params.realName) {
      alert("请输入联系人")
      return
    }
    var opt = {
      url: user.commonUrl + 'register',
      params: {
        'entity.mobile': params.mobile,           //手机
        'entity.password': params.password,       //密码
        'captcheCode': params.captcheCode,        //验证码
        'entity.companyName': params.companyName, //企业名称
        'entity.realName': params.realName        //联系人
      },
      noTicket: true
    }
    return postRequest(opt, function (res) {
      /*登录成功后，localStorage，跳转至backUrl页面*/
      localStorage.setItem('ticket', res.data.ticket)
      router.replace(sessionStorage.getItem('backUrl'))
    })
  },
  reset: function (params) {
    if (!params.mobile) {
      alert("请输入手机号")
      return
    }
    if (!/^1[345678]\d{9}$/.test(params.mobile)) {
      alert("请输入正确的手机号")
      return
    }
    if (!params.password) {
      alert("请输入密码")
      return
    }
    if (params.password.length < 6) {
      alert("密码至少六位")
      return
    }
    if (!params.captcha) {
      alert("请输入验证码")
      return
    }
    var opt = {
      url: user.commonUrl + 'update/password',
      params: {
        'mobile': params.mobile,       //手机
        'passWord': params.password,   //密码
        'captcha': params.captcha      //验证码
      },
      noTicket: true
    }
    return postRequest(opt, function (res) {
      /*登录成功后，localStorage，跳转至backUrl页面*/
      localStorage.setItem('ticket', res.data.ticket)
      router.push('/')
    })
  },
  info: function (callback) {
    //获取企业信息
    var opt = {
      url: user.commonUrl + 'details'
    }
    return getRequest(opt, callback)
  },
  payModel: function (callback) {
    //获取付款方式
    var opt = {
      url: user.commonUrl + 'payModel'
    }
    return getRequest(opt, callback)
  },
  defaultArea: function (callback) {
    //获取默认地址
    var opt = {
      url: user.commonUrl + 'query/defaultsAddress'
    }
    return getRequest(opt, callback)
  },
  areas: function (callback) {
    //获取所有地址
    var opt = {
      url: user.commonUrl + 'query/address'
    }
    return getRequest(opt, callback)
  },
  areaSave: function (params, callback) {
    //保存地址
    var opt = {
      url: user.commonUrl + 'saveOrUpdateAddress',
      params: {
        'entity.id': params.id || undefined,          //修改地址的id
        'entity.provinceName': params.provinceName,   //省份
        'entity.cityName': params.cityName,           //城市
        'entity.address': params.address,             //区域+详细地址
        'entity.receiveName': params.receiveName,     //姓名
        'entity.receiveMobile': params.receiveMobile, //手机号
        'entity.isDefault': params.isDefault          //是否为默认地址，true/false
      }
    }
    return postRequest(opt, callback)
  },
  areaDel: function (id, callback) {
    //删除地址
    var opt = {
      url: user.commonUrl + 'address/delete/' + id
    }
    return getRequest(opt, callback)
  }
}

export default user;
