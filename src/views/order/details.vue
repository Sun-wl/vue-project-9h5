<template>
  <div class="orderDetails w-all span1 flex-column bg-e">
    <div class="span1 scroll-y">
      <div class="gap"></div>
      <div class="cell p-row-15 bg-f">
        <div class="cell-main font-15">付款方式</div>
      </div>
      <div class="bg-f p-column-5" v-if="payment.bankName != '支付宝'">
        <div class="flex-row p-row-15">
          <div class="span1 line-30 font-color-9">收款姓名：{{payment.name}}</div>
          <div class="line-30 text-right font-color-9">银行：{{payment.bankName}}</div>
        </div>
        <div class="p-row-15 line-30 font-color-9">支行：{{payment.openBank}}</div>
        <div class="flex-row p-row-15 line-30 font-color-9">收款账号：{{payment.bankNo}}</div>
      </div>
      <div class="bg-f p-column-5" v-if="payment.bankName == '支付宝'">
        <div class="flex-row p-row-15 line-30 font-color-9">收款姓名：{{payment.name}}</div>
        <div class="flex-row p-row-15 line-30 font-color-9">支付宝：{{payment.bankNo}}</div>
      </div>

      <div class="gap"></div>
      <div v-for="(item,index) in products">
        <div class="bg-f">
          <div class="p-column-5 p-row-15 border-bottom">
            <div class="flex-row">
              <div class="span1 line-30 font-16 font-color-purple">产品{{index+1}}</div>
              <div class="span1 flex-row right">
                <div class="btn border" @click="jump('/order/logistics/'+ item.id)">查看物流</div>
              </div>
            </div>
          </div>
          <div class="p-column-5">
            <div class="flex-row p-row-15">
              <div class="span1 line-30 font-15">{{item.productName}} ({{item.downPaymentPercentage}})</div>
            </div>
            <div class="flex-row p-row-15">
              <div class="span1 line-30 font-color-9">交货期：{{item.paymentGoodsData}}</div>
              <div class="span1 line-30 font-color-9">含税单价(17%)：￥{{ (Math.round(item.unitPrice * 100) / 100).toFixed(2)
                }}
              </div>
            </div>
          </div>
          <div class="border-top p-column-5">
            <div class="flex-row p-l-15" v-for="data in item.purchaseDetailsList">
              <div class="w-120 line-30 font-color-9 font-12">包装规格：{{data.specifications}}g/瓶</div>
              <div class="w-85 line-30 font-color-9 font-12">数量：{{data.num}}瓶</div>
              <div class="span1 line-30 font-color-9 font-12">价格：￥{{ (Math.round(data.amount * 100) / 100).toFixed(2)
                }}
              </div>
            </div>
          </div>
          <div class="gap-s"></div>
          <div class="p-column-15 flex-row bg-f">
            <div class="p-row-15">
              <img class="img-18" src="../../assets/img/personalImg2.png" alt="">
            </div>
            <div class="span1">
              <div class="flex-row">
                <div class="span1">{{item.receiveName}}</div>
                <div class="span1 text-right">{{item.receiveMobile}}</div>
              </div>
              <div class="p-t-10">地址：{{item.receiveAddress}}</div>
            </div>
            <div class="p-row-15 flex-column center"></div>
          </div>
          <div class="gap-s"></div>
          <div class="list">
            <div class="p-row-15 p-column-5 border-bottom">
              <div class="font-13 line-25" v-if="item.premium">保险费({{item.premiumRate}}%)：￥{{
                (Math.round(item.premiumAmount * 100) / 100).toFixed(2) }}
              </div>
              <div class="font-13 line-25">包装费：￥{{item.packPrice}}</div>
              <div class="font-13 line-25" v-if="item.billingTitle">开票名称：{{item.billingTitle}}</div>
              <div class="font-13 line-25 font-color-9" v-if="item.remark">备注：{{item.remark}}</div>
            </div>
            <div class="cell p-row-15">
              <div class="cell-main font-color-theme font-16">金额：￥{{ (Math.round(item.amount * 100) / 100).toFixed(2)
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="gap"></div>
      </div>
      <div class="p-row-15 p-column-10 bg-f">
        <div class="font-13 line-25">订单号：{{orderNo}}</div>
        <div class="font-13 line-25">下单时间：{{data.createTime}}</div>
        <div class="font-13 line-25">总金额：￥{{ (Math.round(data.amount * 100) / 100).toFixed(2) }}</div>
        <div class="flex-row" v-if="data.paymentInformations && data.paymentInformations.length">
          <div class="span1 line-25 font-12 font-color-9">预付首款日期：{{data.paymentInformations[0].dateTime}}</div>
          <div class="w-140 line-25 font-12 font-color-9 right">付款金额：￥{{
            (Math.round((+data.paymentInformations[0].payMoney) * 100) / 100).toFixed(2) }}
          </div>
        </div>
        <div class="flex-row" v-if="data.paymentInformations && data.paymentInformations.length==2">
          <div class="span1 line-25 font-12 font-color-9">预付尾款日期：{{data.paymentInformations[1].dateTime}}</div>
          <div class="w-140 line-25 font-12 font-color-9 right">付款金额：￥{{
            (Math.round((+data.paymentInformations[1].payMoney) * 100) / 100).toFixed(2) }}
          </div>
        </div>
        <div class="flex-row" v-if="data.payRecordList && data.payRecordList.length">
          <div class="span1 line-30 font-12 font-color-9">已付首款日期：{{data.payRecordList[0].payTime}}</div>
          <div class="w-140 right">
            <div class="line-25 font-12 font-color-9">付款金额：￥{{ (Math.round((+data.payRecordList[0].amount) * 100) /
              100).toFixed(2) }}
            </div>
            <div class="line-25 font-12 font-color-9">付款方式：{{data.payRecordList[0].payMode}}</div>
          </div>
        </div>
        <div class="flex-row" v-if="data.payRecordList && data.payRecordList.length==2">
          <div class="span1 line-30 font-12 font-color-9">已付尾款日期：{{data.payRecordList[1].payTime}}</div>
          <div class="w-140 right">
            <div class="line-25 font-12 font-color-9">付款金额：￥{{ (Math.round((+data.payRecordList[1].amount) * 100) /
              100).toFixed(2) }}
            </div>
            <div class="line-25 font-12 font-color-9">付款方式：{{data.payRecordList[1].payMode}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import order from '@/api/order'
  export default {
    name: 'orderDetails',
    data () {
      return {
        orderNo: '',
        payment: {},
        products: [],
        data: {}
      }
    },
    methods: {
      getOrderDetails(){
        var _this = this;
        order.orderDetails(this.orderNo, function (res) {
          _this.data = res.data;
          _this.products = res.data.itemList;
          _this.payment = res.data.paymentModel;
          for (var i = 0; i < _this.products.length; i++) {
            /*计算包装费*/
            _this.products[i].packPrice = 0;
            for (var j = 0; j < _this.products[i].purchaseDetailsList.length; j++) {
              _this.products[i].packPrice = _this.products[i].packPrice + _this.products[i].purchaseDetailsList[j].packPrice;
            }
            _this.products[i].packPrice = (Math.round(_this.products[i].packPrice * 100) / 100).toFixed(2);
          }
        })
      }
    },
    created(){
      this.orderNo = this.$route.params.orderNo;
      this.getOrderDetails();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
