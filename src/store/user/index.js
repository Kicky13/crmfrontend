import router from '@/router'
import { notification } from 'ant-design-vue'

import * as firebase from '@/services/firebase'
import * as jwt from '@/services/jwt'

const mapAuthProviders = {
  firebase: {
    login: firebase.login,
    register: firebase.register,
    currentAccount: firebase.currentAccount,
    logout: firebase.logout,
  },
  jwt: {
    login: jwt.login,
    register: jwt.register,
    currentAccount: jwt.currentAccount,
    logout: jwt.logout,
  },
}

const DEV = process.env.VUE_APP_AUTHENTICATED
  ? {
    id: '1',
    name: 'Tom Jones',
    role: 'admin',
    email: 'demo@sellpixels.com',
    avatar: '',
    ability: [
      {
        action: 'read',
        subject: 'Auth',
      },
    ],
    authorized: true,
    accountFetchIsTouched: true,
  }
  : {}

export default {
  namespaced: true,
  state: {
    id: '',
    name: '',
    role: '',
    email: '',
    avatar: '',
    ability: [],
    authorized: false,
    loading: false,
    accountFetchIsTouched: false,
    ...DEV, // remove it, used for demo build
  },
  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
  },
  actions: {
    LOGIN({ commit, dispatch, rootState }, { payload }) {
      const { email, password } = payload
      commit('SET_STATE', {
        loading: true,
      })

      const login = mapAuthProviders[rootState.settings.authProvider].login
      login(email, password).then(success => {
        if (success) {
          dispatch('LOAD_CURRENT_ACCOUNT')
          notification.success({
            message: 'Logged In',
            description: 'You have successfully logged in!',
          })
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    REGISTER({ commit, dispatch, rootState }, { payload }) {
      const { email, password, name } = payload
      commit('SET_STATE', {
        loading: true,
      })

      const register = mapAuthProviders[rootState.settings.authProvider].register
      register(email, password, name).then(success => {
        if (success) {
          dispatch('LOAD_CURRENT_ACCOUNT')
          notification.success({
            message: 'Succesful Registered',
            description: 'You have successfully registered!',
          })
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    LOAD_CURRENT_ACCOUNT({ commit, rootState }) {
      commit('SET_STATE', {
        loading: true,
      })

      const currentAccount = mapAuthProviders[rootState.settings.authProvider].currentAccount
      currentAccount().then(response => {
        if (response) {
          const { id, email, name, avatar, role, ability } = response
          commit('SET_STATE', {
            id,
            name,
            email,
            avatar,
            role,
            ability,
            authorized: true,
          })
          localStorage.setItem('userData', JSON.stringify(response))
        }
        commit('SET_STATE', {
          loading: false,
        })
      })
    },
    LOGOUT({ commit, rootState }) {
      const logout = mapAuthProviders[rootState.settings.authProvider].logout
      logout().then(() => {
        commit('SET_STATE', {
          id: '',
          name: '',
          role: '',
          email: '',
          avatar: '',
          ability: [
            {
              action: 'read',
              subject: 'Auth',
            },
          ],
          authorized: false,
          loading: false,
        })
        localStorage.removeItem('userData')
        router.push('/auth/login')
      })
    },
  },
  getters: {
    user: state => state,
  },
}
