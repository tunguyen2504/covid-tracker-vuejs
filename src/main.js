import { createApp } from 'vue'
import { store } from './store'
import { ElCard, ElSelect, ElOption, ElTable, ElTableColumn, ElDropdown, ElDropdownMenu, ElDropdownItem, ElLoading } from 'element-plus'
import App from './App.vue'
import i18n from './i18n'

const app = createApp(App)

app.use(i18n)
app.use(store)

app.component(ElCard.name, ElCard)
app.component(ElSelect.name, ElSelect)
app.component(ElOption.name, ElOption)
app.component(ElTable.name, ElTable)
app.component(ElTableColumn.name, ElTableColumn)
app.component(ElDropdown.name, ElDropdown)
app.component(ElDropdownMenu.name, ElDropdownMenu)
app.component(ElDropdownItem.name, ElDropdownItem)
app.use(ElLoading)

app.mount('#app')
