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
    }
}
</script>

<style lang="sass">
  .timeline
    flex: .25
</style>
