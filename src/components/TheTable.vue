<template>
  <el-table
    class="table"
    :data="tableData"
    :default-sort="{ prop: 'cases', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="country" label="Countries" width="180">
    </el-table-column>
    <el-table-column
      prop="cases"
      label="Total cases"
      sortable
      width="180"
      :formatter="formatNumber"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['tableData'],
  methods: {
    formatNumber(row) {
      return Number(row.cases).toLocaleString()
    },
  },
}
</script>

<style scoped>
.table {
  /* margin: 20px 0; */
  overflow: scroll;
  overflow-x: hidden;
  /* height: 85vh; */
  height: 400px;
}
</style>