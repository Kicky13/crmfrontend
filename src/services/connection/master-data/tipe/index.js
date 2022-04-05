import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Tipe',
        dataIndex: 'NAMA_TIPE_SEMEN',
        key: 'NAMA_TIPE_SEMEN',
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
    tipeList: [],
    isLoading: false,
  },
}

const mutations = {
  changeTipe(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllTipe({ commit, state }, payload) {
    commit('changeTipe', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/tipe`)

      if (result.data.status == false) {
        await commit('changeTipe', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeTipe', {
          tipeList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeTipe', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async addTipe({ commit, state }, payload) {
    commit('changeTipe', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      user_id: payload.id_user,
      nm_tipe: payload.tipe_baru,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/tipe/addnew`, formData)

      if (result.data.status == false) {
        await commit('changeTipe', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeTipe', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Tipe berhasil ditambahkan',
        })
      }
    } catch (err) {
      await commit('changeTipe', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async deleteTipe({ commit, state }, payload) {
    commit('changeTipe', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_tipe,
      user_id: payload.id_user,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/tipe/delete`, formData)

      if (result.data.status == false) {
        await commit('changeTipe', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeTipe', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Tipe berhasil dihapus',
        })
      }
    } catch (err) {
      await commit('changeTipe', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async editTipe({ commit, state }, payload) {
    commit('changeTipe', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_tipe,
      user_id: payload.id_user,
      nm_tipe: payload.tipe_baru,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/tipe/edit`, formData)

      if (result.data.status == false) {
        await commit('changeTipe', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeTipe', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Tipe berhasil diupdate',
        })
      }
    } catch (err) {
      await commit('changeTipe', {
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
