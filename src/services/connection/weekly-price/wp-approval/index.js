import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { result } from 'lodash'

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
        dataIndex: 'rbp_gross',
        key: 'rbp_gross',
      },
      {
        title: 'Promo',
        dataIndex: 'promo',
        key: 'promo',
      },
      {
        title: 'RBP Net',
        dataIndex: 'rbp_net',
        key: 'rbp_net',
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
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    wpApprovalList: [
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
    params: {
      offset: 0,
      limit: 2000,
      tahun: '',
      bulan: '',
      week: '',
    },
    dataTSO: [],
    isLoading: false,
  },
}

const mutations = {
  changeWPApproval(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataTSO({ commit, state }, payload) {
    commit('changeWPApproval', {
      isLoading: true,
    })

    const { data } = state
    let formData = {
      id_atasan: payload.id_atasan,
    }
    try {
      const result = await apiClient.post(`/getBawahan`, formData)

      if (result.data.status == false) {
        await commit('changeWPApproval', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWPApproval', {
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeWPApproval', {
        dataTSO: result.data.data,
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getDataTable({ commit, state }, payload) {
    commit('changeWPApproval', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: data.params.offset,
      limit: data.params.limit,
      tahun: data.params.tahun,
      bulan: data.params.bulan,
      week: data.params.week,
      status: 1,
    }

    try {
      const result = await apiClient.post(`/WPM/getData`, formData)

      if (result.data.status == `false`) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWPApproval', {
          isLoading: false,
        })
      } else {
        await commit('changeWPApproval', {
          dataTable: result.data.data || 0,
          isLoading: false,
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changeWPApproval', {
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
