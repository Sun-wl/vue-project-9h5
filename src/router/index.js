import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {/*登录*/
      path: '/',
      name: 'login',
      component: resolve => require(['@/views/account/login'], resolve)
    },
    {/*重置密码*/
      path: '/reset',
      name: 'reset',
      component: resolve => require(['@/views/account/reset'], resolve)
    },
    {/*注册*/
      path: '/register',
      name: 'register',
      component: resolve => require(['@/views/account/register'], resolve)
    },
    { //企业中心
      path: '/personal',
      name: 'personal',
      meta: {
        title: '企业信息'
      },
      component: resolve => require(['@/views/personal/index'], resolve)
    },
    { //企业资料
      path: '/personal/info',
      name: 'personalInfo',
      meta: {
        title: '企业资料'
      },
      component: resolve => require(['@/views/personal/info'], resolve)
    },
    { //企业地址(从企业信息进去传no，从确认订单界面进去传当前产品的index)
      path: '/personal/area/:index',
      name: 'personalArea',
      meta: {
        title: '企业地址'
      },
      component: resolve => require(['@/views/personal/area'], resolve)
    },
    { //设置地址(新增时area传add，否则传当前编辑的数据)
      path: '/personal/areaSetting/:area',
      name: 'personalAreaSetting',
      meta: {
        title: '设置地址'
      },
      component: resolve => require(['@/views/personal/areaSetting'], resolve)
    },
    { //采购统计
      path: '/personal/count',
      name: 'personalCount',
      meta: {
        title: '采购统计'
      },
      component: resolve => require(['@/views/personal/count'], resolve)
    },

    { //产品报价(type传金属类型id)
      path: '/product/index/:type',
      name: 'product',
      meta: {
        title: '产品价格'
      },
      component: resolve => require(['@/views/product/index'], resolve)
    },
    { //选择产品
      path: '/product/select',
      name: 'productSelect',
      meta: {
        title: '选择产品'
      },
      component: resolve => require(['@/views/product/select'], resolve)
    },
    { //确认订单
      path: '/product/confirm',
      name: 'productConfirm',
      meta: {
        title: '确认订单'
      },
      component: resolve => require(['@/views/product/confirm'], resolve)
    },
    { //付款方式
      path: '/product/payment',
      name: 'productPayment',
      meta: {
        title: '付款方式'
      },
      component: resolve => require(['@/views/product/payment'], resolve)
    },
    { //提交成功
      path: '/product/submitFinish/:orderNo',
      name: 'productSubmit',
      meta: {
        title: '提交成功'
      },
      component: resolve => require(['@/views/product/submitFinish'], resolve)
    },

    { //订单列表(index传0,1,2，分别是头部三个tab)
      path: '/order/:index',
      name: 'order',
      meta: {
        title: '订单进度'
      },
      component: resolve => require(['@/views/order/index'], resolve)
    },
    { //物流信息
      path: '/order/logistics/:id',
      name: 'orderLogistics',
      meta: {
        title: '物流信息'
      },
      component: resolve => require(['@/views/order/logistics'], resolve)
    },
    { //订单详情
      path: '/order/details/:orderNo',
      name: 'orderDetails',
      meta: {
        title: '订单详情'
      },
      component: resolve => require(['@/views/order/details'], resolve)
    }
  ]
})
