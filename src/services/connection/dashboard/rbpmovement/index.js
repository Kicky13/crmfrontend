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
    getDataTsoResult: [],
    getDataAdminDistributorResult: [],
    getDataDistributorResult: [],
    getDataSpcResult: [],
  },
}

const mutations = {
  changeRBPMovement(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getMetabaseRBPMovementTSO({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })
    const { data } = state

    // let params = {
    //   dashboard: 212,
    // }

    const formData = {
      dashboard: 255,
      data: btoa(JSON.stringify(
        {
          pregion: payload.pregion,
        },
      )),
    }

    try {
      // const result = await apiClient.post(`/metabase/dashboard?dashboard=${formData.dashboard}`)
      const result = await apiClient.post(`/metabase/dashboard`, formData)

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
  async getMetabaseRBPMovementAdmin({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })
    const { data } = state

    // let params = {
    //   dashboard: 212,
    // }

    const formData = {
      dashboard: 249,
    }

    try {
      // const result = await apiClient.post(`/metabase/dashboard?dashboard=${formData.dashboard}`)
      const result = await apiClient.post(`/metabase/dashboard`, formData)

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

  async getMetabaseRBPMovementSPC({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })
    const { data } = state

    const formData = {
      dashboard: 255,
      data: btoa(JSON.stringify(
        {
          pregion: payload.pregion,
        },
      )),
    }

    try {
      const result = await apiClient.post(`/metabase/dashboard`, formData)

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

  async getMetabaseRBPMovement({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })
    const { data } = state

    // let params = {
    //   dashboard: 212,
    // }

    const formData = {
      dashboard: 212,
      data: btoa(JSON.stringify(
        {
          pdistrik: payload.pdistrik,
          pdistributor: payload.pdistributor,
        },
      )),
    }

    try {
      // const result = await apiClient.post(`/metabase/dashboard?dashboard=${formData.dashboard}`)
      const result = await apiClient.post(`/metabase/dashboard`, formData)

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

  async getDataTso({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/getdataregion/tso?id=${payload.id}`)

      if (result.data.message = 'success') {
        await commit('changeRBPMovement', {
          getDataTsoResult: result.data,
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
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

  async getDataAdminDistributor({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/getdist?id=${payload.id}`)

      if (result.data.message = 'success') {
        await commit('changeRBPMovement', {
          getDataAdminDistributorResult: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
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

  async getDataDistributor({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/getdata/dist?id=${payload.id}`)

      if (result.data.message = 'success') {
        await commit('changeRBPMovement', {
          getDataDistributorResult: result.data,
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
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

  async getDataSpc({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/getdataregion/spc?id=${payload.id}`)

      if (result.data.message = 'success') {
        await commit('changeRBPMovement', {
          getDataSpcResult: result.data,
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
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

  async getRegionList({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      levelHirarki: JSON.parse(localStorage.getItem('userData')).idLevelHirarki,
    }

    try {
      const result = await apiClient.post(`/filter/Region`, formData)

      if (result.data.message = 'success') {
        await commit('changeRBPMovement', {
          regionList: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
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
    commit('changeRBPMovement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_region: JSON.stringify(payload.id_region),
    }

    try {
      const result = await apiClient.post(`/filter/Provinsi`, formData)

      if (result.data.message = 'success') {
        await commit('changeRBPMovement', {
          provinsiList: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
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
    commit('changeRBPMovement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_provinsi: JSON.stringify(payload.id_provinsi),
    }

    try {
      const result = await apiClient.post(`/filter/Area`, formData)

      if (result.data.message = 'success') {
        await commit('changeRBPMovement', {
          areaList: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
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
    commit('changeRBPMovement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_area: JSON.stringify(payload.id_area),
    }

    try {
      const result = await apiClient.post(`/filter/Distrik`, formData)

      if (result.data.message = 'success') {
        await commit('changeRBPMovement', {
          distrikList: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
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
    commit('changeRBPMovement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_distrik: JSON.stringify(payload.id_distrik),
    }

    try {
      const result = await apiClient.post(`/filter/Distributor`, formData)

      if (result.data.message = 'success') {
        await commit('changeRBPMovement', {
          distributorList: result.data.data,
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
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
