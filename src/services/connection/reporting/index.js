import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    isLoading: false,
    listHirarkiInternal: [],
    listTsoDistrik: [],
    listDownloadTokoDist: [],
    listDownloadCustomers: [],
    modalVisibleTSO: false,
    identify: 'Distributor',
    body: {
      id_jabatanTSO: null,
      nama: '',
    },
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

  async getTsoDistrik({ commit, state }) {
    commit('changeReporting', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/reportAdmin/downloadTsoDistrik`)

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
          listTsoDistrik: result.data.data,
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

  async getDownloadTokoDist({ commit, state }, payload) {
    commit('changeReporting', {
      isLoading: true,
    })

    const { data } = state

    try {
      let bodyForm = {
        idJabatanTso: payload.id_jabatanTSO,
      }

      const result = await apiClient.post(`/reportAdmin/downloadTsoDistrik`, bodyForm)

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
          listDownloadTokoDist: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      console.log(`----error`, error)
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getDownloadCustomers({ commit, state }, payload) {
    commit('changeReporting', {
      isLoading: true,
    })

    const { data } = state

    try {
      let bodyForm = {
        idJabatanTso: payload.id_jabatanTSO,
      }

      const result = await apiClient.post(`/reportAdmin/downloadCustomerSales`, bodyForm)

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
          listDownloadCustomers: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      console.log(`----error`, error)
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
