<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 2000

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
    chartData: {
      type: Object,
      required: true,
      default: {}
    }
  },
  data() {
    return {
      chart: null,
      date: []
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
      this.setDate()
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ orderNum } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.date,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: true
          }
        }],
        series: [{
          name: '订单数',
          type: 'bar',
          stack: 'vistors',
          barWidth: '50%',
          data: orderNum,
          animationDuration
        }]
      })
    },
    setDate() {
      for (let i = 6;i >= 0;i--) {
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
