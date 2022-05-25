// import apiClient from '@/services/axios/axios'
// import { notification } from 'ant-design-vue'

// const state = {
//   data: {
//     itemsPerPage: [5, 10, 15, 20],
//     columns: [
//       {
//         title: 'Distrik',
//         dataIndex: 'distrik',
//         key: 'distrik',
//       },
//       {
//         title: 'ID Toko',
//         dataIndex: 'id_toko',
//         key: 'id_toko',
//       },
//       {
//         title: 'Nama Toko',
//         dataIndex: 'nama_toko',
//         key: 'nama_toko',
//       },
//       {
//         title: 'Produk (SKU)',
//         dataIndex: 'produksku',
//         key: 'produksku',
//       },
//       {
//         title: 'Beli (MIN)',
//         dataIndex: 'beli_min',
//         key: 'beli_min',
//       },
//       {
//         title: 'Beli (MED)',
//         dataIndex: 'beli_med',
//         key: 'beli_med',
//       },
//       {
//         title: 'Beli (MA)',
//         dataIndex: 'beli_ma',
//         key: 'beli_ma',
//       },
//       {
//         title: 'Jual (MIN)',
//         dataIndex: 'jual_min',
//         key: 'jual_min',
//       },
//       {
//         title: 'Jual (MED)',
//         dataIndex: 'jual_med',
//         key: 'jual_med',
//       },
//       {
//         title: 'Jual (MA)',
//         dataIndex: 'jual_ma',
//         key: 'jual_ma',
//       },
//       {
//         title: 'Margin',
//         dataIndex: 'margin',
//         key: 'margin',
//       },
//     ],
//     isLoading: false,
//   },
// }

// const mutations = {
//   changePriceMonitoring(state, payload) {
//     state.data = Object.assign({}, state.data, payload)
//   },
// }

// const actions = {}

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
// }


import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { _ } from 'vue-underscore'

const state = {
  data: {
    itemsPerPage: [3, 5],

    isLoading: false,
    dataMetabase: null,

    status: 'gagal',
    getDataTsoResult: [],
    getDataDistributorResult: [],
  },
}

const mutations = {
  changePriceMonitoring(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getMetabasePriceMonitoring({ commit, state }, payload) {
    commit('changePriceMonitoring', {
      isLoading: true,
    })
    const { data } = state

    // let params = {
    //   dashboard: 214,
    // }

    const formData = {
      dashboard: 214,
      data: btoa(JSON.stringify(
        {
          pdistrik: payload.pdistrik,
          pdistributor: payload.pdistributor,
        },
      )),
    }

    try {
      // const result = await apiClient.post(`/metabase/dashboard?dashboard=${params.dashboard}`)
      const result = await apiClient.post(`/metabase/dashboard`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        commit('changePriceMonitoring', {
          isLoading: false,
        })
      } else {
        await commit('changePriceMonitoring', {
          dataMetabase: result.data.url,
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

  async getDataTso({ commit, state }, payload) {
    commit('changePriceMonitoring', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/getdata/tso?id=${payload.id}`)

      if (result.data.message = 'success') {
        await commit('changePriceMonitoring', {
          getDataTsoResult: result.data,
          isLoading: false,
        })
      } else {
        await commit('changePriceMonitoring', {
          isLoading: false,
        })
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  // ganti api dari mas irhas
  async getDataDistributor({ commit, state }, payload) {
    commit('changePriceMonitoring', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/getdata/dist?id=${payload.id}`)

      if (result.data.message = 'success') {
        await commit('changePriceMonitoring', {
          getDataDistributorResult: result.data,
          isLoading: false,
        })
      } else {
        await commit('changePriceMonitoring', {
          isLoading: false,
        })
        notification.error({
          message: 'Error',
          description: result.data.message,
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
