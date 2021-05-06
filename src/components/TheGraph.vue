<template>
  <apexchart
    width="400"
    type="line"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ['dataProps', 'type'],
  computed: {
    chartData() {
      return this.dataProps
    },
  },
  watch: {
    chartData() {
      this.buildData()
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'new-case-chart',
        },
        xaxis: {
          type: 'datetime',
        },
        colors: ['#CC1034']
      },
      series: [],
      lineChartData: [],
    }
  },
  methods: {
    buildData() {
      console.log('buildData')
      console.log(this.chartData)
      this.lineChartData = []
      var lastDataPoint = null
      for (var date in this.chartData) {
        if (lastDataPoint) {
          var newDataPoint = {
            x: date,
            y: this.chartData[date] - lastDataPoint,
          }
          this.lineChartData.push(newDataPoint)
        }
        lastDataPoint = this.chartData[date]
      }
      console.log(this.lineChartData)
      this.series = [
        {
          name: 'New cases',
          data: this.lineChartData,
        },
      ]
    },
  },
  mounted() {
    this.buildData()
  },
}
</script>
