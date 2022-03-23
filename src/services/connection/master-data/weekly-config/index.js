import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Week Name',
        dataIndex: 'week_name',
        key: 'week_name',
      },
      {
        title: 'Tanggal Buat',
        dataIndex: 'tanggal_buat',
        key: 'tanggal_buat',
      },
      {
        title: 'Dibuat Oleh',
        dataIndex: 'dibuat_oleh',
        key: 'dibuat_oleh',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    weeklyConfigList: [
      {
        week_name: 'Week 1',
        tanggal_buat: '22/03/2022',
        dibuat_oleh: 'SIG',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changeWeeklyConfig(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllTipe({ commit, state }, payload) {
    commit('changeWeeklyConfig', {
      isLoading: true,
    })

    const { data } = state

    try {
      // const result = await apiClient.post(``)

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
