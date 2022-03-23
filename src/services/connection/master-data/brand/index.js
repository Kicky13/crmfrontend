import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
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
    brandList: [
      {
        brand: 'Brand 1',
        tanggal_buat: '22/03/2022',
        dibuat_oleh: 'SIG',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changeBrand(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllTipe({ commit, state }, payload) {
    commit('changeBrand', {
      isLoading: true,
    })

    const { data } = state

    try {
      // const result = await apiClient.post(``)

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
