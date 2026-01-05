import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import useUserStore from './stores/userStore'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

useUserStore()
// userStore.fetchUser().finally(() => {
//   app.mount('#app')
// })
// userStore.fetchUser()
app.use(
  Vue3Toastify,
  {
    autoClose: 3000,
    // ...
  },
)
app.mount('#app')
