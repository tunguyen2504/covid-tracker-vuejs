<template>
  <apexchart
    width="400"
    type="line"
    :options="chartOptions"
    :series="series"
    ref="lineChart"
  ></apexchart>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
// import { getSupportedLocales } from '../util/i18n/supported-locales'
import en from 'apexcharts/dist/locales/en.json'
import fr from 'apexcharts/dist/locales/fr.json'

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ['dataProps', 'type'],
  computed: {
    chartData() {
      return this.dataProps
    },
    language() {
      return this.$i18n.locale
    },
  },
  watch: {
    chartData() {
      this.buildData()
    },
    language() {
      this.updateLocale()
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'new-case-chart',
          defaultLocale: 'en',
          locales: [
            en,
            fr,
            // Define locale for Vietnamese
            {
              name: 'vi',
              options: {
                shortMonths: [
                  'Th1',
                  'Th2',
                  'Th3',
                  'Th4',
                  'Th5',
                  'Th6',
                  'Th7',
                  'Th8',
                  'Th9',
                  'Th10',
                  'Th11',
                  'Th12',
                ],
                toolbar: {
                  exportToSVG: 'Tải xuống tệp SVG',
                  exportToPNG: 'Tải xuống tệp PNG',
                  exportToCSV: 'Tải xuống tệp CSV',
                  menu: 'Menu',
                  selectionZoom: 'Kéo thả & Zoom',
                  zoomIn: 'Phóng to',
                  zoomOut: 'Thu nhỏ',
                  pan: 'Cuộn',
                  reset: 'Reset Zoom',
                },
              },
            },
          ],
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        stroke: {
          curve: 'straight',
          width: 2,
        },
        colors: ['#4a4a4a'],
        width: '1px',
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
      this.updateChart()
    },
    updateChart() {
      // These lines are used to prevent duplicated charts at first load
      if (this.series.length > 0) {
        this.series = []
      }
      this.series.push({
        name: this.$t('chart.title.' + this.type),
        data: this.lineChartData,
      })
      // till here
    },
    updateLocale() {
      this.$refs.lineChart.chart.setLocale(this.language)
      this.series = [
        {
          name: this.$t('chart.title.' + this.type),
        },
      ]
    },
  },
  mounted() {
    this.buildData()
  },
}
</script>
