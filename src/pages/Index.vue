<template lang="html">
  <div class="container">
    <day-lines class="timeline" v-show="! isEditItem || items.length < 3"></day-lines>
    <day-and-cost ></day-and-cost>
    <day-notes></day-notes>
    <number-area v-show="isEditItem"></number-area>
  </div>
</template>

<script>
import DayLines from '@/components/index/DayLines'
import DayAndCost from '@/components/index/DayAndCost'
import DayNotes from '@/components/index/DayNotes'
import NumberArea from '@/components/index/NumberArea'
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            isEditItem: state => state.items.isEditItem,
            items: state => state.items.items
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
    },
    methods: {
        getDate () {
            var d = new Date()
            var month = d.getMonth() + 1
            var day = d.getDate()
            return month + '-' + day
        }
    }
}
</script>

<style lang="sass">
  .timeline
    flex: .25
</style>
