// import 'element-ui/lib/theme-default/index.css'
import "./styles/reset.css";
import "../static/font_family/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";

import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App";
import router from "./router";
import store from "./vuex";
import * as filters from "./filters";
import container from "./components/container/container.vue";
import "./permission";// 权限

Vue.use(ElementUI);
Vue.component("container", container);
import api from "./api/index";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {App}
});
