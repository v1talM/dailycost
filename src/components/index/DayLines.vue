<template lang="html">
  <el-row type="flex" justify="center">
    <el-col :span="24" class="container">
        <ichart></ichart>
    </el-col>
  </el-row>
</template>

<script>
import {mapState} from 'vuex'
import Dynamics from 'dynamics.js'
import ichart from '@/components/index/Charts.vue'
export default {
    components: {
        ichart
    },
  computed: {
        ...mapState({
          isEditItem: state => state.items.isEditItem
      })
  },
  watch: {
    isEditItem () {
      if(this.isEditItem){
        this.transformComponent()
      }else{
        this.retransformComponent()
      }
    }
  },
  methods: {
    transformComponent () {
      const timeline_height = $(".timeline").outerHeight()
      Dynamics.animate(document.querySelector('.timeline'), {
        translateY: - 71.5625
      }, {
        type: Dynamics.spring,
        duration: 1500,
        frequency: 1,
        friction: 171
      })
    },
    retransformComponent () {
      Dynamics.animate(document.querySelector('.timeline'), {
        translateY: 0
      }, {
        type: Dynamics.spring,
        duration: 1500,
        frequency: 1,
        friction: 171
      })
    }
  }
}
</script>

<style lang="sass">
  .container
    display: flex
    flex-flow: column
    width: 100%
</style>
