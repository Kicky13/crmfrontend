import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
const state = {
    data: {
        columns: [
            {
                title: 'No',
                dataIndex: 'distrik',
                key: 'distrik',
            },
            {
                title: 'Distrik',
                dataIndex: 'distrik',
                key: 'distrik',
            },
            {
                title: 'Distributor',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
            },
            {
                title: 'Toko',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
            },
            {
                title: 'Sales',
                dataIndex: 'nama Toko',
                key: 'Nama Toko',
            },
            {
                title: 'Tanggal',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
            },
            {
                title: 'Check-In',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
            },
            {
                title: 'Check-Out',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
            },
            {
                title: 'Durasi Visit',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
            },
            {
                title: 'Jarak Check',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
            },
            {
                title: 'Perjalanan',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
            },
            {
                title: 'Plan/Unplan',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
            },
        ],
        columns2: [{
            title: 'Toko Belum Dikunjungi',
            dataIndex: 'distrik',
            key: 'distrik',
        },

        ],
        dataList: null,
        dataSourceTable: [],
        pagination: {},
        isLoading: false,
        pagination2: {},
        isLoading2: false,
        bodyList: {
            offset: 0,
            limit: 2000,
            filter: '',
        },
        formData: {
          selectedDistrik: null,
          selectedDistributor: null,
        },
        itemsPerPage: [5, 10, 15, 20],
    },
}
const mutations = {
    changeSalesRoute(state, payload) {
      state.data = Object.assign({}, state.data, payload)
    },
}
const actions = {
  async getDistrik({ commit, state }) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    let body = {
    //   id_area:data.formData.selectedArea,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post('/filter/Distrik', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataDistrik: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getDistributor({ commit, state }) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      id_distrik:data.formData.selectedDistrik,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post('/filter/Distributor', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataDistributor: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getBrand({ commit, state }) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      id_kategori:21,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post('/filter/Brand', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataBrand: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
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