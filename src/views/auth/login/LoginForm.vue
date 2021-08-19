<template>
  <div>
    <div class="row">
      <div class="col-xs-0 col-md-2">
      </div>
      <div class="col-xs-12 col-md-8">
        <div class="card card-top card-top-primary" style="background-color: rgb(255 255 255 / 90%);
    box-shadow: 0px 0px 0px 5px rgb(255 255 255 / 40%), 0px 4px 20px rgb(0 0 0 / 33%);
    border-radius: 5px;">
          <div class="card-body">
            <img v-if="settings.theme === 'default' " src="@/assets/images/logo/crm-black.png" alt="Logo SIG" width="200">
            <img v-else src="@/assets/images/logo/crm-white.png" alt="Logo SIG" width="200">
            <br>
            <div class="text-dark font-size-24 mb-3">Selamat Datang</div>
            <a-form
              :model="loginForm"
              :rules="rules"
              layout="vertical"
              class="mb-4"
              @finish="login"
              @finishFailed="handleFinishFailed"
            >
              <a-form-item name="email">
                <a-input v-model:value="loginForm.email" addon-before="-" placeholder="Nama Pengguna" />
              </a-form-item>
              <a-form-item name="password">
                <a-input v-model:value="loginForm.password" addon-before="-" placeholder="Kata Kunci" type="password" />
              </a-form-item>
              <a-button type="main" html-type="submit" class="text-center text-white w-100" shape="round" :loading="loading">
                <strong>MASUK</strong>
              </a-button>
            </a-form>
            <div class="text-center pt-2 mb-auto">
              <span class="mr-2">Lupa Password?</span>
              <router-link to="/auth/forgot-password" class="vb__utils__link text-main">
                Klik disini
              </router-link>
            </div>
          </div>
        </div>     
        <div class="row">
          <div class="col-xs-12 col-md-6">
            <img src="@/assets/images/logo/app-store.png" alt="Logo SIG" width="170">            
          </div>
          <div class="col-xs-12 col-md-6">
            <img src="@/assets/images/logo/google-play.png" alt="Logo SIG" width="170">    
          </div>
        </div>
      </div>
      <div class="col-xs-0 col-md-2">
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { login } from '@/services/connection/apiService'
import { notification } from 'ant-design-vue'

export default {
  name: 'VbLogin',
  setup() {
    const storeState = useStore()
    const settings = computed(() => storeState.getters.settings)
    const loading = computed(() => storeState.getters['user/user'].loading)
    const rules = {
      email: [
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
      email: 'demo@visualbuilder.cloud',
      password: 'VisualBuilder',
    })

    const changeAuthProvider = value => {
      storeState.commit('CHANGE_SETTING', { setting: 'authProvider', value })
    }
    const handleFinish = values => {
      storeState.dispatch('user/LOGIN', { payload: values })
    }
    const handleFinishFailed = errors => {
      console.log(errors)
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
  methods: {
    login() {
      login(this.loginForm.email, this.loginForm.password)
      .then(response => {
        console.log(response)
        this.$ability.update(response.ability)
        notification.success({
            message: 'Logged In',
            description: 'You have successfully logged in!',
        })
        this.storeState.dispatch('user/LOAD_CURRENT_ACCOUNT')
      })
    },
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
@import '@/components/main/Auth/style.module.scss';
</style>
