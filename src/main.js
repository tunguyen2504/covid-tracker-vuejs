import { createApp } from 'vue'
import { ElCard, ElSelect, ElOption } from 'element-plus'
import App from './App.vue'

const app = createApp(App)
app.component(ElCard.name, ElCard)
app.component(ElSelect.name, ElSelect)
app.component(ElOption.name, ElOption)

app.mount('#app')
