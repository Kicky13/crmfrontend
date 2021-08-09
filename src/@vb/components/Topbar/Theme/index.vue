<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>Switch Dark / Light Theme</span>
    </template>
    <a
      href="javascript: void(0);"
      @click="changeSettingValue(settings.theme === 'default' ? 'dark' : 'default', 'theme')"
      :class="$style.dropdown"
    >
      <i v-if="settings.theme === 'default'" class="fe fe-moon" :class="$style.icon" />
      <i v-if="settings.theme !== 'default'" class="fe fe-sun" :class="$style.icon" />
    </a>
  </a-tooltip>
</template>

<script>
import { computed } from 'vue'
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
