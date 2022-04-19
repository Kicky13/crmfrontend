import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Brand',
        dataIndex: 'NAMA_BRAND',
        key: 'NAMA_BRAND',
      },
      {
        title: 'Tanggal Buat',
        key: 'TANGGAL_DIBUAT',
        slots: { customRender: 'tanggal_dibuat' },
      },
      {
        title: 'Dibuat Oleh',
        dataIndex: 'DIBUAT_OLEH',
        key: 'DIBUAT_OLEH',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    companyList: [],
    brandList: [],
    isLoading: false,
  },
}

const mutations = {
  changeBrand(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllCompany({ commit, state }, payload) {
    commit('changeBrand', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/company`)

      if (result.data.status == false) {
        await commit('changeBrand', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeBrand', {
          companyList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeBrand', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllBrand({ commit, state }, payload) {
    commit('changeBrand', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/brand`)

      if (result.data.status == false) {
        await commit('changeBrand', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeBrand', {
          brandList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeBrand', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async addBrand({ commit, state }, payload) {
    commit('changeBrand', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      user_id: payload.id_user,
      id_company: payload.id_company,
      nm_brand: payload.brand_baru,
      keterangan: payload.keterangan,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/brand/addnew`, formData)

      if (result.data.status == false) {
        await commit('changeBrand', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeBrand', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Brand berhasil ditambahkan',
        })
      }
    } catch (err) {
      await commit('changeBrand', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async deleteBrand({ commit, state }, payload) {
    commit('changeBrand', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_tipe,
      user_id: payload.id_user,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/brand/delete`, formData)

      if (result.data.status == false) {
        await commit('changeBrand', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeBrand', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Brand berhasil dihapus',
        })
      }
    } catch (err) {
      await commit('changeBrand', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async editBrand({ commit, state }, payload) {
    commit('changeBrand', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_brand,
      user_id: payload.id_user,
      id_company: payload.id_company,
      nm_brand: payload.brand_baru,
      keterangan: payload.keterangan,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/brand/edit`, formData)

      if (result.data.status == false) {
        await commit('changeBrand', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeBrand', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Brand berhasil diupdate',
        })
      }
    } catch (err) {
      await commit('changeBrand', {
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
