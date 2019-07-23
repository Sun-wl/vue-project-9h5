<template>
  <div class="productConfirm w-all flex-column span1 bg-e">
    <div class="span1 scroll-y">
      <div class="gap"></div>
      <div class="cell p-row-15 bg-f" @click="toPayment">
        <div class="cell-main font-15">付款方式</div>
        <div class="flex-column center">
          <img class="img-15" src="../../assets/img/to.png" alt="">
        </div>
      </div>
      <div class="bg-f p-column-5" v-if="payment && payment.bankName != '支付宝'">
        <div class="flex-row p-row-15">
          <div class="span1 line-30 font-color-9">收款姓名：{{payment.name}}</div>
          <div class="line-30 text-right font-color-9">银行：{{payment.bankName}}</div>
        </div>
        <div class="p-row-15 line-30 font-color-9">支行：{{payment.openBank}}</div>
        <div class="flex-row p-row-15 line-30 font-color-9">收款账号：{{payment.bankNo}}</div>
      </div>
      <div class="bg-f p-column-5" v-if="payment && payment.bankName == '支付宝'">
        <div class="flex-row p-row-15 line-30 font-color-9">收款姓名：{{payment.name}}</div>
        <div class="flex-row p-row-15 line-30 font-color-9">支付宝：{{payment.bankNo}}</div>
      </div>
      <div class="gap"></div>
      <div v-for="(product,index) in products">
        <div class="bg-f">
          <div class="p-column-5 p-row-15 border-bottom">
            <div class="span1 line-30 font-16 font-color-purple">产品{{index+1}}</div>
          </div>
          <div class="p-column-5">
            <div class="flex-row p-row-15">
              <div class="span1 line-30 font-15">{{product.productName}} ({{product.deposit}})</div>
            </div>
            <div class="flex-row p-row-15">
              <div class="span1 line-30 font-color-9">交货期：{{product.shipmentTime}}</div>
              <div class="span1 line-30 font-color-9">含税单价(17%)：￥{{product.unitPrice}}</div>
            </div>
            <div class="flex-row p-row-15">
              <div class="span1 line-30 font-color-9">重量：{{product.totalSum/1000}}kg</div>
              <div class="span1 line-30 font-color-9">金额：<span class="font-color-theme">￥{{ (Math.round(product.amount * 100) / 100).toFixed(2) }}</span>
              </div>
            </div>
          </div>
          <div class="border-top p-column-5">
            <div class="flex-row p-l-15" v-for="purchaseDetail in product.purchaseDetails">
              <div class="w-120 line-30 font-color-9 font-12">包装规格：{{purchaseDetail.specifications}}g/瓶</div>
              <div class="w-85 line-30 font-color-9 font-12">数量：{{purchaseDetail.num}}瓶</div>
              <div class="span1 line-30 font-color-9 font-12">价格：￥{{ (Math.round(purchaseDetail.amount * 100) /
                100).toFixed(2) }}
              </div>
            </div>
          </div>
          <div class="gap-s"></div>
          <div class="p-column-15 flex-row bg-f" v-if="isDefaultArea[index].value" @click="toArea(index)">
            <div class="p-row-15">
              <img class="img-18" src="../../assets/img/personalImg2.png" alt="">
            </div>
            <div class="span1">
              <div class="flex-row">
                <div class="span1">{{areaDefault.receiveName}}</div>
                <div class="span1 text-right">{{areaDefault.receiveMobile}}</div>
              </div>
              <div class="p-t-10">地址：{{areaDefault.area}}</div>
            </div>
            <div class="p-row-15 flex-column center">
              <img class="img-15" src="../../assets/img/to.png" alt="">
            </div>
          </div>
          <div class="p-column-15 flex-row bg-f" v-if="!isDefaultArea[index].value && area[index]"
               @click="toArea(index)">
            <div class="p-row-15">
              <img class="img-18" src="../../assets/img/personalImg2.png" alt="">
            </div>
            <div class="span1">
              <div class="flex-row">
                <div class="span1">{{area[index].receiveName}}</div>
                <div class="span1 text-right">{{area[index].receiveMobile}}</div>
              </div>
              <div class="p-t-10">地址：{{area[index].area}}</div>
            </div>
            <div class="p-row-15 flex-column center">
              <img class="img-15" src="../../assets/img/to.png" alt="">
            </div>
          </div>
          <div class="cell p-row-15 bg-f" v-if="!isDefaultArea[index].value && !area[index]" @click="toArea(index)">
            <div class="cell-main font-15">请选择地址</div>
            <div class="flex-column center">
              <img class="img-15" src="../../assets/img/to.png" alt="">
            </div>
          </div>
          <div class="gap-s"></div>
          <div class="list">
            <div class="cell p-row-15">
              <div class="cell-main font-15">保险费（{{premiumRate}}%）：￥{{product.insurance}}</div>
              <div class="flex-column center">
                <img class="img-15" src="../../assets/img/personalImg9.png" alt="" v-if="isInsurance[index].value"
                     @click="insurance(index)">
                <img class="img-15" src="../../assets/img/personalImg10.png" alt="" v-else @click="insurance(index)">
              </div>
            </div>
            <div class="cell p-row-15" style="position: relative;">
              <div class="cell-title font-15">包装费：</div>
              <div class="cell-main">￥{{product.packPrice}}</div>
              <div class="flex-column center">
                <img class="img-20" src="../../assets/img/des.png" alt=""
                     @click="desShow = !desShow">
              </div>
              <div class="desTip" v-if="desShow">
                包装费计算方式：<br>
                ① ≤8克/瓶：<br>
                &nbsp;&nbsp;&nbsp;&nbsp;25瓶或25瓶以下，10元（每瓶的包装价格）;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;25瓶以上，瓶数*0.4（每瓶的价格）;<br>
                ② >8克/瓶：<br>
                &nbsp;&nbsp;&nbsp;&nbsp;10元（每瓶的价格）;
              </div>
            </div>
            <div class="cell p-row-15">
              <div class="cell-title font-15">备注：</div>
              <div class="cell-main">
                <input type="text" class="cell-input" placeholder="(选填)" v-model="remark[index].value">
              </div>
            </div>
            <!--<div class="cell p-row-15">
              <div class="cell-title font-15">配送方式：</div>
              <div class="cell-main">
                <select type="text" class="cell-select font-13" v-model="delicery[index].value">
                  <option value="">-&#45;&#45;请选择-&#45;&#45;</option>
                  <option v-for="item in delicerys" :value="item.value">{{item.name}}</option>
                </select>
              </div>
            </div>-->
            <div class="cell p-row-15">
              <div class="cell-title font-15">开票名称：</div>
              <div class="cell-main">
                <select class="cell-select font-13" v-model="bill[index].value">
                  <option value="">---请选择---</option>
                  <option v-for="item in billing" :value="item.id">{{item.title}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="gap"></div>
      </div>

    </div>
    <div class="btns flex-row">
      <div class="span1 line-50 p-l-20 font-16">应付金额：<span class="font-color-theme line-50 font-16">￥{{amount}}</span>
      </div>
      <div class="line-50 bg-theme text-center font-17 p-row-30 font-color-f" @click="submit">提交订单</div>
    </div>
    <toast :show="toastShow" :title="toastText"></toast>
  </div>
</template>

<script>
  import user from '@/api/user'
  import cart from '@/api/cart'
  import order from '@/api/order'
  export default {
    name: 'productConfirm',
    data () {
      return {
        products: [],
        billing: [],
        premiumRate: 0.15,
        canSubmit: false,
        saveList: [],
        desShow: false,
        areaDefault: {}
      }
    },
    computed: {
      payment(){
        /*选择的付款方式*/
        return this.$store.state.payment ? this.$store.state.payment : ''
      },
      area(){
        /*选择的收货地址*/
        return this.$store.state.area ? this.$store.state.area : []
      },
      isDefaultArea(){
        /*各产品是否使用默认地址*/
        var arr = [];
        for (var i = 0; i < this.products.length; i++) {
          arr.push({value: true})
        }
        if (this.$store.state.isDefaultArea) {
          for (var i = 0; i < this.$store.state.isDefaultArea.length; i++) {
            arr[i] = this.$store.state.isDefaultArea[i]
          }
        }
        return arr
      },
      isInsurance(){
        /*是否选择保险费*/
        var arr = [];
        for (var i = 0; i < this.products.length; i++) {
          arr.push({value: true})
        }
        if (this.$store.state.isInsurance) {
          for (var i = 0; i < this.$store.state.isInsurance.length; i++) {
            arr[i] = this.$store.state.isInsurance[i]
          }
        }
        return arr
      },
      remark(){
        /*备注*/
        var arr = [];
        for (var i = 0; i < this.products.length; i++) {
          arr.push({value: ''})
        }
        if (this.$store.state.remark) {
          for (var i = 0; i < this.$store.state.remark.length; i++) {
            arr[i] = this.$store.state.remark[i]
          }
        }
        return arr
      },
      delicery(){
        /*配送方式*/
        var arr = [];
        for (var i = 0; i < this.products.length; i++) {
          arr.push({value: ''})
        }
        if (this.$store.state.delicery) {
          for (var i = 0; i < this.$store.state.delicery.length; i++) {
            arr[i] = this.$store.state.delicery[i]
          }
        }
        return arr
      },
      bill(){
        /*开票名称*/
        var arr = [];
        for (var i = 0; i < this.products.length; i++) {
          arr.push({value: ''})
        }
        if (this.$store.state.bill) {
          for (var i = 0; i < this.$store.state.bill.length; i++) {
            arr[i] = this.$store.state.bill[i]
          }
        }
        return arr
      },
      amount(){
        /*总金额*/
        var amount = 0
        for (var i = 0; i < this.products.length; i++) {
          amount += +this.products[i].amount;
          amount += +this.products[i].insurance;
          amount += +this.products[i].packPrice;
        }
        amount = (Math.round(+amount * 100) / 100).toFixed(2);
        return this.$store.state.amount ? this.$store.state.amount : amount;
      }
    },
    methods: {
      getDefaultArea(){
        /*获取默认收货地址*/
        var _this = this;
        return user.defaultArea(function (res) {
          res.data[0].area = res.data[0].provinceName + res.data[0].cityName + res.data[0].address.split('-')[0] + res.data[0].address.split('-')[1]
          _this.areaDefault = res.data[0];
        })
      },
      saveSomeInfoStore(){
        //将每个产品是否选择保险费，备注，配送方式，开票名称存入store
        for (var i = 0; i < this.products.length; i++) {
          this.$store.commit('confirmInfoSave', {
            isInsurance: this.isInsurance[i],
            remark: this.remark[i],
            delicery: this.delicery[i],
            bill: this.bill[i],
            index: i
          })
        }
      },
      saveAmountStore(amount){
        /*将总金额存入store*/
        this.$store.commit('amountSave', {
          amount: amount
        })
      },
      toPayment(){
        /*去选付款方式前，保存保险费，备注，配送方式，开票名称等信息*/
        this.saveSomeInfoStore();
        this.$router.push('/product/payment')
      },
      toArea(index){
        /*去选择地址之前，保存保险费，备注，配送方式，开票名称等信息，保存当条地址为不使用默认地址*/
        this.saveSomeInfoStore();
        this.$store.commit('isDefaultAreaSave', {
          isDefaultArea: {value: false},
          index: index
        })
        this.$router.push('/personal/area/' + index);
      },
      getCartList(){
        var _this = this;
        /*获取购物车列表*/
        return cart.cartList(function (res) {
          _this.products = res.data;
          /*将每项产品设为使用默认地址*/
          _this.products.forEach(function (item, index) {
            _this.isDefaultArea.push({value: true})
          })
          for (var i = 0; i < _this.products.length; i++) {
            /*计算包装费*/
            _this.products[i].packPrice = 0;
            for (var j = 0; j < _this.products[i].purchaseDetails.length; j++) {
              _this.products[i].packPrice = +(_this.products[i].packPrice + _this.products[i].purchaseDetails[j].packPrice);
            }
            _this.products[i].packPrice = (Math.round(_this.products[i].packPrice * 100) / 100).toFixed(2);
            /*计算保险费*/
            _this.products[i].insurance = 0;
            _this.products[i].insurance += +(_this.products[i].amount / 100 * _this.premiumRate);
            _this.products[i].insurance = (Math.round(_this.products[i].insurance * 100) / 100).toFixed(2);
          }
        })
      },
      getUserInfo(){
        /*获取企业信息--开票名称*/
        var _this = this;
        return user.info(function (res) {
          _this.billing = res.data.billing
        })
      },
      insurance(index){
        /*点击选中或取消选中保险费，并计算相应金额，存入store*/
        var amount = 0
        this.isInsurance[index].value = !this.isInsurance[index].value;
        if (this.isInsurance[index].value) {
          amount = +((+this.amount + +this.products[index].insurance));
          amount = (Math.round(amount * 100) / 100).toFixed(2);
        } else {
          amount = +((+this.amount - +this.products[index].insurance));
          amount = (Math.round(amount * 100) / 100).toFixed(2);
        }
        this.saveAmountStore(amount);
      },
      submit(){
        /*验证下单时间*/
        var now = (new Date).getTime();
        var today = [];
        today[0] = (new Date()).getFullYear();
        today[1] = (new Date()).getMonth() + 1;
        today[2] = (new Date()).getDate();
        today = today.join('/')
        var date1 = new Date(today + ' 9:30').getTime()
        var date2 = new Date(today + ' 16:30').getTime()
        /*if (now < date1 || now > date2) {
          this.toast('下单时间是9:30-16:30，现在不能下单哦！');
          return
        }*/
        this.saveList = [];
        if (!this.payment) {
          this.toast('付款方式不能为空，请选择付款方式')
          return
        }
        for (var i = 0; i < this.bill.length; i++) {
          if (!this.bill[i].value) {
            this.toast('请选择开票名称')
            return
          }
        }
        for (var i = 0; i < this.products.length; i++) {
          var obj = {
            shoppingIds: this.products[i].id,
            remark: this.remark[i].value ? this.remark[i].value : undefined,
            billingId: this.bill[i].value || undefined,
            premium: this.isInsurance[i].value,
            premiumRate: this.premiumRate,
            paymentGoodsData: this.products[i].shipmentTime,
            unitPrice: this.products[i].unitPrice
          }
          if (this.isDefaultArea[i].value) {
            obj.receiveAddress = this.areaDefault.area
            obj.receiveMobile = this.areaDefault.receiveMobile
            obj.receiveName = this.areaDefault.receiveName
          } else {
            obj.receiveAddress = this.area[i].area
            obj.receiveMobile = this.area[i].receiveMobile
            obj.receiveName = this.area[i].receiveName
          }
          this.saveList.push(obj)
        }
        var _this = this;
        /*提交订单，成功后将总金额store存为0，跳转*/
        order.orderSave(JSON.stringify(this.saveList), this.payment.id, function (res) {
          _this.saveAmountStore(0);
          _this.$router.push('/product/submitFinish/' + res.data.orderNo);
        })
      }
    },
    created(){
      var _this = this;
      this.getDefaultArea().then(function () {
        return _this.getUserInfo();
      }).then(function () {
        return _this.getCartList();
      })

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btns {
    width: 100%;
    height: 50px;
    background: #fff;
    border-top: 1px solid #ccc;
    box-shadow: 0 -1px 2px #ccc;
  }

  .desTip {
    position: absolute;
    right: 20px;
    left: 20px;
    top: 35px;
    z-index: 100;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 10px;
    font-size: 12px;
    border-radius: 5px;
  }
</style>
