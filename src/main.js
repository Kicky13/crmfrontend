import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { i18n } from './localization'
import ability from '@/services/ability/ability'
import { Can, abilitiesPlugin } from '@casl/vue'
import './services/axios/fakeApi' // mocking api


createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(Antd)
  .use(PerfectScrollbar)
  .use(abilitiesPlugin, ability, {
    useGlobalProperties: true,
  })
  .component(Can.name, Can)
  .mount('#app')
