<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>Switch Dark / Light Theme</span>
    </template>
    <a
      href="javascript: void(0);"
      :class="$style.icon"
      @click="changeSettingValue(settings.theme === 'default' ? 'dark' : 'default', 'theme')"
    >
      <i v-if="settings.theme === 'default'" class="fe fe-moon" />
      <i v-if="settings.theme !== 'default'" class="fe fe-sun" />
    </a>
  </a-tooltip>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const settings = computed(() => store.getters.settings)

    const changeSettingValue = (value, setting) => {
      store.commit('CHANGE_SETTING', { setting, value })
    }

    return {
      settings,

      changeSettingValue,
    }
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
