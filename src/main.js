import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/scss/style.scss";
import "@/assets/css/base.css";

import { auth } from "@/configs/firebase";
import { registerGlobalComponent } from "@/utils";
let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    registerGlobalComponent(app);
    app.use(router);
    app.mount("#app");
  }
});
