import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faRightFromBracket,
    faDollarSign,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import App from './App.vue'
import router from './router'
import './assets/main.css'

library.add(
    faRightFromBracket,
    faDollarSign,
    faPlus
)

const app = createApp(App)

app.use(
    createPinia()
    .use(piniaPluginPersistedstate)
).component("font-awesome-icon", FontAwesomeIcon)

app.use(router)

app.mount('#app')
