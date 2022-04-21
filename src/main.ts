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

// FontAwesome setup
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay, faAngleUp, faAngleDown, faTriangleExclamation, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
library.add(faPlay, faAngleDown, faAngleUp, faTriangleExclamation, faCircleExclamation);

import '@/assets/css/main.css';

createApp(App)
    .use(store)
    .use(BootstrapVue3)
    .use(Vue3DraggableResizable)
    .component("fa", FontAwesomeIcon)
    .mount('#app')
