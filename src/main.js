import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router.js";
import {createPinia} from "pinia";
// import {pinia} from "@/store.js";

createApp(App).use(createPinia()).use(router).mount('#app')
