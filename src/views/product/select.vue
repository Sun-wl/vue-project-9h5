<template>
  <div class="productSelect flex-column span1 bg-e">
    <div class="span1 scroll-y p-t-20">

      <div v-for="(product,index) in products">
        <div class="bg-f">
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
              <div class="span1 line-30 font-color-9">
                金额：
                <span class="font-color-theme">￥{{ (Math.round(product.amount * 100) / 100).toFixed(2) }}</span>
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
          <div class="border-top flex-row right p-column-5">
            <div class="btn btn-red border-c m-r-10 font-color-9" @click="del(product.id)">删除</div>
            <div class="btn border-theme font-color-theme m-r-10" @click="edit(product.productId, index)">选择数量</div>
          </div>
        </div>
        <div class="gap"></div>
      </div>
      <div v-if="!products.length" class="text-center">暂时没有数据</div>

    </div>
    <div class="btns flex-row">
      <div class="span1 line-50 p-l-20 font-16">总金额：<span class="font-color-theme line-50 font-16">￥{{amount}}</span>
      </div>
      <div class="line-50 bg-theme text-center font-17 p-row-30 font-color-f" @click="confirm">
        确认订单
      </div>
    </div>

    <div class="addCart" v-if="cartShow">
      <div class="addCartInfo">
        <div class="flex-row p-row-15 p-column-10 border-bottom">
          <div class="text-left font-17 font-color-9" @click="cancel">取消</div>
          <div class="span1 flex-row right">
            <span class="font-12 font-color-9 p-t-5 p-r-20">点击确定查看产品价格</span>
            <span class="font-17 font-color-theme" @click="sure">确定</span>
          </div>
        </div>
        <div class="p-column-10">
          <div class="p-row-15 p-b-10">
            <div class="font-16 line-35">{{products[nowEditIndex].productName}} ({{products[nowEditIndex].deposit}})
            </div>
          </div>
          <div class="p-row-15 p-b-10 flex-row">
            <div class="font-color-9 line-25 p-column-5 w-80">交货期</div>
            <div class="span1 p-column-5" style="overflow: hidden;">
              <div v-for="(date,index) in dates" style="float: left; margin-bottom: 5px;"
                   :class="[dateIndex == index ? 'border-theme bg-theme font-color-f' : 'border','btn font-color-9 p-row-5 m-r-20 font-12 nowrap']"
                   @click="dateSelect(index)">{{date.weekDayTime}}
              </div>
            </div>
          </div>
          <div class="p-row-15 p-t-10 flex-row border-top">
            <div class="font-color-9 line-25 p-column-5 w-80">包装规格</div>
            <div class="span1 flex-column p-column-5">
              <div class="flex-row m-b-10" v-for="(format,index) in formats">
                <div
                  :class="[formatIndex.indexOf(index) >= 0 ? 'border-theme bg-theme font-color-f' : 'border','btn font-color-9 p-row-10 font-12 nowrap']"
                  @click="formatSelect(index)">{{format}}g/瓶
                </div>
                <div class="p-row-10 flex-column center font-color-9">*</div>
                <number-input v-model.number="num[index].value" @input="changeNum(index)"></number-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <toast :show="toastShow" :title="toastText"></toast>
  </div>
</template>

