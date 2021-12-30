import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import AuthLayout from '@/layouts/Auth'
import MainLayout from '@/layouts/Main'
import LandingPage from '../views/LandingPage'
import Tree from '../views/usermanagement/tree/TreeHierarchy'
import store from '@/store'
import { canNavigate } from '@/services/ability/routeProtection'
const routes = [
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
        meta: { title: 'Dashboards', resource: 'Dashboard', action: 'read' },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard'),
      },
      // Fauzan ============ Start ===================>>
      {
        path: '/radiusdistrik',
        meta: {
          title: 'Mapping Customer',
          resource: 'Settings & Configuration',
          action: 'read',
        },
        component: () =>
          import(
            /* webpackChunkName: "radius-distrik" */ '@/views/radiusdistrik/radiusdistrikindex'
          ),
      },
      {
        path: '/mappingcustomer',
        meta: {
          title: 'Mapping Customer',
          resource: 'Settings & Configuration',
          action: 'read',
        },
        component: () =>
          import(
            /* webpackChunkName: "mapping-customer" */ '@/views/mappingcustomer/mappingcustomerindex'
          ),
      },
      {
        path: '/uploadvisitplan',
        meta: { title: 'Upload Visit', resource: 'VisitPlan', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "upload-visit-plan" */ '@/views/uploadvisitplan/uploadvisitplanindex'
          ),
      },
      {
        path: '/otomatisasivisit',
        meta: { title: 'Otomatisasi Visit', resource: 'VisitPlan', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "otomatisasi-visit" */ '@/views/otomatisasivisitplan/otomatisasivisitplanindex'
          ),
      },
      // Fauzan ============ End ===================>>
      // ========== Start of Varis View ==========
      {
        path: '/marketing/berita',
        meta: { title: 'Berita', resource: 'Berita', action: 'read' },
        component: () => import(/* webpackChunkName: "berita" */ '@/views/berita/Berita'),
      },
      {
        path: '/marketing/berita/tambah',
        meta: { title: 'Tambah Berita', resource: 'Tambah Berita', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "tambah-berita" */ '@/views/berita/tambah/Tambah'),
      },
      {
        path: '/marketing/berita/update/:artikelId',
        meta: { title: 'Update Berita', resource: 'Update Berita', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "update-berita" */ '@/views/berita/update/Update'),
      },
      {
        path: '/marketing/berita/detail/:artikelId',
        meta: { title: 'Detail Berita', resource: 'Detail Berita', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "detail-berita" */ '@/views/berita/detailberita/DetailBerita'
          ),
      },
      {
        path: '/user/level_user',
        meta: { title: 'Level User', resource: 'Level User', action: 'read' },
        component: () => import(/* webpackChunkName: "level-user" */ '@/views/leveluser/LevelUser'),
      },
      {
        path: '/sales/survey_sales',
        meta: { title: 'Survey Sales', resource: 'SurveySales', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "survey-sales" */ '@/views/surveysales/SurveySales'),
      },
      // ========== End of Varis View ==========
      {
        path: '/marketing/program',
        meta: { title: 'Program Hari Ini', resource: 'Program', action: 'read' },
        component: () => import(/* webpackChunkName: "program" */ '@/views/program'),
      },
      {
        path: '/marketing/program/tambah',
        meta: { title: 'Tambah Program', resource: 'Add_Program', action: 'create' },
        component: () => import(/* webpackChunkName: "tambah-program" */ '@/views/program/tambah'),
      },
      {
        path: '/marketing/program/edit/:userId',
        meta: { title: 'Edit Program', resource: 'Edit_Program', action: 'update' },
        component: () => import(/* webpackChunkName: "edit-program" */ '@/views/program/edit/Edit'),
      },
      {
        path: '/marketing/program/detailProgram/:userId',
        meta: { title: 'Detail Program', resource: 'Detail_Program', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "edit-program" */ '@/views/program/detailProgram'),
      },
      // Kikik ====================================================================
      {
        path: '/roles',
        meta: { title: 'Role Management', resource: 'Roles', action: 'read' },
        component: () => import(/* webpackChunkName: "roles" */ '@/views/roles'),
      },
      {
        path: '/roles/create',
        name: 'roles-create',
        meta: { title: 'Role Management', resource: 'Permissions', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "roles-create" */ '@/views/roles/forms/Insert'),
      },
      {
        path: '/roles/update',
        name: 'roles-update',
        props: true,
        meta: { title: 'Role Management', resource: 'Permissions', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "role-management" */ '@/views/roles/forms/Update'),
      },
      {
        path: '/permissions',
        meta: { title: 'Permissions', resource: 'Permissions', action: 'read' },
        component: () => import(/* webpackChunkName: "permission" */ '@/views/permissions'),
      },
      {
        path: '/permissions/create',
        name: 'permissions-create',
        meta: { title: 'Permissions', resource: 'Permissions', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "permision-creaate" */ '@/views/permissions/forms/Insert'),
      },
      {
        path: '/assignrole',
        meta: { title: 'Assign Roles', resource: 'Permissions', action: 'read' },
        component: () => import(/* webpackChunkName: "assign-role" */ '@/views/assignrole/Assign'),
      },
      {
        path: '/assignrole/create',
        name: 'assignrole-create',
        meta: { title: 'Assign Roles', resource: 'Permissions', action: 'create' },
        component: () =>
          import(/* webpackChunkName: "assingrole-cerate" */ '@/views/assignrole/forms/Insert'),
      },
      {
        path: '/assignrole/update',
        name: 'assignrole-update',
        props: true,
        meta: { title: 'Assign Roles', resource: 'Permissions', action: 'update' },
        component: () =>
          import(/* webpackChunkName: "assignrole-update" */ '@/views/assignrole/forms/Update'),
      },
      {
        path: '/users/hierarchy/preview',
        name: 'user-hierarchy-preview',
        meta: { title: 'User Management', resource: 'User', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "user-management-preview-import" */ '@/views/usermanagement/previewImportExcel'
          ),
      },
      {
        path: '/users/hierarchy',
        name: 'user-hierarchy',
        meta: { title: 'User Management', resource: 'User', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "user-management" */ '@/views/usermanagement/Hierarchy'),
      },
      {
        path: '/users',
        name: 'user-management',
        meta: { title: 'User Management', resource: 'User', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "user-management" */ '@/views/usermanagement/User'),
      },
      {
        path: '/users/export',
        name: 'user-management-export',
        meta: { title: 'Export User', resource: 'User', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "user-management-export" */ '@/views/usermanagement/forms/Export'
          ),
      },
      {
        path: '/users/profile/jabatan/:id_jabatan',
        name: 'user-management-profile',
        meta: { title: 'Export User', resource: 'User', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/usermanagement/profile/Profile'),
      },
      {
        path: '/listusers/history/userid/:userid',
        name: 'log-history',
        meta: { title: 'Export User', resource: 'User', action: 'read' },
        component: () => import(/* webpackChunkName: "profile" */ '@/views/listusers/history/Log'),
      },
      {
        path: '/users/list',
        name: 'list_user',
        meta: { title: 'User Management', resource: 'User', action: 'read' },
        component: () => import(/* webpackChunkName: "user-management" */ '@/views/listusers/List'),
      },
      {
        path: '/koordinatlock',
        name: 'koordinat-lock',
        meta: { title: 'Koordinat Lock', resource: 'Settings', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "koordinat-lock" */ '@/views/coordinatelock/Lock'),
      },
      {
        path: '/koordinatlock/detail/:id_toko/wilayah/:id_distrik',
        name: 'koordinat-lock-detail',
        meta: { title: 'Koordinat Lock', resource: 'Settings', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "koordinat-lock-detail" */ '@/views/coordinatelock/DetailLock'
          ),
      },
      {
        path: '/koordinatlock/:id_toko/survey-detail/:id_kunjungan',
        name: 'koordinat-lock-survey',
        props: true,
        meta: { title: 'Koordinat Lock', resource: 'Settings', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "koordinat-lock-survey" */ '@/views/coordinatelock/DetailSurvey'
          ),
      },
      // Kikik ============================================================================
      /*  ROBI VIEW */
      {
        path: '/customersync',
        name: 'sync-customer',
        meta: { title: 'Assign Roles', resource: 'Permissions', action: 'read' },
        component: () => import(/* webpackChunkName: "sync-customer" */ '@/views/customersync'),
      },
      {
        path: '/validasiharga',
        name: 'validasi-harga',
        meta: { title: 'Validasi Harga', resource: 'validasiHarga', action: 'read' },
        component: () => import(/* webpackChunkName: "validasi-harga" */ '@/views/validasiharga'),
      },

      {
        path: '/datasales',
        name: 'data-sales',
        meta: { title: 'Data Sales', resource: 'DataSales', action: 'read' },
        component: () => import(/* webpackChunkName: "data-sales" */ '@/views/datasales'),
      },

      {
        path: '/users/profile/SPC/:id_jabatan',
        name: 'user-management-profile-spc',
        meta: { title: 'Profile SPC', resource: 'User', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "profile-tso" */ '@/views/usermanagement/profileSPC'),
      },

      // ========== Start of Iqbal View ==========
      {
        path: '/profile',
        meta: { title: 'Profile User', resource: 'ProfileUser', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "profile-user" */ '@/views/profileUser/profile'),
      },

      {
        path: '/report/customer_mapping',
        meta: { title: 'Customer Mapping', resource: 'CustomerMapping', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "customer-mapping" */ '@/views/reportadmin/customermapping'),
      },
      {
        path: '/report/customer_mapping',
        meta: { title: 'Customer Mapping', resource: 'CustomerMapping', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "customer-mapping" */ '@/views/reportadmin/customermapping'),
      },
      {
        path: '/log-sync-customer',
        meta: { title: 'Log Sync Customer', resource: 'SynCustomer', action: 'read' },
        component: () => import(/* webpackChunkName: "sync-customer" */ '@/views/logasyncustomer'),
      },

      {
        path: '/users/profile/TSO/:id_jabatan',
        name: 'user-management-profile-tso',
        meta: { title: 'Profile TSO', resource: 'User', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "profile-tso" */ '@/views/usermanagement/profileTSO'),
      },
      {
        path: '/users/profile/sales-distributor/:id_jabatan',
        name: 'user-management-profile-sales-distributor',
        meta: { title: 'Profile Sales Distributor', resource: 'User', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "profile-sales-distributor" */ '@/views/usermanagement/profileSalesDistributor'
          ),
      },
      {
        path: '/users/profile/admin-distributor/:id_jabatan',
        name: 'user-management-profile-admin-distributor',
        meta: { title: 'Profile Admin Distributor', resource: 'User', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "profile-sales-distributor" */ '@/views/usermanagement/profileAdminDistributor'
          ),
      },
      {
        path: '/profile/tso',
        name: 'profile-tso',
        meta: { title: 'Profile Data TSO', resource: 'User', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "profile-sales-tso" */ '@/views/profileUser/profileTSO'),
      },
      // ========== End of iqbal View ==========
    ],
  },
  // Hierarchy Tree
  {
    path: '/hierarchy_tree/:id_jabatan',
    component: Tree,
    meta: {
      title: 'Hierarchy Tree',
      authRequired: true,
      hidden: true,
    },
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
        path: '/auth/underconstruct',
        name: 'underconstruct',
        meta: {
          title: 'Under Construct',
          resource: 'Auth',
          action: 'read',
        },
        component: () => import('@/views/auth/under-construct'),
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
]
const router = createRouter({
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  history: createWebHistory(),
  routes,
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
