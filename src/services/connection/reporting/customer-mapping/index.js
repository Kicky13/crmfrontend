import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    itemsPerPage: [5, 10, 15, 20],
    columns: [
      {
        title: 'ID Distrik',
        key: 'id_distrik',
        slots: { customRender: 'id_distrik' },
      },
      {
        title: 'Distrik',
        key: 'nama_distrik',
        slots: { customRender: 'nama_distrik' },
      },
      {
        title: 'ID Toko',
        key: 'id_toko',
        slots: { customRender: 'id_toko' },
      },
      {
        title: 'Toko',
        key: 'nama_toko',
        slots: { customRender: 'nama_toko' },
      },
      {
        title: 'ID Distributor',
        key: 'id_distributor',
        slots: { customRender: 'id_distributor' },
      },
      {
        title: 'Posisi',
        key: 'posisi',
        slots: { customRender: 'posisi' },
      },
      {
        title: 'Username',
        key: 'username',
        slots: { customRender: 'username' },
      },
      {
        title: 'Sales',
        key: 'sales',
        slots: { customRender: 'sales' },
      },
      {
        title: 'Min',
        key: 'min',
        slots: { customRender: 'min' },
      },
      {
        title: 'Sen',
        key: 'sen',
        slots: { customRender: 'sen' },
      },
      {
        title: 'Sel',
        key: 'sel',
        slots: { customRender: 'sel' },
      },
      {
        title: 'Rab',
        key: 'rab',
        slots: { customRender: 'rab' },
      },
      {
        title: 'Kam',
        key: 'kam',
        slots: { customRender: 'kam' },
      },
      {
        title: 'Jum',
        key: 'jum',
        slots: { customRender: 'jum' },
      },
      {
        title: 'Sab',
        key: 'sab',
        slots: { customRender: 'sab' },
      },
      {
        title: 'W1',
        key: 'w1',
        slots: { customRender: 'w1' },
      },
      {
        title: 'W2',
        key: 'w2',
        slots: { customRender: 'w2' },
      },
      {
        title: 'W3',
        key: 'w3',
        slots: { customRender: 'w3' },
      },
      {
        title: 'W4',
        key: 'w4',
        slots: { customRender: 'w4' },
      },
      {
        title: 'W5',
        key: 'w5',
        slots: { customRender: 'w5' },
      },
    ],
    filter: {
      id_distrik: null,
      distrik_name: '',
      id_distributor: null,
      distributor_name: '',
    },
    list_customer: [],
    list_distrik: [],
    isLoading: false,
    status_download: 'gagal',
  },
}

const mutations = {
  changeReportingCustomerMapping(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getListDistrik({ commit, state }, payload) {
    commit('changeReportingCustomerMapping', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idTso: payload.id_tso,
      offset: 0,
      limit: 1000,
      q: '',
    }

    try {
      const result = await apiClient.post(`/distrik/all`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeReportingCustomerMapping', {
          isLoading: false,
        })
      } else {
        await commit('changeReportingCustomerMapping', {
          list_distrik: result.data.data,
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
  async getListCustomerMapping({ commit, state }, payload) {
    commit('changeReportingCustomerMapping', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: 0,
      limit: 1000,
      q: '',
    }

    try {
      const result = await apiClient.post(`/hirarki/allRegion`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeReportingCustomerMapping', {
          isLoading: false,
        })
      } else {
        await commit('changeReportingCustomerMapping', {
          list_customer: result.data.data,
          isLoading: false,
          status_download: 'sukses',
        })
      }
    } catch (err) {
      await commit('changeReportingCustomerMapping', {
        isLoading: false,
        status_download: 'gagal',
      })
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
