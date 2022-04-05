import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Distrik RET',
        dataIndex: 'NAMA_DISTRIK_RET',
        key: 'NAMA_DISTRIK_RET',
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
    distrikRetList: [],
    isLoading: false,
  },
}

const mutations = {
  changeDistrikRET(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllDistrikRET({ commit, state }, payload) {
    commit('changeDistrikRET', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/distrikret`)

      if (result.data.status == false) {
        await commit('changeDistrikRET', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeDistrikRET', {
          distrikRetList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeDistrikRET', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async addDistrikRET({ commit, state }, payload) {
    commit('changeDistrikRET', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      user_id: payload.id_user,
      nm_distrik: payload.distrik_ret_baru,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/distrikret/addnew`, formData)

      if (result.data.status == false) {
        await commit('changeDistrikRET', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeDistrikRET', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Distrik RET berhasil ditambahkan',
        })
      }
    } catch (err) {
      await commit('changeDistrikRET', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async deleteDistrikRET({ commit, state }, payload) {
    commit('changeDistrikRET', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_distrik_ret,
      user_id: payload.id_user,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/distrikret/delete`, formData)

      if (result.data.status == false) {
        await commit('changeDistrikRET', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeDistrikRET', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Distrik RET berhasil dihapus',
        })
      }
    } catch (err) {
      await commit('changeDistrikRET', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async editDistrikRET({ commit, state }, payload) {
    commit('changeDistrikRET', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_distrik_ret,
      user_id: payload.id_user,
      nm_distrik: payload.distrik_ret_baru,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/distrikret/edit`, formData)

      if (result.data.status == false) {
        await commit('changeDistrikRET', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeDistrikRET', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Distrik RET berhasil diupdate',
        })
      }
    } catch (err) {
      await commit('changeDistrikRET', {
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
