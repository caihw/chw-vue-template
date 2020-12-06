import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
{{#if element}}
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
{{/if}}
{{#if antdesign}}
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
{{/if}}
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
