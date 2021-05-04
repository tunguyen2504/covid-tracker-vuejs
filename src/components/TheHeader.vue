<template>
  <div class="app-header">
    <h1>COVID-19 TRACKER</h1>
    <el-select v-model="selectedCountry" filterable>
      <el-option
        v-for="country in countries"
        :key="country.name"
        :label="country.name"
        :value="country.name"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      countries: [
        {
          name: 'World Wide',
        },
      ],
      selectedCountry: 'World Wide',
    }
  },
  methods: {
    loadCountries() {
      axios
        .get('https://restcountries.eu/rest/v2/all?fields=name')
        .then((res) => {
          if (res.status === 200) {
            this.countries = this.countries.concat(res.data)
            console.log(this.countries)
            console.log(this.selectedCountry)
          }
        })
    },
  },
  mounted() {
    this.loadCountries()
  },
}
</script>

<style scoped>
</style>