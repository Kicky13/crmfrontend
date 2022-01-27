import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    isLoading: false,
    listHirarkiInternal: [],
    listTsoDistrik: [],
    listDownloadTokoDist: [],
    listDownloadCustomers: [],
    daftar_region: [],
    modalVisibleTSO: false,
    modalVisibleRegion: false,
    identify: 'Distributor',
    body: {
      id_jabatanTSO: null,
      nama: '',
    },

    bodyRegion: {
      id_region: null,
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

  async getListAllRegion({ commit, state }, payload) {
    commit('changeReporting', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: 0,
      limit: 1000,
      q: '',
    }

    try {
      const result = await apiClient.post(`/hirarki/allRegion`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeReporting', {
          isLoading: false,
        })
      } else {
        await commit('changeReporting', {
          daftar_region: result.data.data,
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
