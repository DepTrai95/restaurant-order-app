import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
   //  { path: "/", component: Home },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

export default router;