<template>
  <div class="personal span1 bg-e">
    <div class="personalBg"></div>
    <div class="list">
      <div class="cell-large" @click="jump('/personal/info')">
        <div class="cell-large-left">
          <img class="img-20" src="../../assets/img/personalImg1.png" alt="">
        </div>
        <div class="cell-main font-16">企业资料</div>
        <div class="cell-right">
          <img class="img-18" src="../../assets/img/to.png" alt="">
        </div>
      </div>
      <div class="cell-large" @click="jump('/personal/area/no')">
        <div class="cell-large-left">
          <img class="img-20" src="../../assets/img/personalImg2.png" alt="">
        </div>
        <div class="cell-main font-16">企业地址</div>
        <div class="cell-right">
          <img class="img-18" src="../../assets/img/to.png" alt="">
        </div>
      </div>
      <div class="cell-large" @click="jump('/personal/count')">
        <div class="cell-large-left">
          <img class="img-20" src="../../assets/img/personalImg3.png" alt="">
        </div>
        <div class="cell-main font-16">采购统计</div>
        <div class="cell-right">
          <img class="img-18" src="../../assets/img/to.png" alt="">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {}
    },
    methods: {},
    created(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .personalBg {
    height: 200px;
    background-color: #fff;
    background-image: url("../../assets/img/personalImg.png");
    background-size:cover;
  }
</style>
