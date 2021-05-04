<template>
  <div class="app">
    <div class="app-left">
      <the-header></the-header>
    </div>
    <div class="app-right-container">
      <el-card class="app-right">
        <template #header>
          <div class="card-header">
            <h3 class="app-right-title">Total cases by country</h3>
          </div>
          <the-table></the-table>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheTable from './components/TheTable.vue'

export default {
  components: {
    TheHeader,
    TheTable
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

.app-header > h1, .app-right-title, .app-graph-title {
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
