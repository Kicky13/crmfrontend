<template>
  <div class="right_side">
    <div
      class="row"
      :style="
        'background-image: url(' +
        require('@/assets/images/logo/login_page.png') +
        '); background-repeat: no-repeat; background-position: bottom; height: 98vh;'
      "
    >
      <div class="col-xs-0 col-md-2"></div>
      <div class="col-xs-12 col-md-8">
        <div class="card card-top card-top-primary">
          <div class="card-body">
            <img
              lazy="loading"
              v-once
              v-if="settings.theme === 'default'"
              src="@/assets/images/logo/logo_crm.webp"
              alt="Logo CRM"
              width="140"
              class="mb-3"
            />
            <img
              lazy="loading"
              v-once
              v-else
              src="@/assets/images/logo/logo_crm.webp"
              alt="Logo SIG"
              width="140"
            />

            <a-form
              :model="loginForm"
              :rules="rules"
              layout="vertical"
              class="mb-4"
              @finish="login"
              @finishFailed="handleFinishFailed"
            >
              <a-form-item name="username">
                <a-input
                  class="input_username"
                  v-model:value="loginForm.username"
                  placeholder="Nama Pengguna"
                >
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item name="password">
                <a-input-password
                  class="p-2 input_password"
                  v-model:value="loginForm.password"
                  placeholder="Kata Kunci"
                  type="password"
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>
              <a-button
                type="main"
                html-type="submit"
                class="text-center text-white w-100 button_login"
                :loading="loading"
              >
                <strong>MASUK</strong>
              </a-button>
            </a-form>
            <div class="text-center mb-auto">
              <router-link
                to="/auth/forgot-password"
                class="vb__utils__link text-main font-weight-bold"
              >
                Lupa Password?
              </router-link>
            </div>
            <div class="text-center mt-3 mb-auto">
              <router-link to="/" class="vb__utils__link back_beranda">
                <span class="mr-2">Kembali ke Beranda</span>
              </router-link>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-6"></div>
        </div>
      </div>
      <div class="col-xs-0 col-md-2"></div>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { login } from '@/services/connection/authService'
import { notification } from 'ant-design-vue'
import {
  UserOutlined,
  // KeyOutlined,
  LockOutlined,
} from '@ant-design/icons-vue'
import dataAbility from '../../../services/ability/defaultAbility.json'
export default {
  name: 'VbLogin',
  components: {
    UserOutlined,
    // KeyOutlined,
    LockOutlined,
  },
  setup() {
    const storeState = useStore()
    const settings = computed(() => storeState.getters.settings)
    const loading = computed(() => storeState.getters['user/user'].loading)
    const rules = {
      username: [
        {
          required: true,
          message: 'Silahkan masukkan nama pengguna',
          trigger: 'change',
        },
      ],
      password: [
        {
          required: true,
          message: 'Silahkan masukkan kata kunci',
          trigger: 'change',
        },
      ],
    }
    const loginForm = reactive({
      username: '',
      password: '',
    })

    const changeAuthProvider = (value) => {
      storeState.commit('CHANGE_SETTING', { setting: 'authProvider', value })
    }
    const handleFinish = (values) => {
      storeState.dispatch('user/LOGIN', { payload: values })
    }
    const handleFinishFailed = (errors) => {
      if (errors) {
      }
    }

    return {
      storeState,
      settings,
      loading,
      rules,
      loginForm,
      changeAuthProvider,
      handleFinish,
      handleFinishFailed,
    }
  },
  data() {
    return {
      ability_admin: [
        {
          action: 'read',
          subject: 'all',
        },
        {
          action: 'create',
          subject: 'all',
        },
        {
          action: 'update',
          subject: 'all',
        },
        {
          action: 'delete',
          subject: 'all',
        },
      ],
      ability_nonadmin: [
        {
          action: 'read',
          subject: 'Dashboard',
        },
        {
          action: 'read',
          subject: 'Berita',
        },
        {
          action: 'read',
          subject: 'Program',
        },
        {
          action: 'read',
          subject: 'VisitPlan',
        },
        {
          action: 'read',
          subject: 'MappingCustomer',
        },
        {
          action: 'read',
          subject: 'RadiusDistrik',
        },
        {
          action: 'update',
          subject: 'RadiusDistrik',
        },
        {
          action: 'read',
          subject: 'Reporting',
        },
        {
          action: 'read',
          subject: 'UserManagement',
        },
        {
          action: 'read',
          subject: 'Auth',
        },
      ],
    }
  },
  methods: {
    login() {
      login(this.loginForm).then((response) => {
        if (response) {
          this.$router.push('/dashboard')

            if (response.role === `Admin`) {
              this.$ability.update(dataAbility.ability_admin)
            } else {
              this.$ability.update(dataAbility.ability_nonadmin)
            }
            notification.success({
              message: 'Logged In',
              description: 'Anda berhasil Login!',
            })
            this.storeState.dispatch('user/LOAD_CURRENT_ACCOUNT')
          // this.$ability.update(response.ability)
          // window.location.href = '#/dashboard'
          // this.$router.push('/dashboard')
          // notification.success({
          //   message: 'Logged In',
          //   description: 'Anda berhasil Login!',
          // })
        } else {
          notification.error({
            message: 'Login Failed',
            description: 'Username/password salah!',
          })
        }
      })
    },
  },
}
</script>
<style lang="scss" module>
@import '@/components/main/Auth/style.module.scss';
</style>
<style lang="scss" scoped>
@import '@/assets/scss/Login/index.scss';
</style>
