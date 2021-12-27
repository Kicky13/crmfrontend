<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft">
    <div :class="$style.dropdown">
      <a-avatar shape="square" size="large" :class="$style.avatar">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a @click="profileData()">
            <div>
              <strong>{{ $t('topBar.profileMenu.hello') }}, {{ user.name || 'Anonymous' }}</strong>
            </div>
            <div>
              <strong class="mr-1">{{ $t('topBar.profileMenu.billingPlan') }}: </strong>
              Professional
            </div>
            <div>
              <strong class="mr-1">{{ $t('topBar.profileMenu.role') }}:</strong>
              {{ user.role || '—' }}
            </div>
          </a>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <div>
            <strong class="mr-1">{{ $t('topBar.profileMenu.email') }}:</strong>
            {{ user.email || '—' }}
          </div>
          <div>
            <strong class="mr-1">{{ $t('topBar.profileMenu.phone') }}:</strong>
            —
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <a href="javascript: void(0);" @click="changePasswordHandle">
            <i class="fe fe-user mr-2" />
            {{ $t('topBar.profileMenu.editProfile') }}
          </a>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <a href="javascript: void(0);" @click="logout">
            <i class="fe fe-log-out mr-2" />
            {{ $t('topBar.profileMenu.logout') }}
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <a-modal
    title="Ganti Password"
    :visible="changePasswordModal"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      label-align="left"
      layout="vertical"
    >
      <a-form-item
        label-align="left"
        label="Passord Lama"
      >
        <a-input-password
          placeholder="Masukkan password lama"
          v-model:value="formState.oldPassword"
        />
      </a-form-item>
      <a-form-item label="Password Baru">
        <a-input-password
          placeholder="Masukkan password baru"
          v-model:value="formState.newPassword"
        />
      </a-form-item>
      <a-form-item label="Konfirmasi Password Baru">
        <a-input-password
          placeholder="Masukkan konfirmasi password baru"
          v-model:value="formState.confirmNewPassword"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { UserOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import vueStore from 'store'
import { logoutData } from '@/services/connection/auth/api'
import { mapState, mapActions } from 'vuex'
import { notification } from 'ant-design-vue'

export default {
  components: {
    UserOutlined,
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.getters['user/user'])

    const logout = () => {
      logoutData().then(response => {
        if (response) {
          if (response.status === 'success') {
            notification.success({
              message: 'Logout',
              description: response.message,
            })
            store.dispatch('user/LOGOUT')
            vueStore.remove('accessToken')
            vueStore.remove('userID')
          } else {
            notification.console.error()
            ;({
              message: response.message,
              description: 'Maaf, gagal logout!',
            })
          }
        }
      })
    }

    return {
      user,
      logout,
    }
  },
  data() {
    return {
      changePasswordModal: false,
      formState: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        userID: '',
      },
    }
  },
  computed: {
    ...mapState({
      userManagementCRM: (state) => state.userManagementCRM.data,
    }),
  },
  methods: {
    ...mapActions('userManagementCRM', [
      `changePassword`,
    ]),
    profileData() {
      this.$router.push('/profile')
    },
    changePasswordHandle() {
      this.changePasswordModal = true
      this.formState.userID = JSON.parse(localStorage.getItem('userData')).userid
    },
    handleOk() {
      if (!this.formState.oldPassword.length) {
        notification.warning({
          message: 'Ganti Password',
          description: 'Password lama masih kosong',
        })
        
        return false
      }
      if (this.formState.newPassword.length <= 6) {
        notification.warning({
          message: 'Ganti Password',
          description: 'Password minimal 6 karakter',
        })
        
        return false
      }
      if (this.formState.newPassword !== this.formState.confirmNewPassword) {
        notification.warning({
          message: 'Ganti Password',
          description: 'Konfirmasi password tidak sesuai',
        })

        return false
      }

      if (!(this.formState.newPassword.match(/[a-z]/g)
          && this.formState.newPassword.match(/[A-Z]/g)
          && this.formState.newPassword.match(/[0-9]/g)
          && this.formState.newPassword.match(/[^a-zA-Z\d]/g))) {
        notification.warning({
          message: 'Ganti Password',
          description: 'Password harus kombinasi huruf besar, kecil, angka dan simbol',
        })

        return false
      }

      this.changePassword({
        oldPassword: this.formState.oldPassword,
        newPassword: this.formState.newPassword,
        userID: this.formState.userID,
      })

      this.handleCancel()
    },
    handleCancel() {
      this.changePasswordModal = false
      this.formState = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        userID: '',
      }
    },
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
