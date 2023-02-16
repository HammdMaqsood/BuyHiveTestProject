import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import store from "./assets/products";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
