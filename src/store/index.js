import { createStore } from 'vuex'
import user from './user'
import settings from './settings'
import UserManagementHirarki from '../services/connection/user-management/UserHirarki'
import ListUsersHirarki from '../services/connection/list-user'
import UserManagementCRM from '../services/connection/user-management/UserCRM'
import RadiusDistrik from '../services/connection/radius-distrik'
import sow from '../services/connection/dashboard'
import SalesRoute from '../services/connection/dashboard/sales_route'
import SynCustomer from '../services/connection/customer-sync'
import OtomatisasiVisitPlan from '../services/connection/otomatisasi-visit'
import VisitPlan from '../services/connection/upload-visit'
import MappingCustomer from '../services/connection/mapping-customer'
import ProfileTSO from '../services/connection/user-management/UserHirarki/ProfileTSO'
import ProfileSalesDistributor from '../services/connection/user-management/UserHirarki/ProfileSalesDistributor'
import ProfileAdminDistributor from '../services/connection/user-management/UserHirarki/ProfileAdminDistributor'
import ProfileSPC from '../services/connection/user-management/UserHirarki/ProfileSPC'
import ProfileUser from '../services/connection/profileUser'
import ImportExelHirarki from '../services/connection/user-management/UserHirarki/ImportExcelHirarki'
import KoordinatLock from '../services/connection/koordinat-lock'
import Reporting from '../services/connection/reporting'
import PenarikanData from '../services/connection/penarikan-data'
import ReportingCustomerMapping from '../services/connection/reporting/customer-mapping'
import ReportingSalesDistributor from '../services/connection/reporting/sales-distributor'
import Filter from '../services/connection/dashboard/filter'
import Promotion from '../services/connection/dashboard/promotion'
import RbpMovement from '../services/connection/dashboard/rbpmovement'
import RbpMovement2 from '../services/connection/dashboard/rbpmovement2'
import PriceMonitoring from '../services/connection/dashboard/pricemonitoring'
import Tipe from '../services/connection/master-data/tipe'
import Brand from '../services/connection/master-data/brand'
import Kemasan from '../services/connection/master-data/kemasan'
import Produk from '../services/connection/master-data/produk'
import DistrikRET from '../services/connection/master-data/distrik-ret'
import KategoriPromo from '../services/connection/master-data/kategori-promo'
import WeeklyConfig from '../services/connection/master-data/weekly-config'
import WeeklyInput from '../services/connection/weekly-price/weekly-input'
import WPPromotion from '../services/connection/weekly-price/promotion'
import WPApproval from '../services/connection/weekly-price/wp-approval'
import WPPublish from '../services/connection/weekly-price/wp-publish'
import VolumeAnalytcs from '../services/connection/dashboard/volume_analytcs'
import VisitDashboard from '../services/connection/dashboard/visit'
import PromotionDashboard from '../services/connection/dashboard/promotion'
import SOWDashboard from '../services/connection/dashboard/sow'
import Report from '../services/connection/wpm/report'
import WPMPromotion from '../services/connection/wpm/promotion'
import PriceMovement from '../services/connection/wpm/price-movement'
import GAPHarga from '../services/connection/wpm/gap-harga'

export default createStore({
  modules: {
    user,
    settings,
    userManagement: UserManagementHirarki,
    listUsers: ListUsersHirarki,
    userManagementCRM: UserManagementCRM,
    radiusDistrik: RadiusDistrik,
    synCustomer: SynCustomer,
    SOW: sow,
    salesRoute: SalesRoute,
    otomatisasiVisitPlan: OtomatisasiVisitPlan,
    visitPlan: VisitPlan,
    mappingCustomer: MappingCustomer,
    profileTSO: ProfileTSO,
    profileSalesDistributor: ProfileSalesDistributor,
    profileAdminDistributor: ProfileAdminDistributor,
    profileSPC: ProfileSPC,
    profileUser: ProfileUser,
    importExelHirarki: ImportExelHirarki,
    koordinatLock: KoordinatLock,
    reporting: Reporting,
    penarikanData: PenarikanData,
    reportingCustomerMapping: ReportingCustomerMapping,
    reportingSalesDistributor: ReportingSalesDistributor,
    filter: Filter,
    promotion: Promotion,
    rbpMovement: RbpMovement,
    rbpMovement2: RbpMovement2,
    priceMonitoring: PriceMonitoring,
    tipe: Tipe,
    brand: Brand,
    kemasan: Kemasan,
    produk: Produk,
    distrikRET: DistrikRET,
    kategoriPromo: KategoriPromo,
    weeklyConfig: WeeklyConfig,
    weeklyInput: WeeklyInput,
    wpPromotion: WPPromotion,
    wpApproval: WPApproval,
    wpPublish: WPPublish,
    volumeAnalytcs: VolumeAnalytcs,
    visitDashboard: VisitDashboard,
    promotionDashboard: PromotionDashboard,
    sowDashboard: SOWDashboard,
    report: Report,
    wpmPromotion: WPMPromotion,
    priceMovement: PriceMovement,
    gapHarga: GAPHarga,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
})
