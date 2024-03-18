import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { inject } from "@vercel/analytics";

import { createPinia } from "pinia";

const app = createApp(App);

app.use(router);
app.use(createPinia());

inject();

app.mount("#app");
