import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    itemsPerPage: [5, 10, 15, 20],
    columns: [
      {
        title: 'Distrik',
        dataIndex: 'distrik',
        key: 'distrik',
      },
      {
        title: 'ID Toko',
        dataIndex: 'id_toko',
        key: 'id_toko',
      },
      {
        title: 'Nama Toko',
        dataIndex: 'nama_toko',
        key: 'nama_toko',
      },
      {
        title: 'Produk (SKU)',
        dataIndex: 'produksku',
        key: 'produksku',
      },
      {
        title: 'Beli (MIN)',
        dataIndex: 'beli_min',
        key: 'beli_min',
      },
      {
        title: 'Beli (MED)',
        dataIndex: 'beli_med',
        key: 'beli_med',
      },
      {
        title: 'Beli (MA)',
        dataIndex: 'beli_ma',
        key: 'beli_ma',
      },
      {
        title: 'Jual (MIN)',
        dataIndex: 'jual_min',
        key: 'jual_min',
      },
      {
        title: 'Jual (MED)',
        dataIndex: 'jual_med',
        key: 'jual_med',
      },
      {
        title: 'Jual (MA)',
        dataIndex: 'jual_ma',
        key: 'jual_ma',
      },
      {
        title: 'Margin',
        dataIndex: 'margin',
        key: 'margin',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changePriceMonitoring(state, payload) {
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
