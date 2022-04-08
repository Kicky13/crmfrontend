import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { result } from 'lodash'

const state = {
  data: {
    columns: [
      {
        title: 'Kemasan',
        dataIndex: 'NAMA_KEMASAN',
        key: 'NAMA_KEMASAN',
      },
      {
        title: 'Tanggal Buat',
        dataIndex: 'TANGGAL_DIBUAT',
        key: 'TANGGAL_DIBUAT',
      },
      {
        title: 'Dibuat Oleh',
        dataIndex: 'DIBUAT_OLEH',
        key: 'DIBUAT_OLEH',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    kemasanList: [],
    isLoading: false,
  },
}

const mutations = {
  changeKemasan(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllKemasan({ commit, state }, payload) {
    commit('changeKemasan', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/kemasan`)

      if (result.data.status == false) {
        await commit('changeKemasan', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeKemasan', {
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeKemasan', {
        kemasanList: result.data.data,
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
