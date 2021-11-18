import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// set admin user add it in users list in localstorage
if (localStorage.users === undefined) {
  let users = [
    {
      username: "admin",
      password: "admin",
    },
  ];
  localStorage.setItem("users", JSON.stringify(users));
}

Vue.config.productionTip = false;
//set route
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
