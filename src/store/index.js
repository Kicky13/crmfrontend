import { createStore } from 'vuex'
import user from './user'
import settings from './settings'
import UserManagement from '../services/connection/user-management'
export default createStore({
  modules: {
    user,
    settings,
    userManagement: UserManagement,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
})
