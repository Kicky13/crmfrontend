<template>
  <div>
    <div class="row">
      <div class="col-xs-0 col-md-3">
      </div>
      <div class="col-xs-12 col-md-9">
        <div class="card card-top card-top-primary" style="background-color: rgb(255 255 255 / 90%);
    box-shadow: 0px 0px 0px 5px rgb(255 255 255 / 40%), 0px 4px 20px rgb(0 0 0 / 33%);
    border-radius: 5px;">
          <!-- <div class="card-header">
            <h5 class="mb-0">
              <strong></strong>
            </h5>
          </div> -->
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
              @finish="handleFinish"
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
        <!-- <img v-if="settings.theme === 'default' " src="@/assets/images/logo/sig-light-logo.png" alt="Logo SIG" width="200">
        <img v-else src="@/assets/images/logo/sig-dark-logo.png" alt="Logo SIG" width="200"> -->
        
        <div class="row">
          <div class="col-xs-12 col-md-6">
            <img src="@/assets/images/logo/app-store.png" alt="Logo SIG" width="170">            
          </div>
          <div class="col-xs-12 col-md-6">
            <img src="@/assets/images/logo/google-play.png" alt="Logo SIG" width="170">    
          </div>
        </div>
      </div>
    </div>
    <!-- <div>
      <img v-if="settings.theme === 'default' " src="@/assets/images/logo/sig-light-logo.png" alt="Logo SIG" width="200">
      <img v-else src="@/assets/images/logo/sig-dark-logo.png" alt="Logo SIG" width="200">
      <div class="text-dark font-size-32 mb-3">CRM DASHBOARD</div>
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
    </div>
    <div class="text-center pt-2 mb-auto">
      <span class="mr-2">Lupa Password?</span>
      <router-link to="/auth/forgot-password" class="vb__utils__link text-main">
        Klik disini
      </router-link>
    </div> -->
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
