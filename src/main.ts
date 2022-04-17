import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// Bootstrap
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

// Vue draggable resizable
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';

import '@/assets/css/main.css';

createApp(App)
    .use(store)
    .use(BootstrapVue3)
    .use(Vue3DraggableResizable)
    .mount('#app')