<script>
  import numberInput from '@/components/numberInput.vue'
  import product from '@/api/product'
  import cart from '@/api/cart'
  export default {
    name: 'productSelect',
    components: {
      numberInput
    },
    data () {
      return {
        products: [],
        nowEditIndex: '', //当前正在修改的产品
        cartShow: false,
        dateIndex: '无',
        dates: [],
        formatIndex: [],
        formats: [],
        num: [],
        amount: 0
      }
    },
    methods: {
      getCartList(){
        var _this = this;
        this.amount = 0;
        /*获取购物车列表*/
        cart.cartList(function (res) {
          _this.products = res.data;
          _this.products.forEach(function (item, index) {
            /*计算总金额*/
            _this.amount = +_this.amount + +item.amount;
            _this.amount = (Math.round(_this.amount * 100) / 100).toFixed(2);
          })
        })
      },
      getPackingAndDate(data, callback){
        /*获取包装规格和交货期*/
        var _this = this;
        product.packingAndDate(data, function (res) {
          _this.dates = res.data.weekDays;
          _this.formats = res.data.productSpecification;
          callback(_this.dates, _this.formats)
        })
      },
      del(id){
        /*删除购物车产品*/
        var _this = this;
        if (confirm('确认删除？')) {
          cart.cartDel(id, function (res) {
            _this.toast('删除成功')
            _this.getCartList();
          })
        }
      },
      edit(id, index){
        /*点击选择数量，将nowEditIndex设为当前编辑的index*/
        this.nowEditIndex = index;
        var _this = this;
        this.num = []
        this.getPackingAndDate({
          id: id,
          downPayment: this.products[this.nowEditIndex].deposit     //定金比例（30/100）
        }, function (dates, formats) {
          for (var i = 0; i < formats.length; i++) {
            _this.num.push({value: 0})
            for (var j = 0; j < _this.products[index].purchaseDetails.length; j++) {
              if (formats[i] == _this.products[index].purchaseDetails[j].specifications) {
                _this.formatIndex.push(i);
                _this.num[i].value = _this.products[index].purchaseDetails[j].num
              }
            }
          }
          for (var i = 0; i < dates.length; i++) {
            if (dates[i].weekDayTime == _this.products[index].shipmentTime) {
              _this.dateIndex = i;
            }
          }
        })
        this.cartShow = true;
      },
      dateSelect(index){
        /*点击交货期（选中）*/
        this.dateIndex = index;
      },
      formatSelect(index){
        /*点击包装规格（选中、取消）*/
        if (this.formatIndex.indexOf(index) >= 0) {
          this.formatIndex.splice(this.formatIndex.indexOf(index), 1);
        } else {
          this.formatIndex.push(index);
        }
      },
      changeNum(index){
        var _this = this;
        /*修改数量时，数量大于1直接选中，为0取消选中*/
        if (this.num[index].value && this.formatIndex.indexOf(index) < 0) {
          this.formatIndex.push(index);
        } else if (!this.num[index].value && this.formatIndex.indexOf(index) >= 0) {
          this.formatIndex.splice(this.formatIndex.indexOf(index), 1);
        }
      },
      cancel(){
        this.cartShow = false;
        this.dateIndex = '无';
        this.formatIndex = [];
        this.num.forEach(function (item) {
          item.value = 0;
        });
      },
      sure(){
        /*点击确定，修改购物车产品*/
        if (this.dateIndex == '无') {
          this.toast('请选择交货期')
          return
        }
        if (!this.formatIndex.length) {
          this.toast('请选择包装规格')
          return
        }
        var arr = [];
        for (var i = 0; i < this.formatIndex.length; i++) {
          var m = this.formatIndex[i]
          if (!this.num[m].value) {
            this.toast('请选择数量')
            return
          }
          var a = this.formats[m] + ';' + this.num[m].value;
          arr.push(a);
        }
        var params = {
          id: this.products[this.nowEditIndex].id,
          productId: this.products[this.nowEditIndex].productId,
          shipmentTimeId: this.dates[this.dateIndex].id,
          shipmentTime: this.dates[this.dateIndex].weekDayTime,
          unitPrice: this.dates[this.dateIndex].result,
          deposit: this.products[this.nowEditIndex].deposit,
          purchaseDetailsStr: JSON.stringify(arr)
        }
        var _this = this;
        cart.cartSave(params, function (res) {
          _this.getCartList();
          _this.cancel();
        })
      },
      confirm(){
        this.$router.push('/product/confirm')
      }
    },
    created(){
      this.getCartList();

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .addCart {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
  }

  .addCartInfo {
    width: 100%;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .num {
    width: 40px;
    height: 100%;
  }

  .btns {
    width: 100%;
    height: 50px;
    border-top: 1px solid #ccc;
    box-shadow: 0 -1px 2px #ccc;
    background: #fff;
  }
</style>
