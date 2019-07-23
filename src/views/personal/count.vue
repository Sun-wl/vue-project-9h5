<template>
    <div class="count w-all">
      <div class="gap"></div>
      <div class="p-b-50">
        <div v-if="three.length">
          <div class="border-bottom p-15">
            <div class="title font-16 p-l-15">近三个月采购</div>
          </div>
          <div class="p-l-50">
            <div class="border-bottom p-column-15 flex-row" v-for="item in three">
              <div class="font-color-9 line-18 span1 font-13">{{item.metalTypeName}}</div>
              <div class="font-color-9 line-18 span1 font-13">总量：{{item.threeTotal}}kg</div>
              <div class="font-color-9 line-18 span1 font-13">均价：￥{{ (Math.round(item.threeUnitPrice * 100) / 100).toFixed(2) }}</div>
            </div>
          </div>
        </div>
        <div v-if="six.length">
          <div class="border-bottom p-15">
            <div class="title font-16 p-l-15">近六个月采购</div>
          </div>
          <div class="p-l-50">
            <div class="border-bottom p-column-15 flex-row" v-for="item in six">
              <div class="font-color-9 line-18 span1 font-13">{{item.metalTypeName}}</div>
              <div class="font-color-9 line-18 span1 font-13">总量：{{item.sixTotal}}kg</div>
              <div class="font-color-9 line-18 span1 font-13">均价：￥{{ (Math.round(item.sixUnitPrice * 100) / 100).toFixed(2) }}</div>
            </div>
          </div>
        </div>
        <div v-if="companyTotal.length">
          <div class="border-bottom p-15">
            <div class="title font-16 p-l-15">久岳全体客户采购总量</div>
          </div>
          <div class="p-l-50">
            <div class="border-bottom p-column-15 flex-row" v-for="item in companyTotal">
              <div class="font-color-9 line-18 span1 font-13">{{item.name}}</div>
              <div class="font-color-9 line-18 span1 font-13">总量：{{item.value}}kg</div>
              <div class="font-color-9 line-18 span1 font-13">均价：￥{{ (Math.round((+item.description) * 100) / 100).toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import order from '@/api/order'
    export default {
        name: 'count',
        data () {
            return {
              three:[],
              six:[],
              companyTotal:[],
            }
        },
        methods: {
          getMetal(){
              var _this = this;
              return order.orderMetal(function (res) {
                _this.three = res.data.sixOrThree.three;
                _this.six = res.data.sixOrThree.six;
                _this.companyTotal = res.data.companyTotal;
              })
          }
        },
        created(){
          this.getMetal();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title{
    border-left:3px solid #1171af;
    line-height:18px;
  }
</style>
