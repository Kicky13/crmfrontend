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
        title: 'IdSales',
        dataIndex: 'idsales',
        key: 'username',
        width: 100,
        fixed: 'left',
        // slots: { customRender: 'name' },
      },
      {
        title: 'Nama Sales',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        fixed: 'left',
        // slots: { customRender: 'name' },
      },
      {
        title: 'Distributor',
        dataIndex: 'distributor',
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
        dataIndex: 'tso',
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
      },
      {
        title: 'N Jadwal',
        dataIndex: 'njadwal',
        key: 'njadwal',
      },
      {
        title: 'Status',
        fixed: 'right',
        width: 100,
        dataIndex: 'status',
        key: 'status',
        slots: { customRender: 'status' },
      },
    ],
    data_bulan: [
      {
        id: 1,
        name: 'Januari',
      },
      {
        id: 2,
        name: 'Februari',
      },
      {
        id: 3,
        name: 'Maret',
      },
      {
        id: 4,
        name: 'April',
      },
      {
        id: 5,
        name: 'Mei',
      },
      {
        id: 6,
        name: 'Juni',
      },
      {
        id: 7,
        name: 'Juli',
      },
      {
        id: 8,
        name: 'Agustus',
      },
      {
        id: 9,
        name: 'September',
      },
      {
        id: 10,
        name: 'Oktober',
      },
      {
        id: 11,
        name: 'November',
      },
      {
        id: 12,
        name: 'Desember',
      },
    ],
  },
}

const mutations = {
  changeOtomatisasiVisitPlan(state, payload) {
    state.dat = Object.assign({}, state.data, payload)
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
    }

    const result = await apiClient('/Visit/ReportLogVisitPlan', body)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil diubah`,
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
