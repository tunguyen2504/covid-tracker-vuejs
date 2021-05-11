<template>
  <div class="card-header">
    <h3 class="app-right-title">{{ $t('table.header') }}</h3>
  </div>
  <el-table
    class="table"
    :data="tableData"
    :default-sort="{ prop: 'cases', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="country" :label="columnCountryLabel" width="180">
    </el-table-column>
    <el-table-column
      prop="cases"
      :label="columnTotalCasesLabel"
      sortable
      width="180"
      align="right"
      :formatter="formatNumber"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['tableData'],
  computed: {
    columnCountryLabel() {
      return this.$t('table.column.countries')
    },
    columnTotalCasesLabel() {
      return this.$t('table.column.total_cases')
    },
  },
  methods: {
    formatNumber(row) {
      return Number(row.cases).toLocaleString()
    },
  },
}
</script>

<i18n locale="en" src="../locales/table/en.json"></i18n>
<i18n locale="fr" src="../locales/table/fr.json"></i18n>
<i18n locale="vi" src="../locales/table/vi.json"></i18n>

<style scoped>
.table {
  /* margin: 20px 0; */
  overflow: scroll;
  overflow-x: hidden;
  /* height: 85vh; */
  height: 550px;
}
</style>