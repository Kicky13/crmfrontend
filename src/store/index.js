import { createStore } from 'vuex'
import user from './user'
import settings from './settings'
import UserManagementHirarki from '../services/connection/user-management/UserHirarki'
import UserManagementCRM from '../services/connection/user-management/UserCRM'
import RadiusDistrik from '../services/connection/radius-distrik'
import SynCustomer from '../services/connection/customer-sync'
import OtomatisasiVisitPlan from '../services/connection/otomatisasi-visit'
import VisitPlan from '../services/connection/upload-visit'
import MappingCustomer from '../services/connection/mapping-customer'
import ProfileTSO from '../services/connection/user-management/UserHirarki/ProfileTSO'
import ProfileSalesDistributor from '../services/connection/user-management/UserHirarki/ProfileSalesDistributor'
import ProfileAdminDistributor from '../services/connection/user-management/UserHirarki/ProfileAdminDistributor'

export default createStore({
  modules: {
    user,
    settings,
    userManagement: UserManagementHirarki,
    userManagementCRM: UserManagementCRM,
    radiusDistrik: RadiusDistrik,
    synCustomer: SynCustomer,
    otomatisasiVisitPlan: OtomatisasiVisitPlan,
    visitPlan: VisitPlan,
    mappingCustomer: MappingCustomer,
    profileTSO: ProfileTSO,
    profileSalesDistributor: ProfileSalesDistributor,
    profileAdminDistributor: ProfileAdminDistributor,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
})
