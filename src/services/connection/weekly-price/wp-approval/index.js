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
    isLoading: false,
  },
}

const mutations = {
  changeWPApproval(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllTipe({ commit, state }, payload) {
    commit('changeWPApproval', {
      isLoading: true,
    })

    const { data } = state

    try {
      // const result = await apiClient.post(``)

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
