<template>
  <div class="area w-all bg-e">
    <div class="gap"></div>
    <div class="list">
      <div class="cell" @click="edit('add')">
        <div class="cell-large-left">
          <img class="img-18" src="../../assets/img/personalImg8.png" alt="">
        </div>
        <div class="cell-main font-15">新增地址</div>
      </div>
    </div>
    <div class="gap"></div>
    <div class="list" v-for="(area,index) in areas">
      <div class="border-bottom p-column-5" @click="selectArea(area)">
        <div class="flex-row p-row-20 w-all">
          <div class="span1 line-30 text-left font-15">{{area.receiveName}}</div>
          <div class="span1 line-30 text-right font-15">{{area.receiveMobile}}</div>
        </div>
        <div class="p-row-20 line-30 w-all font-15">
          地址：{{area.provinceName}}{{area.cityName}}{{area.address.split('-')[0]}}{{area.address.split('-')[1]}}
        </div>
      </div>
      <div class="cell">
        <div class="cell-large-left">
          <img class="img-18" src="../../assets/img/personalImg9.png" alt="" v-if="defaultValue == index"
               @click="defaultAreaChange(area.id,2)">
          <img class="img-18" src="../../assets/img/personalImg10.png" alt="" v-if="defaultValue != index"
               @click="defaultAreaChange(area.id,1)">
        </div>
        <div class="cell-main font-13">设为默认</div>
        <div class="cell-large-right">
          <div class="flex-row right">
            <div class="flex-row center m-r-20" @click="edit(area)">
              <img class="img-18 m-r-5" src="../../assets/img/personalImg11.png" alt="">
              <div class="cell-main font-13">编辑</div>
            </div>
            <div class="flex-row center" @click="del(area.id)">
              <img class="img-18 m-r-5" src="../../assets/img/personalImg12.png" alt="">
              <div class="cell-main font-13">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="gap"></div>
    </div>
  </div>
</template>

<script>
  import user from '@/api/user'
  export default {
    name: 'area',
    data () {
      return {
        defaultValue: 'noDdefaultValue',
        areas: [],
        params: {
          id: '',
          isDefault: false
        }
      }
    },
    methods: {
      getData(){
        var _this = this;
        user.areas(function (res) {
          _this.areas = res.data;
          _this.defaultValue = 'noDdefaultValue';
          _this.areas.forEach(function (item, index) {
            item.area = item.provinceName + item.cityName + item.address.split('-')[0] + item.address.split('-')[1]
            if (item.isDefault) {
              _this.defaultValue = index;
            }
          })
        })
      },
      defaultAreaChange(id, type){
        var _this = this;
        this.params.id = id;
        if (type == 1) {
          this.params.isDefault = true;
        } else {
          this.params.isDefault = false;
        }
        user.areaSave(this.params, function (res) {
          _this.getData();
        })
      },
      edit(area){
        if (area == 'add') {
          this.$router.push('/personal/areaSetting/add')
        } else {
          var a = {
            id: area.id,
            receiveName: area.receiveName,
            receiveMobile: area.receiveMobile,
            provinceName: area.provinceName,
            cityName: area.cityName,
            address: area.address,
            isDefault: area.isDefault
          }
          this.$router.push('/personal/areaSetting/' + JSON.stringify(a))
        }
      },
      del(id){
        if (confirm('确认删除？')) {
          var _this = this;
          user.areaDel(id, function (res) {
            _this.getData();
          })
        }
      },
      selectArea(area){
        /*点击选中收货地址，返回确认订单界面*/
        if (this.$route.params.index != 'no') {
          this.$store.commit('areaSave', {
            areaSelected: area,
            index: this.$route.params.index
          })
          this.$router.back();
        }
      }
    },
    created(){
      this.getData();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
