<template lang="html">
    <div class="drag-container"
    @mousedown="startDrag" @touchstart="startDrag"
    @mousemove="onDrag" @touchmove="onDrag"
    @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag">
      <div class="svg-container">
        <div class="svg-background">
        </div>
        <div class="svg-note">
          <div class="note" v-bind:style="{transform: 'translateY('+noteHeight+')'}">
            <div class="logo">
              <h1 class="text-hg logo-title">Daily Cost</h1>
            </div>
            <div class="item">
              <h3 class="text-lg item-title-notice">新增一条开销</h3>
            </div>
            <div class="item" v-for="item in items">
              <div class="text-lg item-title">
                <h3 >{{ item.type }}</h3>
                <h3>{{ item.cost }}</h3>
              </div>
            </div>
            <div class="item-types" v-show="isEditItem">
              <el-carousel indicator-position="outside" arrow="never" :autoplay="false" trigger="click">
                <el-carousel-item v-for="types in item_types" :key="types">
                  <div class="types-container">
                    <div class="column" v-for="column in types" :key="column">
                      <el-button v-for="(type, index) in column"
                        @click="setActive(type, $event)"
                        :key="type"
                        :class="{active: type.type == 'tag'}">
                        <icon :name="type.type" width="2rem" height="2rem"></icon>
                        <p class="text-xs">{{ type.name }}</p>
                      </el-button>
                    </div>
                    <div class="column">
                      <input type="text" class="note-input" :placeholder="'备注: ' + activeItem.name">
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
            <svg width="100%" height="2.4rem" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
             <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
             <g>
              <rect fill="none" id="canvas_background" height="27" width="100%" y="0" x="0"/>
              <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
               <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
              </g>
             </g>
             <g>
              <image xlink:href="data:image/png;base64,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" id="svg_1" height="27px" width="100%" y="0" x="0"/>
             </g>
            </svg>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
import Dynamics from 'dynamics.js/lib/dynamics.js'
import {mapState} from 'vuex'
import {item_types} from '@/env'
export default {
  data () {
    return {
      dragging: false,
      // quadratic bezier control point
      c: { x: 0, y: 0 },
      // record drag start point
      start: { x: 0, y: 0 },
      item_types: [],
      activeItem: {}
    }
  },
  mounted () {
    this.activeItem = { type: 'tag', name: '一 般' }
  },
  computed: {
    ...mapState({
      isEditItem: state => state.items.isEditItem,
      items: state => state.items.items
    }),
    noteHeight () {
      return this.c.y >= 180 ? '0': this.c.y - 180 + 'px'
    }
  },
  methods: {
    startDrag: function (e) {
        if(this.items[0]){
          return false;
        }
        e = e.changedTouches ? e.changedTouches[0] : e
        this.dragging = true
        this.start.x = e.pageX
        this.start.y = e.pageY
    },
    onDrag: function (e) {
      if(this.items[0]){
        return false;
      }
      e = e.changedTouches ? e.changedTouches[0] : e
      if (this.dragging) {
        this.c.x = 160 + (e.pageX - this.start.x)
        // dampen vertical drag by a factor
        var dy = e.pageY - this.start.y
        var dampen = dy > 0 ? 1.5 : 4
        this.c.y = dy / dampen
      }
    },
    stopDrag: function () {
      if(this.items[0]){
        return false;
      }
      if (this.dragging) {
        this.dragging = false
        const vm = this
        if(this.c.y >= 72){
          const item = { cost: '0' }
          this.$store.dispatch('pushItem', item);
          Dynamics.animate(this.c, {
            x: 0,
            y: 0
          }, {
            type: Dynamics.spring,
            duration: 700,
            friction: 300,
            complete: vm.editItem
          })
        }else{
          Dynamics.animate(this.c, {
            x: 0,
            y: 0
          }, {
            type: Dynamics.spring,
            duration: 700,
            friction: 700
          })
        }
      }
    },
    editItem () {
      this.item_types = item_types
      this.$store.dispatch('setEditItem', true)
      const height = $(".timeline").outerHeight() + $(".day-cost-tags").outerHeight()
      const drag_container = document.querySelector('.drag-container')
      Dynamics.animate(drag_container, {
        translateY: - height
      }, {
        type: Dynamics.spring,
        duration: 1500,
        frequency: 1,
        friction: 171
      })
    },
    setActive (type,e) {
     $(e.currentTarget).parent().siblings().children().removeClass('active')
     $(e.currentTarget).siblings().removeClass('active')
     $(e.currentTarget).addClass('active')
     this.activeItem = type
    }
  }
}
</script>

<style lang="sass">
  .drag-container
    padding: 0 1rem 1rem 1rem
    flex: 2
    z-index: 1000
    .svg-container
      padding: 1rem
      .svg-background
        margin: 0 -1rem
        border: .75rem solid #324057
        border-radius: 5rem
        padding: 1px 0
        background-color: #1F2D3D
      .svg-note
        position: relative
        top: calc(-.75rem - 1px)
        overflow: hidden
        .note
          width: 100%
          transform: translateY(-15rem)
          min-height: 15rem
          .logo
            height: 9rem
            background-color: #ffffff
            display: flex
            justify-content: center
            .logo-title
              display: flex
              align-self: center
              font-weight: 700
              color: #99A9BF
          .item
            border-top: 1px solid rgba(153, 169, 191, .25)
            height: 6rem
            background-color: #ffffff
            display: flex
            justify-content: center
            .item-title-notice
              padding: 0 1.4rem
              display: flex
              align-self: center
              font-weight: 500
              color: #99A9BF
              justify-content: space-between
            .item-title
              padding: 0 1.4rem
              display: flex
              font-weight: 500
              color: #99A9BF
              width: 100%
              justify-content: space-between
              h3
                display: flex
                align-self: center
          .item-types
            padding: .5rem
            background-color: #ffffff
            border-top: 1px solid rgba(153, 169, 191, .25)
            .types-container
              display: flex
              width: 100%
              align-content: space-between
              flex-wrap: wrap
              .column
                flex-basis: 100%
                display: flex
                justify-content: space-between
                .el-button+.el-button
                  margin: 0
                .el-button.active
                  background-color: #20a0ff
                  color: #ffffff
                .el-button
                  height: 5.5rem
                  line-height: 5.5rem
                  flex: 1
                  text-align: center
                  background-color: transparent
                  color: #8391a5
                  display: flex
                  flex-direction: column
                  justify-content: center
                  align-items: center
                  border: none
                  padding: 0
                  span
                    display: flex
                    flex-direction: column
                  svg
                    display: flex
                    align-self: center
                  p
                    line-height: initial
          svg
            margin-top: -6px

  .el-carousel__container
    height: 14rem
    animation: spread .3s linear
    .el-carousel__item
      display: flex
      justify-content: center
      align-content: center
      .note-input
        margin: 0 1.5rem
        padding: .25rem
        border: none
        display: flex
        flex: 1
        border-bottom: 1px solid #1F2D3D
        outline: none
        color: #8391a5
        font-size: 1.6rem
  @keyframes spread
    0%
      opacity: 0
      height: 0
    25%
      opacity: .25
      height: 3.5rem
    50%
      opacity: .5
      height: 7rem
    75%
      opacity: .75
      height: 10.5rem
    100%
      opacity: 1
      height: 14rem
</style>
