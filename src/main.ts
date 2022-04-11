import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import mitt from 'mitt';
import { createPinia } from 'pinia';

const emitter = mitt();

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.config.globalProperties.emitter = emitter;

app.mount("#app");