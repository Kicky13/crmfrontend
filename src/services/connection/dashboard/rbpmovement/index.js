// import apiClient from '@/services/axios/axios'
// import { notification } from 'ant-design-vue'

// const state = {
//   data: {
//     itemsPerPage: [5, 10, 15, 20],
//     columns: [
//       {
//         title: 'Area',
//         dataIndex: 'area',
//         key: 'area',
//       },
//       {
//         title: 'Distrik',
//         dataIndex: 'distrik',
//         key: 'distrik',
//       },
//       {
//         title: 'Produk (SKU)',
//         dataIndex: 'produksku',
//         key: 'produksku',
//       },
//       {
//         title: 'Week 1',
//         dataIndex: 'w1',
//         key: 'w1',
//       },
//       {
//         title: 'Week 2',
//         dataIndex: 'w2',
//         key: 'w2',
//       },
//       {
//         title: 'Week 3',
//         dataIndex: 'w3',
//         key: 'w3',
//       },
//       {
//         title: 'Week 4',
//         dataIndex: 'w4',
//         key: 'w4',
//       },
//       {
//         title: 'Week 5',
//         dataIndex: 'w5',
//         key: 'w5',
//       },
//     ],
//     isLoading: false,
//   },
// }

// const mutations = {
//   changeRBPMovement(state, payload) {
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
  },
}

const mutations = {
  changeRBPMovement(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getMetabaseRBPMovement({ commit, state }, payload) {
    commit('changeRBPMovement', {
      isLoading: true,
    })
    const { data } = state

    let params = {
      dashboard: 212,
    }

    try {
      const result = await apiClient.get(`/metabase/dashboard?dashboard=${params.dashboard}`)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        commit('changeRBPMovement', {
          isLoading: false,
        })
      } else {
        await commit('changeRBPMovement', {
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
