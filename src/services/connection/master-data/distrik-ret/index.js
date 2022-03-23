import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Distrik RET',
        dataIndex: 'distrik_ret',
        key: 'distrik_ret',
      },
      {
        title: 'Tanggal Buat',
        dataIndex: 'tanggal_buat',
        key: 'tanggal_buat',
      },
      {
        title: 'Dibuat Oleh',
        dataIndex: 'dibuat_oleh',
        key: 'dibuat_oleh',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    distrikRetList: [
      {
        distrik_ret: 'Distrik RET 1',
        tanggal_buat: '22/03/2022',
        dibuat_oleh: 'SIG',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changeDistrikRET(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllTipe({ commit, state }, payload) {
    commit('changeDistrikRET', {
      isLoading: true,
    })

    const { data } = state

    try {
      // const result = await apiClient.post(``)

      if (result.data.status == false) {
        await commit('changeDistrikRET', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeDistrikRET', {
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeDistrikRET', {
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
