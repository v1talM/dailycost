<template lang="html">
  <div class="number-pad-container">
    <div class="number-area">
      <div class="column" v-for="column in numberPad">
        <div class="cell" v-for="number in column" @click="numberClick(number)">
          {{ number }}
        </div>
      </div>
    </div>
    <div class="operation-area">
      <div class="cell" style="justify-content: flex-end" v-show="! hasNumbers">
        <icon name="line-chart" width="3.5rem" height="3.5rem"></icon>
      </div>
      <div class="cell" style="justify-content: flex-start" v-show="! hasNumbers">
        <p>收 入</p>
      </div>
      <div class="cell" v-show="hasNumbers" @click="costIncrease()">
        <icon name="plus" width="2.5rem" height="2.5rem"></icon>
      </div>
      <div class="cell" v-show="hasNumbers" @click="costDecrease()">
        <icon name="minus" width="2.5rem" height="2.5rem"></icon>
      </div>
      <div class="cell" @click="deleteItemCost()">
        <icon name="undo" width="2.5rem" height="2.5rem"></icon>
      </div>
      <div class="cell">
        <icon class="text-danger" name="remove" width="2.5rem" height="2.5rem"></icon>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      numberPad: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [null, 0, '.']
      ],
      dot: false
    }
  },
  computed: {
    ...mapState({
      items: state => state.items.items
    }),
    hasNumbers () {
      if(this.items[0] == null || this.items[0].cost === '0')
        return false
      else {
        return true
      }
    }
  },
  methods: {
    numberClick (number) {
      if(number === '.'){
        if(this.dot){
          return false
        }else{
          this.dot = true
          this.$store.dispatch('setItemCost', number)
        }
      }else{
        if(number !== null){
          this.$store.dispatch('setItemCost', number)
        }
      }
    },
    deleteItemCost () {
      const op = this.items[0].cost
      if(op.charAt(op.length - 1) === '.'){
        this.dot = false
      }
      this.$store.dispatch('delItemCost')
    },
    costIncrease () {
      this.dot = false
      this.$store.dispatch('setItemCost', '+')
    }
  }
}
</script>

<style lang="sass">
  .number-pad-container
    background: linear-gradient(to bottom, rgba(0, 0, 0, .1) 0%,rgba(0, 0, 0, .8) 100%)
    position: fixed
    bottom: 0
    width: 100%
    display: flex
    z-index: 1000
    .operation-area
      display: flex
      flex: 1
      padding: 1rem 1rem 1rem 0
      flex-direction: column
      justify-content: flex-start
      align-items: center
      .cell
        flex-direction: column
        flex-basis: 100%
        display: flex
        font-size: 1.5rem
        font-weight: bold
        color: #ffffff
        align-items: center
        justify-content: center
    .number-area
      display: flex
      align-content: space-between
      flex-wrap: wrap
      padding: 1rem
      flex: 3
      .column
        flex-basis: 100%
        display: flex
        justify-content: space-between
        .cell
          width: 5rem
          height: 6rem
          display: flex
          font-size: 2rem
          font-weight: bold
          color: #ffffff
          align-items: center
          justify-content: center

</style>
