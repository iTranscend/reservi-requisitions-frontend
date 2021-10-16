import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import "@mdi/font/css/materialdesignicons.css";
// import "material-design-icons-iconfont/dist/material-design-icons.css";
import vuetify from "@/plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import VueTextareaAutosize from "vue-textarea-autosize";
// import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vuex from "vuex";
import store from "./store.js";
import Notifications from "vue-notification";

import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; //Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax
Vue.use(Vuesax);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueTextareaAutosize);
Vue.use(Vuex);
Vue.use(Notifications);

// Vue.component("AddToCart", require("./components/AddToCart.vue"));

const ignoreWarnMessage =
  "The .native modifier for v-on is only valid on components but it was used on <div>.";
Vue.config.warnHandler = function(msg, vm, trace) {
  if (msg !== ignoreWarnMessage) {
    console.error("[Vue warn]: " + msg + trace);
  }
};
//# sourceMappingURL=bootstrap.min.js.map
new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
