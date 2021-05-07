<template>
  <div class="map">
    <l-map
      :zoom="zoom"
      :center="mapCenter"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-circle
        v-for="country in mapData"
        :key="country.country"
        :lat-lng="[country.countryInfo.lat, country.countryInfo.long]"
        :color="circleTypeColors[type].hex"
        :fillColor="circleTypeColors[type].hex"
        :fill="true"
        :fillOpacity="0.5"
        :radius="Math.sqrt(country[type]) * circleTypeColors[type].multiplier"
      ></l-circle>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LCircle } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    LMap,
    LTileLayer,
    LCircle,
  },
  props: ['mapData', 'type', 'mapCenter', 'zoom'],
  data() {
    return {
      circleTypeColors: {
        cases: {
          hex: '#CC1034',
          multiplier: 500
        },
        recovered: {
          hex: '#7dd71d',
          multiplier: 300
        },
        deaths: {
          hex: '#4a4a4a',
          multiplier: 1000
        },
      },
    }
  },
}
</script>

<style scoped>
.map {
  height: 650px;
  /* width: 500px; */
  background-color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-top: 16px;
  /* margin-bottom: 16px; */
  box-shadow: 0 0 8px -4px rgba(0, 0, 0, 0.9);
}

.map .leaflet-container {
  height: 100%;
}
</style>