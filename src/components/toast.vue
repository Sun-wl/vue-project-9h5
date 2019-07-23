<template>
  <transition name="fade">
    <div class="fix-lt w-all h-all flex-column center" v-if="show">
      <div class="toast">{{title}}</div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: '',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0
  }
</style>
