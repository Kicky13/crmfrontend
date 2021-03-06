import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { _ } from 'vue-underscore'

const state = {
  data: {
    columns: [
      {
        title: 'No Survei',
        slots: { customRender: 'no_survei' },
        key: 'no_survei',
        width: 60,
      },
      {
        title: 'Tanggal',
        slots: { customRender: 'tanggal' },
        key: 'tanggal',
        width: 60,
      },
      {
        title: 'Sales',
        slots: { customRender: 'sales' },
        key: 'sales',
        width: 100,
      },
      {
        title: 'SO',
        slots: { customRender: 'so' },
        key: 'so',
        width: 100,
      },
      {
        title: 'Distributor',
        slots: { customRender: 'distributor' },
        key: 'distributor',
        width: 100,
      },
      {
        title: 'Customer',
        slots: { customRender: 'customer' },
        key: 'customer',
        width: 100,
      },
      {
        title: 'Nilai',
        slots: { customRender: 'nilai' },
        key: 'nilai',
        width: 40,
      },
      {
        title: 'Alamat',
        slots: { customRender: 'alamat' },
        key: 'alamat',
        width: 180,
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
        width: 60,
      },
    ],
    itemsPerPage: [5, 10, 15, 20],
    dataTable: [
      // {
      //   id: 1,
      //   title: '',
      //   tanggal: '',
      //   sales: '',
      //   so: '',
      //   distributor: '',
      //   customer: '',
      //   nilai: '',
      //   alamat: '',
      // },
    ],
    listTSO: [],
    listDistributor: [],
    listSales: [],
    listReport: [],
    params: {
      id_tso: '',
      id_sales: '',
      id_distributor: '',
      selectedTSO: '',
      selectedSales: '',
      selectedDistributor: '',
      tahun: '',
      limit: 2000,
      offset: 0,
      is_export: 1,
    },
    detailVisit: {},
  },
}

const mutations = {
  changeReportingSupervisory(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getRefreshSupervisoryVisit({ commit, state }) {
    await commit('changeReportingSupervisory', {
      listReport: [],
      listDistributor: [],
      listSales: [],
      params: {
        id_tso: '',
        id_sales: '',
        id_distributor: '',
        selectedTso: '',
        selectedSales: '',
        selectedDistributor: '',
        tahun: '',
        limit: 2000,
        offset: 0,
        is_export: 1,
      },
    })
  },
  async getListTSO({ commit, state }, payload) {
    commit('changeReportingSupervisory', {
      isLoading: false,
    })

    const { data } = state

    let formData = {
      idLevelHirarki: 40,
      limit: 5000,
      offset: 0,
    }

    try {
      const result = await apiClient.post(`/hirarki/users`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeReportingSupervisory', {
          isLoading: false,
        })
      } else {
        let dataTSO = result.data.data.filter(x => x.idUser != null)

        await commit('changeReportingSupervisory', {
          listTSO: dataTSO,
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
  async getDistributorByTSO({ commit, state }, payload) {
    commit('changeReportingSupervisory', {
      isLoading: false,
    })

    const { data } = state

    let formData = {
      idTSO: payload.id_tso,
    }

    try {
      const result = await apiClient.post(`/distributor/getTokoDistributorTso`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReportingSupervisory', {
          isLoading: false,
        })
      } else {
        await commit('changeReportingSupervisory', {
          listDistributor: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeReportingSupervisory', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getSalesByDistributor({ commit, state }, payload) {
    commit('changeReportingSupervisory', {
      isLoading: true,
    })

    const { data } = state

    let formData = payload

    try {
      const result = await apiClient.post(`/report/distributorSalesTso`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
        await commit('changeReportingSupervisory', {
          isLoading: false,
        })
      } else {
        let salesUniq = _.uniq(result.data.data, function(sales) {
          return sales.nama
        })

        await commit('changeReportingSupervisory', {
          listSales: salesUniq,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeReportingSupervisory', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getDataTable({ commit, state }, payload) {
    commit('changeReportingSupervisory', {
      isLoading: false,
    })

    const { data } = state

    let formData = {
      id_tso: payload.id_tso,
      id_distributor: parseInt(payload.id_distributor),
      id_sales: payload.id_sales,
      tahun: data.params.tahun,
      limit: data.params.limit,
      offset: data.params.offset,
    }

    try {
      const result = await apiClient.post(`/supervisory/report`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReportingSupervisory', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil ditampilkan`,
        })
        await commit('changeReportingSupervisory', {
          listReport: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeReportingSupervisory', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getDataDetailSupervisoryVisit({ commit, state }, payload) {
    commit('changeReportingSupervisory', {
      isLoading: false,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/supervisory/detail?id_visit=${payload.id_visited}`)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReportingSupervisory', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil ditampilkan`,
        })
        await commit('changeReportingSupervisory', {
          detailVisit: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeReportingSupervisory', {
        isLoading: false,
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
