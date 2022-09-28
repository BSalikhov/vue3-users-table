import { createApp } from "vue";
import router from "./router.js";
import store from "./store";
import App from "./App.vue";
import "./axios";
import "./style.css";
import { maska } from "maska";

const app = createApp(App);

app.use(router);
app.use(store);

app.directive("maska", maska);

app.mount("#app");
