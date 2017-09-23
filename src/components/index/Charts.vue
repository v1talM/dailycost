<template lang="html">
    <div id="myChart">

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        computed: mapState({
            items: state => state.items.items,
            isEditItem: state =>state.items.isEditItem
        }),
        data () {
            return {
                date: ['09-10', '09-11', '09-12', '09-13', '09-14', '09-15', '09-16'],
                datas: [0,0,0,0,0,0,0],
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
                    this.datas[3] = cost
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
                            data: this.datas
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
            var cost = 0;
            for (var i = 0; i < this.items.length; i++) {
                cost += parseFloat(this.items[i].cost)
            }
            this.datas[3] = cost
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
                    data: this.datas
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
