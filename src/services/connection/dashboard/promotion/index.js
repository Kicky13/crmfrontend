import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    listCategories: [],
    listSeries: [],
    buttonPrevent: true,
    isLoading: false,
  },
}

const mutations = {
  changePromotion(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllPromotion({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/Dashboard/BrandPromotion`, payload)

      if (result.data.status == false) {
        await commit('changePromotion', {
          isLoading: false,
          buttonPrevent: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePromotion', {
          listCategories: result.data.categories,
          listSeries: result.data.series,
          isLoading: false,
          buttonPrevent: false,
        })
      }
    } catch (err) {
      await commit('changePromotion', {
        isLoading: false,
        buttonPrevent: false,
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
