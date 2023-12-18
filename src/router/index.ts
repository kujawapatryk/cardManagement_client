import { createRouter, createWebHistory } from 'vue-router'

import CardList from "@/components/Card/CardList.vue";
import Login from "@/components/Login/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CardList',
      component: CardList
    },
    { path: '/login', component: Login },
  ]
})

export default router
