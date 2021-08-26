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
          path: '/marketing/artikel',
          meta: { title: 'Artikel', resource: 'Artikel', action: 'manage' },
          component: () => import('@/views/artikel/Artikel'),
        },
        {
          path: '/marketing/artikel/tambah',
          meta: { title: 'Tambah Artikel', resource: 'Tambah Artikel', action: 'manage' },
          component: () => import('@/views/artikel/tambah/Tambah'),
        },
        {
          path: '/marketing/artikel/edit/:userId',
          meta: { title: 'Edit Artikel', resource: 'Edit Artikel', action: 'manage' },
          component: () => import('@/views/artikel/edit/Edit'),
        },
        {
          path: '/program',
          meta: { title: 'Program Hari Ini', resource: 'Program', action: 'manage' },
          component: () => import('@/views/program'),
        },
        {
          path: '/program/tambah',
          meta: { title: 'Tambah Program', resource: 'Program', action: 'manage' },
          component: () => import('@/views/program/tambah'),
        },
        {
          path: '/user/level_user',
          meta: { title: 'Level User', resource: 'Level User', action: 'manage' },
          component: () => import('@/views/user/LevelUser'),
        },
        {
          path: '/roles/create',
          name: 'roles-create',
          meta: { title: 'Role Management', resource: 'Permissions', action: 'manage' },
          component: () => import('@/views/roles/forms/Insert'),
        },
        {
          path: '/roles',
          meta: { title: 'Role Management', resource: 'Roles', action: 'manage' },
          component: () => import('@/views/roles'),
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
        // {
        //   path: '/dashboard/alpha',
        //   meta: { title: 'Dashboard Alpha', resource: 'Dashboard', action: 'manage' },
        //   component: () => import('@/views/dashboard/alpha'),
        // },
        // {
        //   path: '/dashboard/beta',
        //   meta: { title: 'Dashboard Beta', resource: 'Dashboard', action: 'manage' },
        //   component: () => import('@/views/dashboard/beta'),
        // },
        // {
        //   path: '/dashboard/gamma',
        //   meta: { title: 'Dashboard Gamma', resource: 'Dashboard', action: 'manage' },
        //   component: () => import('@/views/dashboard/gamma'),
        // },
        // {
        //   path: '/dashboard/crypto',
        //   meta: { title: 'Crypto Terminal', resource: 'Dashboard', action: 'manage' },
        //   component: () => import('@/views/dashboard/crypto'),
        // },
        // {
        //   path: '/apps',
        //   meta: { title: 'Apps', resource: 'Apps', action: 'manage' },
        //   component: () => import('@/views/apps'),
        // },
        // {
        //   path: '/apps/profile',
        //   meta: { title: 'Profile', resource: 'Apps', action: 'manage' },
        //   component: () => import('@/views/apps/profile'),
        // },
        // {
        //   path: '/apps/calendar',
        //   meta: { title: 'Calendar', resource: 'Apps', action: 'manage' },
        //   component: () => import('@/views/apps/calendar'),
        // },
        // {
        //   path: '/apps/gallery',
        //   meta: { title: 'Gallery', resource: 'Apps', action: 'manage' },
        //   component: () => import('@/views/apps/gallery'),
        // },
        // {
        //   path: '/apps/messaging',
        //   meta: { title: 'Messaging', resource: 'Apps', action: 'manage' },
        //   component: () => import('@/views/apps/messaging'),
        // },
        // {
        //   path: '/apps/mail',
        //   meta: { title: 'Mail', resource: 'Apps', action: 'manage' },
        //   component: () => import('@/views/apps/mail'),
        // },
        // {
        //   path: '/extra-apps',
        //   meta: { title: 'Extra Apps', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps'),
        // },
        // {
        //   path: '/extra-apps/github-explore',
        //   meta: { title: 'Github Explore', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/github-explore'),
        // },
        // {
        //   path: '/extra-apps/github-discuss',
        //   meta: { title: 'Github Discuss', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/github-discuss'),
        // },
        // {
        //   path: '/extra-apps/digitalocean-droplets',
        //   meta: { title: 'Digitalocean Droplets', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/digitalocean-droplets'),
        // },
        // {
        //   path: '/extra-apps/digitalocean-create',
        //   meta: { title: 'Digitalocean Create', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/digitalocean-create'),
        // },
        // {
        //   path: '/extra-apps/google-analytics',
        //   meta: { title: 'Google Analytics', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/google-analytics'),
        // },
        // {
        //   path: '/extra-apps/wordpress-post',
        //   meta: { title: 'Wordpress Post', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/wordpress-post'),
        // },
        // {
        //   path: '/extra-apps/wordpress-posts',
        //   meta: { title: 'Wordpress Posts', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/wordpress-posts'),
        // },
        // {
        //   path: '/extra-apps/wordpress-add',
        //   meta: { title: 'Wordpress Add', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/wordpress-add'),
        // },
        // {
        //   path: '/extra-apps/todoist-list',
        //   meta: { title: 'Todoist List', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/todoist-list'),
        // },
        // {
        //   path: '/extra-apps/jira-dashboard',
        //   meta: { title: 'Jira Dashboard', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/jira-dashboard'),
        // },
        // {
        //   path: '/extra-apps/jira-agile-board',
        //   meta: { title: 'Jira Agile Board', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/jira-agile-board'),
        // },
        // {
        //   path: '/extra-apps/helpdesk-dashboard',
        //   meta: { title: 'Helpdesk Dashboard', resource: 'ExtraApps', action: 'manage' },
        //   component: () => import('@/views/extra-apps/helpdesk-dashboard'),
        // },
        // {
        //   path: '/ecommerce',
        //   meta: { title: 'Ecommerce', resource: 'Ecommerce', action: 'manage' },
        //   component: () => import('@/views/ecommerce'),
        // },
        // {
        //   path: '/ecommerce/dashboard',
        //   meta: { title: 'Dashboard', resource: 'Ecommerce', action: 'manage' },
        //   component: () => import('@/views/ecommerce/dashboard'),
        // },
        // {
        //   path: '/ecommerce/orders',
        //   meta: { title: 'Orders', resource: 'Ecommerce', action: 'manage' },
        //   component: () => import('@/views/ecommerce/orders'),
        // },
        // {
        //   path: '/ecommerce/product-catalog',
        //   meta: { title: 'Product Catalog', resource: 'Ecommerce', action: 'manage' },
        //   component: () => import('@/views/ecommerce/product-catalog'),
        // },
        // {
        //   path: '/ecommerce/product-details',
        //   meta: { title: 'Product Details', resource: 'Ecommerce', action: 'manage' },
        //   component: () => import('@/views/ecommerce/product-details'),
        // },
        // {
        //   path: '/ecommerce/cart',
        //   meta: { title: 'Cart', resource: 'Ecommerce', action: 'manage' },
        //   component: () => import('@/views/ecommerce/cart'),
        // },
        // {
        //   path: '/ui-kits/antd',
        //   meta: { title: 'Ant Design', resource: 'UiKits', action: 'manage' },
        //   component: () => import('@/views/ui-kits/antd'),
        // },
        // {
        //   path: '/ui-kits/bootstrap',
        //   meta: { title: 'Bootstrap', resource: 'UiKits', action: 'manage' },
        //   component: () => import('@/views/ui-kits/bootstrap'),
        // },
        // {
        //   path: '/widgets',
        //   meta: { title: 'Widgets', resource: 'Widgets', action: 'manage' },
        //   component: () => import('@/views/widgets'),
        // },
        // {
        //   path: '/widgets/general',
        //   meta: { title: 'General', resource: 'Widgets', action: 'manage' },
        //   component: () => import('@/views/widgets/general'),
        // },
        // {
        //   path: '/widgets/lists',
        //   meta: { title: 'Lists', resource: 'Widgets', action: 'manage' },
        //   component: () => import('@/views/widgets/lists'),
        // },
        // {
        //   path: '/widgets/tables',
        //   meta: { title: 'Tables', resource: 'Widgets', action: 'manage' },
        //   component: () => import('@/views/widgets/tables'),
        // },
        // {
        //   path: '/widgets/charts',
        //   meta: { title: 'Charts', resource: 'Widgets', action: 'manage' },
        //   component: () => import('@/views/widgets/charts'),
        // },
        // {
        //   path: '/cards',
        //   meta: { title: 'Cards', resource: 'Cards', action: 'manage' },
        //   component: () => import('@/views/cards'),
        // },
        // {
        //   path: '/cards/basic',
        //   meta: { title: 'Basic Cards', resource: 'Cards', action: 'manage' },
        //   component: () => import('@/views/cards/basic'),
        // },
        // {
        //   path: '/cards/tabbed',
        //   meta: { title: 'Tabbed Cards', resource: 'Cards', action: 'manage' },
        //   component: () => import('@/views/cards/tabbed'),
        // },
        // {
        //   path: '/tables',
        //   meta: { title: 'Tables', resource: 'Tables', action: 'manage' },
        //   component: () => import('@/views/tables'),
        // },
        // {
        //   path: '/tables/antd',
        //   meta: { title: 'Ant Design', resource: 'Tables', action: 'manage' },
        //   component: () => import('@/views/tables/antd'),
        // },
        // {
        //   path: '/tables/bootstrap',
        //   meta: { title: 'Bootstrap', resource: 'Tables', action: 'manage' },
        //   component: () => import('@/views/tables/bootstrap'),
        // },
        // {
        //   path: '/charts',
        //   meta: { title: 'Charts', resource: 'Charts', action: 'manage' },
        //   component: () => import('@/views/charts'),
        // },
        // {
        //   path: '/charts/chartistjs',
        //   meta: { title: 'Chartist.js', resource: 'Charts', action: 'manage' },
        //   component: () => import('@/views/charts/chartistjs'),
        // },
        // {
        //   path: '/charts/chartjs',
        //   meta: { title: 'Chart.js', resource: 'Charts', action: 'manage' },
        //   component: () => import('@/views/charts/chartjs'),
        // },
        // {
        //   path: '/charts/C3',
        //   meta: { title: 'C3', resource: 'Charts', action: 'manage' },
        //   component: () => import('@/views/charts/C3'),
        // },
        // {
        //   path: '/icons',
        //   meta: { title: 'Icons', resource: 'Icons', action: 'manage' },
        //   component: () => import('@/views/icons'),
        // },
        // {
        //   path: '/icons/feather-icons',
        //   meta: { title: 'Feather Icons', resource: 'Icons', action: 'manage' },
        //   component: () => import('@/views/icons/feather-icons'),
        // },
        // {
        //   path: '/icons/fontawesome',
        //   meta: { title: 'Fontawesome', resource: 'Icons', action: 'manage' },
        //   component: () => import('@/views/icons/fontawesome'),
        // },
        // {
        //   path: '/icons/linearicons-free',
        //   meta: { title: 'Linearicons', resource: 'Icons', action: 'manage' },
        //   component: () => import('@/views/icons/linearicons-free'),
        // },
        // {
        //   path: '/icons/icomoon-free',
        //   meta: { title: 'Icomoon Free', resource: 'Icons', action: 'manage' },
        //   component: () => import('@/views/icons/icomoon-free'),
        // },
        // {
        //   path: '/advanced/form-examples',
        //   meta: { title: 'Form Examples', resource: 'Forms', action: 'manage' },
        //   component: () => import('@/views/advanced/form-examples'),
        // },
        // {
        //   path: '/advanced/email-templates',
        //   meta: { title: 'Email Templates', resource: 'Advances', action: 'manage' },
        //   component: () => import('@/views/advanced/email-templates'),
        // },
        // {
        //   path: '/advanced/pricing-tables',
        //   meta: { title: 'Pricing Tables', resource: 'Advances', action: 'manage' },
        //   component: () => import('@/views/advanced/pricing-tables'),
        // },
        // {
        //   path: '/advanced/invoice',
        //   meta: { title: 'Invoice', resource: 'Advances', action: 'manage' },
        //   component: () => import('@/views/advanced/invoice'),
        // },
        // {
        //   path: '/advanced/utilities',
        //   meta: { title: 'Utilities', resource: 'Advances', action: 'manage' },
        //   component: () => import('@/views/advanced/utilities'),
        // },
        // {
        //   path: '/advanced/grid',
        //   meta: { title: 'Grid', resource: 'Advances', action: 'manage' },
        //   component: () => import('@/views/advanced/grid'),
        // },
        // {
        //   path: '/advanced/typography',
        //   meta: { title: 'Typography', resource: 'Advances', action: 'manage' },
        //   component: () => import('@/views/advanced/typography'),
        // },
        // {
        //   path: '/advanced/colors',
        //   meta: { title: 'Colors', resource: 'Advances', action: 'manage' },
        //   component: () => import('@/views/advanced/colors'),
        // },
        // {
        //   path: '/nested',
        //   meta: { title: 'Nested Items', resource: 'Nested', action: 'manage' },
        //   component: () => import('@/views/nested'),
        // },
        // {
        //   path: '/nested/1',
        //   meta: { title: 'Level 1', resource: 'Nested', action: 'manage' },
        //   component: () => import('@/views/nested/1'),
        // },
        // {
        //   path: '/nested/2',
        //   meta: { title: 'Level 2', resource: 'Nested', action: 'manage' },
        //   component: () => import('@/views/nested/2'),
        // },

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
