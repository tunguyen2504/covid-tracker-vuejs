<template>
  <div class="app">
    <div class="app-left">
      <the-header
        :countries="countries"
        @country-changed="loadDataByCountry"
      ></the-header>
      <div class="app-stats">
        <info-box
          type="cases"
          :title="infoBoxTotalCaseTitle"
          :total="formatToLocaleString(infoBoxData.cases)"
          :newCases="formatToLocaleString(infoBoxData.todayCases)"
          @box-selected="infoBoxSelected"
        ></info-box>
        <info-box
          type="recovered"
          :title="infoBoxRecoveredTitle"
          :total="formatToLocaleString(infoBoxData.recovered)"
          :newCases="formatToLocaleString(infoBoxData.todayRecovered)"
          @box-selected="infoBoxSelected"
        ></info-box>
        <info-box
          type="deaths"
          :title="infoBoxDeathTitle"
          :total="formatToLocaleString(infoBoxData.deaths)"
          :newCases="formatToLocaleString(infoBoxData.todayDeaths)"
          @box-selected="infoBoxSelected"
        ></info-box>
      </div>

      <div class="app-map">
        <map-container
          :mapData="allCountriesData"
          :type="mapType"
        ></map-container>
      </div>
    </div>
    <div class="app-right-container">
      <el-card class="app-right">
        <template #header>
          <div class="card-header">
            <h3 class="app-right-title">{{ $t('table.header') }}</h3>
          </div>
        </template>
        <the-table :tableData="tableData"></the-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheTable from './components/TheTable.vue'
import InfoBox from './components/InfoBox.vue'
import MapContainer from './components/MapContainer.vue'
import axios from 'axios'

const allCountriesApi = `https://disease.sh/v3/covid-19/countries`
const worldWideApi = `https://disease.sh/v3/covid-19/all`

export default {
  components: {
    TheHeader,
    TheTable,
    InfoBox,
    MapContainer,
  },
  data() {
    return {
      allCountriesData: [],
      infoBoxData: {},
      countries: [],
      tableData: [],
      mapType: 'cases',
    }
  },
  computed: {
    infoBoxTotalCaseTitle() {
      return this.$t('info_box.title.total_cases')
    },
    infoBoxRecoveredTitle() {
      return this.$t('info_box.title.recovered')
    },
    infoBoxDeathTitle() {
      return this.$t('info_box.title.deaths')
    },
  },
  methods: {
    loadData() {
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
    loadWorldWideData() {
      axios.get(worldWideApi).then((res) => {
        if (res.status === 200) {
          this.infoBoxData = res.data
        }
      })
    },
    loadDataByCountry(countryCode) {
      console.log(countryCode)
      if (countryCode === 'WW') {
        this.loadWorldWideData()
      } else {
        const countryApi = `https://disease.sh/v3/covid-19/countries/${countryCode}`

        axios.get(countryApi).then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            this.infoBoxData = res.data
          }
        })
      }
    },
    infoBoxSelected(type) {
      this.mapType = type
      console.log(this.mapType)
    },
    formatToLocaleString(num) {
      return Number(num).toLocaleString()
    },
  },
  mounted() {
    this.loadData()
    this.loadWorldWideData()
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

.app-right-container {
  /* height: 100%; */
  height: 884px;
}

.app-stats {
  display: flex;
  /* width: 500px; */
  justify-content: space-between;
}

.app-map {
  padding-bottom: 15px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
