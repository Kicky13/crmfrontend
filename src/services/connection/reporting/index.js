import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    isLoading: false,
    listHirarkiInternal: [],
  },
}

const mutations = {
  changeReporting(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getHirarkiInternal({ commit, state }) {
    commit('changeReporting', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/reportAdmin/downloadHirarki`)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReporting', {
          isLoading: false,
        })
      } else {
        await commit('changeReporting', {
          listHirarkiInternal: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
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
