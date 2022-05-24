import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { _ } from 'vue-underscore'

const state = {
  data: {
    itemsPerPage: [3, 5],

    isLoading: false,
    dataMetabase: null,

    status: 'gagal',
  },
}

const mutations = {
  changeRBPMovement(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getMetabaseRBPMovement({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })
    const { data } = state

    let params = {
      dashboard: 212,
    }

    try {
      const result = await apiClient.post(`/metabase/dashboard?dashboard=${params.dashboard}`)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        commit('changeRBPMovement', {
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
          dataMetabase: result.data.url,
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
