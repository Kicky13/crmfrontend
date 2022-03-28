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
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Kemasan',
        dataIndex: 'kemasan',
        key: 'kemasan',
      },
      {
        title: 'Price Last Week',
        dataIndex: 'price_last_week',
        key: 'price_last_week',
      },
      {
        title: 'Current Price',
        dataIndex: 'current_price',
        key: 'current_price',
      },
    ],
    priceMovementList: [
      {
        distrik: 'Distrik 1',
        produk: 'Produk 1',
        brand: 'Brand 1',
        type: 'Type 1',
        kemasan: 'Kemasan 1',
        price_last_week: '1000000',
        current_price: '1500000',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changeReport(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllTipe({ commit, state }, payload) {
    commit('changeReport', {
      isLoading: true,
    })

    const { data } = state

    try {
      // const result = await apiClient.post(``)

      if (result.data.status == false) {
        await commit('changeReport', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeReport', {
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeReport', {
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
