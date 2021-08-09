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
          meta: { title: 'Dashboards' },
          component: () => import('./views/dashboard'),
        },
        {
          path: '/dashboard/alpha',
          meta: { title: 'Dashboard Alpha' },
          component: () => import('./views/dashboard/alpha'),
        },
        {
          path: '/dashboard/beta',
          meta: { title: 'Dashboard Beta' },
          component: () => import('./views/dashboard/beta'),
        },
        {
          path: '/dashboard/gamma',
          meta: { title: 'Dashboard Gamma' },
          component: () => import('./views/dashboard/gamma'),
        },
        {
          path: '/dashboard/crypto',
          meta: { title: 'Crypto Terminal' },
          component: () => import('./views/dashboard/crypto'),
        },
        {
          path: '/apps',
          meta: { title: 'Apps' },
          component: () => import('./views/apps'),
        },
        {
          path: '/apps/profile',
          meta: { title: 'Profile' },
          component: () => import('./views/apps/profile'),
        },
        {
          path: '/apps/calendar',
          meta: { title: 'Calendar' },
          component: () => import('./views/apps/calendar'),
        },
        {
          path: '/apps/gallery',
          meta: { title: 'Gallery' },
          component: () => import('./views/apps/gallery'),
        },
        {
          path: '/apps/messaging',
          meta: { title: 'Messaging' },
          component: () => import('./views/apps/messaging'),
        },
        {
          path: '/apps/mail',
          meta: { title: 'Mail' },
          component: () => import('./views/apps/mail'),
        },
        {
          path: '/extra-apps',
          meta: { title: 'Extra Apps' },
          component: () => import('./views/extra-apps'),
        },
        {
          path: '/extra-apps/github-explore',
          meta: { title: 'Github Explore' },
          component: () => import('./views/extra-apps/github-explore'),
        },
        {
          path: '/extra-apps/github-discuss',
          meta: { title: 'Github Discuss' },
          component: () => import('./views/extra-apps/github-discuss'),
        },
        {
          path: '/extra-apps/digitalocean-droplets',
          meta: { title: 'Digitalocean Droplets' },
          component: () => import('./views/extra-apps/digitalocean-droplets'),
        },
        {
          path: '/extra-apps/digitalocean-create',
          meta: { title: 'Digitalocean Create' },
          component: () => import('./views/extra-apps/digitalocean-create'),
        },
        {
          path: '/extra-apps/google-analytics',
          meta: { title: 'Google Analytics' },
          component: () => import('./views/extra-apps/google-analytics'),
        },
        {
          path: '/extra-apps/wordpress-post',
          meta: { title: 'Wordpress Post' },
          component: () => import('./views/extra-apps/wordpress-post'),
        },
        {
          path: '/extra-apps/wordpress-posts',
          meta: { title: 'Wordpress Posts' },
          component: () => import('./views/extra-apps/wordpress-posts'),
        },
        {
          path: '/extra-apps/wordpress-add',
          meta: { title: 'Wordpress Add' },
          component: () => import('./views/extra-apps/wordpress-add'),
        },
        {
          path: '/extra-apps/todoist-list',
          meta: { title: 'Todoist List' },
          component: () => import('./views/extra-apps/todoist-list'),
        },
        {
          path: '/extra-apps/jira-dashboard',
          meta: { title: 'Jira Dashboard' },
          component: () => import('./views/extra-apps/jira-dashboard'),
        },
        {
          path: '/extra-apps/jira-agile-board',
          meta: { title: 'Jira Agile Board' },
          component: () => import('./views/extra-apps/jira-agile-board'),
        },
        {
          path: '/extra-apps/helpdesk-dashboard',
          meta: { title: 'Helpdesk Dashboard' },
          component: () => import('./views/extra-apps/helpdesk-dashboard'),
        },
        {
          path: '/ecommerce',
          meta: { title: 'Ecommerce' },
          component: () => import('./views/ecommerce'),
        },
        {
          path: '/ecommerce/dashboard',
          meta: { title: 'Dashboard' },
          component: () => import('./views/ecommerce/dashboard'),
        },
        {
          path: '/ecommerce/orders',
          meta: { title: 'Orders' },
          component: () => import('./views/ecommerce/orders'),
        },
        {
          path: '/ecommerce/product-catalog',
          meta: { title: 'Product Catalog' },
          component: () => import('./views/ecommerce/product-catalog'),
        },
        {
          path: '/ecommerce/product-details',
          meta: { title: 'Product Details' },
          component: () => import('./views/ecommerce/product-details'),
        },
        {
          path: '/ecommerce/cart',
          meta: { title: 'Cart' },
          component: () => import('./views/ecommerce/cart'),
        },
        {
          path: '/ui-kits/antd',
          meta: { title: 'Ant Design' },
          component: () => import('./views/ui-kits/antd'),
        },
        {
          path: '/ui-kits/bootstrap',
          meta: { title: 'Bootstrap' },
          component: () => import('./views/ui-kits/bootstrap'),
        },
        {
          path: '/widgets',
          meta: { title: 'Widgets' },
          component: () => import('./views/widgets'),
        },
        {
          path: '/widgets/general',
          meta: { title: 'General' },
          component: () => import('./views/widgets/general'),
        },
        {
          path: '/widgets/lists',
          meta: { title: 'Lists' },
          component: () => import('./views/widgets/lists'),
        },
        {
          path: '/widgets/tables',
          meta: { title: 'Tables' },
          component: () => import('./views/widgets/tables'),
        },
        {
          path: '/widgets/charts',
          meta: { title: 'Charts' },
          component: () => import('./views/widgets/charts'),
        },
        {
          path: '/cards',
          meta: { title: 'Cards' },
          component: () => import('./views/cards'),
        },
        {
          path: '/cards/basic',
          meta: { title: 'Basic Cards' },
          component: () => import('./views/cards/basic'),
        },
        {
          path: '/cards/tabbed',
          meta: { title: 'Tabbed Cards' },
          component: () => import('./views/cards/tabbed'),
        },
        {
          path: '/tables',
          meta: { title: 'Tables' },
          component: () => import('./views/tables'),
        },
        {
          path: '/tables/antd',
          meta: { title: 'Ant Design' },
          component: () => import('./views/tables/antd'),
        },
        {
          path: '/tables/bootstrap',
          meta: { title: 'Bootstrap' },
          component: () => import('./views/tables/bootstrap'),
        },
        {
          path: '/charts',
          meta: { title: 'Charts' },
          component: () => import('./views/charts'),
        },
        {
          path: '/charts/chartistjs',
          meta: { title: 'Chartist.js' },
          component: () => import('./views/charts/chartistjs'),
        },
        {
          path: '/charts/chartjs',
          meta: { title: 'Chart.js' },
          component: () => import('./views/charts/chartjs'),
        },
        {
          path: '/charts/C3',
          meta: { title: 'C3' },
          component: () => import('./views/charts/C3'),
        },
        {
          path: '/icons',
          meta: { title: 'Icons' },
          component: () => import('./views/icons'),
        },
        {
          path: '/icons/feather-icons',
          meta: { title: 'Feather Icons' },
          component: () => import('./views/icons/feather-icons'),
        },
        {
          path: '/icons/fontawesome',
          meta: { title: 'Fontawesome' },
          component: () => import('./views/icons/fontawesome'),
        },
        {
          path: '/icons/linearicons-free',
          meta: { title: 'Linearicons' },
          component: () => import('./views/icons/linearicons-free'),
        },
        {
          path: '/icons/icomoon-free',
          meta: { title: 'Icomoon Free' },
          component: () => import('./views/icons/icomoon-free'),
        },
        {
          path: '/advanced/form-examples',
          meta: { title: 'Form Examples' },
          component: () => import('./views/advanced/form-examples'),
        },
        {
          path: '/advanced/email-templates',
          meta: { title: 'Email Templates' },
          component: () => import('./views/advanced/email-templates'),
        },
        {
          path: '/advanced/pricing-tables',
          meta: { title: 'Pricing Tables' },
          component: () => import('./views/advanced/pricing-tables'),
        },
        {
          path: '/advanced/invoice',
          meta: { title: 'Invoice' },
          component: () => import('./views/advanced/invoice'),
        },
        {
          path: '/advanced/utilities',
          meta: { title: 'Utilities' },
          component: () => import('./views/advanced/utilities'),
        },
        {
          path: '/advanced/grid',
          meta: { title: 'Grid' },
          component: () => import('./views/advanced/grid'),
        },
        {
          path: '/advanced/typography',
          meta: { title: 'Typography' },
          component: () => import('./views/advanced/typography'),
        },
        {
          path: '/advanced/colors',
          meta: { title: 'Colors' },
          component: () => import('./views/advanced/colors'),
        },
        {
          path: '/nested',
          meta: { title: 'Nested Items' },
          component: () => import('./views/nested'),
        },
        {
          path: '/nested/1',
          meta: { title: 'Level 1' },
          component: () => import('./views/nested/1'),
        },
        {
          path: '/nested/2',
          meta: { title: 'Level 2' },
          component: () => import('./views/nested/2'),
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
          },
          component: () => import('./views/auth/404'),
        },
        {
          path: '/auth/500',
          meta: {
            title: 'Error 500',
          },
          component: () => import('./views/auth/500'),
        },
        {
          path: '/auth/login',
          name: 'login',
          meta: {
            title: 'Sign In',
          },
          component: () => import('./views/auth/login'),
        },
        {
          path: '/auth/register',
          meta: {
            title: 'Sign Up',
          },
          component: () => import('./views/auth/register'),
        },
        {
          path: '/auth/forgot-password',
          meta: {
            title: 'Forgot Password',
          },
          component: () => import('./views/auth/forgot-password'),
        },
        {
          path: '/auth/lockscreen',
          meta: {
            title: 'Lockscreen',
          },
          component: () => import('./views/auth/lockscreen'),
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
