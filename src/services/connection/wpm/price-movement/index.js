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
    params: {
      region_name: '',
      province_name: '',
      distrik_name: '',
      id_region: '',
      id_provinsi: '',
      id_distrik: '',
      limit: 2000,
      tahun: '',
      bulan: '',
      id_distrik_ret: null,
    },
    dataDistrikRET: [],
    regionList: [],
    provinceList: [],
    distrikList: [],
    priceMovementList: [],
    dataWeekParams: [],
    isLoading: false,
  },
}

const mutations = {
  changePriceMovement(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllDistrik({ commit, state }, payload) {
    commit('changePriceMovement', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/wpm/master-data/distrikret/getAllDistrik`)

      if (result.data.status == false) {
        await commit('changePriceMovement', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePriceMovement', {
          distrikList: result.data.data.all,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePriceMovement', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getPriceMovementList({ commit, state }, payload) {
    commit('changePriceMovement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      distrik: payload.distrik,
      tahun: payload.tahun,
      bulan: payload.bulan,
      week: payload.week,
    }

    try {
      const result = await apiClient.post(`/wpm/price-movemnt`, formData)

      if (result.data.status == false) {
        await commit('changePriceMovement', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePriceMovement', {
          priceMovementList: result.data.data,
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Data berhasil ditampilkan',
        })
      }
    } catch (err) {
      await commit('changePriceMovement', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getDataWeekParams({ commit, state }, payload) {
    commit('changePriceMovement', {
      isLoading: true,
    })
    const { data } = state
    let formData = {
      tahun: payload.tahun,
      bulan: payload.bulan,
    }

    try {
      const result = await apiClient.post(`/WPM/getWeek`, formData)

      if (result.data.status == `false`) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePriceMovement', {
          isLoading: false,
        })
      } else {
        await commit('changePriceMovement', {
          dataWeekParams: result.data.data || 0,
          isLoading: false,
        })
      }
    } catch (error) {
      await commit('changePriceMovement', {
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
