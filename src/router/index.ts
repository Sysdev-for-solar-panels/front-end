import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import {useLoginCheckerStore} from '@/stores/loginChecker'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/warehouseman',
      name: 'raktaros',
      component: () => import('../views/rDash.vue')
    },
    {
      path: '/warehouse-manager',
      name: 'raktarvezeto',
      component: () => import('../views/WarehouseMangerView.vue')
    },
    {
      path: '/professional',
      name: 'szakember',
      component: () => import('../views/szDash.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDash.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const loginChecker = useLoginCheckerStore()

  if (loginChecker.isLogedIn) {
    if (loginChecker.role === to.name) {
      return true
    } else {
      return {name:loginChecker.role}
    }
  } else {
    if (to.name != 'login') {
      return {name:'login'}
    }
  }
})
export default router
