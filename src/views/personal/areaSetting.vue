<template>
  <div class="personalAreaSetting w-all bg-e">
    <div class="gap"></div>
    <div class="list">
      <div class="cell">
        <div class="cell-large-left">
          <img class="img-20" src="../../assets/img/personalImg5.png" alt="">
        </div>
        <div class="cell-title">联系人</div>
        <div class="cell-main p-r-20">
          <input class="cell-input" type="text" v-model="params.receiveName">
        </div>
      </div>
      <div class="cell">
        <div class="cell-large-left">
          <img class="img-20" src="../../assets/img/personalImg6.png" alt="">
        </div>
        <div class="cell-title">手机号码</div>
        <div class="cell-main p-r-20">
          <input class="cell-input" type="tel" v-model="params.receiveMobile">
        </div>
      </div>
      <div class="cell">
        <div class="p-row-20 p-t-2">
          <img class="img-20" src="../../assets/img/personalImg2.png" alt="">
        </div>
        <div class="cell-title">所在地区</div>
        <div class="cell-main">{{selected[0]}}{{selected[1]}}{{selected[2]}}</div>
        <div class="p-row-10 p-t-3">
          <img class="img-18" src="../../assets/img/pulldown.png" alt="" @click="openAreaSelect">
        </div>
      </div>
      <div class="cell">
        <div class="w-60"></div>
        <div class="span1 p-r-20">
          <textarea class="cell-textarea" placeholder="输入详细地址" v-model="addrDetail"></textarea>
        </div>
      </div>
    </div>
    <div class="p-row-50 p-t-60">
      <button @click="submit">确认</button>
    </div>

    <div class="fix-lb w-all bg-f" v-show="areaShow">
      <div class="flex-row p-row-20 p-column-10 border-bottom">
        <div class="span1 text-left font-16 font-color-9" @click="cancel">取消</div>
        <div class="span1 text-right font-16 font-color-theme" @click="sure">确定</div>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </div>
  </div>
</template>

