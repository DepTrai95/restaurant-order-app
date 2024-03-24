import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import Home from "./components/pages/home/Home.vue";
import Food from "./components/pages/food/Food.vue";
import Category from './components/pages/category/Category.vue';
import Drinks from "./components/pages/drinks/Drinks.vue";
import Orders from "./components/pages/orders/Orders.vue";
import Cart from "./components/pages/cart/Cart.vue";
import OpeningHours from "./components/pages/opening-hours/OpeningHours.vue";
import Allergies from "./components/pages/allergies/Allergies.vue";
import Settings from "./components/pages/settings/Settings.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/home", component: Home },
    { path: "/food", 
      component: Food,
    },
    { 
      path: '/food/:category', 
      component: Category, 
      props: true,
    },
    { path: "/drinks", component: Drinks },
    { 
      path: '/drinks/:category', 
      component: Category, 
      props: true,
    },
    { path: "/orders", component: Orders },
    { path: "/cart", component: Cart },
    { path: "/opening-hours", component: OpeningHours },
    { path: "/allergies", component: Allergies },
    { path: "/settings", component: Settings },

  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

export default router;