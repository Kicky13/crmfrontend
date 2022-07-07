<template>
  <a-dropdown :trigger="['click']" placement="bottomRight">
    <div :class="$style.dropdown">
      <!-- <div :class="$style.flag">
        <i class="fa fa-bell-o" aria-hidden="true"></i>
      </div> -->
      <a-badge count="5">
        <a-avatar :src="require('@/assets/images/icon/bell.png')" shape="square" size="small" />
      </a-badge>
    </div>
    <template #overlay>
      <a-menu @click="selectLocale">
        <a-menu-item v-if="$store.state.user.levelHirarki.toLowerCase() === `asm`" key="approval">
          <span class="mr-5">
            Approval
          </span>

          <a-badge count="5"> </a-badge>
        </a-menu-item>
        <a-menu-item v-if="$store.state.user.levelHirarki.toLowerCase() === `mi`" key="publish">
          <span :class="$style.menuIcon">
            <img lazy="loading" v-once :src="mapFlags.ru" alt="French" />
          </span>
          <span class="mr-5">
            Publish
          </span>

          <a-badge count="5"> </a-badge>
        </a-menu-item>
        <a-menu-item
          v-if="
            $store.state.user.levelHirarki.toLowerCase() != `mi` &&
              $store.state.user.levelHirarki.toLowerCase() != `asm`
          "
          key="notifikasi"
        >
          <span class="mr-5">
            Notifikasi
          </span>

          <a-badge count="5"> </a-badge>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const mapFlags = {
      en: '/resources/flags/en.svg',
      ru: '/resources/flags/ru.svg',
      fr: '/resources/flags/fr.svg',
      zh: '/resources/flags/zh.svg',
    }

    const store = useStore()
    const settings = computed(() => store.getters.settings)
    const language = computed(() => store.getters.settings.locale.substr(0, 2))

    const selectLocale = item => {
      const setting = 'locale'
      store.commit('CHANGE_SETTING', { setting, value: item.key })
    }

    return {
      settings,
      language,
      selectLocale,
      mapFlags,
    }
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
