import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: "dashboard",
          component: () => import("@/views/home/index.vue"),
          name: "Dashboard",
          meta: {
            title: "首頁",
          }
        },
        {
          path: 'orderManagement',
          component: () => import('../views/OrderManagement/index.vue'),
          name: 'OrderManagement',
          meta: {
            title: "訂單管理",
          }
        },
        {
          path: 'productManagement',
          name: 'ProductManagement',
          component: () => import('../views/ProductManagement/index.vue')
        },
        {
          path: 'report',
          name: 'Report',
          component: () => import('../views/ReportView/index.vue')
        },
      ]
    },
    {
      path: '/:pathMath(.*)*',
      name: 'NotFound',
      redirect: '/dashboard',
      // component: () => import('@/views/404.vue')
    }
  ]
})

export default router
