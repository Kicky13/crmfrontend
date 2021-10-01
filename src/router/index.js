import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import AuthLayout from '@/layouts/Auth'
import MainLayout from '@/layouts/Main'
import LandingPage from '../views/LandingPage'
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
      path: '/login',
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
        // Fauzan ============ Start ===================>>
        {
          path: '/radiusdistrik',
          meta: {
            title: 'Mapping Customer',
            resource: 'Settings & Configuration',
            action: 'manage',
          },
          component: () => import('@/views/radiusdistrik/radiusdistrikindex'),
        },
        {
          path: '/mappingcustomer',
          meta: {
            title: 'Mapping Customer',
            resource: 'Settings & Configuration',
            action: 'manage',
          },
          component: () => import('@/views/mappingcustomer/mappingcustomerindex'),
        },
        {
          path: '/uploadvisitplan',
          meta: { title: 'Upload Visit', resource: 'VisitPlan', action: 'manage' },
          component: () => import('@/views/uploadvisitplan/uploadvisitplanindex'),
        },
        {
          path: '/otomatisasivisit',
          meta: { title: 'Otomatisasi Visit', resource: 'VisitPlan', action: 'manage' },
          component: () => import('@/views/otomatisasivisitplan/otomatisasivisitplanindex'),
        },
        // Fauzan ============ End ===================>>
        // ========== Start of Varis View ==========
        {
          path: '/marketing/berita',
          meta: {
            title: 'Berita',
            resource: 'berita',
            action: 'manage',
          },
          component: () => import('@/views/berita/Berita'),
        },
        {
          path: '/marketing/berita/tambah',
          meta: {
            title: 'Tambah Berita',
            resource: 'tambah_berita',
            action: 'manage',
          },
          component: () => import('@/views/berita/tambah/Tambah'),
        },
        {
          path: '/marketing/berita/edit/:userId',
          meta: {
            title: 'Edit Berita',
            resource: 'edit_berita',
            action: 'manage',
          },
          component: () => import('@/views/berita/edit/Edit'),
        },
        {
          path: '/marketing/berita/:id',
          meta: {
            title: 'Detail Berita',
            resource: 'detail_berita',
            action: 'manage',
          },
          component: () => import('@/views/berita/detailberita/DetailBerita'),
        },
        {
          path: '/user/level_user',
          meta: {
            title: 'Level User',
            resource: 'level_user',
            action: 'manage',
          },
          component: () => import('@/views/leveluser/LevelUser'),
        },
        {
          path: '/sales/survey_sales',
          meta: {
            title: 'Survey Sales',
            resource: 'survey_sales',
            action: 'manage',
          },
          component: () => import('@/views/surveysales/SurveySales'),
        },
        // ========== End of Varis View ==========
        {
          path: '/marketing/program',
          meta: { title: 'Program Hari Ini', resource: 'Program', action: 'read' },
          component: () => import('@/views/program'),
        },
        {
          path: '/marketing/program/tambah',
          meta: { title: 'Tambah Program', resource: 'Add_Program', action: 'create' },
          component: () => import('@/views/program/tambah'),
        },
        {
          path: '/marketing/program/edit/:userId',
          meta: { title: 'Edit Program', resource: 'Edit_Program', action: 'update' },
          component: () => import('@/views/program/edit/Edit'),
        },
        // Kikik ====================================================================
        {
          path: '/roles',
          meta: { title: 'Role Management', resource: 'Roles', action: 'read' },
          component: () => import('@/views/roles'),
        },
        {
          path: '/roles/create',
          name: 'roles-create',
          meta: { title: 'Role Management', resource: 'Permissions', action: 'read' },
          component: () => import('@/views/roles/forms/Insert'),
        },
        {
          path: '/roles/update',
          name: 'roles-update',
          props: true,
          meta: { title: 'Role Management', resource: 'Permissions', action: 'manage' },
          component: () => import('@/views/roles/forms/Update'),
        },
        {
          path: '/permissions',
          meta: { title: 'Permissions', resource: 'Permissions', action: 'manage' },
          component: () => import('@/views/permissions'),
        },
        {
          path: '/permissions/create',
          name: 'permissions-create',
          meta: { title: 'Permissions', resource: 'Permissions', action: 'manage' },
          component: () => import('@/views/permissions/forms/Insert'),
        },
        {
          path: '/assignrole',
          meta: { title: 'Assign Roles', resource: 'Permissions', action: 'manage' },
          component: () => import('@/views/assignrole/Assign'),
        },
        {
          path: '/assignrole/create',
          name: 'assignrole-create',
          meta: { title: 'Assign Roles', resource: 'Permissions', action: 'manage' },
          component: () => import('@/views/assignrole/forms/Insert'),
        },
        {
          path: '/assignrole/update',
          name: 'assignrole-update',
          props: true,
          meta: { title: 'Assign Roles', resource: 'Permissions', action: 'manage' },
          component: () => import('@/views/assignrole/forms/Update'),
        },
        {
          path: '/users',
          name: 'user-management',
          meta: { title: 'User Management', resource: 'User', action: 'manage' },
          component: () => import('@/views/usermanagement/User'),
        },
        {
          path: '/users/export',
          name: 'user-management-export',
          meta: { title: 'Export User', resource: 'User', action: 'manage' },
          component: () => import('@/views/usermanagement/forms/Export'),
        },
        {
          path: '/users/profile',
          name: 'user-management-profile',
          meta: { title: 'Export User', resource: 'User', action: 'manage' },
          component: () => import('@/views/usermanagement/profile/Profile'),
        },
        {
          path: '/koordinatlock',
          name: 'koordinat-lock',
          meta: { title: 'Koordinat Lock', resource: 'Settings', action: 'manage' },
          component: () => import('@/views/coordinatelock/Lock'),
        },
        // Kikik ============================================================================
        /*  ROBI VIEW */
        {
          path: '/customerscyn',
          name: 'sync-customer',
          meta: { title: 'Assign Roles', resource: 'Permissions', action: 'manage' },
          component: () => import('@/views/customersync'),
        },
        {
          path: '/validasiharga',
          name: 'validasi-harga',
          meta: { title: 'Validasi Harga', resource: 'validasiHarga', action: 'read' },
          component: () => import('@/views/validasiharga'),
        },

        {
          path: '/datasales',
          name: 'data-sales',
          meta: { title: 'Data Sales', resource: 'DataSales', action: 'read' },
          component: () => import('@/views/datasales'),
        },

        // ========== Start of Iqbal View ==========
        {
          path: '/report/customer_mapping',
          meta: { title: 'Customer Mapping', resource: 'CustomerMapping', action: 'manage' },
          component: () => import('@/views/reportadmin/customermapping'),
        },
        {
          path: '/log-sync-customer',
          meta: { title: 'Log Sync Customer', resource: 'SynCustomer', action: 'manage' },
          component: () => import('@/views/logasyncustomer'),
        },
        // ========== End of iqbal View ==========
      ],
    },

    // System Pages
    // ======================= Start Iqbal ====================
    {
      path: '/',
      name: 'LandingPage',
      redirect: '/',
      component: LandingPage,
      children: [
        {
          path: '/',
          name: 'LandingPage',
          meta: {
            title: 'Landing Page',
            resource: 'Auth',
            action: 'read',
          },
          component: () => import(/* webpackChunkName: "landing-page" */ '@/views/LandingPage'),
        },
      ],
    },
    // ======================= Start Iqbal ====================

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
