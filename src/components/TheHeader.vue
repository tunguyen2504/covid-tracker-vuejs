<template>
  <div class="app-header">
    <h1>COVID-19 TRACKER</h1>
    <el-dropdown trigger="click" @command="onLanguageSelect">
      <span class="el-dropdown-link">
        {{ $i18n.locale.toUpperCase() }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="locale in locales" :key="locale.code" :command="locale.code">{{ locale.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-select v-model="selectedCountry" filterable @change="onCountrySelect">
      <el-option key="WW" :label="worldwideLabel" value="WW"></el-option>
      <el-option
        v-for="country in countries"
        :key="country.code"
        :label="country.name"
        :value="country.code"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { getSupportedLocales } from '../util/i18n/supported-locales'
export default {
  props: ['countries'],
  emits: ['country-changed'],
  data() {
    return {
      locales: getSupportedLocales(),
      selectedLanguage: this.$i18n.locale.toUpperCase(),
      selectedCountry: 'WW',
    }
  },
  computed: {
    worldwideLabel() {
      return this.$t('worldwide')
    }
  },
  methods: {
    onCountrySelect() {
      this.$emit('country-changed', this.selectedCountry)
    },
    onLanguageSelect(locale) {
      this.$i18n.locale = locale
    },
  },
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>