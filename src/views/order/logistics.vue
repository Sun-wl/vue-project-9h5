<template>
  <div class="orderLogistics w-all flex-column bg-e">
    <div class="gap"></div>
    <div class="p-l-50 p-r-15 p-column-10 bg-f">
      <div class="line-30 font-16">运单编号：{{logistics.logisticCode}}</div>
      <div class="line-30 font-16" v-for="item in delicerys" v-if="logistics.shipperCode == item.value">
        配送企业：{{item.name}}
      </div>
    </div>
    <div class="gap"></div>
    <div class="span1 p-20 scroll-y bg-f" v-if="logistics.traces && logistics.traces.length">
      <div class="flex-column" v-for="(item,index) in logistics.traces">
        <div class="flex-row">
          <div class="w-30">
            <img class="lightCircle" v-if="index == 0" src="../../assets/img/progress.png" alt="">
            <div class="circle" v-else></div>
          </div>
          <div :class="[index == 0 ? 'font-color-theme font-16' : 'font-color-9', 'span1','line-25']">
            {{item.acceptStation}}
          </div>
        </div>
        <div class="flex-row">
          <div :class="[index == 0 ? 'lightLine' : '', index == logistics.length-1 ? 'lastLine' : '', 'line']"></div>
          <div :class="[index == 0 ? 'font-color-theme font-16' : 'font-color-9', 'p-column-10']">{{item.acceptTime}}
          </div>
        </div>
      </div>
    </div>
    <div class="text-center" v-else>暂无物流信息</div>
    <toast :show="toastShow" :title="toastText"></toast>
  </div>
</template>

<script>
  import order from '@/api/order'
  export default {
    name: 'orderLogistics',
    data () {
      return {
        logistics: {},
        id: ''
      }
    },
    methods: {
      getLogistics(){
        var _this = this;
        return order.orderLogistics(this.id, function (res) {
          _this.logistics = res.data;
        })
      }
    },
    created(){
      this.id = this.$route.params.id;
      this.getLogistics();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .circle {
    width: 10px;
    height: 10px;
    margin-top: 7px;
    margin-left: 2px;
    background-color: #CBCBCB;
    border-radius: 50%;
  }

  .lightCircle {
    width: 15px;
    margin-top: 5px;
  }

  .line {
    width: 23px;
    height: 60px;
    margin-left: 7px;
    border-left-width: 1px;
    border-left-style: solid;
    border-left-color: #CBCBCB;
  }

  .lastLine {
    border-left-color: #fff;
  }

  .lightLine {
    border-left-color: #1171af;
  }
</style>
