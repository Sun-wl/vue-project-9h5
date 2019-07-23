<template>
  <div class="order flex-column span1 bg-e">
    <div class="flex-row bg-f">
      <div class="span1 p-row-10" @click="listView(0)">
        <div class="line-40 font-15 text-center">有效订单</div>
        <div class="font-0" v-if="index == 0">
          <img class="border-b" src="../../assets/img/border.png" alt="">
        </div>
      </div>
      <div class="span1 p-row-10" @click="listView(1)">
        <div class="line-40 font-15 text-center">已完成订单</div>
        <div class="font-0" v-if="index == 1">
          <img class="border-b" src="../../assets/img/border.png" alt="">
        </div>
      </div>
      <div class="span1 p-row-10" @click="listView(2)">
        <div class="line-40 font-15 text-center">未生效及取消</div>
        <div class="font-0" v-if="index == 2">
          <img class="border-b" src="../../assets/img/border.png" alt="">
        </div>
      </div>
    </div>

    <div class="span1 p-row-10 p-column-20 scroll-y">
      <div class="" v-for="order in orders">
        <div class="radius-5 bg-f">
          <div class="p-column-5" @click="jump('/order/details/'+ order.orderNo)">
            <div class="flex-row p-row-10">
              <div class="span4 line-30">订单号：{{order.orderNo}}</div>
              <div class="span3 line-30 font-color-theme">订单状态：{{order.statusText}}</div>
            </div>
            <div class="flex-row p-row-10">
              <div class="span4 line-30">下单时间：{{order.createTime}}</div>
              <div class="span3 line-30">产品数量：{{order.num}}瓶</div>
            </div>
            <div class="p-row-10 line-30">产品名称：{{order.productName}}</div>
          </div>
          <div class="border-top flex-row p-column-5 right">
            <div class="btn btn-red border-c m-r-10 font-13" v-if="order.status == 1" @click="cancel(order.orderNo)">
              取消订单
            </div>
            <div class="btn border-theme font-color-theme m-r-10 font-13"
                 @click="buy(order.orderNo)">再次购买
            </div>
          </div>
        </div>
        <div class="gap"></div>
      </div>
    </div>
    <toast :show="toastShow" :title="toastText"></toast>
  </div>
</template>

<script>
  import product from '@/api/product'
  import cart from '@/api/cart'
  import order from '@/api/order'
  export default {
    name: 'order',
    data () {
      return {
        index: '0',
        orders: []
      }
    },
    computed: {
      type () {
        switch (this.index) {
          case '0':
            return 3;
            break;
          case '1':
            return 1;
            break;
          case '2':
            return 2;
            break;
        }
      }
    },
    methods: {
      listView(index){
        /*切换类型*/
        this.index = String(index);
        this.getOrderList(this.type);
      },
      getOrderList(type){
        /*获取订单列表*/
        var _this = this;
        return order.orderList(type, function (res) {
          _this.orders = res.data;
        })
      },
      cancel(orderNo){
        /*取消订单*/
        if (confirm('确定取消此订单？')) {
          var _this = this;
          order.orderDel(orderNo, function (res) {
            _this.toast('取消成功');
            _this.getOrderList(_this.type);
          })
        }
      },
      getPackingAndDate(data, callback){
        /*获取包装规格和交货期*/
        var _this = this;
        product.packingAndDate(data, function (res) {
          var dates = res.data.weekDays;
          callback(dates);
        })
      },
      buy(orderNo){
        /*再次购买*/
        var _this = this;
        order.orderDetails(orderNo, function (res) {
          /*获取订单详情，保存产品列表和付款方式*/
          var products = res.data.itemList;
          var payment = res.data.paymentModel;
          //将付款方式存入store
          _this.$store.commit('paymentSave', {
            paymentSelected: payment
          })
          products.forEach(function (item, index) {
            //将每个产品是否选择保险费，备注，配送方式，开票名称存入store
            _this.$store.commit('confirmInfoSave', {
              isInsurance: {value: item.premium},
              remark: {value: item.remark},
              delicery: {value: item.wayType},
              bill: {value: item.billingId},
              index: index
            })

            //包装规格
            var arr = [];
            for (var i = 0; i < item.purchaseDetailsList.length; i++) {
              var a = item.purchaseDetailsList[i].specifications + ';' + item.purchaseDetailsList[i].num;
              arr.push(a);
            }
            //获取每个产品的发货期
            _this.getPackingAndDate({id: item.productId, downPayment: item.downPaymentPercentage}, function (dates) {
              var params = {
                productId: item.productId,
                shipmentTimeId: dates[0].id,
                shipmentTime: dates[0].weekDayTime,
                unitPrice: dates[0].result,
                deposit: item.downPaymentPercentage,
                purchaseDetailsStr: JSON.stringify(arr)
              }
              cart.cartSave(params, function (res) {
                _this.$router.push('/product/select')
              })
            })
          })
        })
      }
    },
    created(){
      this.index = this.$route.params.index;
      this.getOrderList(this.type);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .border-b {
    height: 2px;
    width: 100%;
  }
</style>
