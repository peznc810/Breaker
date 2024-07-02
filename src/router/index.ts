import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuard } from 'vue-router'
import Layout from '@/layout/index.vue'
import Login from '@/views/Login/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Home/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首頁'
        }
      },
      {
        path: 'orderManagement',
        component: () => import('../views/OrderManagement/index.vue'),
        name: 'OrderManagement',
        meta: {
          title: '訂單管理'
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
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:pathMath(.*)*',
    name: 'NotFound',
    redirect: '/dashboard'
    // component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})

// TODO: add auth
// router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuard) => {
//   document.title = to.meta.title as string
//   if (to.path === '/login') {
//     next()
//   }
// })

export default router
