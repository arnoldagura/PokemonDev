import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Home from "../views/Home.vue";
import PokemonView from "../views/PokemonView.vue";

Vue.use(VueRouter);
//check guest or pages that doesn't need login (Login/Register Page)
function guest(to, from, next) {
  if (localStorage.activeUser) {
    next({ name: "Pokemons" });
  } else next();
}

// check guard to see if there is active user if not proceed to login page )
function guard(to, from, next) {
  if (localStorage.activeUser) {
    next();
  } else next({ name: "Login" });
}
// set routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: guest,
  },
  {
    path: "/pokemons",
    name: "Pokemons",
    component: PokemonView,
    beforeEnter: guard,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: guest,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: guest,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
