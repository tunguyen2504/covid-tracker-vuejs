<template>
  <div class="app">
    <div class="app-left">
      <the-header
        :countries="countries"
        @country-changed="onCountryChange"
      ></the-header>
      <div class="app-stats">
        <card
          type="cases"
          :total="formatToLocaleString(infoBoxData.cases)"
          :newCases="formatToLocaleString(infoBoxData.todayCases)"
          :class="{ 'info-box-red--selected': mapType === 'cases' }"
          @box-selected="infoBoxSelected"
        ></card>
        <card
          type="recovered"
          :total="formatToLocaleString(infoBoxData.recovered)"
          :newCases="formatToLocaleString(infoBoxData.todayRecovered)"
          :class="{ 'info-box-green--selected': mapType === 'recovered' }"
          @box-selected="infoBoxSelected"
        ></card>
        <card
          type="deaths"
          :total="formatToLocaleString(infoBoxData.deaths)"
          :newCases="formatToLocaleString(infoBoxData.todayDeaths)"
          :class="{ 'info-box-black--selected': mapType === 'deaths' }"
          @box-selected="infoBoxSelected"
        ></card>
      </div>

      <div class="app-map">
        <map-container
          :mapData="allCountriesData"
          :type="mapType"
          :mapCenter="mapCenter"
          :zoom="mapZoom"
          v-if="allCountriesData"
        ></map-container>
      </div>
    </div>
    <div class="app-right-container">
      <el-card class="app-right">
        <TheTable :tableData="tableData" v-if="tableData" />
        <TheChart
          class="app-graph"
          :dataProps="chartData"
          v-if="chartData"
          :selectedCountry="selectedCountry"
          :type="mapType"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheTable from './components/TheTable.vue'
import TheChart from './components/TheChart.vue'
import Card from './components/Card.vue'
import MapContainer from './components/MapContainer.vue'
import axios from 'axios'

const allCountriesApi = `https://disease.sh/v3/covid-19/countries`
const worldWideApi = `https://disease.sh/v3/covid-19/all`
const worldWideHistoryApi = `https://disease.sh/v3/covid-19/historical/all?lastdays=120`

export default {
  components: {
    TheHeader,
    TheTable,
    TheChart,
    Card,
    MapContainer,
  },
  data() {
    return {
      allCountriesData: [],
      historyData: {},
      infoBoxData: {},
      countries: [],
      tableData: [],
      selectedCountry: {
        code: 'WW',
      },
      mapType: 'cases',
      mapCenter: [47.41322, -1.219482],
      mapZoom: 2,
    }
  },
  computed: {
    chartData() {
      return this.historyData[this.mapType]
    },
    isChartLoading() {
      return this.chartData === null
    },
  },
  methods: {
    loadTableData() {
      axios.get(allCountriesApi).then((res) => {
        if (res.status === 200) {
          this.allCountriesData = res.data
          this.countries = this.allCountriesData.map((country) => ({
            name: country.country,
            code: country.countryInfo.iso2,
          }))
          this.tableData = this.allCountriesData.map((country) => ({
            country: country.country,
            cases: country.cases,
          }))
        }
      })
    },
    loadInfoBoxData() {
      axios.get(worldWideApi).then((res) => {
        if (res.status === 200) {
          this.infoBoxData = res.data
        }
      })
    },
    loadChartData(countryCode) {
      if (countryCode === 'WW') {
        axios.get(worldWideHistoryApi).then((res) => {
          if (res.status === 200) {
            this.historyData = res.data
          }
        })
      } else {
        const countryHistoryApi = `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=120`
        axios.get(countryHistoryApi).then((res) => {
          if (res.status === 200) {
            this.historyData = res.data.timeline
          }
        })
      }
    },
    loadDataByCountry(countryCode) {
      if (countryCode === 'WW') {
        this.loadInfoBoxData()
        this.mapCenter = [47.41322, -1.219482]
        this.mapZoom = 2
      } else {
        const countryApi = `https://disease.sh/v3/covid-19/countries/${countryCode}`

        axios.get(countryApi).then((res) => {
          if (res.status === 200) {
            this.infoBoxData = res.data
            this.mapCenter = [
              this.infoBoxData.countryInfo.lat,
              this.infoBoxData.countryInfo.long,
            ]
            this.mapZoom = 5
          }
        })
      }
    },
    onCountryChange(countryCode) {
      if (countryCode === 'WW') {
        this.selectedCountry = {
          code: 'WW',
        }
      } else {
        this.selectedCountry = this.countries.find(
          (country) => country.code === countryCode
        )
      }
      this.loadDataByCountry(countryCode), this.loadChartData(countryCode)
    },
    infoBoxSelected(type) {
      this.mapType = type
    },
    formatToLocaleString(num) {
      return Number(num).toLocaleString()
    },
  },
  mounted() {
    this.loadTableData()
    this.loadInfoBoxData()
    this.loadChartData('WW')
  },
}
</script>

<style>
.app {
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .app {
    flex-direction: column;
  }
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* width: 60vw;
  margin-top: 30px;
  margin-left: 20px; */
  margin-bottom: 20px;
}

.app-header > h1,
.app-right-title,
.app-graph-title {
  color: gray;
}

.app-left {
  flex: 0.9;
  /* height: 95vh; */
  height: 884px;
}

.app-right {
  display: flex;
  flex-direction: column;
  /* height: 870px; */
}

.app-right .el-card__body {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.app-right-container {
  /* height: 100%; */
  height: 884px;
}

.app-stats {
  display: flex;
  /* width: 500px; */
  justify-content: space-between;
}

@media (max-width: 500px) {
  .app-stats {
    display: flex;
  /* flex-grow: 1; */
  flex-direction: column;

  }
}

.app-map {
  padding-bottom: 15px;
}

.app-graph {
  flex-grow: 1;
  height: 300px;
}

.app-graph-title {
  margin-top: 40px;
  margin-bottom: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-box-red--selected {
  border-top-color: red;
  border-top-width: medium;
}

.info-box-green--selected {
  border-top-color: greenyellow;
  border-top-width: medium;
}

.info-box-black--selected {
  border-top-color: black;
  border-top-width: medium;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f6fa;
}
</style>
