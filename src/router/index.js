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
      {
        path: '/dashboard/promotion',
        meta: { title: 'Promotion', resource: 'Promotion', action: 'read' },
        component: () => import(/* webpackChunkName: "promotion" */ '@/views/dashboard/promotion'),
      },
      {
        path: '/dashboard/rbp_movement',
        meta: { title: 'RBP Movement', resource: 'RBPMovement', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "rbpmovement" */ '@/views/dashboard/rbpmovement'),
      },
      // {
      //   path: '/dashboard/rbp_movement_distributor',
      //   meta: {
      //     title: 'RBP Movement Distributor',
      //     resource: 'RBPMovementDistributor',
      //     action: 'read',
      //   },
      //   component: () =>
      //     import(/* webpackChunkName: "rbpmovement" */ '@/views/dashboard/rbpmovementdistributor'),
      // },
      // {
      //   path: '/dashboard/rbp_movement_tso',
      //   meta: {
      //     title: 'RBP Movement Distributor',
      //     resource: 'RBPMovementDistributor',
      //     action: 'read',
      //   },
      //   component: () =>
      //     import(/* webpackChunkName: "rbpmovement" */ '@/views/dashboard/rbpmovementTSO'),
      // },
      {
        path: '/dashboard/price_monitoring',
        meta: { title: 'Price Monitoring', resource: 'PriceMonitoring', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "pricemonitoring" */ '@/views/dashboard/pricemonitoring'),
      },
      {
        path: '/dashboard/volume_analytcs',
        meta: { title: 'CA & Volume Analytcs', resource: 'VolumeAnalytcs', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "volumeAnalytcs" */ '@/views/dashboard/volume_analytcs'),
      },
      // {
      //   path: '/dashboard/visit',
      //   meta: { title: 'Visit', resource: 'Visit', action: 'read' },
      //   component: () => import(/* webpackChunkName: "Visit" */ '@/views/dashboard/visit'),
      // },
      {
        path: '/dashboard/visit',
        meta: { title: 'Visit', resource: 'Visit', action: 'read' },
        component: () => import(/* webpackChunkName: "Visit" */ '@/views/dashboard/visitV2'),
      },
      // {
      //   path: '/dashboard/sow',
      //   meta: { title: 'Sow', resource: 'Sow', action: 'read' },
      //   component: () => import(/* webpackChunkName: "Sow" */ '@/views/dashboard/Sow'),
      // },
      {
        path: '/dashboard/sow',
        meta: { title: 'Sow', resource: 'Sow', action: 'read' },
        component: () => import(/* webpackChunkName: "Sow" */ '@/views/dashboard/SowV2'),
      },
      // {
      //   path: '/dashboard/sow-v3',
      //   meta: { title: 'Sow', resource: 'Sow', action: 'read' },
      //   component: () => import(/* webpackChunkName: "Sow" */ '@/views/dashboard/SowV3'),
      // },
      {
        path: '/dashboard/sales_route',
        name: 'dashbord_route',
        meta: { title: 'Dashboard', resource: 'UserHirarki', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "user-management" */ '@/views/dashboard/SalesRoute'),
      },

      // Master Data
      {
        path: '/master_data/tipe',
        meta: {
          title: 'Tipe',
          resource: 'Tipe',
          action: 'read',
        },
        component: () => import(/* webpackChunkName: "tipe" */ '@/views/masterdata/tipe'),
      },
      {
        path: '/master_data/kemasan',
        meta: {
          title: 'Kemasan',
          resource: 'Kemasan',
          action: 'read',
        },
        component: () => import(/* webpackChunkName: "kemasan" */ '@/views/masterdata/kemasan'),
      },
      {
        path: '/master_data/brand',
        meta: {
          title: 'Brand',
          resource: 'Brand',
          action: 'read',
        },
        component: () => import(/* webpackChunkName: "brand" */ '@/views/masterdata/brand'),
      },
      {
        path: '/master_data/produk',
        meta: {
          title: 'Produk',
          resource: 'Produk',
          action: 'read',
        },
        component: () => import(/* webpackChunkName: "produk" */ '@/views/masterdata/produk'),
      },
      {
        path: '/master_data/distrik_ret',
        meta: {
          title: 'Distrik RET',
          resource: 'DistrikRET',
          action: 'read',
        },
        component: () =>
          import(/* webpackChunkName: "distrik_ret" */ '@/views/masterdata/distrikRet'),
      },
      {
        path: '/master_data/kategori_promo',
        meta: {
          title: 'Kategori Promo',
          resource: 'KategoriPromo',
          action: 'read',
        },
        component: () =>
          import(/* webpackChunkName: "kategori_promo" */ '@/views/masterdata/kategoriPromo'),
      },
      {
        path: '/master_data/weekly_config',
        meta: {
          title: 'Weekly Config',
          resource: 'WeeklyConfig',
          action: 'read',
        },
        component: () =>
          import(/* webpackChunkName: "weekly_config" */ '@/views/masterdata/weeklyConfig'),
      },
      // Weekly Price Monitoring
      {
        path: '/weekly_price/weekly_input',
        meta: {
          title: 'Weekly Input',
          resource: 'WeeklyInput',
          action: 'read',
        },
        component: () =>
          import(/* webpackChunkName: "weekly_input" */ '@/views/weeklyprice/weeklyInput'),
      },
      {
        path: '/weekly_price/promotion',
        meta: {
          title: 'Promotion',
          resource: 'Promotion',
          action: 'read',
        },
        component: () =>
          import(/* webpackChunkName: "promotion" */ '@/views/weeklyprice/promotion'),
      },
      {
        path: '/weekly_price/wp_approval',
        meta: {
          title: 'WP Approval',
          resource: 'WPApproval',
          action: 'read',
        },
        component: () =>
          import(/* webpackChunkName: "wp_approval" */ '@/views/weeklyprice/wpApproval'),
      },
      {
        path: '/weekly_price/wp_publish',
        meta: {
          title: 'WP Publish',
          resource: 'WPPublish',
          action: 'read',
        },
        component: () =>
          import(/* webpackChunkName: "weekly_publish" */ '@/views/weeklyprice/wpPublish'),
      },
      // Reporting
      {
        path: '/wpm/report',
        meta: {
          title: 'Weekly Price Monitoring Report',
          resource: 'WPMReport',
          action: 'read',
        },
        component: () => import(/* webpackChunkName: "wpm_report" */ '@/views/wpm/report'),
      },
      {
        path: '/wpm/promotion',
        meta: {
          title: 'Weekly Price Monitoring Promotion',
          resource: 'WPMPromotion',
          action: 'read',
        },
        component: () => import(/* webpackChunkName: "wpm_promotion" */ '@/views/wpm/promotion'),
      },
      {
        path: '/wpm/price_movement',
        meta: {
          title: 'Weekly Price Monitoring Price Movement',
          resource: 'WPMPriceMovement',
          action: 'read',
        },
        component: () =>
          import(/* webpackChunkName: "wpm_price_movement" */ '@/views/wpm/price_movement'),
      },
      {
        path: '/wpm/gap_harga',
        meta: {
          title: 'Weekly Price Monitoring GAP Harga',
          resource: 'WPMGapHarga',
          action: 'read',
        },
        component: () => import(/* webpackChunkName: "wpm_gap_harga" */ '@/views/wpm/gap_harga'),
      },
      // Fauzan ============ Start ===================>>
      {
        path: '/radiusdistrik',
        meta: {
          title: 'Radius Distrik',
          resource: 'RadiusDistrik',
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
          resource: 'MappingCustomer',
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
        meta: { title: 'Tambah Berita', resource: 'Berita', action: 'create' },
        component: () =>
          import(/* webpackChunkName: "tambah-berita" */ '@/views/berita/tambah/Tambah'),
      },
      {
        path: '/marketing/berita/update/:artikelId',
        meta: { title: 'Update Berita', resource: 'Berita', action: 'update' },
        component: () =>
          import(/* webpackChunkName: "update-berita" */ '@/views/berita/update/Update'),
      },
      {
        path: '/marketing/berita/detail/:artikelId',
        meta: { title: 'Detail Berita', resource: 'Berita', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "detail-berita" */ '@/views/berita/detailberita/DetailBerita'
          ),
      },
      {
        path: '/user/level_user',
        meta: { title: 'Level User', resource: 'LevelUser', action: 'read' },
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
        meta: { title: 'Tambah Program', resource: 'Program', action: 'create' },
        component: () => import(/* webpackChunkName: "tambah-program" */ '@/views/program/tambah'),
      },
      {
        path: '/marketing/program/edit/:userId',
        meta: { title: 'Edit Program', resource: 'Program', action: 'update' },
        component: () => import(/* webpackChunkName: "edit-program" */ '@/views/program/edit/Edit'),
      },
      {
        path: '/marketing/program/detailProgram/:userId',
        meta: { title: 'Detail Program', resource: 'Program', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "edit-program" */ '@/views/program/detailProgram'),
      },
      {
        path: '/users/hierarchy/preview',
        name: 'user-hierarchy-preview',
        meta: { title: 'User Management', resource: 'UserHirarki', action: 'update' },
        component: () =>
          import(
            /* webpackChunkName: "user-management-preview-import" */ '@/views/usermanagement/previewImportExcel'
          ),
      },
      {
        path: '/users/hierarchy',
        name: 'user-hierarchy',
        meta: { title: 'User Management', resource: 'UserHirarki', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "user-management" */ '@/views/usermanagement/Hierarchy'),
      },
      {
        path: '/users',
        name: 'user-management',
        meta: { title: 'User Management', resource: 'UserManagement', action: 'create' },
        component: () =>
          import(/* webpackChunkName: "user-management" */ '@/views/usermanagement/User'),
      },
      {
        path: '/users/export',
        name: 'user-management-export',
        meta: { title: 'User Management', resource: 'UserManagement', action: 'create' },
        component: () =>
          import(
            /* webpackChunkName: "user-management-export" */ '@/views/usermanagement/forms/Export'
          ),
      },
      {
        path: '/users/profile/jabatan/:id_jabatan',
        name: 'user-management-profile',
        meta: { title: 'User Management', resource: 'UserManagement', action: 'update' },
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/usermanagement/profile/Profile'),
      },
      {
        path: '/listusers/history/userid/:userid',
        name: 'log-history',
        meta: { title: 'Export User', resource: 'UserManagement', action: 'update' },
        component: () => import(/* webpackChunkName: "profile" */ '@/views/listusers/history/Log'),
      },
      {
        path: '/users/list',
        name: 'list_user',
        meta: { title: 'User Management', resource: 'UserManagement', action: 'read' },
        component: () => import(/* webpackChunkName: "user-management" */ '@/views/listusers/List'),
      },
      {
        path: '/koordinatlock',
        name: 'koordinat-lock',
        meta: { title: 'Koordinat Lock', resource: 'CoordLock', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "koordinat-lock" */ '@/views/coordinatelock/Lock'),
      },
      {
        path: '/koordinatlock/detail/:id_toko/wilayah/:id_distrik',
        name: 'koordinat-lock-detail',
        meta: { title: 'Koordinat Lock', resource: 'CoordLock', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "koordinat-lock-detail" */ '@/views/coordinatelock/DetailLock'
          ),
      },
      {
        path: '/koordinatlock/:id_toko/survey-detail/:id_kunjungan',
        name: 'koordinat-lock-survey',
        props: true,
        meta: { title: 'Koordinat Lock', resource: 'CoordLock', action: 'read' },
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
        meta: { title: 'Assign Roles', resource: 'SynCustomer', action: 'read' },
        component: () => import(/* webpackChunkName: "sync-customer" */ '@/views/customersync'),
      },
      {
        path: '/validasiharga',
        name: 'validasi-harga',
        meta: { title: 'Validasi Harga', resource: 'ValidasiHarga', action: 'read' },
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
        meta: { title: 'Profile SPC', resource: 'UserManagement', action: 'read' },
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
        path: '/reporting-tso/customer-mapping',
        meta: { title: 'Customer Mapping', resource: 'CustomerMappingTSO', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "reportingTSO-customer-mapping" */ '@/views/reportingTSO/CustomerMapping'
          ),
      },
      {
        path: '/reporting-tso/sales-distributor',
        meta: { title: 'Sales Distributor', resource: 'CustomerMappingTSO', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "reportingTSO-customer-mapping" */ '@/views/reportingTSO/SalesDistributor'
          ),
      },
      {
        path: '/reporting/customer-mapping',
        meta: { title: 'Customer Mapping', resource: 'CustomerMapping', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "reportingTSO-customer-mapping" */ '@/views/reporting/CustomerMapping'
          ),
      },
      {
        path: '/reporting/sales-distributor',
        meta: { title: 'Sales Distributor', resource: 'SalesDistributor', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "reportingTSO-customer-mapping" */ '@/views/reporting/SalesDistributor'
          ),
      },
      {
        path: '/report/customer_mapping',
        meta: { title: 'Customer Mapping', resource: 'MappingCustomer', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "customer-mapping" */ '@/views/reportadmin/customermapping'),
      },
      {
        path: '/report/customer_mapping',
        meta: { title: 'Customer Mapping', resource: 'MappingCustomer', action: 'read' },
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
        meta: { title: 'Profile TSO', resource: 'UserManagement', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "profile-tso" */ '@/views/usermanagement/profileTSO'),
      },
      {
        path: '/users/profile/sales-distributor/:id_jabatan',
        name: 'user-management-profile-sales-distributor',
        meta: { title: 'Profile Sales Distributor', resource: 'UserManagement', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "profile-sales-distributor" */ '@/views/usermanagement/profileSalesDistributor'
          ),
      },
      {
        path: '/users/profile/admin-distributor/:id_jabatan',
        name: 'user-management-profile-admin-distributor',
        meta: { title: 'Profile Admin Distributor', resource: 'UserManagement', action: 'read' },
        component: () =>
          import(
            /* webpackChunkName: "profile-sales-distributor" */ '@/views/usermanagement/profileAdminDistributor'
          ),
      },
      {
        path: '/profile/tso',
        name: 'profile-tso',
        meta: { title: 'Profile Data TSO', resource: 'UserManagement', action: 'read' },
        component: () =>
          import(/* webpackChunkName: "profile-sales-tso" */ '@/views/profileUser/profileTSO'),
      },
      {
        path: '/reporting',
        name: 'reporting',
        meta: { title: 'Reporting', resource: 'Reporting', action: 'read' },
        component: () => import(/* webpackChunkName: "reporting" */ '@/views/reporting'),
      },
      {
        path: '/penarikan-data/report-visit',
        name: 'penarikan-data-report-visit',
        meta: {
          title: 'Penarikan Data Report Visit',
          resource: 'PenarikanDataReportVisit',
          action: 'read',
        },
        component: () =>
          import(
            /* webpackChunkName: "penarikan-data-report-visit" */ '@/views/penarikan-data/ReportVisit'
          ),
      },
      {
        path: '/penarikan-data/hasil-survey',
        name: 'penarikan-data-hasil-survey',
        meta: {
          title: 'Penarikan Data Hasil Survey',
          resource: 'PenarikanDataHasilSurvey',
          action: 'read',
        },
        component: () =>
          import(
            /* webpackChunkName: "penarikan-data-hasil-survey" */ '@/views/penarikan-data/HasilSurvey'
          ),
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
        path: '/auth/403',
        name: 'route403',
        meta: {
          title: 'Error 403',
          resource: 'Auth',
          action: 'read',
        },
        component: () => import('@/views/auth/403'),
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
        next()
      }
    }
  } else {
    if (canNavigate(to)) {
      next()
    } else {
      next()
    }
  }
})

export default router
