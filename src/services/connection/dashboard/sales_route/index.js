import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { moment } from 'moment'

const state = {
  data: {
    columns: [
      {
        title: '',
        slots: { customRender: 'radio' },
        key: 'radio',
      },
      {
        title: 'Distrik',
        slots: { customRender: 'distrik' },
        key: 'distrik',
      },
      {
        title: 'ID Toko',
        slots: { customRender: 'id_toko' },
        key: 'id_toko',
      },
      {
        title: 'Toko',
        slots: { customRender: 'toko' },
        key: 'toko',
      },
      {
        title: 'Sales',
        slots: { customRender: 'sales' },
        key: 'sales',
      },
      {
        title: 'Tanggal',
        slots: { customRender: 'tanggal' },
        key: 'tanggal',
      },
      {
        title: 'Check-In',
        slots: { customRender: 'check_in' },
        key: 'check_in',
      },
      {
        title: 'Check-Out',
        slots: { customRender: 'check_out' },
        key: 'check_out',
      },
      {
        title: 'Durasi Visit',
        slots: { customRender: 'durasi_visit' },
        key: 'durasi_visit',
      },
      {
        title: 'Jarak Check',
        slots: { customRender: 'jarak_check' },
        key: 'jarak_check',
      },
      {
        title: 'Perjalanan',
        slots: { customRender: 'perjalanan' },
        key: 'perjalanan',
      },
      {
        title: 'Plan/Unplan',
        slots: { customRender: 'plan' },
        key: 'plan',
      },
    ],
    columns2: [
      {
        title: 'Toko Belum Dikunjungi',
        slots: { customRender: 'toko' },
        key: 'toko',
      },
    ],
    dataList: null,
    dataSourceTable: [],
    dataSalesman: [],
    dataDistrik: [],
    dataDistributor: [],
    detailVisit: [],
    detailMerchant: [],
    dataMap: [],
    pagination: {},
    paginationToko: {},
    isLoading: false,
    pagination2: {},
    isLoading2: false,
    bodyList: {
      offset: 0,
      limit: 2000,
      filter: '',
    },
    formData: {
      selectedDistrik: '',
      selectedDistributor: '',
      selectedSalesman: '',
      selectedDate: '',
      id_distrik: '',
      id_distributor: '',
      id_sales: '',
    },
    itemsPerPage: [5, 10, 15, 20],
  },
}
const mutations = {
  changeSalesRoute(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}
const actions = {
  async getDistrik({ commit, state }) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      //   id_area:data.formData.selectedArea,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post('/filter/Distrik', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataDistrik: result.data.data,
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
  async getDistributor({ commit, state }) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      id_distrik: data.formData.id_distrik,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post('/filter/Distributor', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataDistributor: result.data.data,
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
  async getSalesman({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(
        `/dashboard/getSalesman?idDistributor=${payload.id_distributor}`,
      )

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataSalesman: result.data.data,
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
  async getDetailVisit({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    try {
      let dateMoment = new Date(data.formData.selectedDate).toLocaleDateString('en-GB')
      let dateFormat = dateMoment
        .toString()
        .replace('/', '-')
        .replace('/', '-')

      const result = await apiClient.get(
        `/salesRoute/detilVisitRouteMaps?idSales=${data.formData.id_sales}&idDistributor=${data.formData.id_distributor}&idDistrik=${data.formData.id_distrik}&tanggal=${dateFormat}`,
      )
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
          detailVisit: result.data.data,
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
  async getMerchantSurvey({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading2: true,
    })

    const { data } = state

    try {
      let dateMoment = new Date(data.formData.selectedDate).toLocaleDateString('en-GB')
      let dateFormat = dateMoment
        .toString()
        .replace('/', '-')
        .replace('/', '-')

      const result = await apiClient.get(
        `/salesRoute/tokoBelumDikunjungi?idSales=${data.formData.selectedSalesman}&idDistributor=${data.formData.id_distributor}&idDistrik=${data.formData.id_distrik}&tanggal=${dateFormat}`,
      )
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading2: false,
        })
      } else {
        await commit('changeSalesRoute', {
          detailMerchant: result.data.data,
          isLoading2: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getMap({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading2: true,
    })

    const { data } = state

    try {
      let dateMoment = new Date(data.formData.selectedDate).toLocaleDateString('en-GB')
      let dateFormat = dateMoment
        .toString()
        .replace('/', '-')
        .replace('/', '-')

      const result = await apiClient.get(
        `/salesRoute/mapSalesRouting?idSales=${data.formData.id_sales}&idDistributor=${data.formData.id_distributor}&idDistrik=${data.formData.selectedDistrik}&tanggal=${dateFormat}`,
      )
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading2: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataMap: result.data.data,
          isLoading2: false,
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
