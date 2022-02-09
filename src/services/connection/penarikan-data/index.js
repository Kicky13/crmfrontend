import apiClientSIG from '@/services/axios/axiosSIG'
// import apiClientFake from '@/services/axios/index'
import { notification } from 'ant-design-vue'
// import { moment } from 'moment'

const state = {
  data: {
    columns_report_visit: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'ID Sales',
        key: 'id_sales',
        slots: { customRender: 'id_sales' },
      },
      {
        title: 'Nama Sales',
        key: 'nama_sales',
        slots: { customRender: 'nama_sales' },
      },
      {
        title: 'Username',
        key: 'username',
        slots: { customRender: 'username' },
      },
      {
        title: 'No HP',
        key: 'np_hp',
        slots: { customRender: 'no_hp' },
      },
      {
        title: 'ID Toko',
        key: 'id_toko',
        slots: { customRender: 'id_toko' },
      },
      {
        title: 'Nama Toko',
        key: 'nama_toko',
        slots: { customRender: 'nama_toko' },
      },
      {
        title: 'Kode Distributor',
        key: 'kode_distributor',
        slots: { customRender: 'kode_distributor' },
      },
      {
        title: 'Nama Distributor',
        key: 'nama_distributor',
        slots: { customRender: 'nama_distributor' },
      },
      {
        title: 'ID Distrik',
        key: 'id_distrik',
        slots: { customRender: 'id_distrik' },
      },
      {
        title: 'Nama Distrik',
        key: 'nama_distrik',
        slots: { customRender: 'nama_distrik' },
      },
      {
        title: 'ID Area',
        key: 'id_area',
        slots: { customRender: 'id_area' },
      },
      {
        title: 'Nama Area',
        key: 'nama_area',
        slots: { customRender: 'nama_area' },
      },
      {
        title: 'ID Provinsi',
        key: 'id_provinsi',
        slots: { customRender: 'id_provinsi' },
      },
      {
        title: 'Nama Provinsi',
        key: 'nama_provinsi',
        slots: { customRender: 'nama_provinsi' },
      },
      {
        title: 'ID Region',
        key: 'id_region',
        slots: { customRender: 'id_region' },
      },
      {
        title: 'Tahun',
        key: 'tahun',
        slots: { customRender: 'tahun' },
      },
      {
        title: 'Bulan',
        key: 'bulan',
        slots: { customRender: 'bulan' },
      },
      {
        title: 'Hari',
        key: 'hari',
        slots: { customRender: 'hari' },
      },
      {
        title: 'Waktu Mulai',
        key: 'waktu_mulai',
        slots: { customRender: 'waktu_mulai' },
      },
      {
        title: 'Waktu Selesai',
        key: 'waktu_selesai',
        slots: { customRender: 'waktu_selesai' },
      },
      {
        title: 'Waktu Kunjungan',
        key: 'waktu_kunjungan',
        slots: { customRender: 'waktu_kunjungan' },
      },
      {
        title: 'Jam',
        key: 'jam',
        slots: { customRender: 'jam' },
      },
      {
        title: 'Menit',
        key: 'menit',
        slots: { customRender: 'menit' },
      },
      {
        title: 'Apps Info',
        key: 'apps_info',
        slots: { customRender: 'apps_info' },
      },
      {
        title: 'Jumlah Order',
        key: 'jml_order',
        slots: { customRender: 'jml_order' },
      },
      {
        title: 'Target',
        key: 'target',
        slots: { customRender: 'target' },
      },
      {
        title: 'Realisasi',
        key: 'realisasi',
        slots: { customRender: 'realisasi' },
      },
      {
        title: 'Unplan Target',
        key: 'unplan_target',
        slots: { customRender: 'unplan_target' },
      },
      {
        title: 'Unplan Real',
        key: 'unplan_real',
        slots: { customRender: 'unplan_real' },
      },
      {
        title: 'ID GSM',
        key: 'id_gsm',
        slots: { customRender: 'id_gsm' },
      },
      {
        title: 'Nama GSM',
        key: 'nama_gsm',
        slots: { customRender: 'nama_Gsm' },
      },
      {
        title: 'id_ssm',
        key: 'id_ssm',
        slots: { customRender: 'id_ssm' },
      },
      {
        title: 'Nama SSM',
        key: 'nama_ssm',
        slots: { customRender: 'nama_ssm' },
      },
      {
        title: 'ID SM',
        key: 'id_sm',
        slots: { customRender: 'id_sm' },
      },
      {
        title: 'Nama SM',
        key: 'nama_sm',
        slots: { customRender: 'nama_sm' },
      },
      {
        title: 'ID SO',
        key: 'id_so',
        slots: { customRender: 'id_so' },
      },
      {
        title: 'Nama SO',
        key: 'nama_so',
        slots: { customRender: 'nama_so' },
      },
    ],
    list_report_visit: [],
    body_report_visit: {
      id_region: null,
      region_name: '',
      start_date: null,
      end_date: null,
    },
    pagination_report_visit: {},
    modalVisibleVisit: false,
    isLoading: false,
  },
}

const mutations = {
  changePenarikanData(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataReportVisit({ commit, state }) {
    commit('changePenarikanData', {
      isLoading: true,
    })

    try {
      const { data } = state
      let formBody = {
        id_region: data.body_report_visit.id_region,
        start_date: data.body_report_visit.start_date,
        end_date: data.body_report_visit.end_date,
      }
      const result = await apiClientSIG.get(`ReportCRMRevamp/ReportVisit`, formBody)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
      } else {
        await commit('changePenarikanData', {
          list_report_visit: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
      await commit('changePenarikanData', {
        isLoading: false,
      })
    }
  },
  async getDataReportHasilSurvey({ commit, state }) {
    commit('changePenarikanData', {
      isLoading: true,
    })

    try {
      const { data } = state
      let formBody = {
        id_region: data.body_report_visit.id_region,
        start_date: data.body_report_visit.start_date,
        end_date: data.body_report_visit.end_date,
      }
      const result = await apiClientSIG.get(`ReportCRMRevamp/ReportHasilSurvey`, formBody)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
      } else {
        await commit('changePenarikanData', {
          list_report_visit: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
      await commit('changePenarikanData', {
        isLoading: false,
      })
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
