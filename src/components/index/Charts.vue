<template lang="html">
    <div id="myChart">

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        computed: mapState({
            items: state => state.items.items,
            isEditItem: state =>state.items.isEditItem,
            chartData: state => state.items.chartData
        }),
        data () {
            return {
                date: [],
                myChart: null
            }
        },
        watch: {
            isEditItem () {
                if (! this.isEditItem) {
                    var cost = 0;
                    for (var i = 0; i < this.items.length; i++) {
                        cost += parseFloat(this.items[i].cost)
                    }
                    this.myChart.setOption({
                        xAxis: {
                            show: true,
                            data: this.date,
                            axisPointer: {
                                show : true
                            }
                        },
                        backgroundColor: 'transparent',
                        yAxis: {
                            show: false,
                        },
                        series: [{
                            type: 'line',
                            data: this.chartData
                        }],
                        itemStyle: {
                            normal: {
                                // 设置折线的颜色
                                color: '#fff',
                            }
                        }
                    });
                }
            },
            chartData () {
                if (! this.isEditItem) {
                    var cost = 0;
                    for (var i = 0; i < this.items.length; i++) {
                        cost += parseFloat(this.items[i].cost)
                    }
                    this.myChart.setOption({
                        xAxis: {
                            show: true,
                            data: this.date,
                            axisPointer: {
                                show : true
                            }
                        },
                        backgroundColor: 'transparent',
                        yAxis: {
                            show: false,
                        },
                        series: [{
                            type: 'line',
                            data: this.chartData
                        }],
                        itemStyle: {
                            normal: {
                                // 设置折线的颜色
                                color: '#fff',
                            }
                        }
                    });
                }
            }
        },
        mounted () {
            var storage = window.localStorage
            var store = []
            for (var item in storage) {
                if (item.search('item') != -1) {
                    store.push(storage[item])
                }
            }
            var cost = 0;
            for (var i = 0; i < this.items.length; i++) {
                cost += parseFloat(this.items[i].cost)
            }
            var echarts = require('echarts');
            var c = document.getElementById('myChart')
            var myChart = echarts.init(c)
            this.myChart = myChart
            this.myChart.setOption({
                xAxis: {
                    show: false,
                    data: this.date,
                    axisPointer: {
                        show : true
                    }
                },
                backgroundColor: 'transparent',
                yAxis: {
                    show: false,
                },
                series: [{
                    type: 'line',
                    data: this.chartData
                }],
                itemStyle: {
                    normal: {
                        // 设置折线的颜色
                        color: '#fff',
                    }
                }
            });
        }
    }

</script>

<style lang="sass">
    #myChart
        width: 100%
        height: 100px
</style>
