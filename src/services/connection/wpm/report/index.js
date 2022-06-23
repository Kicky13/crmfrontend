import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Distrik',
        dataIndex: 'distrik',
        key: 'distrik',
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
        title: 'Week',
        dataIndex: 'week',
        key: 'week',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Produk',
        dataIndex: 'produk',
        key: 'produk',
      },
      {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Kemasan',
        dataIndex: 'kemasan',
        key: 'kemasan',
      },
      {
        title: 'RBP Gross',
        dataIndex: 'rbpgross',
        key: 'rbpgross',
      },
      {
        title: 'Promo',
        dataIndex: 'promo',
        key: 'promo',
      },
      {
        title: 'RBP Net',
        dataIndex: 'rbpnett',
        key: 'rbpnett',
      },
      {
        title: 'RSP',
        dataIndex: 'rsp',
        key: 'rsp',
      },
      {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
      },
    ],
    params: {
      offset: 0,
      limit: 2000,
      tahun: '',
      bulan: '',
      week: '',
      id_distrik_ret: null,
      nm_distrik: '',
    },
    dataWeekParams: [],
    reportList: [
      {
        distrik: 'Distrik 1',
        tahun: '2022',
        bulan: 'Maret',
        week: 'Week 1',
        status: 'Approve',
        produk: 'Produk 1',
        brand: 'Brand 1',
        type: 'Type 1',
        kemasan: 'Kemasan 1',
        rbp_gross: 'RBP Gross 1',
        promo: 'Promo 1',
        rbp_net: 'RBP Net 1',
        rsp: 'RSP 1',
        notes: 'Notes 1',
      },
    ],
    dataWeekly: [
      {
        id: 1,
        name: 'Week 1',
      },
      {
        id: 2,
        name: 'Week 2',
      },
      {
        id: 3,
        name: 'Week 3',
      },
      {
        id: 4,
        name: 'Week 4',
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
    dataDistrikRET: [],
    dataTable: [],
    isLoading: false,
  },
}

const mutations = {
  changeReport(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataWeekParams({ commit, state }) {
    commit('changeReport', {
      isLoading: true,
    })
    const { data } = state
    let formData = {
      tahun: data.params.tahun,
      bulan: data.params.bulan,
    }

    try {
      const result = await apiClient.post(`/WPM/getWeek`, formData)

      if (result.data.status == `false`) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReport', {
          isLoading: false,
        })
      } else {
        await commit('changeReport', {
          dataWeekParams: result.data.data || 0,
          isLoading: false,
        })
      }
    } catch (error) {
      await commit('changeReport', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllTipe({ commit, state }, payload) {
    commit('changeReport', {
      isLoading: true,
    })

    const { data } = state

    try {
      // const result = await apiClient.post(``)

      if (result.data.status == false) {
        await commit('changeReport', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeReport', {
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeReport', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getDistrikRET({ commit, state }) {
    commit('changeReport', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      //   id_area:data.formData.selectedArea,
      offset: data.params.offset,
      limit: data.params.limit,
    }
    try {
      const result = await apiClient.post('/filter/Distrik', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReport', {
          isLoading: false,
        })
      } else {
        await commit('changeReport', {
          dataDistrikRET: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getDataTable({ commit, state }, payload) {
    commit('changeReport', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: data.params.offset,
      limit: data.params.limit,
      tahun: data.params.tahun,
      bulan: data.params.bulan,
      week: parseInt(data.params.week),
      distrik: data.params.id_distrik_ret,
    }

    try {
      const result = await apiClient.post(`/wpm/report`, formData)

      if (result.data.status == `false`) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReport', {
          isLoading: false,
        })
      } else {
        await commit('changeReport', {
          dataTable: result.data.data || 0,
          isLoading: false,
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changeReport', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
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
