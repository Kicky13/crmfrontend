import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    listProvinsi: [],
    listArea: [],
    listDistrik: [],
    listDistributor: [],
    listKategori: [],
    listBrand: [],
    listBulan: [
      {
        id: 1,
        nama: 'Januari',
      },
      {
        id: 2,
        nama: 'Februari',
      },
      {
        id: 3,
        nama: 'Maret',
      },
      {
        id: 4,
        nama: 'April',
      },
      {
        id: 5,
        nama: 'Mei',
      },
      {
        id: 6,
        nama: 'Juni',
      },
      {
        id: 7,
        nama: 'Juli',
      },
      {
        id: 8,
        nama: 'Agustus',
      },
      {
        id: 9,
        nama: 'September',
      },
      {
        id: 10,
        nama: 'Oktober',
      },
      {
        id: 11,
        nama: 'November',
      },
      {
        id: 12,
        nama: 'Desember',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changeFilter(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllProvinsi({ commit, state }, payload) {
    commit('changeFilter', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Provinsi`)

      if (result.data.status == false) {
        await commit('changeFilter', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeFilter', {
          listProvinsi: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeFilter', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllArea({ commit, state }, payload) {
    commit('changeFilter', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Area`, payload)

      if (result.data.status == false) {
        await commit('changeFilter', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeFilter', {
          listArea: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeFilter', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllDistrik({ commit, state }, payload) {
    commit('changeFilter', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Distrik`, payload)

      if (result.data.status == false) {
        await commit('changeFilter', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeFilter', {
          listDistrik: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeFilter', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllDistributor({ commit, state }, payload) {
    commit('changeFilter', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Distributor`, payload)

      if (result.data.status == false) {
        await commit('changeFilter', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeFilter', {
          listDistributor: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeFilter', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllKategori({ commit, state }, payload) {
    commit('changeFilter', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Kategori`)

      if (result.data.status == false) {
        await commit('changeFilter', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeFilter', {
          listKategori: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeFilter', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllBrand({ commit, state }, payload) {
    commit('changeFilter', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Brand`, payload)

      if (result.data.status == false) {
        await commit('changeFilter', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeFilter', {
          listBrand: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeFilter', {
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
