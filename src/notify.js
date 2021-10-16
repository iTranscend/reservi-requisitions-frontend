import Vue from "vue";
import Notifications from "vue-notification";
Vue.use(Notifications);

function notify(type, text) {
  this.$notify({
    group: "foo",
    type: type,
    text: text,
  });
}

export default notify;
