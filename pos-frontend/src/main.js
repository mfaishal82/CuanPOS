// import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import useUserStore from './stores/userStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

useUserStore()
// userStore.fetchUser().finally(() => {
//   app.mount('#app')
// })
// userStore.fetchUser()
app.mount('#app')
