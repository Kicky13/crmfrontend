import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    listDistributor: [],
    listCustomer: [],
    columns: [
      {
        title: 'No',
        dataIndex: 'id',
        key: 'id',
        // fixed: 'left',
        slots: { customRender: 'name' },
      },
      {
        title: 'ID Toko',
        dataIndex: 'customerid',
        key: 'customerid',
        // fixed: 'left',
        // slots: { customRender: 'name' },
      },
      {
        title: 'Nama Toko',
        dataIndex: 'customername',
        key: 'customername',
        // slots: { customRender: 'name' },
      },
      {
        title: 'Nama Distributor',
        dataIndex: 'distributorname',
        key: 'distributorname',
      },
      {
        title: 'Nama Customer',
        dataIndex: 'customername',
        key: 'customername',
      },
      {
        title: 'Id Distributor',
        dataIndex: 'distributorid',
        key: 'distributorid',
      },
      {
        title: 'Status',
        // fixed: 'right',
        dataIndex: 'status',
        key: 'status',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changeSynCustomer(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getListDistributor({ commit, state }) {
    commit('changeSynCustomer', {
      isLoading: true,
    })
    const { data } = state

    const result = await apiClient.post(`/ListDistributor`)
    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeSynCustomer', {
        isLoading: true,
      })
    } else {
      await commit('changeSynCustomer', {
        listDistributor: result.data.data,
        isLoading: false,
      })
    }
  },

  async getDataListCustomer({ commit, state }, payload) {
    commit('changeSynCustomer', {
      isLoading: true,
    })
    const { data } = state

    let formData = {
      id_distributor: payload.id_distrib,
      offset: 1,
      limit: 10,
    }

    const result = await apiClient.post(`/ListCustomer`, formData)
    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeSynCustomer', {
        isLoading: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: 'Data berhasil ditampilkan',
      })
      await commit('changeSynCustomer', {
        listCustomer: result.data.data,
        isLoading: false,
      })
    }
  },

  async getAsyncData({ commit, state }, payload) {
    commit('changeSynCustomer', {
      isLoading: true,
    })
    const { data } = state

    let formData = {
      kodedistributor: payload.kode_customer,
    }

    const result = await apiClient.post(`/scheduler/masterMappingCustomerDistributor`, formData)
    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeSynCustomer', {
        isLoading: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: result.data.message,
      })
      await commit('changeSynCustomer', {
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
