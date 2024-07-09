import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuard } from 'vue-router'
import Layout from '@/layout/index.vue'
import User from '@/views/User/index.vue'
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
        name: 'dashboard',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: t('dashboard'),
          icon: 'bi-grid-1x2',
        },
      },
      {
        path: 'orderManagement',
        component: () => import('../views/OrderManagement/index.vue'),
        name: 'orderManagement',
        redirect: '/orderManagement/orders',
        meta: {
          title: t('orderManagement'),
          icon: 'hi-clipboard-list',
        },
        children: [
          {
            path: 'orders',
            name: 'orders',
            component: () => import('../views/OrderManagement/components/OrderList/index.vue'),
          },
          {
            path: ':orderNumber',
            name: 'order',
            component: () => import('../views/OrderManagement/components/Order/index.vue'),
          },
        ],
      },
      {
        path: 'productManagement',
        name: 'productManagement',
        component: () => import('../views/ProductManagement/index.vue'),
        meta: {
          title: t('productManagement'),
          icon: 'la-shopping-bag-solid',
          hidden: true,
        },
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('../views/ReportView/index.vue'),
        meta: {
          title: t('report'),
          icon: 'la-user-solid',
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/users',
    component: User,
    redirect: '/profile',
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/User/UsersConfig.vue'),
        meta: {
          title: t('user.profile'),
        },
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        component: () => import('@/views/User/UsersConfig.vue'),
        meta: {
          title: t('user.changePassword'),
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/:pathMath(.*)*',
    name: 'NotFound',
    redirect: '/dashboard',
    // component: () => import('@/views/404.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
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
