<template>
  <div :class="$style.topbar">
    <div class="mr-4">
      <vb-fav-pages />
    </div>
    <div class="mr-auto mr-md-1">
      <vb-search />
    </div>
    <div class="mr-3 d-none d-sm-block ml-auto">
      <vb-theme />
    </div>
    <div class="mr-3 d-none d-sm-block">
      <vb-language-switcher />
    </div>
    <div>
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

export default {
  components: {
    VbSearch,
    VbLanguageSwitcher,
    VbUserMenu,
    VbFavPages,
    VbTheme,
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
