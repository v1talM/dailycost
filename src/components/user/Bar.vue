<template>
    <chart
      :options="bar"
      :init-options="initOptions"
      ref="bar"
      theme="ovilia-green"
      auto-resize
    />
</template>

<script>
    import getBar from '@/data/bar'
    import EChart from 'vue-echarts'
    import {mapState} from 'vuex'
    export default {
        name: "bar",
        data () {
            return {
                bar: {},
                initOptions: {
                    renderer: 'canvas'
                }
            }
        },
        components: {
            chart: EChart
        },
        computed: mapState({
            barType: state => state.common.barType,
            barValue: state => state.common.barValue
        }),
        mounted () {
            this.bar = getBar({items: this.barType, value: this.barValue})
            console.log(this.bar.series)
        }
    }
</script>

<style scoped>

</style>
