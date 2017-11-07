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
              <div class="" @click="removeItem()">
                  <icon v-show="items[0] && items[0].cost === '0'" class="text-danger" name="remove" width="2.5rem" height="2.5rem"></icon>
              </div>
            <div class="" @click="calc()">
                <icon  v-show="needCheck && hasChecked" class="text-primary"  name="check" width="2.5rem" height="2.5rem"></icon>
            </div>
            <div class="" @click="tagged()">
                <icon v-show="isMarked && hasChecked"  class="text-primary"  name="bookmark-o" width="2.5rem" height="2.5rem"></icon>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Dynamics from 'dynamics.js/lib/dynamics.js'
import swal from 'sweetalert2'
export default {
  data () {
    return {
      numberPad: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [null, 0, '.']
      ],
      dot: false,
      isMarked: false,
      needCheck: true
    }
  },
  mounted () {
      const height = $(".number-pad-container").outerHeight()
      const number_pad_container = document.querySelector('.number-pad-container')
      Dynamics.animate( number_pad_container, {
        translateY:  height
      }, {
        type: Dynamics.spring,
        duration: 1500,
        frequency: 1,
        friction: 171
      })
  },
  watch: {
      isEditItem () {
          const height = $(".number-pad-container").outerHeight()
          const number_pad_container = document.querySelector('.number-pad-container')
          if(this.isEditItem === true){
              Dynamics.animate( number_pad_container, {
                translateY:  0
              }, {
                type: Dynamics.spring,
                duration: 1500,
                frequency: 1,
                friction: 171
              })
          }else{
              Dynamics.animate( number_pad_container, {
                translateY:  height
              }, {
                type: Dynamics.spring,
                duration: 1500,
                frequency: 1,
                friction: 171
              })
          }
      }
  },
  computed: {
    ...mapState({
      items: state => state.items.items,
      isEditItem: state => state.items.isEditItem,
      date: state => state.items.date
    }),
    hasNumbers () {
      if(this.items[0] == null || this.items[0].cost == '0' ){
        this.isMarked = false
        return false
      }else {
        return true
      }
    },
    hasChecked () {
        var op = this.items[0]
        if(op == null || op.cost == 0)
            return false
        var reg = /[\+|\-|\.]/
        if(reg.test(op.cost.charAt(op.cost.length - 1))){
            this.isMarked = false
            return false
        }else{
            return true
        }
    }
  },
  methods: {
    numberClick (number) {
        if(this.isMarked){
            return false;
        }
        const op = this.items[0].cost
        this.needCheck = true
        if(number === '.'){
            if(this.dot){
                return false
            }else if(op.charAt(op.length - 1) == '+' || op.charAt(op.length - 1) == '-'){
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
        const op = this.items[0].cost
        if(op.charAt(op.length - 1) == '+' || op.charAt(op.length - 1) == '-' || op.charAt(op.length - 1) == '.'){
            return false
        }else{
            this.dot = false
            this.$store.dispatch('setItemCost', '+')
        }

    },
    costDecrease () {
        const op = this.items[0].cost
        if(op.charAt(op.length - 1) == '+' || op.charAt(op.length - 1) == '-' || op.charAt(op.length - 1) == '.'){
            return false
        }else{
            this.dot = false
            this.$store.dispatch('setItemCost', '-')
        }
    },
    calc () {
        const op = this.items[0].cost
        const vm = this
        try{
            eval(op)
        }catch(err){
            swal('','请输入正确的数字!','error')
            return false
        }
        this.isMarked = true
        this.needCheck = false
        this.$store.dispatch('calCost')
    },
    tagged () {
        this.dot = false
        this.$store.dispatch('commitType')
        this.$store.dispatch('setEditItem', false)
        var date = this.getDate()
        var items = []
        for (var i = 0; i < this.items.length; i++) {
            var item = {
                cost: this.items[i].cost,
                type: this.items[i].type,
                name: this.items[i].name
            }
            items.push(item)
        }
        var storage = 'items-' + date;
        window.localStorage.setItem(storage, JSON.stringify(items))
    },
    getDate () {
        var d = new Date(this.date)
        var month = d.getMonth() + 1
        var day = d.getDate()
        return month + '-' + day
    },
    removeItem () {
        this.$store.dispatch('popItem')
        this.$store.dispatch('setEditItem', false)
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
    z-index: 1001
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
