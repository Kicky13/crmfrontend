<template>
  <a-layout class="vb__layout layout_auth">
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
      >
        <a-row style="" class="text-center" align="middle">
          <!-- <div class="round-header-circle hidden-sm hidden-xs">
            <div class="round-animate">
              <div class="round-1">
                <span class="r-1"></span>
                <span class="r-2"></span>
                <span class="r-3"></span>
                <span class="r-4"></span>
              </div>
              <div class="round-2">
                <span class="r-1"></span>
                <span class="r-2"></span>
                <span class="r-3"></span>
                <span class="r-4"></span>
              </div>
              <div class="round-3">
                <span class="r-1"></span>
                <span class="r-2"></span>
                <span class="r-3"></span>
                <span class="r-4"></span>
              </div>
            </div>
          </div>     -->
          <a-col
            :style="{
              backgroundImage:
                settings.authPagesColor === 'image'
                  ? `url(` + require('@/assets/LandingPage/images/MainBG.webp')
                  : `url(` + require('@/assets/LandingPage/images/MainBG.webp'),
            }"
            style="background-color: #b20838; height: 100vh;"
            :lg="12"
            :md="12"
            :sm="24"
            :xs="24"
            class="d-none d-md-inline-block left_side"
          >
            <img lazy="loading" v-once src="@/assets/images/logo/meeting-cuate.webp" alt="" class="img-fluid height-600" />
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
<style lang="scss" scoped>
@import '@/assets/scss/Login/index.scss';
</style>

<style lang="scss" scoped>
// @import '@/styles/css/LandingPage/animate.scss';
// .round-header-circle {
//   scale: 0.5;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   opacity: 0.5;
//   z-index: 0;
//   transform: translate(-50%, -50%);
// }

// .round-header-circle .round-1 .r-1,
// .round-header-circle .round-2 .r-1,
// .round-header-circle .round-3 .r-1 {
//   top: -5px;
//   margin-left: -5px;
// }

// .round-header-circle .round-animate {
//   width: 900px;
//   height: 900px;
//   position: relative;
//   display: inline-block;
// }

// .round-header-circle .round-animate .round-1 span,
// .round-header-circle .round-animate .round-2 span,
// .round-header-circle .round-animate .round-3 span {
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   border: 1px solid #fff;
//   position: absolute;
//   left: 50%;
// }

// .round-header-circle .round-animate .round-1 span {
//   border: 2px solid #8c1bff;
// }

// .round-header-circle .round-animate .round-2 span {
//   border: 2px solid #00ffc9;
// }

// .round-header-circle .round-animate .round-3 span {
//   border: 2px solid #b1af00;
// }

// .round-header-circle .round-animate .round-1,
// .round-header-circle .round-animate .round-2,
// .round-header-circle .round-animate .round-3 {
//   border: 1px solid rgba(255, 255, 255, 0.48);
//   border-radius: 50%;
//   position: absolute;
// }

// .round-header-circle .round-animate .round-1 {
//   width: 900px;
//   height: 900px;
//   transform: rotate(23deg);
//   animation: round-1 100s linear infinite;
// }

// .round-header-circle .round-animate .round-1 span.r-2 {
//   width: 50px;
//   height: 50px;
//   border: 8px solid #8c1bff;
// }

// .round-header-circle .round-animate .round-1 span.r-3 {
//   width: 20px;
//   height: 20px;
//   border: 3px solid #8c1bff;
// }

// .round-header-circle .round-animate .round-2 {
//   width: 700px;
//   top: 100px;
//   height: 700px;
//   left: 100px;
//   transform: rotate(-41deg);
//   animation: round-2 80s linear infinite;
// }

// .round-header-circle .round-animate .round-2 span.r-2 {
//   width: 30px;
//   height: 30px;
//   border: 5px solid #00ffc9;
// }

// .round-header-circle .round-animate .round-2 span.r-3 {
//   width: 30px;
//   height: 30px;
//   border: 8px solid #00ffc9;
// }

// .round-header-circle .round-animate .round-3 {
//   width: 500px;
//   top: 200px;
//   height: 500px;
//   left: 200px;
//   transform: rotate(0deg);
//   animation: round-3 60s linear infinite;
// }

// .round-header-circle .round-animate .round-3 span.r-2 {
//   width: 20px;
//   height: 20px;
//   border: 3px solid #adadad;
// }

// .round-header-circle .round-animate .round-3 span.r-3 {
//   width: 30px;
//   height: 30px;
//   border: 5px solid #adadad;
// }

// .round-header-circle .round-1 .r-2 {
//   margin-left: 343px;
//   top: 682px;
// }

// .round-header-circle .round-1 .r-3 {
//   margin-left: -424px;
//   top: 262px;
// }

// .round-header-circle .round-1 .r-4 {
//   margin-left: -338px;
//   top: 745px;
// }

// .round-header-circle .round-2 .r-2 {
//   margin-left: -354px;
//   top: 248px;
// }

// .round-header-circle .round-2 .r-3 {
//   margin-left: -198px;
//   top: 632px;
// }

// .round-header-circle .round-2 .r-4 {
//   margin-left: 192px;
//   top: 633px;
// }

// .round-header-circle .round-3 .r-2 {
//   margin-left: -254px;
//   top: 190px;
// }

// .round-header-circle .round-3 .r-3 {
//   margin-left: 2px;
//   top: 483px;
// }

// .round-header-circle .round-3 .r-4 {
//   margin-left: 244px;
//   top: 233px;
// }
</style>
