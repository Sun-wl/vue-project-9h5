<template>
    <div class="productSubmit w-all flex-column span1">
      <div class="span1 flex-column center">
        <img class="submitImg" src="../../assets/img/submit.png" alt="">
        <div class="line-60 font-18 p-t-10">订单提交成功</div>
        <div class="font-color-9">友好提醒：为确保产品数量，请及时付款</div>
      </div>
      <div class="to" @click="jump('/order/details/' + orderNo)">查看订单</div>

    </div>
</template>

<script>
    export default {
        name: 'productSubmit',
        data () {
            return {
                orderNo:''
            }
        },
        methods: {},
        created(){
            this.orderNo = this.$route.params.orderNo;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .submitImg{
    width:200px;
  }
  .to{
    width:100%;
    height:50px;
    line-height:50px;
    text-align: center;
    color: #fff;
    font-size:18px;
    background: #1171af;
  }
</style>
