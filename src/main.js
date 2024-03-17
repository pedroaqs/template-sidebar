import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/variables.css'
import Permision from './directives/permission'

import { OhVueIcon, addIcons } from 'oh-vue-icons'

import * as Icons from "oh-vue-icons/icons";

const AllIcons = Object.values({ ...Icons });
addIcons(...AllIcons);




const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.directive('permission', Permision)
app.component('v-icon', OhVueIcon)
app.use(ElementPlus)

app.mount('#app')
// .$nextTick(() => {
//     // Oculta el loader una vez que la app esté montada
//     const loader = document.getElementById('page-loader')
//     if (loader) {
//       loader.style.display = 'none'
//     }
//   })