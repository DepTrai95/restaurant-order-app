import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import Home from "./components/pages/home/Home.vue";
import Food from "./components/pages/food/Food.vue";
import Drinks from "./components/pages/drinks/Drinks.vue";
import Orders from "./components/pages/orders/Orders.vue";
import Cart from "./components/pages/cart/Cart.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/food", component: Food },
    { path: "/drinks", component: Drinks },
    { path: "/orders", component: Orders },
    { path: "/cart", component: Cart },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

export default router;