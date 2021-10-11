import { createStore } from 'vuex'
import user from './user'
import settings from './settings'
import UserManagementHirarki from '../services/connection/user-management/UserHirarki'
import UserManagementCRM from '../services/connection/user-management/UserCRM'
export default createStore({
  modules: {
    user,
    settings,
    userManagement: UserManagementHirarki,
    userManagementCRM: UserManagementCRM,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
})
