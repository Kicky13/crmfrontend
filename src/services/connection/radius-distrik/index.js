import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    listRadiusDistrik: [],
    columns: [
      {
        title: 'No.',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Nama Distrik',
        dataIndex: 'distrikname',
        key: 'distrikname',
      },
      {
        title: 'Radius Lock (Meter)',
        dataIndex: 'radius',
        key: 'radius',
      },
      {
        title: 'Action',
        dataIndex: 'id',
        width: 150,
        // key: 'id',
        slots: { customRender: 'action' },
      },
    ],
    isLoading: false,
    bodyList: {
      offset: 1,
      limit: 20,
    },
  },
}

const mutations = {
  changeRadiusDistrik(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataListDistrik({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    const result = await apiClient.post('/RadiusDistrik/List', body)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      await commit('changeRadiusDistrik', {
        users: result.data.data,
        isLoading: false,
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
