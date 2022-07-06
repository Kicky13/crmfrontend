import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import axios from 'axios'
import Swal from 'sweetalert2'

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
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Maaf, terjadi kesalahan!',
        showConfirmButton: false,
        timer: 2000,
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
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeSynCustomer', {
          isLoading: false,
        })
      } else {
        if (data.bodyList.filter.length > 0) {
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: 'Data berhasil ditampilkan!',
            showConfirmButton: false,
            timer: 2000,
          })
        }

        await commit('changeSynCustomer', {
          listCustomer: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Maaf, terjadi kesalahan!',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  },

  async getDataCustomerMDXL({ commit, state }, payload) {
    commit('changeSynCustomer', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await axios.get(
        `https://api-mdxl.aksestoko.com/external/distributor/toko?distributor=` +
          payload.id_distrib +
          `&access-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDY4MzcxMzksInN1YiI6MTQ0OTgyMn0.sIBeo2CE45Zt3kAjsILPWP9TkHTkYzED_7Wd2HMOJ8w`,
      )
      if (result.data.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeSynCustomer', {
          isLoading: false,
          listCustomer: [],
        })
      } else {
        if (data.bodyList.filter.length > 0) {
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: 'Data berhasil ditampilkan!',
            showConfirmButton: false,
            timer: 2000,
          })
        }

        await commit('changeSynCustomer', {
          listCustomer: result.data.datas,
          isLoading: false,
        })
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Maaf, terjadi kesalahan!',
        showConfirmButton: false,
        timer: 2000,
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

    formData.append('data', payload.data)
    formData.append('kodedistributor', payload.kode_customer)

    try {
      const result = await apiClient.post(`/scheduler/MappingCustomerDistributorJson`, formData, {
        timeout: 800000,
      })
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeSynCustomer', {
          isLoading: false,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text:
            result.data.message +
            ', ' +
            result.data.insert +
            ' Data berhasil ditambahkan & ' +
            result.data.update +
            ' Data berhasil diupdate',
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeSynCustomer', {
          isLoading: false,
        })
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Maaf, terjadi kesalahan!',
        showConfirmButton: false,
        timer: 2000,
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
