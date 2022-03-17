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
        id: '01',
        nama: 'Januari',
      },
      {
        id: '02',
        nama: 'Februari',
      },
      {
        id: '03',
        nama: 'Maret',
      },
      {
        id: '04',
        nama: 'April',
      },
      {
        id: '05',
        nama: 'Mei',
      },
      {
        id: '06',
        nama: 'Juni',
      },
      {
        id: '07',
        nama: 'Juli',
      },
      {
        id: '08',
        nama: 'Agustus',
      },
      {
        id: '09',
        nama: 'September',
      },
      {
        id: '10',
        nama: 'Oktober',
      },
      {
        id: '11',
        nama: 'November',
      },
      {
        id: '12',
        nama: 'Desember',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changePromotion(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllProvinsi({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Provinsi`)

      if (result.data.status == false) {
        await commit('changePromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePromotion', {
          listProvinsi: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePromotion', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllArea({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Area`, payload)

      if (result.data.status == false) {
        await commit('changePromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePromotion', {
          listArea: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePromotion', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllDistrik({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Distrik`, payload)

      if (result.data.status == false) {
        await commit('changePromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePromotion', {
          listDistrik: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePromotion', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllDistributor({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Distributor`, payload)

      if (result.data.status == false) {
        await commit('changePromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePromotion', {
          listDistributor: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePromotion', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllKategori({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Kategori`)

      if (result.data.status == false) {
        await commit('changePromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePromotion', {
          listKategori: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePromotion', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllBrand({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/filter/Brand`, payload)

      if (result.data.status == false) {
        await commit('changePromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePromotion', {
          listBrand: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePromotion', {
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
