import Vue from 'vue'
import router from '../router'

export const baseUrl = 'http://192.168.31.128:4061/'

function fetch(opt, callback) {
  return new Promise(function (resolve, reject) {
    Vue.http({
      url: opt.url,
      method: opt.method,
      params: opt.params,
      headers: opt.headers
    }).then(function (res) {
      if (res.status == 200) {
        if(res.data.statusCode == 200){
          resolve(res.data);
          callback(res.data)
        }else if(res.data.statusCode == 401){
          if(res.data.message){
            alert(res.data.message)
          }
          sessionStorage.setItem('backUrl', location.hash.split('#')[1]);
          router.replace('/')
        }else if(res.data.statusCode == 301){
          alert('您没有当前页面的权限哦')
          router.back()
        }else if(res.data.statusCode == 302){
          if(confirm('账号审核通过后方可查看当前界面，是否查看企业资料？')){
            router.push('/personal')
          }else{
            router.replace('/')
          }
        }else{
          if(res.data.message){
            alert(res.data.message)
          }
        }
      } else {
        reject(res);
        alert('服务器开小差了，请稍后重试~')
      }
    }, function (res) {
      reject(res);
      alert('服务器开小差了，请稍后重试~')
    });
  })
}

/*get请求*/
export function getRequest(opt, callback) {
  var opts = {
    url: baseUrl + opt.url,
    method: "GET",
    params: opt.params,
    headers: {}
  }
  if (!opt.noTicket) {
    opts.headers.ticket = localStorage.getItem('ticket');
  }
  return fetch(opts, callback)
}

/*post请求*/
export function postRequest(opt, callback) {

  var opts = {
    url: baseUrl + opt.url,
    method: "POST",
    params: opt.params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  if (!opt.noTicket) {
    opts.headers.ticket = localStorage.getItem('ticket');
  }
  return fetch(opts, callback)
}
