import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    isLoading: false,
    body: {
      tahun: null,
      bulan: null,
      offset: 1,
    },
    columns: [
      {
        title: 'Id Sales',
        dataIndex: 'idsales',
        key: 'username',
        width: 100,
        fixed: 'left',
        // slots: { customRender: 'name' },
      },
      {
        title: 'Nama Sales',
        dataIndex: 'namesales',
        key: 'name',
        width: 150,
        fixed: 'left',
        // slots: { customRender: 'name' },
      },
      {
        title: 'Distributor',
        dataIndex: 'distributor',
        width: 300,
        key: 'distributor',
        // slots: { customRender: 'name' },
      },
      {
        title: 'Distrik',
        dataIndex: 'distrik',
        key: 'distrik',
      },
      {
        title: 'TSO',
        dataIndex: 'nametso',
        key: 'tso',
      },
      {
        title: 'Tahun',
        dataIndex: 'tahun',
        key: 'tahun',
      },
      {
        title: 'Bulan',
        dataIndex: 'bulan',
        key: 'bulan',
        slots: { customRender: 'bulan' },
      },
      {
        title: 'N Jadwal',
        dataIndex: 'n_jadwal',
        key: 'njadwal',
      },
      {
        title: 'Status',
        fixed: 'right',
        width: 150,
        dataIndex: 'status',
        key: 'status',
        slots: { customRender: 'status' },
      },
    ],
    data_bulan: [
      {
        id: '01',
        name: 'Januari',
      },
      {
        id: '02',
        name: 'Februari',
      },
      {
        id: '03',
        name: 'Maret',
      },
      {
        id: '04',
        name: 'April',
      },
      {
        id: '05',
        name: 'Mei',
      },
      {
        id: '06',
        name: 'Juni',
      },
      {
        id: '07',
        name: 'Juli',
      },
      {
        id: '08',
        name: 'Agustus',
      },
      {
        id: '09',
        name: 'September',
      },
      {
        id: '10',
        name: 'Oktober',
      },
      {
        id: '11',
        name: 'November',
      },
      {
        id: '12',
        name: 'Desember',
      },
    ],
    list_data: [],
  },
}

const mutations = {
  changeOtomatisasiVisitPlan(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataListOtomatisasi({ commit, state }) {
    commit('changeOtomatisasiVisitPlan', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      tahun: data.body.tahun,
      bulan: data.body.bulan,
      offset: data.body.offset,
      limit: 2000,
    }

    const result = await apiClient.post('/Visit/ReportLogVisitPlan', body)

    if (!result.data.status) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
    } else {
      await commit('changeOtomatisasiVisitPlan', {
        list_data: result.data.data,
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