<script>
  import user from '@/api/user'
  import AMap from 'AMap'
  export default {
    name: 'personalAreaSetting',
    data () {
      return {
        addrDetail: '',
        areaShow: false,
        provinces: [],
        citys: [],
        districts: [],
        values: [0, 0, 0],
        slots: [
          {flex: 1, values: [], className: 'slot1', textAlign: 'center', defaultIndex: 0},
          {flex: 1, values: [], className: 'slot2', textAlign: 'center', defaultIndex: 0},
          {flex: 1, values: [], className: 'slot3', textAlign: 'center', defaultIndex: 0}
        ],
        picker: '',
        selected: [],          //当前确定选中
        params: {
          id: '',
          provinceName: '',
          cityName: '',
          address: '',
          receiveName: '',
          receiveMobile: '',
          isDefault: false
        }

      }
    },
    methods: {
      getProvinces(){
        /*获取省市区3级，给picker设置数据*/
        var _this = this;
        AMap.service('AMap.DistrictSearch', function () {//回调函数
          //实例化DistrictSearch
          var districtSearch = new AMap.DistrictSearch({
            level: 'country',
            subdistrict: 3
          });
          districtSearch.search('中国', function (status, result) {
            _this.provinces = result.districtList[0].districtList;
            _this.getCitys(0);
            _this.getDistricts(0);
            _this.values[0] = 0;
            var province = _this.provinces.length ? _this.provinces.map(function (item) {
                return item.name
              }) : [];
            _this.picker.setSlotValues(0, province);
            _this.picker.setValues(_this.selected)
          })
        })
      },
      getCitys(index){
        /*根据省份修改城市*/
        if (this.provinces[index]) {
          this.citys = this.provinces[index].districtList || [];
          var arr = [];
          if (this.citys.length) {
            for (var i = 0; i < this.citys.length; i++) {
              arr[i] = this.citys[i].name;
            }
          }
          this.picker.setSlotValues(1, arr);
          this.values[1] = 0;
          this.values[2] = 0;
        }
      },
      getDistricts(index){
        /*根据城市修改区域*/
        if (this.citys[index]) {
          this.districts = this.citys[index].districtList || [];
          var arr = [];
          if (this.districts.length) {
            for (var i = 0; i < this.districts.length; i++) {
              arr[i] = this.districts[i].name;
            }
          }
          this.picker.setSlotValues(2, arr);
          this.values[2] = 0;
        }
      },
      onValuesChange(picker, values){
        /*picker滚动时，修改值进行级联滚动*/
        this.picker = picker;
        var _this = this;
        if (picker.getSlotValues(0) && picker.getSlotValues(0).length) {
          this.values[0] = picker.getSlotValues(0).indexOf(values[0]);
          this.getCitys(this.values[0]);
        } else {
          this.values[0] = undefined;
          this.values[1] = undefined;
          this.values[2] = undefined;
          this.picker.setSlotValues(1, []);
          this.picker.setSlotValues(2, []);
        }

        if (picker.getSlotValues(1) && picker.getSlotValues(1).length && picker.getSlotValues(1).indexOf(values[1]) >= 0) {
          this.values[1] = picker.getSlotValues(1).indexOf(values[1]);
          this.getDistricts(this.values[1]);
        } else {
          this.values[1] = undefined;
          this.values[2] = undefined;
          this.picker.setSlotValues(2, []);
        }

        if (picker.getSlotValues(2) && picker.getSlotValues(2).length) {
          this.values[2] = picker.getSlotValues(2).indexOf(values[2]);
        } else {
          this.values[2] = undefined;
        }

      },
      openAreaSelect(){
        this.areaShow = true;
      },
      cancel(){
        this.areaShow = false;
      },
      sure(){
        /*点击确定选中地址，将地址存入this.selected*/
        this.areaShow = false;
        this.selected[0] = ''
        this.selected[1] = ''
        this.selected[2] = ''
        for (var i = 0; i < this.provinces.length; i++) {
          if (i == this.values[0]) {
            this.selected[0] = this.provinces[i].name
          }
        }
        if (this.citys.length) {
          for (var i = 0; i < this.citys.length; i++) {
            if (i == this.values[1]) {
              this.selected[1] = this.citys[i].name
            }
          }
          if (this.districts.length) {
            for (var i = 0; i < this.districts.length; i++) {
              if (i == this.values[2]) {
                this.selected[2] = this.districts[i].name
              }
            }
          } else {
            this.selected[2] = ''
          }
        } else {
          this.selected[1] = ''
          this.selected[2] = ''
        }
      },
      submit(){
        /*保存地址*/
        if (!this.params.receiveName) {
          alert("请输入联系人")
          return
        }
        if (!this.params.receiveMobile) {
          alert("请输入手机号码")
          return
        }
        if (!/^1[345678]\d{9}$/.test(this.params.receiveMobile)) {
          alert("请输入正确的手机号")
          return
        }
        if (!this.selected[0] && !this.selected[1] && !this.selected[2]) {
          alert("请选择所在地区")
          return
        }
        if (!this.addrDetail) {
          alert("请输入详细地址")
          return
        }
        this.params.provinceName = this.selected[0];
        this.params.cityName = this.selected[1];
        this.params.address = this.selected[2] + '-' + this.addrDetail;
        var _this = this;
        user.areaSave(this.params, function (res) {
          _this.$router.push('/personal/area/no')
        })

      }
    },
    created(){
      if (this.$route.params.area != 'add') {
        var area = JSON.parse(this.$route.params.area)
        this.params.id = area.id;
        this.params.receiveName = area.receiveName;
        this.params.receiveMobile = area.receiveMobile;
        this.selected = [area.provinceName, area.cityName, area.address.split('-')[0]];
        this.addrDetail = area.address.split('-')[1];
        this.params.isDefault = area.isDefault;
      }
      this.selected.length = 3;
    },
    mounted(){
      this.getProvinces();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
