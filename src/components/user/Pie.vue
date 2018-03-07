<template>
    <chart
      :options="pie"
      :init-options="initOptions"
      ref="pie"
      auto-resize
    />
</template>

<script>
    import pie from '@/data/pie'
    import EChart from 'vue-echarts'
    import {mapState} from 'vuex'
    export default {
        name: "pie",
        components: {
            chart: EChart
        },
        computed: mapState({
            allData: state => state.common.allData
        }),
        data () {
            return {
              pie,
              initOptions : {
                  renderer: 'canvas'
              }
            }
        },
        mounted () {
            let data = this.getAllData()
            if (data.length) {
                this.pie.series[0].data = data
            }
        },
        methods: {
            getAllData () {
                let data = this.allData
                let source = []
                for (let i = 0; i < data.length; i++) {
                    if (source.indexOf(data[i].name) == "-1") {
                        source.push(data[i].name)
                    }
                }
                let res = []
                for (let i in source) {
                    let temp = {name: source[i], value: 0.0}
                    res.push(temp)
                }
                for (let i in data) {
                    for (let j in source) {
                        if (data[i].name == source[j]) {
                            res[j].value += parseFloat(data[i].cost)
                        }
                    }
                }
                let value = []
                for (let i in res) {
                    value.push(res[i].value)
                }
                this.$store.dispatch('setBarType', source)
                this.$store.dispatch('setBarValue', value)
                return res
            }
        }
    }
</script>

<style scoped>

</style>
