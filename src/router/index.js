import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import AuthLayout from '@/layouts/Auth'
import MainLayout from '@/layouts/Main'
import store from '@/store'
import { canNavigate } from '@/services/ability/routeProtection'

const router = createRouter({
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      // VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT
      redirect: '/dashboard',
      component: MainLayout,
      meta: {
        authRequired: true,
        hidden: true,
      },
      children: [
        // VB:REPLACE-START:ROUTER-CONFIG
        {
          path: '/dashboard',
          meta: { title: 'Dashboards', resource: 'Dashboard', action: 'manage' },
          component: () => import('@/views/dashboard'),
        },
        {
          path: '/roles',
          meta: { title: 'Role Management', resource: 'Settings', action: 'manage' },
          component: () => import('@/views/roles'),
        },
        {
          path: '/permissions',
          meta: { title: 'Permissions', resource: 'Settings', action: 'manage' },
          component: () => import('@/views/permissions'),
        },

        // VB:REPLACE-END:ROUTER-CONFIG
      ],
    },

    // System Pages
    {
      path: '/auth',
      component: AuthLayout,
      redirect: 'auth/login',
      children: [
        {
          path: '/auth/404',
          name: 'route404',
          meta: {
            title: 'Error 404',
            resource: 'Auth',
            action: 'read',
          },
          component: () => import('@/views/auth/404'),
        },
        {
          path: '/auth/500',
          name: 'route500',
          meta: {
            title: 'Error 500',
            resource: 'Auth',
            action: 'read',
          },
          component: () => import('@/views/auth/500'),
        },
        {
          path: '/auth/login',
          name: 'login',
          meta: {
            title: 'Sign In',
            resource: 'Auth',
            action: 'read',
          },
          component: () => import('@/views/auth/login'),
        },
        {
          path: '/auth/register',
          name: 'register',
          meta: {
            title: 'Sign Up',
            resource: 'Auth',
            action: 'read',
          },
          component: () => import('@/views/auth/register'),
        },
        {
          path: '/auth/forgot-password',
          name: 'forgot',
          meta: {
            title: 'Forgot Password',
            resource: 'Auth',
            action: 'read',
          },
          component: () => import('@/views/auth/forgot-password'),
        },
        {
          path: '/auth/lockscreen',
          name: 'lockscreen',
          meta: {
            title: 'Lockscreen',
            resource: 'Auth',
            action: 'read',
          },
          component: () => import('@/views/auth/lockscreen'),
        },
      ],
    },

    // Redirect to 404
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'route404' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  setTimeout(() => {
    NProgress.done()
  }, 300)

  if (to.matched.some(record => record.meta.authRequired)) {
  console.log(to)
    if (!store.state.user.authorized) {
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath },
      })
    } else {
      if (canNavigate(to)) {
        next()
      } else {
        next({ name: 'route500' })  
      }    
    }
  } else {
    if (canNavigate(to)) {
        next()
    } else {
        next({ name: 'route500' })  
    }
  }
})

export default router
