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
import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(Antd)
  .use(PerfectScrollbar)
  .use(VueBlocksTree, { treeName:'blocks-tree' })
  .use(abilitiesPlugin, ability, {
    useGlobalProperties: true,
  })
  .component(Can.name, Can)
  .mount('#app')
