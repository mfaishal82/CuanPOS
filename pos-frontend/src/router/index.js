import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SalesView from '@/views/SalesView.vue'
import InventoryView from '@/views/InventoryView.vue'
import ProductView from '@/views/ProductView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import useUserStore from '@/stores/userStore'
import AddProductView from '@/views/AddProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: HomeView,
        },
        {
          path: 'sales',
          name: 'Sales',
          component: SalesView,
        },
        {
          path: 'inventory',
          name: 'Inventory',
          component: InventoryView,
        },
        {
          path: 'product',
          name: 'Product',
          component: ProductView,
        },
        {
          path: '/product/add-product',
          name: 'Add New Product',
          component: AddProductView
        }
      ],
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  // console.log(to.path)

  // console.log('isLoggedIn:', userStore.isLoggedIn)
  console.log('going to:', to.path)

  if (!userStore.authChecked) {
    await userStore.fetchUser()
  }

  if (to.meta.guestOnly && userStore.isLoggedIn) {
    return next('/')
  }

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return next('/login')
  }

  next()
})

export default router
