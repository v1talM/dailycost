<template lang="html">
    <div id="myChart">

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                date: ['09-10', '09-11', '09-12', '09-13', '09-14', '09-15', '09-16'],
                datas: [0,0,0,0,0,0,0],
                myChart: null
            }
        },
        mounted () {
            var echarts = require('echarts');
            var c = document.getElementById('myChart')
            var myChart = echarts.init(c)
            this.myChart = myChart
            myChart.setOption({
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
