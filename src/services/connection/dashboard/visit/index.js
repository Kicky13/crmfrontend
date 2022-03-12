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
  },
}

const mutations = {
  changeVisitDashboard(state, payload) {
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
