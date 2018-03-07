export default function getData(data) {
  return {
    tooltip: {},
    legend: {
      data: ['占比'],
      right: '10%',
    },
    grid: {
      width: window.innerWidth * 0.6
    },
    xAxis: {
      data: data.items
    },
    yAxis: {
      axisLabel: {show: true}
    },
    series: [{
      type: 'bar',
      name: '占比',
      data: data.value,
      center: ['33%', '40%'],
      itemStyle: {
          normal: {
            color: '#83bff6'
          }
      }
    }]
  }
}


