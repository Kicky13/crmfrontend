import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { _ } from 'vue-underscore'

const state = {
  data: {
    itemsPerPage: [3, 5],
    isLoading: false,
    dataMetabase: null,
    status: 'gagal',
    regionList: [],
    provinsiList: [],
    areaList: [],
    distrikList: [],
    distributorList: [],
  },
}

const mutations = {
  changePromotionDashboard(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getMetabasePromotion({ commit, state }, payload) {
    commit('changePromotionDashboard', {
      isLoading: true,
    })
    const { data } = state

    // let parameter = {
    //   region: payload.region,
    //   provinsi: payload.provinsi,
    //   area: payload.area,
    //   distrik: payload.distrik,
    //   distributor: payload.distributor,
    // }

    // const base64Convert = btoa(JSON.stringify(parameter))

    // const formData = {
    //   dashboard: 238,
    //   data: base64Convert,
    // }

    const formData = {
      dashboard: 208,
      params: JSON.stringify({
        pdistrik: [
          3509,
          3511,
        ],
        pdistributor: [
          "106",
          "142",
          "147",
          "238",
          "254",
          "8153432",
          "8167136",
          "8102067",
        ],
      }),
    }

    try {
      const result = await apiClient.post(`/metabase/dashboard`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        commit('changePromotionDashboard', {
          isLoading: false,
        })
      } else {
        await commit('changePromotionDashboard', {
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

  async getRegionList({ commit, state }, payload) {
    commit('changePromotionDashboard', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Region`)

      if (result.data.message = 'success') {
        await commit('changePromotionDashboard', {
          regionList: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changePromotionDashboard', {
          isLoading: false,
        })
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getProvinsiList({ commit, state }, payload) {
    commit('changePromotionDashboard', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_region: JSON.stringify(payload.id_region),
    }

    try {
      const result = await apiClient.post(`/filter/Provinsi`, formData)

      if (result.data.message = 'success') {
        await commit('changePromotionDashboard', {
          provinsiList: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changePromotionDashboard', {
          isLoading: false,
        })
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getAreaList({ commit, state }, payload) {
    commit('changePromotionDashboard', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_provinsi: JSON.stringify(payload.id_provinsi),
    }

    try {
      const result = await apiClient.post(`/filter/Area`, formData)

      if (result.data.message = 'success') {
        await commit('changePromotionDashboard', {
          areaList: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changePromotionDashboard', {
          isLoading: false,
        })
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getDistrikList({ commit, state }, payload) {
    commit('changePromotionDashboard', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_area: JSON.stringify(payload.id_area),
    }

    try {
      const result = await apiClient.post(`/filter/Distrik`, formData)

      if (result.data.message = 'success') {
        await commit('changePromotionDashboard', {
          distrikList: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changePromotionDashboard', {
          isLoading: false,
        })
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getDistributorList({ commit, state }, payload) {
    commit('changePromotionDashboard', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_distrik: JSON.stringify(payload.id_distrik),
    }

    try {
      const result = await apiClient.post(`/filter/Distributor`, formData)

      if (result.data.message = 'success') {
        await commit('changePromotionDashboard', {
          distributorList: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changePromotionDashboard', {
          isLoading: false,
        })
        notification.error({
          message: 'Error',
          description: result.data.message,
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
