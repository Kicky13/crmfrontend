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
        title: 'Produk (SKU)',
        dataIndex: 'produksku',
        key: 'produksku',
      },
      {
        title: 'Week 1',
        dataIndex: 'w1',
        key: 'w1',
      },
      {
        title: 'Week 2',
        dataIndex: 'w2',
        key: 'w2',
      },
      {
        title: 'Week 3',
        dataIndex: 'w3',
        key: 'w3',
      },
      {
        title: 'Week 4',
        dataIndex: 'w4',
        key: 'w4',
      },
      {
        title: 'Week 5',
        dataIndex: 'w5',
        key: 'w5',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changeRBPMovement(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
