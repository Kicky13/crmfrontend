<template>
  <a-layout class="vb__layout">
    <a-layout-content>
      <div
        :class="{
          [$style.container]: true,
          vb__layout__squaredBorders: settings.isSquaredBorders,
          vb__layout__cardsShadow: settings.isCardShadow,
          vb__layout__borderless: settings.isBorderless,
          [$style.white]: settings.authPagesColor === 'white',
          [$style.gray]: settings.authPagesColor === 'gray',
        }"
        :style="{
          backgroundImage:
            settings.authPagesColor === 'image'
              ? `url(resources/images/content/photos/bg-crm.jpg)`
              : `url(resources/images/content/photos/bg-crm.jpg)`,
        }"
      >        
        <a-row style="height: 100vh;" class="text-center" align="middle">
          <a-col :lg="12" :md="12" :sm="24" :xs="24" class="d-none d-md-inline-block">
            <img src="@/assets/images/logo/preview-apps.png" alt="" class="img-fluid height-400">
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <div class="px-3">
              <router-view v-slot="{ Component }">
                <transition :name="settings.routerAnimation" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AuthLayout',
  computed: mapState(['settings']),
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
