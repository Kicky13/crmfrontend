import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    itemsPerPage: [5, 10, 15, 20],
    columns: [
      {
        title: 'Area',
        dataIndex: 'area',
        key: 'area',
      },
      {
        title: 'Distrik',
        dataIndex: 'distrik',
        key: 'distrik',
      },
      {
        title: 'Soldto',
        dataIndex: 'soldto',
        key: 'soldto',
      },
      {
        title: 'Distributor',
        dataIndex: 'distributor',
        key: 'distributor',
      },
      {
        title: 'CA (M-2)',
        dataIndex: 'cam2',
        key: 'cam2',
      },
      {
        title: 'CA (M-1)',
        dataIndex: 'cam1',
        key: 'cam1',
      },
      {
        title: 'CA (MTD)',
        dataIndex: 'camtd',
        key: 'camtd',
      },
      {
        title: 'SO (M-2)',
        dataIndex: 'som2',
        key: 'som2',
      },
      {
        title: 'SO (M-1)',
        dataIndex: 'som1',
        key: 'som1',
      },
      {
        title: 'SO (MTD)',
        dataIndex: 'somtd',
        key: 'somtd',
      },
      {
        title: 'Visit (M-2)',
        dataIndex: 'vim2',
        key: 'vim2',
      },
      {
        title: 'Visit (M-1)',
        dataIndex: 'vim1',
        key: 'vim1',
      },
      {
        title: 'Visit (MTD)',
        dataIndex: 'vimtd',
        key: 'vimtd',
      },
    ],
    isLoading: false,
    pagination: {},
    dataMetabase: null,
  },
}

const mutations = {
  changeVolumeAnalytcs(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getMetabaseVolumeAnalytcs({ commit, state }, payload) {
    commit('changeVolumeAnalytcs', {
      isLoading: true,
    })
    const { data } = state

    let params = {
      dashboard: 220,
    }

    try {
      const result = await apiClient.post(`/metabase/dashboard?dashboard=${params.dashboard}`)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        commit('changeVolumeAnalytcs', {
          isLoading: false,
        })
      } else {
        await commit('changeVolumeAnalytcs', {
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
