import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { result } from 'lodash'

const state = {
  data: {
    columns: [
      {
        title: 'Produk',
        dataIndex: 'NAMA_PRODUK',
        key: 'NAMA_PRODUK',
      },
      {
        title: 'Brand',
        dataIndex: 'NAMA_BRAND',
        key: 'NAMA_BRAND',
      },
      {
        title: 'Tipe',
        dataIndex: 'NAMA_TIPE',
        key: 'NAMA_TIPE',
      },
      {
        title: 'Kemasan',
        dataIndex: 'NAMA_KEMASAN',
        key: 'NAMA_KEMASAN',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    produkList: [],
    typeProdukList: [],
    typeKemasanList: [],
    isLoading: false,
  },
}

const mutations = {
  changeProduk(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllProduk({ commit, state }, payload) {
    commit('changeProduk', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/produk`)

      if (result.data.status == false) {
        await commit('changeProduk', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeProduk', {
          produkList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeProduk', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllTypeProduk({ commit, state }, payload) {
    commit('changeProduk', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/type-produk`)

      if (result.data.status == false) {
        await commit('changeProduk', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeProduk', {
          typeProdukList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeProduk', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllTypeKemasan({ commit, state }, payload) {
    commit('changeProduk', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/group-kemasan`)

      if (result.data.status == false) {
        await commit('changeProduk', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeProduk', {
          typeKemasanList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeProduk', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async addProduk({ commit, state }, payload) {
    commit('changeProduk', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      user_id: payload.id_user,
      nm_produk: payload.produk_baru,
      id_satuan: payload.id_satuan,
      id_brand: payload.id_brand,
      id_type_produk: payload.id_type_produk,
      id_tipe_semen: payload.id_tipe_semen,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/produk/addnew`, formData)

      if (result.data.status == false) {
        await commit('changeProduk', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeProduk', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Produk berhasil ditambahkan',
        })
      }
    } catch (err) {
      await commit('changeProduk', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async deleteProduk({ commit, state }, payload) {
    commit('changeProduk', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_produk,
      user_id: payload.id_user,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/produk/delete`, formData)

      if (result.data.status == false) {
        await commit('changeProduk', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeProduk', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Produk berhasil dihapus',
        })
      }
    } catch (err) {
      await commit('changeProduk', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async editProduk({ commit, state }, payload) {
    commit('changeProduk', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_produk,
      user_id: payload.id_user,
      id_satuan: payload.id_satuan,
      id_brand: payload.id_brand,
      id_type_produk: payload.id_type_produk,
      id_tipe_semen: payload.id_tipe_semen,
      nm_produk: payload.produk_baru,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/produk/edit`, formData)

      if (result.data.status == false) {
        await commit('changeProduk', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeProduk', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Produk berhasil diupdate',
        })
      }
    } catch (err) {
      await commit('changeProduk', {
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
