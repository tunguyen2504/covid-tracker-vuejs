<template>
  <div class="app-header">
    <h1>COVID-19 TRACKER</h1>
    <el-dropdown trigger="click" @command="onLanguageSelect">
      <span class="el-dropdown-link">
        {{ selectedLanguage }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="lang in languages"
            :key="lang.code"
            :command="lang.code"
            >{{ lang.language }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-select v-model="selectedCountry" filterable @change="onCountrySelect">
      <el-option key="WW" label="World Wide" value="WW"></el-option>
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
export default {
  props: ['countries'],
  emits: ['country-changed'],
  data() {
    return {
      languages: [
        {
          language: 'English',
          code: 'EN',
        },
        {
          language: 'Français',
          code: 'FR',
        },
      ],
      selectedLanguage: 'EN',
      selectedCountry: 'WW',
    }
  },
  methods: {
    onCountrySelect() {
      this.$emit('country-changed', this.selectedCountry)
    },
    onLanguageSelect(lang) {
      this.selectedLanguage = lang
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