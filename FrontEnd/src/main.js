import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import store from "./assets/products";
//import "bootstrap/dist/css/bootstrap.css";
//import bootstrap from "bootstrap/dist/js/bootstrap.js";

const app = createApp(App);
app.use(router);
app.use(store);
//app.use(bootstrap);
app.mount("#app");
