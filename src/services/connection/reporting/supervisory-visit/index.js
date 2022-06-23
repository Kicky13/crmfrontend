import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'No Survei',
        slots: { customRender: 'no_survei' },
        key: 'no_survei',
      },
      {
        title: 'Tanggal',
        slots: { customRender: 'tanggal' },
        key: 'tanggal',
      },
      {
        title: 'Sales',
        slots: { customRender: 'sales' },
        key: 'sales',
      },
      {
        title: 'SO',
        slots: { customRender: 'so' },
        key: 'so',
      },
      {
        title: 'Distributor',
        slots: { customRender: 'distributor' },
        key: 'distributor',
      },
      {
        title: 'Customer',
        slots: { customRender: 'customer' },
        key: 'customer',
      },
      {
        title: 'Nilai',
        slots: { customRender: 'nilai' },
        key: 'nilai',
      },
      {
        title: 'Alamat',
        slots: { customRender: 'alamat' },
        key: 'alamat',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    itemsPerPage: [5, 10, 15, 20],
    dataTable: [
      {
        id: 1,
        title: '',
        tanggal: '',
        sales: '',
        so: '',
        distributor: '',
        customer: '',
        nilai: '',
        alamat: '',
      },
    ],
  },
}

const mutations = {
  changeReportingSupervisory(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
