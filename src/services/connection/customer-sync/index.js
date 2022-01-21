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
        dataIndex: 'bisnisKokohId',
        key: 'bisnisKokohId',
        // fixed: 'left',
        // slots: { customRender: 'name' },
      },
      {
        title: 'Nama Toko',
        dataIndex: 'storeName',
        key: 'storeName',
        // slots: { customRender: 'name' },
      },
      {
        title: 'Kota',
        dataIndex: 'cityName',
        key: 'cityName',
      },
      {
        title: 'Status',
        // fixed: 'right',
        dataIndex: 'storeStatus',
        key: 'storeStatus',
      },
    ],
    bodyList: {
      offset: 1,
      limit: 10,
      filter: '',
    },
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

    try {
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
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
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
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
      search: data.bodyList.filter,
    }

    try {
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
        if (data.bodyList.filter.length > 0) {
        } else {
          notification.success({
            message: 'Success',
            description: 'Data berhasil ditampilkan',
          })
        }
  
        await commit('changeSynCustomer', {
          listCustomer: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getDataCustomerMDXL({ commit, state }, payload) {
    commit('changeSynCustomer', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(
        `https://api-mdxl.aksestoko.com/api/data/toko?distributor=` +
          payload.id_distrib +
          `&method=post`,
      )
      if (result.data.status == 404) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSynCustomer', {
          isLoading: false,
          listCustomer: [],
        })
      } else {
        if (data.bodyList.filter.length > 0) {
        } else {
          notification.success({
            message: 'Success',
            description: 'Data berhasil ditampilkan',
          })
        }
  
        await commit('changeSynCustomer', {
          listCustomer: result.data.datas,
          isLoading: false,
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
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

    try {
      // const result = await apiClient.post(`/scheduler/masterMappingCustomerDistributor`, formData, {
      //   timeout: 600000,
      // })
      const result = await apiClient.post(
        `/scheduler/masterMappingCustomerDistributorAreaQueue`,
        formData,
        {
          timeout: 800000,
        },
      )
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
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getAsyncDataNew({ commit, state }, payload) {
    commit('changeSynCustomer', {
      isLoading: true,
    })

    const { data } = state

    let formData = new FormData()

    formData.append('data', JSON.stringify(data.listCustomer))
    formData.append('kodedistributor', payload.kode_customer)

    try {
      const result = await apiClient.post(`/scheduler/MappingCustomerDistributorJson`, formData, {
        timeout: 800000,
      })
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
          description:
            result.data.message +
            ', ' +
            result.data.insert +
            ' Data berhasil ditambahkan & ' +
            result.data.update +
            ' Data berhasil diupdate',
        })
        await commit('changeSynCustomer', {
          isLoading: false,
        })
      }
    } catch (err) {
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
