import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuard } from 'vue-router'
import Layout from '@/layout/index.vue'
import Login from '@/views/Login/index.vue'
import { t } from '@/locales/index'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Home/index.vue'),
        name: t('dashboard'),
        meta: {
          title: '首頁',
          icon: 'bi-grid-1x2'
        }
      },
      {
        path: 'orderManagement',
        component: () => import('../views/OrderManagement/index.vue'),
        name: t('orderManagement'),
        meta: {
          title: '訂單管理',
          icon: 'hi-clipboard-list'
        }
      },
      {
        path: 'productManagement',
        name: t('productManagement'),
        component: () => import('../views/ProductManagement/index.vue'),
        meta: {
          title: '商品管理',
          icon: 'la-shopping-bag-solid',
          hidden: true
        }
      },
      {
        path: 'report',
        name: t('report'),
        component: () => import('../views/ReportView/index.vue'),
        meta: {
          title: '報表及分析',
          icon: 'la-user-solid',
          hidden: true
        }
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
