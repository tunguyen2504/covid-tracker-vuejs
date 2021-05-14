<template>
  <div>
    <h3 className="app-graph-title">
      {{
        selectedCountry.code === 'WW' ? $t('common.worldwide') : selectedCountry.name
      }}
      - {{ chartTitleType }}
    </h3>
    <apexchart
      type="line"
      :options="chartOptions"
      :series="series"
      ref="lineChart"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import en from 'apexcharts/dist/locales/en.json'
import fr from 'apexcharts/dist/locales/fr.json'

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ['dataProps', 'selectedCountry', 'type'],
  computed: {
    chartData() {
      return this.dataProps
    },
    language() {
      return this.$i18n.locale
    },
    chartTitleType() {
      return this.$t('chart.title', { type: 'common.type.' + this.type })
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
    var self = this
    return {
      chartOptions: {
        chart: {
          id: 'new-case-chart',
          defaultLocale: this.$i18n.locale,
          locales: [
            en,
            fr,
            // Define locale for Vietnamese
            {
              name: 'vi',
              options: {
                shortMonths: [
                  'Tháng 1',
                  'Tháng 2',
                  'Tháng 3',
                  'Tháng 4',
                  'Tháng 5',
                  'Tháng 6',
                  'Tháng 7',
                  'Tháng 8',
                  'Tháng 9',
                  'Tháng 10',
                  'Tháng 11',
                  'Tháng 12',
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
        yaxis: {
          labels: {
            formatter: function(val) {
              // Format number of yaxis label according to language
              return self.$n(val, 'decimal')
            }
          }
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        stroke: {
          curve: 'smooth',
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
        name: this.$t('chart.title', { type: 'common.type.' + this.type }),
        data: this.lineChartData,
      })
      console.log(this.series[0].name)
      // till here
    },
    updateLocale() {
      this.$refs.lineChart.chart.setLocale(this.language)
      this.series = [
        {
          name: this.$t('chart.title', { type: 'common.type.' + this.type }),
        },
      ]
    },
  },
  mounted() {
    this.buildData()
  },
}
</script>
