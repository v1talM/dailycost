<template lang="html">
  <div class="container">
    <day-lines class="timeline"></day-lines>
    <day-and-cost></day-and-cost>
    <day-notes></day-notes>
  </div>
</template>

<script>
import DayLines from '@/components/index/DayLines'
import DayAndCost from '@/components/index/DayAndCost'
import DayNotes from '@/components/index/DayNotes'
export default {
  components: {
    DayLines, DayAndCost, DayNotes
  }
}
</script>

<style lang="sass">
  .timeline
    flex: 1
</style>
