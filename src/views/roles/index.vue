<template>
  <div>
    <div :class="$style.head" class="bg-light d-flex flex-column">
      <div class="card-header card-header-flex border-bottom-0">
        <div class="d-flex flex-column justify-content-center">
          <h5 class="mb-0 text-color-6">Role Management</h5>
        </div>
        <div class="ml-auto d-flex flex-column justify-content-center">
          <div class="dropdown d-inline-block">
            <a-dropdown placement="bottomRight" :trigger="['click']">
              <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-noarrow">
                <i class="fe fe-more-horizontal" />
              </button>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a @click="createRole">Create New</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">Delete Marks</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">Delete All</a>
                  </a-menu-item>
                  <a-menu-divider />
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="card border-0">
      <datatable />
    </div>
  </div>
</template>

<script>
import Datatable from './Datatable.vue'
import store from '@/store'

export default {
  name: 'VbAntDesign',
  components: {
    Datatable,
  },
  mounted() {
    this.checkRole()
  },
  methods: {
    createRole() {
      this.$router.push({ name: 'roles-create' })
    },
    checkRole() {
      const role = this.$store.state.user
      const lokal = JSON.parse(localStorage.getItem('userData'))
      console.log('Store User')
      console.log(role)
      console.log('Local User')
      console.log(lokal)
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
