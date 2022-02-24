import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    itemsPerPage: [5, 10, 15, 20],
    columns: [
      {
        title: 'ID Distributor',
        dataIndex: 'id_distributor',
        key: 'id_distributor',
        slots: { customRender: 'id_distributor' },
      },
      {
        title: 'Distributor',
        dataIndex: 'nama_distributor',
        key: 'nama_distributor',
        slots: { customRender: 'nama_distributor' },
      },
      {
        title: 'Posisi',
        dataIndex: 'posisi_sales',
        key: 'posisi_sales',
        slots: { customRender: 'posisi_sales' },
      },
      {
        title: 'ID Sales',
        dataIndex: 'id_sales',
        key: 'id_sales',
        slots: { customRender: 'id_sales' },
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        slots: { customRender: 'username' },
      },
      {
        title: 'Sales',
        dataIndex: 'nama',
        key: 'nama',
        slots: { customRender: 'nama' },
      },
      {
        title: 'ID Distrik',
        dataIndex: 'id_kota',
        key: 'id_kota',
        slots: { customRender: 'id_kota' },
      },
      {
        title: 'Distrik',
        dataIndex: 'nama_kota',
        key: 'nama_kota',
        slots: { customRender: 'nama_kota' },
      },
      {
        title: 'ID TSO',
        dataIndex: 'id_posisi_tso',
        key: 'id_posisi_tso',
        slots: { customRender: 'id_tso' },
      },
      {
        title: 'Username TSO',
        dataIndex: 'username_tso',
        key: 'username_tso',
        slots: { customRender: 'username_tso' },
      },
      {
        title: 'Nama TSO',
        dataIndex: 'nama_tso',
        key: 'nama_tso',
        slots: { customRender: 'nama_tso' },
      },
    ],
    filter: {
      id_distrik: null,
      distrik_name: '',
      id_distributor: null,
      distributor_name: '',
    },
    list_distributor_tso: [],
    list_report: [],
    isLoading: false,
  },
}

const mutations = {
  changeReportingSalesDistributor(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getReportDistributorTSO({ commit, state }, payload) {
    commit('changeReportingSalesDistributor', {
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
        await commit('changeReportingSalesDistributor', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Sukses',
          description: 'Data berhasil ditampilkan',
        })
        await commit('changeReportingSalesDistributor', {
          list_report: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeReportingSalesDistributor', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getListTokoDistributorTSO({ commit, state }, payload) {
    commit('changeReportingSalesDistributor', {
      isLoading: false,
    })

    const { data } = state

    let formData = {
      idTSO: JSON.parse(localStorage.getItem('userData')).userid,
    }

    try {
      const result = await apiClient.post(`/distributor/getTokoDistributorTso`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeReportingSalesDistributor', {
          isLoading: false,
        })
      } else {
        await commit('changeReportingSalesDistributor', {
          list_distributor_tso: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeReportingSalesDistributor', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getListTokoDistributorByTSO({ commit, state }, payload) {
    commit('changeReportingSalesDistributor', {
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
        await commit('changeReportingSalesDistributor', {
          isLoading: false,
        })
      } else {
        await commit('changeReportingSalesDistributor', {
          list_distributor_tso: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeReportingSalesDistributor', {
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
