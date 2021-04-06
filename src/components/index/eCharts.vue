<template>
  <div>
    <el-card>
      <!-- echarts -->
      <div id="main" class="main"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  GridComponent,
  TooltipComponent
} from 'echarts/components'
import {
  LineChart
} from 'echarts/charts'
import {
  CanvasRenderer
} from 'echarts/renderers'
echarts.use(
  [TitleComponent, GridComponent, TooltipComponent, LineChart, CanvasRenderer]
)

export default {
  data () {
    return {}
  },
  mounted () {
    this.initCharts()
  },
  methods: {
    initCharts () {
      // 初始化echarts实例
      var mainContainer = document.getElementById('main')
      var bugChartContainer = function () {
        if (mainContainer) {
          mainContainer.style.height = '80vh'
        }
      }
      bugChartContainer()
      var myChart = echarts.init(mainContainer)
      // 绘制图表
      var option = {
        title: {
          text: '近日场地使用和预约情况',
          left: 'center',
          top: 10,
          textStyle: {
            fontWeight: 'bolder',
            fontSize: 24
          }
        },
        grid: {
          left: 140,
          top: 120,
          right: 180
        },
        xAxis: {
          name: '日期',
          nameTextStyle: {
            fontWeight: 'bolder',
            fontSize: 18
          },
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          name: '使用和预约次数',
          nameTextStyle: {
            fontWeight: 'bolder',
            fontSize: 18
          },
          type: 'value',
          min: function (value) {
            if (value.min < 5) return 0
            return value.min - 5
          },
          max: function (value) {
            return value.max + 5
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: <br/>共<b>{c}</b>人次'
        },
        series: [{
          type: 'line'
        }]
      }
      option && myChart.setOption(option)

      this.$axios.post('/index/collectDate')
        .then(res => {
          if (res.data.status === 200) {
            myChart.setOption({
              xAxis: {
                data: res.data.data.dateList
              },
              series: [{
                data: res.data.data.countList
              }]
            })
          }
        })
    }
  }
}

</script>

<style>
.mian {
  margin-top: 30px;
  margin-left: 30px;
}

</style>
