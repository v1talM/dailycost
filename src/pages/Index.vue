<template lang="html">
  <div class="container" @mousedown="startDrag" @touchstart="startDrag"
  @mousemove="onDrag" @touchmove="onDrag"
  @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag">
    <day-lines class="timeline" v-show="! isEditItem || items.length < 3"></day-lines>
    <day-and-cost ></day-and-cost>
    <day-notes></day-notes>
    <number-area v-show="isEditItem"></number-area>

    <router-link :to="{ name: 'login', params: {} }" class="login-btn">
        <i class="el-icon-upload"></i>
    </router-link>

  </div>
</template>

<script>
import DayLines from '@/components/index/DayLines'
import DayAndCost from '@/components/index/DayAndCost'
import DayNotes from '@/components/index/DayNotes'
import NumberArea from '@/components/index/NumberArea'
import {mapState} from 'vuex'
export default {
    data () {
            return {
                dragging: false,
                // quadratic bezier control point
                c: { x: 0, y: 0 },
                // record drag start point
                start: { x: 0, y: 0 }
            }
    },
    computed: {
        ...mapState({
            isEditItem: state => state.items.isEditItem,
            items: state => state.items.items,
            date: state => state.items.date,
            chartData: state => state.items.chartData,
            first: state => state.items.first,
            last: state => state.items.last
        })
    },
    components: {
        DayLines, DayAndCost, DayNotes, NumberArea
    },
    created () {
        var date = this.getDate()
        var storage = 'items-'+date
        var items = window.localStorage.getItem(storage)
        items = JSON.parse(items) || []
        this.$store.dispatch('initItems', items)
        this.initChartData()
    },
    methods: {
        getDate () {
            var d = new Date()
            this.$store.dispatch('setDate', d)
            var month = d.getMonth() + 1
            var day = d.getDate()
            return month + '-' + day
        },
        startDrag: function (e) {
            e = e.changedTouches ? e.changedTouches[0] : e
            this.dragging = true
            this.start.x = e.pageX
            this.start.y = e.pageY
        },
        onDrag: function (e) {
          e = e.changedTouches ? e.changedTouches[0] : e
          if (this.dragging) {
            // dampen vertical drag by a factor
            this.c.x = e.pageX - this.start.x
          }
        },
        stopDrag: function () {
          if (this.dragging) {
            this.dragging = false
            if (!this.isEditItem) {
                if (this.c.x < -150) {
                    this.addDay()
                    this.c.x = 0
                }else if (this.c.x > 150) {
                    this.delDay()
                    this.c.x = 0
                }
            }
          }
        },
        addDay () {
                var date = new Date(this.date)
                date.setDate(date.getDate() + 1)
                this.$store.dispatch('setDate', date)
                var month = date.getMonth() + 1
                var day = date.getDate()
                var items = window.localStorage.getItem('items-'+ month + '-' + day)
                items = JSON.parse(items) || []
                this.$store.dispatch('initItems', items)

                this.setLastDate(this.last)
          },
        delDay () {
              var date = new Date(this.date)
              date.setDate(date.getDate() - 1)
              this.$store.dispatch('setDate', date)
              var month = date.getMonth() + 1
              var day = date.getDate()
              var items = window.localStorage.getItem('items-'+ month + '-' + day)
              items = JSON.parse(items) || []
              this.$store.dispatch('initItems', items)

             this.setFirstDate(this.first)
          },
         initChartData () {
             let date = this.getWeeks()
             let costs = []
             for (var item in date) {
                 let storage = 'items-' + date[item]
                 let store = window.localStorage.getItem(storage)
                 costs.push(this.getCost(store))
             }
             this.$store.dispatch('setChartData', costs)
         },
         getWeeks () {
             var date = new Date();
             var month = date.getMonth() + 1
             var day = date.getDate()
             //获取前3天日期
             date.setDate(date.getDate() - 3)
             var past3 = date.getMonth() + 1 + '-' + date.getDate()
             this.$store.dispatch('setChartDateFirst', new Date(date))
             //获取前2天日期
             date.setDate(date.getDate() + 1)
             var past2 = date.getMonth() + 1 + '-' + date.getDate()
             //获取前1天日期
             date.setDate(date.getDate() + 1)
             var past1 = date.getMonth() + 1 + '-' + date.getDate()
              //获得当前日期
              date.setDate(date.getDate() + 1)
              var today = date.getMonth() + 1 + '-' + date.getDate()
              //获取后1天日期
              date.setDate(date.getDate() + 1)
              var future1 = date.getMonth() + 1 + '-' + date.getDate()
              //获取后2天日期
              date.setDate(date.getDate() + 1)
              var future2 = date.getMonth() + 1 + '-' + date.getDate()
              //获取后3天日期
              date.setDate(date.getDate() + 1)
              var future3 = date.getMonth() + 1 + '-' + date.getDate()
              this.$store.dispatch('setChartDateLast', new Date(date))
              //返回日期
              var date = [past3, past2, past1, today, future1, future2, future3]
              return date
         },
         getCost (data) {
                if (data == null) {
                    return 0
                }
                var res = JSON.parse(data)
                var cost = 0
                for (var item in res) {
                    cost += parseFloat(res[item].cost)
                }
                return cost
         },
         setLastDate (last) {
             var date = new Date(last)
             date.setDate(date.getDate() + 1)
             var first = new Date(last)
             first.setDate(first.getDate() - 5)
             this.$store.dispatch('setChartDateLast', date)
             this.$store.dispatch('setChartDateFirst', first)
             var month = date.getMonth() + 1
             var day = date.getDate()
             var storage = 'items-' + month + '-' + day
             var store = window.localStorage.getItem(storage)
             var cost = this.getCost(store)

             var chartData = this.chartData
             var newChartData = []
             for (var index in chartData) {
                 newChartData.push(chartData[index])
             }
             newChartData.shift()
             newChartData.push(cost)
             this.$store.dispatch('setChartData', newChartData)
         },
         setFirstDate (first) {
             var date = new Date(first)
             date.setDate(date.getDate() - 1)
             var last = new Date(first)
             last.setDate(last.getDate() + 5)
             this.$store.dispatch('setChartDateFirst', date)
             this.$store.dispatch('setChartDateLast', last)
             var month = date.getMonth() + 1
             var day = date.getDate()
             var storage = 'items-' + month + '-' + day
             var store = window.localStorage.getItem(storage)
             var cost = this.getCost(store)

             var chartData = this.chartData
             var newChartData = []
             for (var index in chartData) {
                 newChartData.push(chartData[index])
             }
             newChartData.pop()
             newChartData.unshift(cost)
             this.$store.dispatch('setChartData', newChartData)
         }
    }
}
</script>

<style lang="sass">
  .timeline
    flex: .25
  .login-btn
      position: fixed
      width: 2.5rem
      height: 2.5rem
      bottom: 1rem
      left: 1rem
      padding: .5rem
      border-radius: 50%
      font-size: 2rem
      z-index: 1000
</style>
