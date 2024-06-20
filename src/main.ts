import { createApp } from 'vue'
import router from '@/index'
import { createPinia } from 'pinia'
import {firebaseApp} from "@/firebase/firebase"
import { VueFire, VueFireAuth } from 'vuefire'
import './style.css'
import createVuetify from "@/plugins/vuetify"
import App from './App.vue'
const app = createApp(App)
app.use(VueFire,{
    firebaseApp,
    modules:[
        VueFireAuth(),
    ]
})
app.use(createVuetify)
app.use(createPinia())
app.use(router)
app.mount('#app')
