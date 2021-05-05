import { createApp } from 'vue'
import { ElCard, ElSelect, ElOption, ElTable, ElTableColumn, ElDropdown, ElDropdownMenu, ElDropdownItem} from 'element-plus'
import App from './App.vue'

const app = createApp(App)
app.component(ElCard.name, ElCard)
app.component(ElSelect.name, ElSelect)
app.component(ElOption.name, ElOption)
app.component(ElTable.name, ElTable)
app.component(ElTableColumn.name, ElTableColumn)
app.component(ElDropdown.name, ElDropdown)
app.component(ElDropdownMenu.name, ElDropdownMenu)
app.component(ElDropdownItem.name, ElDropdownItem)

app.mount('#app')
