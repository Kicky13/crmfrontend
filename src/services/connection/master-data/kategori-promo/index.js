import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Kategori',
        dataIndex: 'NAMA_KATEGORI_PROMO',
        key: 'NAMA_KATEGORI_PROMO',
      },
      {
        title: 'Tanggal Buat',
        dataIndex: 'TANGGAL_DIBUAT',
        key: 'TANGGAL_DIBUAT',
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
    kategoriList: [],
    isLoading: false,
  },
}

const mutations = {
  changeKategori(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllKategori({ commit, state }, payload) {
    commit('changeKategori', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/kategoriPromo`)

      if (result.data.status == false) {
        await commit('changeKategori', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeKategori', {
          kategoriList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeKategori', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async addKategori({ commit, state }, payload) {
    commit('changeKategori', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      user_id: payload.id_user,
      nm_kategori: payload.kategori_baru,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/kategoriPromo/addnew`, formData)

      if (result.data.status == false) {
        await commit('changeKategori', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeKategori', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Kategori berhasil ditambahkan',
        })
      }
    } catch (err) {
      await commit('changeKategori', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async deleteKategori({ commit, state }, payload) {
    commit('changeKategori', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_kategori,
      user_id: payload.id_user,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/kategoriPromo/delete`, formData)

      if (result.data.status == false) {
        await commit('changeKategori', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeKategori', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Kategori berhasil dihapus',
        })
      }
    } catch (err) {
      await commit('changeKategori', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async editKategori({ commit, state }, payload) {
    commit('changeKategori', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_kategori,
      user_id: payload.id_user,
      nm_kategori: payload.kategori_baru,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/kategoriPromo/edit`, formData)

      if (result.data.status == false) {
        await commit('changeKategori', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeKategori', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Kategori berhasil diupdate',
        })
      }
    } catch (err) {
      await commit('changeKategori', {
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
