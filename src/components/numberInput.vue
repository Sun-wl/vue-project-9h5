<template>
  <div class="border radius-5 flex-row" style="height: 27px;">
    <div class="border-right w-30 flex-column center" @click="_reduce">
      <img class="w-10" src="../assets/img/reduce.png" alt="">
    </div>
    <div class="w-70 font-0">
      <input class="cell-input text-center" type="number" placeholder="0" :value="value"
             ref="input" @input="inputNum($event.target.value)" @change="inputNum($event.target.value)">
    </div>
    <div class="border-left w-30 flex-column center" @click="_add">
      <img class="w-10" src="../assets/img/add.png" alt="">
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: ['value'],
    data: function () {
      return {}
    },
    methods: {
      _reduce: function ($event) {
        var formattedValue = this.$refs.input.value.trim();
        if(formattedValue > 0){
          formattedValue--;
        }
        if (formattedValue !== this.$refs.input.value) {
          this.$refs.input.value = formattedValue;
        }
        // 通过 input 事件发出数值
        this.$emit('input', Number(formattedValue))
      },
      _add: function ($event) {
        var formattedValue = this.$refs.input.value.trim();
        formattedValue++;
        if (formattedValue !== this.$refs.input.value) {
          this.$refs.input.value = formattedValue;
        }
        // 通过 input 事件发出数值
        this.$emit('input', Number(formattedValue))
      },
      inputNum: function (value) {
        var formattedValue = value
        // 删除两侧的空格符
          .trim()
          // 保留正整数
          .slice(value.indexOf('-') === -1 ? 0 : 1, value.indexOf('.') === -1 ? value.length : value.indexOf('.'));
        // 如果值不统一，手动覆盖以保持一致
        if (formattedValue !== value) {
          this.$refs.input.value = formattedValue;
        }
        // 通过 input 事件发出数值
        this.$emit('input', Number(formattedValue))
      }

    },
    created: function () {

    }
  }
</script>
<style>

</style>
