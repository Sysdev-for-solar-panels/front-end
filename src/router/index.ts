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
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashBoardView.vue')
    },
    {
      path: '/warehouseman',
      name: 'warehouseman',
      component: () => import('../views/rDash.vue')
    },
    {
      path: '/warehouse-manager',
      name: 'warehouseManager',
      component: () => import('../views/rvDash.vue')
    },
    {
      path: '/professional',
      name: 'professional',
      component: () => import('../views/szDash.vue')
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

  if(!loginChecker.isLogedIn && to.name !== 'login') {
    return {name:'login'}
  } else {
    return true
  }
})

export default router
