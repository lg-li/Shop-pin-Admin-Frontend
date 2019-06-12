<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true,
        default: {}
      }
    },
    data() {
      return {
        chart: null,
        date:[]
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.setDate()
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      },
      setOptions({ commentNum, viewNum } = {}) {

        this.chart.setOption({
          xAxis: {
            data: this.date,
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['评论数', '浏览数']
          },
          series: [{
            name: '评论数', itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: commentNum,
            animationDuration: 2000,
            animationEasing: 'cubicInOut'
          },
            {
              name: '浏览数',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data: viewNum,
              animationDuration: 2000,
              animationEasing: 'quadraticOut'
            }]
        })
      },
      setDate() {
        for (let i = 7;i >= 1;i--) {
          this.date.push(this.getDay(i))
        }
      },
      getDay(day) {
        var today = new Date()
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * day
        today.setTime(targetday_milliseconds)
        var tMonth = today.getMonth()
        var tDate = today.getDate()
        tMonth = tMonth + 1
        return tMonth + '-' + tDate
      }
    }
  }
</script>
