<template>
  <div :class="$style.topbar" id="header-top">
    <div class="mr-4">
      <!-- <vb-fav-pages /> -->
    </div>
    <div class="mr-auto mr-md-1">
      <!-- <vb-search /> -->
    </div>

    <div class="mr-3 d-none d-sm-block ml-auto">
      <vb-theme />
    </div>
    <div class="mr-3 d-none d-sm-block">
      <vb-notification />
    </div>
    <div class="mr-auto mr-md-1">
      <vb-user-menu />
    </div>
  </div>
</template>

<script>
// import VbIssuesHistory from './IssuesHistory'
// import VbProjectManagement from './ProjectManagement'
import VbSearch from './Search'
import VbLanguageSwitcher from './LanguageSwitcher'
// import VbActions from './Actions'
import VbUserMenu from './UserMenu'
import VbFavPages from './FavPages'
// import VbCart from './Cart'
import VbTheme from './Theme'
import VbNotification from './Notification'

export default {
  components: {
    // VbSearch,
    // VbLanguageSwitcher,
    VbUserMenu,
    // VbFavPages,
    VbNotification,
    VbTheme,
  },

  mounted() {
    window.onscroll = function() {
      onWindowScroll()
    }

    let header = document.getElementById('header-top')
    function onWindowScroll() {
      if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
        header.classList.add('sticky')
      } else {
        header.classList.remove('sticky')
      }
    }
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>

<style lang="scss" scoped>
@media screen and (max-width: 768px) and (min-width: 768px) {
  .sticky {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
  }
}
@media screen and (max-width: 1366px) and (min-width: 1366px) {
  .sticky {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
  }
}

@media screen and (max-width: 1024px) and (min-width: 1024px) {
  .sticky {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
  }
}
@media screen and (max-width: 1440px) and (min-width: 1440px) {
  .sticky {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
  }
}
</style>
