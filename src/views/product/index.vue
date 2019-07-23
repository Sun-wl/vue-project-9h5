<template>
  <div class="product w-all span1 flex-column">
    <div class="span1 scroll-y p-row-10">
      <table class="products">
        <thead>
        <tr class="title">
          <th>产品名称</th>
          <th style="width: 50px;">单价<br>(元/克)</th>
          <th style="width: 60px;">订货批量<br>(千克)</th>
          <th style="width: 80px;">交货期</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product,index) in products">
          <td>{{product.name}} ({{product.downPaymentPercentage}})</td>
          <td>￥{{ (Math.round(product.result * 100) / 100).toFixed(2) }}</td>
          <td>{{product.minimumQuantity}}</td>
          <td class="nowrap">{{product.weekDayTime}}</td>
          <td>
            <div class="p-row-10 line-20 radius-5 border-c buyBtn nowrap" @click="buy(index)">购买</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="p-column-20 p-row-50 bg-f">
      <button @click="jump('/product/select')">去确认已选择的产品</button>
    </div>

    <div class="tipBox" v-if="tipShow">
      <div class="tip p-row-20 border-c radius-5 p-b-5 bg-f">
        <div class="border-bottom line-40 text-center">友情提示</div>
        <div class="flex-column center">
          <div class="p-column-10">
            <div class="line-40">购买的数量应为订单批量的整数倍</div>
            <div class="flex-row row-center">
              <input type="checkbox" class="" v-model="dontTip" value="1">
              <div class="line-40 m-l-5" @click="dontTip = !dontTip">不再提醒</div>
            </div>
            <div class="flex-column center">
              <div class="know" @click="know">知道了</div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <toast :show="toastShow" :title="toastText"></toast>
  </div>
</template>

<script>
  import product from '@/api/product'
  import cart from '@/api/cart'
  export default {
    name: 'product',
    data () {
      return {
        type: '',
        products: [],
        tipShow: true,
        dontTip: false
      }
    },
    watch: {
      "$route": 'getType',    // 如果路由有变化，获取产品分类
      "type": 'getProducts'   // 如果产品分类变化，获取产品
    },
    methods: {
      know(){
        if (this.dontTip) {
          localStorage.setItem('dontTip', 'true')
        }
        this.tipShow = false;
      },
      getType(){
        /*获取产品分类*/
        this.type = this.$route.params.type;
      },
      getProducts(){
        /*获取分类下的产品*/
        var _this = this;
        product.productList(this.type, function (res) {
          _this.products = res.data;
        })
      },
      getPackingAndDate(id, callback){
        /*获取包装规格和交货期*/
        product.packingAndDate({id: id}, function (res) {
          var formats = res.data.productSpecification;
          callback(formats);
        })
      },
      buy(index){
        var _this = this;
        //获取每个产品的发货期
        this.getPackingAndDate(this.products[index].id, function (formats) {
          var params = {
            productId: _this.products[index].id,
            shipmentTimeId: _this.products[index].weekDayId,
            shipmentTime: _this.products[index].weekDayTime,
            unitPrice: _this.products[index].result,
            deposit: _this.products[index].downPaymentPercentage,
            purchaseDetailsStr: JSON.stringify([formats[0] + ';1'])
          }
          /*加入购物车*/
          cart.cartSave(params, function (res) {
            _this.toast('已放入“选择产品”界面，请去查看');
          })
        })
      }
    },
    created(){
      if(localStorage.getItem('dontTip') == 'true'){
        this.tipShow = false;
      }
      this.getType()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nowrap {
    word-break: keep-all;
    white-space: nowrap;
  }

  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
  }

  table th, table td {
    height: 45px;
  }

  table th {
    border-bottom: 1px solid #eee;
  }

  table td {
    color: #999;
    font-size: 13px;
  }

  .buyBtn {
    cursor: pointer;
  }

  .buyBtn:active {
    background: #1171af;
    color: #fff;
    border: 1px solid #1171af;
  }

  .tipBox{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.3);
  }
  .tip {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-150px, -50%);
  }

  .know {
    cursor: pointer;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #fff;
    color: #333;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    margin-top: 10px;
  }

</style>
