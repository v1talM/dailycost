<template lang="html">
  <div class="container">
    <day-lines class="timeline"></day-lines>
    <day-and-cost></day-and-cost>
    <day-notes></day-notes>
    <number-area></number-area>
  </div>
</template>

<script>
import DayLines from '@/components/index/DayLines'
import DayAndCost from '@/components/index/DayAndCost'
import DayNotes from '@/components/index/DayNotes'
import NumberArea from '@/components/index/NumberArea'
export default {
  components: {
    DayLines, DayAndCost, DayNotes, NumberArea
  }
}
</script>

<style lang="sass">
  .timeline
    flex: .25
</style>
