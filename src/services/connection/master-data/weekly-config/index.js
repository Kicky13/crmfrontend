import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Week Name',
        dataIndex: 'WEEK_NAME',
        key: 'WEEK_NAME',
      },
      {
        title: 'Tanggal Mulai',
        dataIndex: 'TANGGAL_MULAI',
        key: 'TANGGAL_MULAI',
      },
      {
        title: 'Tanggal Selesai',
        dataIndex: 'TANGGAL_SELESAI',
        key: 'TANGGAL_SELESAI',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    weeklyConfigList: [],
    isLoading: false,
  },
}

const mutations = {
  changeWeeklyConfig(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllWeeklyConfig({ commit, state }, payload) {
    commit('changeWeeklyConfig', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/weeklyConfig`)

      if (result.data.status == false) {
        await commit('changeWeeklyConfig', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWeeklyConfig', {
          weeklyConfigList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeWeeklyConfig', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async addWeeklyConfig({ commit, state }, payload) {
    commit('changeWeeklyConfig', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      user_id: payload.id_user,
      nm_weekly_config: payload.weekly_config_baru,
      start_date: payload.start_date,
      end_date: payload.end_date,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/weeklyConfig/addnew`, formData)

      if (result.data.status == false) {
        await commit('changeWeeklyConfig', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWeeklyConfig', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Weekly config berhasil ditambahkan',
        })
      }
    } catch (err) {
      await commit('changeWeeklyConfig', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async deleteWeeklyConfig({ commit, state }, payload) {
    commit('changeWeeklyConfig', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_weekly_config,
      user_id: payload.id_user,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/weeklyConfig/delete`, formData)

      if (result.data.status == false) {
        await commit('changeWeeklyConfig', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWeeklyConfig', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Weekly config berhasil dihapus',
        })
      }
    } catch (err) {
      await commit('changeWeeklyConfig', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async editWeeklyConfig({ commit, state }, payload) {
    commit('changeWeeklyConfig', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id: payload.id_weekly_config,
      user_id: payload.id_user,
      nm_weekly_config: payload.weekly_config_baru,
      start_date: payload.start_date,
      end_date: payload.end_date,
    }

    try {
      const result = await apiClient.post(`/wpm/master-data/weeklyConfig/edit`, formData)

      if (result.data.status == false) {
        await commit('changeWeeklyConfig', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWeeklyConfig', {
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Weekly config berhasil diupdate',
        })
      }
    } catch (err) {
      await commit('changeWeeklyConfig', {
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
