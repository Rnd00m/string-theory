import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Vue3Mq } from "vue3-mq";
import { inject } from "@vercel/analytics";

import { createPinia } from "pinia";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.use(Vue3Mq, {
  preset: "tailwind",
});

inject();

app.mount("#app");
