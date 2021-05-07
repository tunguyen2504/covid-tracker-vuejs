import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { selectedLocale } from '../i18n'

export const store = createStore({
  state: {
    locale: selectedLocale
  },
  mutations: {
    updateLocale(state, newLocale) {
      state.locale = newLocale
    }
  },
  actions: {
    changeLocale({ commit }, payload) {
      payload.i18n.locale = payload.newLocale // important!
      commit('updateLocale', payload.newLocale)
    }
  },
  plugins: [createPersistedState()]
})
