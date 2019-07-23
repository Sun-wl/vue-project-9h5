<template>
  <div class="productPayment w-all bg-e">
    <div v-for="payment in payments">
      <div class="gap"></div>
      <div class="bg-f p-column-5" v-if="payment.bankName != '支付宝'" @click="selectThis(payment)">
        <div class="flex-row p-row-15">
          <div class="span1 line-35 font-15">收款姓名：{{payment.name}}</div>
          <div class="line-35 text-right font-15">银行：{{payment.bankName}}</div>
        </div>
        <div class="p-row-15 line-35 font-15">支行：{{payment.openBank}}</div>
        <div class="flex-row p-row-15 line-35 font-15">收款账号：{{payment.bankNo}}</div>
      </div>
      <div class="bg-f p-column-5" v-else @click="selectThis(payment)">
        <div class="flex-row p-row-15 line-35 font-15">收款姓名：{{payment.name}}</div>
        <div class="flex-row p-row-15 line-35 font-15">支付宝：{{payment.bankNo}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import user from '@/api/user'
  export default {
    name: 'productPayment',
    data () {
      return {
        payments: []
      }
    },
    methods: {
      selectThis(payment){
        /*点击选择此付款方式，返回确认订单界面*/
        this.$store.commit('paymentSave', {
          paymentSelected: payment
        })
        this.$router.back();
      }
    },
    created(){
      var _this = this;
      user.payModel(function (res) {
        _this.payments = res.data;
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
