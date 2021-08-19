<template>
  <div />
</template>

<script>
// antd core & themes styles
import 'ant-design-vue/lib/style/index.less'
import '@/styles/css/vendors/antd/themes/default.less'
import '@/styles/css/vendors/antd/themes/dark.less'

// third-party plugins styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'he-tree-vue/dist/he-tree-vue.css'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

// vb vendors styles
import '@/styles/css/vendors/antd/style.scss'
import '@/styles/css/vendors/bootstrap/style.scss'
import '@/styles/css/vendors/nprogress/style.scss'
import '@/styles/css/vendors/he-tree-vue/style.scss'
import '@/styles/css/vendors/perfect-scrollbar/style.scss'
import '@/styles/css/vendors/quill/style.scss'

// vb styles
import '@/styles/css/core.scss'
import '@/styles/css/measurements.scss'
import '@/styles/css/colors.scss'
import '@/styles/css/utils.scss'
import '@/styles/css/layout.scss'
import '@/styles/css/router.scss'

// vb extra styles
import '@/styles/css/extra/clean.scss' // clean styles
import '@/styles/css/extra/air.scss' // air styles

// change theme & variant and url listeners logic
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'StyleLoader',
  setup() {
    const route = useRoute()
    const store = useStore()
    const query = computed(() => route.query)
    const version = computed(() => store.getters.settings.version)
    const theme = computed(() => store.getters.settings.theme)
    const primaryColor = computed(() => store.getters.settings.primaryColor)

    // watch queryParams change
    watch(query, query => store.commit('SETUP_URL_SETTINGS', query))

    // listen & set vb-version (pro, air, fluent, ...)
    watch(version, version => {
      document.querySelector('html').setAttribute('data-vb-version', version)
    })

    // listen & set vb-theme (dark, default, ...)
    watch(theme, theme => {
      document.querySelector('html').setAttribute('data-vb-theme', theme)
      store.commit('CHANGE_SETTING', {
        setting: 'menuColor',
        value: theme === 'dark' ? 'dark' : 'white',
      })
    })

    // listen & set primaryColor
    watch(primaryColor, primaryColor => {
      const styleElement = document.querySelector('#primaryColor')
      if (styleElement) {
        styleElement.remove()
      }
      const body = document.querySelector('body')
      const styleEl = document.createElement('style')
      const css = document.createTextNode(`:root { --vb-color-primary: ${primaryColor};}`)
      styleEl.setAttribute('id', 'primaryColor')
      styleEl.appendChild(css)
      body.appendChild(styleEl)
    })
  },
}
</script>
