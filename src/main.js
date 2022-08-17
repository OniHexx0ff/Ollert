import { createApp } from "vue";
import { createPinia } from "pinia";
import { saveStatePlugin } from "./utils";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
const pinea = createPinia();
pinea.use(saveStatePlugin)
app.use(pinea);
app.use(router);

app.mount("#app");

