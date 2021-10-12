import { createStore } from 'vuex'
import user from './user'
import settings from './settings'
import UserManagementHirarki from '../services/connection/user-management/UserHirarki'
import UserManagementCRM from '../services/connection/user-management/UserCRM'
import RadiusDistrik from '../services/connection/radius-distrik'
import SynCustomer from '../services/connection/customer-sync'
export default createStore({
  modules: {
    user,
    settings,
    userManagement: UserManagementHirarki,
    userManagementCRM: UserManagementCRM,
    radiusDistrik: RadiusDistrik,
    synCustomer: SynCustomer,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
})
