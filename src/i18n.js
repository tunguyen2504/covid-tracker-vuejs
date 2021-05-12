import { createI18n } from 'vue-i18n'
import getBrowserLocale from "@/util/i18n/get-browser-locale"
import { supportedLocalesInclude } from "./util/i18n/supported-locales"
// import CustomFormatter from './util/i18n/custom-formatter'

function getStartingLocale() {
  const browserLocale = getBrowserLocale({ countryCodeOnly: true })

  if (supportedLocalesInclude(browserLocale)) {
    return browserLocale
  } else {
    return process.env.VUE_APP_I18N_LOCALE || "en"
  }
}

export const selectedLocale = getStartingLocale()
// const formatter = new CustomFormatter({ selectedLocale })

const i18n = new createI18n({
  locale: selectedLocale,
  // formatter: new CustomFormatter({ selectedLocale }),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: {}
})

const loadedLanguages = []

// Lazy loading the locale files
export async function loadLocaleMessagesAsync(locale) {
  if (loadedLanguages.length > 0 && i18n.locale === locale) {
    return Promise.resolve(locale)
  }
  // If the language was already loaded
  if (loadedLanguages.includes(locale)) {
    i18n.locale = locale
    return Promise.resolve(locale)
  }
  // If the language hasn't been loaded yet
  return await import(
    /* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.json`
  ).then(messages => {
    i18n.global.setLocaleMessage(locale, messages.default)
    loadedLanguages.push(locale)
    i18n.locale = locale
    return Promise.resolve(locale)
  })
}

loadLocaleMessagesAsync(selectedLocale)

export default i18n