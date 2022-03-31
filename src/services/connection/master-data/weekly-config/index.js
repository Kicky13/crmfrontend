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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
