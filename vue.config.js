module.exports = {
  chainWebpack: config => {
    config.plugins.delete("prefetch")
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
