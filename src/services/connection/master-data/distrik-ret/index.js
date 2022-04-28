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
    distrikRetList: [],
    distrikList: [],
    distrikByDistrikRetList: [],
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
      keterangan: payload.keterangan,
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
      keterangan: payload.keterangan,
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
  async getAllDistrik({ commit, state }, payload) {
    commit('changeDistrikRET', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/wpm/master-data/distrikret/getAllDistrik`)

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
          distrikList: result.data.data,
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
  async getDistrikByDistrikRet({ commit, state }, payload) {
    commit('changeDistrikRET', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_distrik_ret: payload.id_distrik_ret,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/distrikret/getMMDistrik`, formData)

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
          distrikByDistrikRetList: result.data.data,
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
  async addDistrikByDistrikRet({ commit, state }, payload) {
    commit('changeDistrikRET', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_distrik_ret: payload.id_distrik_ret,
      id_distrik: payload.id_distrik,
      user_id: payload.user_id,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/distrikret/addnewDistrik`, formData)

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
          description: 'Distrik berhasil ditambahkan',
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
  async deleteDistrikByDistrikRet({ commit, state }, payload) {
    commit('changeDistrikRET', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_mm_distrik_ret: payload.id_mm_distrik_ret,
      user_id: payload.user_id,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/distrikret/deleteDistrik`, formData)

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
          description: 'Distrik berhasil dihapus',
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
