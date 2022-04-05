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
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    promotionList: [
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
  changePromotion(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllPromotion({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      // const result = await apiClient.post(``)

      if (result.data.status == false) {
        await commit('changePromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePromotion', {
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePromotion', {
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
