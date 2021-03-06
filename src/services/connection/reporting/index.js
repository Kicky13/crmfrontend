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
    survey_last_week: [],
    visit_last_week: [],
    modalVisibleTSO: false,
    modalVisibleRegion: false,
    identify: 'Distributor',
    status_download: '',
    body: {
      id_jabatanTSO: null,
      nama: '',
    },

    bodyRegion: {
      id_tso: null,
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
          status_download: 'Sukses',
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })

      await commit('changeReporting', {
        isLoading: false,
        status_download: 'Gagal',
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
          status_download: 'Sukses',
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
      await commit('changeReporting', {
        isLoading: false,
        status_download: 'Gagal',
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

      const result = await apiClient.post(`/reportAdmin/downloadTokoDist`, bodyForm)

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
          status_download: 'Sukses',
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })

      await commit('changeReporting', {
        isLoading: false,
        status_download: 'Gagal',
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
        id_tso: payload.id_jabatanTSO,
      }

      const result = await apiClient.post(`/reportAdmin/downloadCustomerSales`, bodyForm)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReporting', {
          isLoading: false,
          status_download: 'Gagal',
        })
      } else {
        await commit('changeReporting', {
          listDownloadCustomers: result.data.data,
          isLoading: false,
          status_download: 'Sukses',
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
      await commit('changeReporting', {
        isLoading: false,
        status_download: 'Gagal',
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

  async getFinalSurveyLastWeek({ commit, state }) {
    commit('changeReporting', {
      isLoading: true,
    })

    const { data } = state

    let params = {
      id_tso: data.bodyRegion.id_tso,
    }

    try {
      const result = await apiClient.post(`/report/hasilSurveyLastWeek`, params)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReporting', {
          isLoading: false,
          status_download: 'Gagal',
        })
      } else {
        await commit('changeReporting', {
          isLoading: false,
          survey_last_week: result.data.data,
          status_download: 'Sukses',
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
      await commit('changeReporting', {
        isLoading: false,
        status_download: 'Gagal',
      })
    }
  },

  async getFinalVisitLastWeek({ commit, state }) {
    commit('changeReporting', {
      isLoading: true,
    })

    const { data } = state

    let params = {
      id_tso: data.bodyRegion.id_tso,
    }

    try {
      const result = await apiClient.post(`/report/reportVisitLastWeek`, params)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReporting', {
          isLoading: false,
          status_download: 'Gagal',
        })
      } else {
        await commit('changeReporting', {
          isLoading: false,
          visit_last_week: result.data.data,
          status_download: 'Sukses',
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
      await commit('changeReporting', {
        isLoading: false,
        status_download: 'Gagal',
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
