import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { _ } from 'vue-underscore'

const state = {
  data: {
    itemsPerPage: [3, 5],
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

    columns_toko: [
      {
        title: 'Distrik',
        slots: { customRender: 'distrik' },
        key: 'distrik',
      },
      {
        title: 'Toko',
        slots: { customRender: 'toko' },
        key: 'toko',
      },
      {
        title: 'Distributor',
        slots: { customRender: 'distributor' },
        key: 'distributor',
      },
    ],
    columns_sales: [
      {
        title: 'Sales',
        slots: { customRender: 'sales' },
        key: 'sales',
      },

      {
        title: 'Distributor',
        slots: { customRender: 'distributor' },
        key: 'distributor',
      },
    ],
    columns_jadwal: [
      {
        title: 'Distrik',
        dataIndex: 'distrik',
        key: 'distrik',
      },
      {
        title: 'Toko',
        dataIndex: 'toko',
        key: 'toko',
      },
      {
        title: 'Distributor',
        dataIndex: 'distributor',
        key: 'distributor',
      },
    ],
    columns_kunjungan: [
      {
        title: 'Distrik',
        slots: { customRender: 'distrik' },
        key: 'distrik',
      },
      {
        title: 'Toko',
        slots: { customRender: 'toko' },
        key: 'toko',
      },
      {
        title: 'Distributor',
        slots: { customRender: 'distributor' },
        key: 'distributor',
      },
    ],
    isLoading: false,
    paginationTokoBelumMapping: {},
    paginationTokoBelumDikunjungi: {},
    paginationSalesBelumMapping: {},

    listDistributor: [],
    listSalesman: [],
    listDistrik: [],
    filter: {
      id_distributor: null,
      distributor: '',
      id_sales: null,
      sales: '',
      tahun: '',
      bulan: '',
      id_distrik: null,
      distrik: '',
      tahun: null,
      bulan: '',
    },
    data_bulan: [
      {
        id: 1,
        name: 'Januari',
      },
      {
        id: 2,
        name: 'Februari',
      },
      {
        id: 3,
        name: 'Maret',
      },
      {
        id: 4,
        name: 'April',
      },
      {
        id: 5,
        name: 'Mei',
      },
      {
        id: 6,
        name: 'Juni',
      },
      {
        id: 7,
        name: 'Juli',
      },
      {
        id: 8,
        name: 'Agustus',
      },
      {
        id: 9,
        name: 'September',
      },
      {
        id: 10,
        name: 'Oktober',
      },
      {
        id: 11,
        name: 'November',
      },
      {
        id: 12,
        name: 'Desember',
      },
    ],
    listCustomerTotal: {},
    listVisitInformation: {},
    dataTarget: [],
    dataRealisasi: [],
    status: 'gagal',
  },
}

const mutations = {
  changeVisitDashboard(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataDistributor({ commit, state }, payload) {
    commit('changeVisitDashboard', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/distributor/all`)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeVisitDashboard', {
          isLoading: false,
        })
      } else {
        await commit('changeVisitDashboard', {
          listDistributor: result.data.data,
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

  async getDataSalesman({ commit, state }, payload) {
    commit('changeVisitDashboard', {
      isLoading: true,
    })

    try {
      const result = await apiClient.get(
        `/dashboard/getSalesman?idDistributor=${payload.id_distributor}`,
      )

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })

        await commit('changeVisitDashboard', {
          isLoading: false,
        })
      } else {
        await commit('changeVisitDashboard', {
          listSalesman: result.data.data,
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

  async getDataDistrikBySales({ commit, state }, payload) {
    commit('changeVisitDashboard', {
      isLoading: true,
    })

    try {
      const result = await apiClient.get(
        `/dashboard/getDistrikSales?idSales=${payload.id_sales}&idDistributor=${payload.id_distributor}`,
      )

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })

        await commit('changeVisitDashboard', {
          isLoading: false,
        })
      } else {
        await commit('changeVisitDashboard', {
          listDistrik: result.data.data,
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

  async postChartVisit({ commit, state }, payload) {
    commit('changeVisitDashboard', {
      isLoading: true,
    })

    const { data } = state
    let formData = {
      tahun: data.filter.tahun,
      bulan: data.filter.bulan,
      idDistrik: data.filter.id_distrik,
      idSales: data.filter.id_sales,
      idDistributor: data.filter.id_distributor,
    }

    try {
      const result = await apiClient.post(`/dashboard/visit`, formData)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeVisitDashboard', {
          isLoading: false,
        })
      } else {
        await commit('changeVisitDashboard', {
          listVisitInformation: result.data,
          isLoading: false,
          status: 'sukses',
        })

        if (result.data.harian.length > 0) {
          // Mencari target
          let target = _.find(result.data.harian, function(item) {
            return item.nama == `Target`
          })
          if (target != 0) {
            target.informasi.forEach(element => {
              data.dataTarget.push(element)
            })
          }

          // Mencari realisasi
          let realisasi = _.find(result.data.harian, function(item) {
            return item.nama == `Realisasi`
          })
          if (realisasi != 0) {
            realisasi.informasi.forEach(element => {
              data.dataRealisasi.push(element)
            })
          }
        }
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async postCustomerTotal({ commit, state }, payload) {
    commit('changeVisitDashboard', {
      isLoading: true,
    })

    const { data } = state
    let formData = {
      tahun: data.filter.tahun,
      bulan: data.filter.bulan,
      idDistrik: data.filter.id_distrik,
      idSales: data.filter.id_sales,
      idDistributor: data.filter.id_distributor,
    }

    try {
      const result = await apiClient.post(`/dashboard/customerTotal`, formData)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeVisitDashboard', {
          isLoading: false,
        })
      } else {
        await commit('changeVisitDashboard', {
          listCustomerTotal: result.data,
          isLoading: false,
          status: 'sukses',
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
