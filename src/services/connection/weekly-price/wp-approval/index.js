import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { result } from 'lodash'

const state = {
  data: {
    columns: [
      {
        title: 'Distrik',
        slots: { customRender: 'distrik' },
        key: 'distrik',
      },
      {
        title: 'Tahun',
        slots: { customRender: 'tahun' },
        key: 'tahun',
      },
      {
        title: 'Bulan',
        slots: { customRender: 'bulan' },
        key: 'bulan',
      },
      {
        title: 'Week',
        slots: { customRender: 'week' },
        key: 'week',
      },
      {
        title: 'Status',
        slots: { customRender: 'status' },
        key: 'status',
      },
      {
        title: 'Produk',
        slots: { customRender: 'produk' },
        key: 'produk',
      },
      {
        title: 'Brand',
        slots: { customRender: 'brand' },
        key: 'brand',
      },
      {
        title: 'Type',
        slots: { customRender: 'type' },
        key: 'type',
      },
      {
        title: 'Kemasan',
        slots: { customRender: 'kemasan' },
        key: 'type',
      },
      {
        title: 'RBP Gross',
        slots: { customRender: 'rbp_gross' },
        key: 'rbp_gross',
      },
      {
        title: 'Promo',
        slots: { customRender: 'promo' },
        key: 'promo',
      },
      {
        title: 'RBP Net',
        slots: { customRender: 'rbp_net' },
        key: 'rbp_net',
      },
      {
        title: 'RSP',
        slots: { customRender: 'rsp' },
        key: 'rsp',
      },
      {
        title: 'Notes',
        slots: { customRender: 'notes' },
        key: 'notes',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
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
    dataWeekly: [
      {
        id: 1,
        name: 'Week 1',
      },
      {
        id: 2,
        name: 'Week 2',
      },
      {
        id: 3,
        name: 'Week 3',
      },
      {
        id: 4,
        name: 'Week 4',
      },
    ],
    wpApprovalList: [],
    params: {
      offset: 0,
      limit: 2000,
      tahun: '',
      bulan: '',
      week: '',
      nm_tso: '',
      id_tso: '',
    },
    formData: {
      id_distrik: null,
      tahun: '',
      bulan: '',
      week: '',
      id_produk: 1,
      rbp_gross: null,
      promo: null,
      rbp_net: null,
      rsp: null,
      brand: null,
      type: null,
      kemasan: null,
      notes: '',
    },
    data_uuid: [],
    pagination: {},
    dataTSO: [],
    isLoading: false,
  },
}

const mutations = {
  changeWPApproval(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataTSO({ commit, state }, payload) {
    commit('changeWPApproval', {
      isLoading: true,
    })

    const { data } = state
    let formData = {
      id_atasan: payload.id_atasan,
    }
    try {
      const result = await apiClient.post(`/getBawahan`, formData)

      if (result.data.status == false) {
        await commit('changeWPApproval', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWPApproval', {
          dataTSO: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeWPApproval', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getDataTable({ commit, state }, payload) {
    commit('changeWPApproval', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: data.params.offset,
      limit: data.params.limit,
      tahun: data.params.tahun,
      bulan: data.params.bulan,
      week: data.params.week,
      status: 1,
      id_tso: data.params.id_tso,
    }

    try {
      const result = await apiClient.post(`/WPM/getData`, formData)

      if (result.data.status == `false`) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWPApproval', {
          isLoading: false,
        })
      } else {
        await commit('changeWPApproval', {
          wpApprovalList: result.data.data || 0,
          isLoading: false,
        })
        notification.success({
          message: 'Success',
          description: result.data.message || `Data berhasil ditampilkan`,
        })
      }
    } catch (error) {
      await commit('changeWPApproval', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async submitApprove({ commit, state }, payload) {
    commit('changeWPApproval', {
      isLoading: true,
    })

    const { data } = state

    let dataTable = data.wpApprovalList

    dataTable.forEach(element => {
      data.data_uuid.push(element.uuid)
    })
    let dataStatus = 2
    let formData = new FormData()
    formData.append('uuid', JSON.stringify(data.data_uuid))
    formData.append('status', dataStatus)

    try {
      const result = await apiClient.post(`/WPM/SubmitWPM`, formData)

      if (result.data.state == 'false') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWPApproval', {
          isLoading: false,
        })
      } else {
        await commit('changeWPApproval', {
          isLoading: false,
        })
        notification.success({
          message: 'Success',
          description: 'Data berhasil di Approve',
        })
      }
    } catch (error) {
      await commit('changeWPApproval', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async submitReject({ commit, state }, payload) {
    commit('changeWPApproval', {
      isLoading: true,
    })

    const { data } = state

    let dataTable = data.wpApprovalList

    dataTable.forEach(element => {
      data.data_uuid.push(element.uuid)
    })
    let dataStatus = 0
    let formData = new FormData()
    formData.append('uuid', JSON.stringify(data.data_uuid))
    formData.append('status', dataStatus)

    try {
      const result = await apiClient.post(`/WPM/SubmitWPM`, formData)

      if (result.data.state == 'false') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWPApproval', {
          isLoading: false,
        })
      } else {
        await commit('changeWPApproval', {
          isLoading: false,
        })
        notification.success({
          message: 'Success',
          description: 'Data Berhasil di Reject',
        })
      }
    } catch (error) {
      await commit('changeWPApproval', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async updateDataWeekly({ commit, state }, payload) {
    commit('changeWPApproval', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      rbp_gross: data.formData.rbp_gross,
      promo: data.formData.promo,
      rbp_net: data.formData.rbp_net,
      rsp: data.formData.rsp,
      notes: data.formData.notes,
      uuid: payload.uuid,
    }

    try {
      const result = await apiClient.post(`/WPM/UpdateWPM`, formData)

      if (result.data.state == 'false') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWPApproval', {
          isLoading: false,
          status: 'gagal',
        })
      } else {
        await commit('changeWPApproval', {
          isLoading: false,
          status: 'sukses',
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changeWPApproval', {
        isLoading: false,
        status: 'gagal',
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
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
