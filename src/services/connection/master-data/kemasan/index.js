import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { result } from 'lodash'

const state = {
  data: {
    columns: [
      {
        title: 'Kemasan',
        dataIndex: 'NAMA_KEMASAN',
        key: 'NAMA_KEMASAN',
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
    kemasanList: [],
    kemasanGroup: [],
    isLoading: false,
  },
}

const mutations = {
  changeKemasan(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllGroupKemasan({ commit, state }, payload) {
    commit('changeKemasan', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/group-kemasan`)

      if (result.data.status == false) {
        await commit('changeKemasan', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeKemasan', {
          kemasanGroup: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeKemasan', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllKemasan({ commit, state }, payload) {
    commit('changeKemasan', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/kemasan`)

      if (result.data.status == false) {
        await commit('changeKemasan', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeKemasan', {
          kemasanList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeKemasan', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async addKemasan({ commit, state }, payload) {
    commit('changeKemasan', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      user_id: payload.id_user,
      id_group_satuan: payload.id_group_satuan,
      nama: payload.kemasan_baru,
      nilai: payload.nilai,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/kemasan/addnew`, formData)

      if (result.data.status == false) {
        await commit('changeKemasan', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeKemasan', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Kemasan berhasil ditambahkan',
        })
      }
    } catch (err) {
      await commit('changeKemasan', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async deleteKemasan({ commit, state }, payload) {
    commit('changeKemasan', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_kemasan,
      user_id: payload.id_user,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/kemasan/delete`, formData)

      if (result.data.status == false) {
        await commit('changeKemasan', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeKemasan', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Tipe berhasil dihapus',
        })
      }
    } catch (err) {
      await commit('changeKemasan', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async editKemasan({ commit, state }, payload) {
    commit('changeKemasan', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_kemasan,
      user_id: payload.id_user,
      id_group_satuan: payload.id_group_satuan,
      nama: payload.kemasan_baru,
      nilai: payload.nilai,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/kemasan/edit`, formData)

      if (result.data.status == false) {
        await commit('changeKemasan', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeKemasan', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Tipe berhasil diupdate',
        })
      }
    } catch (err) {
      await commit('changeKemasan', {
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
