import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Produk',
        dataIndex: 'produk',
        key: 'produk',
      },
      {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: 'Tipe',
        dataIndex: 'tipe',
        key: 'tipe',
      },
      {
        title: 'Kemasan',
        dataIndex: 'kemasan',
        key: 'kemasan',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    produkList: [
      {
        produk: 'Produk 1',
        brand: 'Brand 1',
        tipe: 'Tipe 1',
        kemasan: 'Kemasan 1',
        tanggal_buat: '22/03/2022',
        dibuat_oleh: 'SIG',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changeProduk(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllTipe({ commit, state }, payload) {
    commit('changeProduk', {
      isLoading: true,
    })

    const { data } = state

    try {
      // const result = await apiClient.post(``)

      if (result.data.status == false) {
        await commit('changeProduk', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeProduk', {
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeProduk', {
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
