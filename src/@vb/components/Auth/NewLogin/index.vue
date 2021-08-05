<template>
  <div>
    <div>
      <img v-if="settings.theme === 'default' " src="@/assets/images/logo/sig-light-logo.png" alt="Logo SIG" width="200">
      <img v-else src="@/assets/images/logo/sig-dark-logo.png" alt="Logo SIG" width="200">
      <div class="text-dark font-size-32 mb-3">CRM DASHBOARD</div>
      <!-- <div class="mb-4">
        Login and password
        <br />
        <strong>demo@visualbuilder.cloud / VisualBuilder</strong>
      </div>
      <div class="mb-4">
        <a-radio-group
          :value="settings.authProvider"
          @change="e => changeAuthProvider(e.target.value)"
        >
          <a-radio value="jwt">JWT</a-radio>
          <a-radio value="firebase">Firebase</a-radio>
        </a-radio-group>
      </div> -->
      <a-form
        :model="loginForm"
        :rules="rules"
        layout="vertical"
        class="mb-4"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item name="email">
          <a-input v-model:value="loginForm.email" placeholder="Nama Pengguna" />
        </a-form-item>
        <a-form-item name="password">
          <a-input v-model:value="loginForm.password" placeholder="Kata Kunci" type="password" />
        </a-form-item>
        <a-button type="main" html-type="submit" class="text-center text-white w-100" shape="round" :loading="loading">
          <strong>MASUK</strong>
        </a-button>
      </a-form>
      <div class="text-center">
        <router-link to="/auth/forgot-password" class="vb__utils__link text-main">
          Lupa kata kunci?
        </router-link>
      </div>
    </div>
    <div class="text-center pt-2 mb-auto">
      <span class="mr-2">Belum punya akun?</span>
      <router-link to="/auth/register" class="vb__utils__link text-main">
        Daftar
      </router-link>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'VbLogin',
  setup() {
    const store = useStore()
    const settings = computed(() => store.getters.settings)
    const loading = computed(() => store.getters['user/user'].loading)
    const rules = {
      email: [
        {
          required: true,
          // message: 'Please input your email!',
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
      email: 'demo@visualbuilder.cloud',
      password: 'VisualBuilder',
    })

    const changeAuthProvider = value => {
      store.commit('CHANGE_SETTING', { setting: 'authProvider', value })
    }
    const handleFinish = values => {
      store.dispatch('user/LOGIN', { payload: values })
    }
    const handleFinishFailed = errors => {
      console.log(errors)
    }

    return {
      settings,
      loading,
      rules,
      loginForm,
      changeAuthProvider,
      handleFinish,
      handleFinishFailed,
    }
  },
  // data: function () {
  //   return {
  //     rules: {
  //       email: [{ required: true, message: 'Please input your email!', trigger: 'change' }],
  //       password: [{ required: true, message: 'Please input password!', trigger: 'change' }],
  //     },
  //     loginForm: {
  //       email: 'demo@visualbuilder.cloud',
  //       password: 'VisualBuilder',
  //     },
  //   }
  // },
  // computed: {
  //   ...mapState(['settings']),
  //   loading() {
  //     return this.$store.state.user.loading
  //   },
  // },
  // methods: {
  //   changeAuthProvider(value) {
  //     this.$store.commit('CHANGE_SETTING', { setting: 'authProvider', value })
  //   },
  //   handleFinish(values) {
  //     this.$store.dispatch('user/LOGIN', { payload: values })
  //   },
  //   handleFinishFailed(errors) {
  //     console.log(errors)
  //   },
  // },
}
</script>
<style lang="scss" module>
@import '@/@vb/components/Auth/style.module.scss';
</style>
