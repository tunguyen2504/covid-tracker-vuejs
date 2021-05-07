<template>
  <div class="app-header">
    <img src="../../public/favicon.png" />
    <h1>COVID-19 TRACKER</h1>
    <el-dropdown trigger="click" @command="onLanguageSelect" :="lang">
      <span class="el-dropdown-link">
        {{ lang.toUpperCase() }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(lang, i) in languagesList"
            :key="`lang${i}`"
            :value="lang"
            :command="lang"
            >{{ lang.toUpperCase() }}</el-dropdown-item
          >
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
import { languages } from '../i18n'
export default {
  props: ['countries'],
  emits: ['country-changed'],
  data() {
    return {
      locales: getSupportedLocales(),
      selectedCountry: 'WW',
      languagesList: languages,
    }
  },
  computed: {
    worldwideLabel() {
      return this.$t('worldwide')
    },
    lang: {
      get: function () {
        return this.$store.state.locale
      },
      set: function (newVal) {
        this.$store.dispatch('changeLocale', {i18n: this.$i18n, newLocale: newVal})
      },
    },
  },
  methods: {
    onCountrySelect() {
      this.$emit('country-changed', this.selectedCountry)
    },
    onLanguageSelect(locale) {
      this.lang = locale
    },
  },
  mounted() {
    this.$i18n.locale = this.lang
  }
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

img {
  width: 10%;
}
</style>