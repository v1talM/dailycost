<template lang="html">
  <el-row type="flex" justify="space-between" class="day-cost-tags">
    <el-col :span="8">
        <div class="text-hg text-left segment date">
          <icon name="arrow-circle-left" width="2rem" height="2rem"></icon> {{ getDate}}
        </div>
    </el-col>
    <el-col :span="8">
      <div class="text-hg text-right segment cost">
        <icon name="yen" width="2rem" height="2rem"></icon> {{ costCount }}
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {mapState} from 'vuex'
import Dynamics from 'dynamics.js'
export default {
  computed: {
    ...mapState({
      isEditItem: state => state.items.isEditItem,
      items: state => state.items.items
   }),
   costCount () {
       var count = 0
       for (var i = 0; i < this.items.length; i++) {
           count = parseFloat(count) + parseFloat(this.items[i].cost)
       }
       return count.toFixed(2)
   },
   getDate () {
       var d = new Date()
       var month = d.getMonth() + 1
       var day = d.getDate()
       return month + '-' + day
   }
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
      const day_tags_height = $(".day-cost-tags").outerHeight()
      Dynamics.animate(document.querySelector('.day-cost-tags'), {
        translateY: - 119.563
      }, {
        type: Dynamics.spring,
        duration: 1500,
        frequency: 1,
        friction: 171
      })
    },
    retransformComponent () {
      const timeline_height = $(".timeline").outerHeight()
      Dynamics.animate(document.querySelector('.day-cost-tags'), {
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
  .day-cost-tags
    padding: 1rem 0
    .segment
      padding: 0 1rem
    .date
      display: flex
      justify-content: flex-start
    .cost
      display: flex
      justify-content: flex-end
</style>
