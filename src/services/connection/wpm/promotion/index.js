import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Distrik',
        dataIndex: 'distrik',
        key: 'distrik',
      },
      {
        title: 'Tanggal Mulai',
        dataIndex: 'tanggal_mulai',
        key: 'tanggal_mulai',
      },
      {
        title: 'Tanggal Selesai',
        dataIndex: 'tanggal_selesai',
        key: 'tanggal_selesai',
      },
      {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: 'Kategori',
        dataIndex: 'kategori',
        key: 'kategori',
      },
      {
        title: 'Asal Program',
        dataIndex: 'asal_program',
        key: 'asal_program',
      },
      {
        title: 'Nilai / ZAK',
        dataIndex: 'nilai',
        key: 'nilai',
      },
      {
        title: 'Mekanisme',
        dataIndex: 'mekanisme',
        key: 'mekanisme',
      },
    ],
    wpmPromotionList: [
      {
        distrik: 'Distrik 1',
        tanggal_mulai: '22-03-2022',
        tanggal_selesai: '23-03-2022',
        brand: 'Brand 1',
        kategori: 'Kategori 1',
        asal_program: 'SIG',
        nilai: '50',
        mekanisme: 'Mekanisne 1',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changeWPMPromotion(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllTipe({ commit, state }, payload) {
    commit('changeWPMPromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      // const result = await apiClient.post(``)

      if (result.data.status == false) {
        await commit('changeWPMPromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWPMPromotion', {
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeWPMPromotion', {
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
